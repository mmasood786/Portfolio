# How to Integrate Neon Database, Netlify Hosting, and Vectorless RAG — 100% Free

> Complete step-by-step guide for the DevStudio portfolio application.

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Phase 1: Neon Database Setup](#phase-1-neon-database-setup)
3. [Phase 2: Netlify Hosting Setup](#phase-2-netlify-hosting-setup)
4. [Phase 3: Vectorless RAG Setup](#phase-3-vectorless-rag-setup)
5. [Phase 4: Connect Everything Together](#phase-4-connect-everything-together)
6. [Deployment Checklist](#deployment-checklist)
7. [Cost Breakdown](#cost-breakdown)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                       VISITOR BROWSER                         │
│                  (devstudio.netlify.app)                      │
└──────────────────────────┬───────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼─────────┐     ┌────────▼─────────┐
    │  NETLIFY (Free)    │     │  NETLIFY (Free)   │
    │  Next.js App       │     │  Serverless       │
    │  Static Pages      │     │  API Routes       │
    │  + Edge Functions  │     │  (/api/audit)     │
    └─────────┬─────────┘     └────────┬──────────┘
              │                        │
              │                        ▼
              │             ┌────────────────────┐
              │             │ NEON DATABASE (Free)│
              │             │  Serverless PG      │
              │             │  0.5 GB Storage     │
              │             │  audit_requests     │
              │             └────────────────────┘
              │
    ┌─────────▼─────────┐
    │ RENDER (Free)      │
    │ FastAPI Backend    │
    │ + PageIndex RAG    │
    │ + OpenAI API       │
    │ /chat endpoint     │
    └────────────────────┘
```

### What Each Service Does:

| Service | Role | Free Tier |
|---------|------|-----------|
| **Netlify** | Hosts Next.js frontend + API routes | 100GB bandwidth, 300 build min/month |
| **Neon** | Serverless PostgreSQL for data storage | 0.5 GB, unlimited compute hours |
| **Render** | Hosts Python FastAPI RAG service | 512MB RAM, 750 hrs/month |
| **PageIndex** | Vectorless RAG (no vector DB needed) | Open-source, free |
| **OpenAI** | LLM for RAG responses | Free credits on new account |

---

## Phase 1: Neon Database Setup

### Step 1.1: Create Your Free Neon Account

1. Go to **[https://neon.tech](https://neon.tech)**
2. Click **"Sign Up"** (use GitHub or Google for fastest setup)
3. Click **"Create a Project"**
4. Name it: `devstudio-portfolio`
5. Region: Pick the closest to your audience (e.g., `us-east-2`)
6. Neon creates a default database for you

### Step 1.2: Get Your Connection String

After creating the project:
1. On the Neon dashboard, click your project
2. On the left sidebar, click **"Connection Details"**
3. Copy the **Connection string** (it looks like this):
   ```
   postgresql://devstudio_user:abc123XYZ@ep-cool-water-123456.us-east-2.aws.neon.tech/devstudio?sslmode=require
   ```

> **Important:** The `?sslmode=require` part is critical — Neon requires SSL connections.

### Step 1.3: Create the Database Schema

1. In your Neon dashboard, click **"SQL Editor"**
2. Paste and run this SQL:

```sql
-- Audit requests (from the website form)
CREATE TABLE IF NOT EXISTS audit_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(500),
    business_type VARCHAR(100) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Chat sessions (for the AI assistant)
CREATE TABLE IF NOT EXISTS chat_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    visitor_email VARCHAR(255),
    visitor_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages (conversation history)
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES chat_sessions(session_id),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes
CREATE INDEX idx_audit_created_at ON audit_requests(created_at DESC);
CREATE INDEX idx_chat_session_id ON chat_sessions(session_id);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
```

3. Click **"Run"** — you should see "Success"

### Step 1.4: Test the Connection Locally

In your project, create or update `.env.local`:
```env
DATABASE_URL=postgresql://devstudio_user:abc123XYZ@ep-cool-water-123456.us-east-2.aws.neon.tech/devstudio?sslmode=require
```

Run locally:
```bash
npm run dev
```

Fill out the audit form on your site and check if the data appears in Neon:
```sql
SELECT * FROM audit_requests ORDER BY created_at DESC LIMIT 5;
```

---

## Phase 2: Netlify Hosting Setup

### Step 2.1: Prepare Your Project for Netlify

**Install the Netlify Next.js plugin:**
```bash
npm install --save-dev @netlify/plugin-nextjs
```

**Create `netlify.toml` in your project root:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

# SPA fallback for client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "origin-when-cross-origin"

# Cache static assets
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Step 2.2: Optimize Database Connections for Serverless

Netlify runs API routes as **serverless functions** (10-second timeout, limited memory). You need connection pooling.

**Update `src/app/api/audit/route.ts`:**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Singleton pattern — reuse connections across serverless invocations
const globalForPg = globalThis as unknown as {
  pool: Pool | undefined;
};

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for Neon
    max: 5, // Limit connections (Neon free tier)
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;

// ... rest of your route handler using `pool` instead of creating new Pool
```

### Step 2.3: Deploy to Netlify

**Option A: Via Netlify CLI (recommended)**
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize project
netlify init
  → Create & configure a new site
  → Select your team
  → Site name: devstudio-portfolio
  → Build command: npm run build
  → Publish directory: .next

# Deploy
netlify deploy --prod
```

**Option B: Via GitHub Auto-Deploy**
```bash
# Push to GitHub
git init
git add .
git commit -m "Ready for Netlify deploy"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/devstudio-portfolio.git
git push -u origin main

# Then:
# 1. Go to https://app.netlify.com
# 2. "Add new site" → "Import an existing project"
# 3. Connect GitHub → Select your repo
# 4. Build command: npm run build
# 5. Publish directory: .next
# 6. Click "Deploy site"
```

### Step 2.4: Set Environment Variables

**Via CLI:**
```bash
netlify env:set DATABASE_URL "postgresql://your-connection-string"
netlify env:set NEXT_PUBLIC_SITE_URL "https://devstudio-portfolio.netlify.app"
netlify env:set CONTACT_EMAIL "hello@devstudio.com"
netlify env:set WHATSAPP_NUMBER "1234567890"
```

**Via Dashboard:**
1. Go to your site on Netlify
2. **Site settings** → **Build & deploy** → **Environment**
3. Click **Add a variable** for each one

### Step 2.5: Add Custom Domain (Optional, Free)

1. In Netlify: **Domain settings** → **Add custom domain**
2. Enter your domain (e.g., `devstudio.com`)
3. Netlify gives you DNS records to add to your registrar
4. Netlify auto-provisions a **free SSL certificate** (takes ~5 min)

---

## Phase 3: Vectorless RAG Setup

### What is Vectorless RAG?

Traditional RAG pipeline:
```
Documents → Chunk → Embed → Store in Vector DB → Query → Retrieve
```
This needs: embeddings model, vector database (Pinecone/Weaviate), complex setup.

**Vectorless RAG** (PageIndex):
```
Documents → Store as text → Query → AI reasons over text → Answer
```
No embeddings. No vector database. No complexity. Just reasoning.

### Step 3.1: Understand the Architecture

Since PageIndex is a **Python** library and your frontend is **Next.js** (JavaScript), you need a small Python backend:

```
Next.js Frontend (Netlify)
         │
         │ POST /chat
         ▼
FastAPI Backend (Render free tier)
         │
         ├─ PageIndex (vectorless retrieval)
         ├─ OpenAI GPT-4o-mini (response generation)
         └─ Neon DB (chat history storage)
```

### Step 3.2: Set Up the FastAPI RAG Backend

**Create the backend folder structure:**
```
backend/
├── main.py
├── requirements.txt
├── render.yaml
├── knowledge/
│   ├── __init__.py
│   ├── services.py      # Your services as text
│   ├── pricing.py       # Pricing packages
│   ├── faq.py           # FAQ answers
│   └── process.py       # How it works
└── rag/
    ├── __init__.py
    ├── client.py        # PageIndex client wrapper
    └── chat.py          # Chat endpoint
```

**`backend/requirements.txt`:**
```
fastapi==0.112.0
uvicorn[standard]==0.30.5
asyncpg==0.29.0
pydantic[email]==2.8.2
python-dotenv==1.0.1
pageindex==0.1.0
openai==1.40.0
httpx==0.27.0
```

**`backend/main.py`:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="DevStudio AI Assistant")

# CORS — allow your Netlify site
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
        "https://devstudio-portfolio.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
from rag.chat import router as chat_router
app.include_router(chat_router)

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "DevStudio AI Assistant"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
```

**`backend/knowledge/services.py`:**
```python
SERVICES_INFO = """
# DevStudio Services

## Website Design From Scratch
Get a stunning website built from the ground up.
- Custom design that matches your brand
- Mobile-friendly (works on phones, tablets, desktops)
- Built to convert visitors into paying customers
- Starting from $1,500

## Website Redesign
Turn your outdated website into a modern lead-generating machine.
- Modern, professional look
- Faster loading speed
- Better user experience
- Starting from $2,000

## Conversion Optimization
Make small tweaks that bring big results.
- Clear call-to-action buttons
- Strategic layout for sales
- Data-driven improvements

## Google Maps Optimization
Help local customers find you first.
- Appear in local searches
- Better Google business profile
- More foot traffic

## Voice AI Agent
An AI assistant that answers customer calls 24/7.
- Handles customer inquiries automatically
- Books appointments for you
- Captures leads even while you sleep
- $50-100/month depending on call volume
"""
```

**`backend/knowledge/pricing.py`:**
```python
PRICING_INFO = """
# DevStudio Pricing Packages

## Starter — $1,500 (5-7 days)
Perfect for small businesses getting online.
- Up to 5 pages
- Mobile-friendly design
- Contact form
- Basic SEO setup
- Google Maps integration
- 1 round of revisions
- 30 days support

## Professional — $3,500 (7-10 days) ⭐ Most Popular
Best for growing businesses.
- Up to 10 pages
- Premium custom design
- Online booking/contact system
- Advanced SEO
- WhatsApp chat widget
- 2 rounds of revisions
- 60 days priority support

## Premium — $6,500 (10-14 days)
Complete solution for serious businesses.
- Unlimited pages
- Voice AI Agent integration
- Content writing included
- Unlimited revisions
- 90 days VIP support
- Monthly performance reports

All prices are one-time, NOT monthly.
100% satisfaction guarantee included.
"""
```

**`backend/knowledge/faq.py`:**
```python
FAQ_INFO = """
# DevStudio FAQ

## How long does it take to build my website?
Most websites are completed in 5-14 days depending on the package.
Starter takes about a week, Premium takes up to 2 weeks.

## Do I need to provide content?
Not necessarily! Starter and Professional packages include content help.
Premium includes professional content writing.

## What if I don't like the design?
We show mockups first. Each package includes revision rounds.
Premium has unlimited revisions.

## Will it work on phones?
Yes! Every website is fully responsive — phones, tablets, desktops.
We design mobile-first since most visitors browse on phones.

## Do you handle hosting and domain?
Yes! We help set up hosting (~$10-15/month) and connect your domain.
We handle all technical setup.

## What's in the free website audit?
A thorough review covering: mobile-friendliness, loading speed,
SEO basics, lead-generation gaps, and competitor comparison.

## Is there a monthly fee?
Website design is a ONE-TIME payment. Only ongoing costs are
hosting ($10-15/month) and domain ($10-15/year).

## How do I get started?
Fill out the "Free Website Audit" form on our site. We'll review
and contact you within 24 hours. No obligation.
"""
```

**`backend/rag/client.py`:**
```python
from pageindex import PageIndexClient
import os

class RAGClient:
    def __init__(self):
        self.client = PageIndexClient(api_key=os.getenv("OPENAI_API_KEY"))
        self._initialized = False

    def initialize(self, documents: dict):
        """Load knowledge base documents"""
        for doc_id, content in documents.items():
            self.client.add_document(doc_id, content)
        self._initialized = True

    async def query(self, question: str) -> dict:
        """Answer a question using vectorless reasoning"""
        if not self._initialized:
            return {
                "answer": "I'm still getting set up! Please try again in a moment.",
                "confidence": "low"
            }

        result = await self.client.query(
            query=question,
            reasoning=True
        )

        return {
            "answer": result.answer,
            "confidence": result.confidence,
            "sources": result.source_documents
        }
```

**`backend/rag/chat.py`:**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import asyncpg
from datetime import datetime
from rag.client import RAGClient
from knowledge.services import SERVICES_INFO
from knowledge.pricing import PRICING_INFO
from knowledge.faq import FAQ_INFO

router = APIRouter()

# Initialize RAG client once
rag_client = RAGClient()
rag_client.initialize({
    "services": SERVICES_INFO,
    "pricing": PRICING_INFO,
    "faq": FAQ_INFO
})

class ChatRequest(BaseModel):
    message: str
    session_id: str
    visitor_name: Optional[str] = None
    visitor_email: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    suggested_actions: list[str]

# System prompt for the AI
SYSTEM_PROMPT = """You are the DevStudio AI assistant. You help visitors
learn about web design services, pricing, and the process. Be friendly,
professional, and focused on business results (not tech jargon).

Rules:
- Keep answers concise (2-3 sentences max)
- Always end with a helpful suggestion or question
- If asked about pricing, mention the free audit first
- If they want to proceed, direct them to the Free Audit form
- Never make up prices or timelines not in your knowledge base
"""

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Query the RAG system
        result = await rag_client.query(request.message)

        # Store in database
        await save_chat_message(request.session_id, "user", request.message)
        await save_chat_message(request.session_id, "assistant", result["answer"])

        # Determine suggested next actions
        suggested_actions = get_suggested_actions(request.message)

        return ChatResponse(
            answer=result["answer"],
            suggested_actions=suggested_actions
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_suggested_actions(message: str) -> list[str]:
    """Smart action suggestions based on conversation context"""
    msg = message.lower()
    actions = []

    if any(word in msg for word in ["price", "cost", "how much", "pricing"]):
        actions.append("Get a free website audit →")
    elif any(word in msg for word in ["start", "begin", "interested", "ready"]):
        actions.append("Fill out the audit form →")
    elif any(word in msg for word in ["contact", "email", "reach"]):
        actions.append("Email: hello@devstudio.com")
    elif any(word in msg for word in ["ai", "voice", "agent", "bot"]):
        actions.append("Learn about Voice AI Agent →")

    if not actions:
        actions.append("Get your free website audit →")

    return actions

async def save_chat_message(session_id: str, role: str, content: str):
    """Save message to Neon database"""
    try:
        pool = await asyncpg.create_pool(os.getenv("DATABASE_URL"))
        async with pool.acquire() as conn:
            # Ensure session exists
            await conn.execute("""
                INSERT INTO chat_sessions (session_id)
                VALUES ($1) ON CONFLICT DO NOTHING
            """, session_id)
            # Save message
            await conn.execute("""
                INSERT INTO chat_messages (session_id, role, content)
                VALUES ($1, $2, $3)
            """, session_id, role, content)
    except Exception as e:
        print(f"DB error: {e}")
```

### Step 3.3: Deploy FastAPI to Render (Free)

1. **Push backend to GitHub** (in a separate repo or as a subfolder):
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial RAG backend"
   git push -u origin main
   ```

2. **Create Render Account**: Go to [https://render.com](https://render.com) → Sign up with GitHub

3. **Create Web Service**:
   - Dashboard → **New** → **Web Service**
   - Connect your GitHub repo
   - Name: `devstudio-rag`
   - Region: Pick closest to you
   - Branch: `main`
   - Root Directory: `backend` (if in a subfolder)
   - Runtime: **Python 3**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables** (in Render dashboard):
   ```
   DATABASE_URL = postgresql://your-neon-connection-string
   OPENAI_API_KEY = sk-proj-your-openai-key
   FRONTEND_URL = https://devstudio-portfolio.netlify.app
   ```

5. **Deploy** — Render builds and deploys automatically

You'll get: `https://devstudio-rag.onrender.com`

### Step 3.4: Get a Free OpenAI API Key

1. Go to [https://platform.openai.com/signup](https://platform.openai.com/signup)
2. Sign up (new accounts get **$5-18 in free credits**)
3. Go to **API Keys** → **Create new secret key**
4. Copy and save it — this is your `OPENAI_API_KEY`

> **Note on cost:** GPT-4o-mini costs $0.150 per 1M input tokens. A typical conversation uses ~2,000 tokens = **$0.0003 per conversation**. Even 100 conversations/month = $0.03.

### Step 3.5: Create the Chat Widget (Frontend)

**`src/components/ChatWidget.tsx`:**
```typescript
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const RAG_API_URL = process.env.NEXT_PUBLIC_RAG_API_URL || "http://localhost:8000";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the DevStudio AI assistant. Ask me anything about our services, pricing, or process!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionId = useRef(
    typeof window !== "undefined"
      ? sessionStorage.getItem("chat_session_id") || crypto.randomUUID()
      : "session-" + Date.now()
  ).current;

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chat_session_id", sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${RAG_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please email us at hello@devstudio.com instead!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={28} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-surface-900 border border-surface-700 rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-surface-700 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">DevStudio Assistant</h3>
                <p className="text-surface-400 text-xs">Powered by AI - Ask anything</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white rounded-br-md"
                      : "bg-surface-800 text-surface-200 rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-800 px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-surface-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-surface-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-surface-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-surface-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about services, pricing..."
                className="flex-1 bg-surface-800 text-white px-4 py-2 rounded-xl border border-surface-700 focus:border-primary-500 outline-none text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center disabled:opacity-50 hover:bg-primary-500 transition-colors"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Add the widget to your layout:**
```typescript
// src/app/layout.tsx
import ChatWidget from "@/components/ChatWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

### Step 3.6: Connect Frontend to RAG Backend

Add to your `.env.local`:
```env
NEXT_PUBLIC_RAG_API_URL=https://devstudio-rag.onrender.com
```

And set the same in Netlify:
```bash
netlify env:set NEXT_PUBLIC_RAG_API_URL "https://devstudio-rag.onrender.com"
```

---

## Phase 4: Connect Everything Together

### Environment Variables Summary

**`.env.local` (local development):**
```env
# Database
DATABASE_URL=postgresql://user:pass@ep-xxxx.neon.tech/devstudio?sslmode=require

# Frontend
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAG_API_URL=http://localhost:8000

# Contact
CONTACT_EMAIL=hello@devstudio.com
WHATSAPP_NUMBER=1234567890
```

**Netlify Environment Variables:**
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://devstudio-portfolio.netlify.app
NEXT_PUBLIC_RAG_API_URL=https://devstudio-rag.onrender.com
CONTACT_EMAIL=hello@devstudio.com
WHATSAPP_NUMBER=1234567890
```

**Render Environment Variables:**
```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-proj-...
FRONTEND_URL=https://devstudio-portfolio.netlify.app
PORT=8000
```

---

## Deployment Checklist

### Before Deploying:
- [ ] Neon database created and schema applied
- [ ] Connection pooling added to API route
- [ ] `netlify.toml` and `@netlify/plugin-nextjs` added
- [ ] All hardcoded URLs replaced with env variables
- [ ] Contact info updated (email, WhatsApp)
- [ ] Build works locally: `npm run build`

### Deploy Order:
1. **Neon** — Already done when you created the project
2. **Render (RAG backend)** — Push backend code, deploy on Render
3. **Netlify (Frontend)** — `netlify deploy --prod`
4. **Test** — Submit audit form, visit `/work`, `/offers`, test chat widget

### After Deploying:
- [ ] Visit your site on Netlify URL
- [ ] Fill out audit form → check Neon for the record
- [ ] Navigate: Home → Offers → Work → Contact
- [ ] Open chat widget → ask "What services do you offer?"
- [ ] Test on mobile device
- [ ] Check page speed (Lighthouse)

---

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|-------------|
| **Neon Database** | Free (0.5 GB PostgreSQL) | **$0** |
| **Netlify Hosting** | Free (100 GB bandwidth) | **$0** |
| **Render (FastAPI)** | Free (512MB, 750 hrs) | **$0** |
| **OpenAI API** | GPT-4o-mini (~$0.0003/conversation) | **~$0.01-0.05** |
| **Domain name** | Optional (e.g., devstudio.com) | **~$10/year** |
| | | |
| **TOTAL** | | **~$0-0.05/month** |

> With OpenAI's free credits for new accounts, you get hundreds of free conversations before paying anything.

---

## Troubleshooting

### Neon Database Issues

**Problem:** `The server does not support SSL connections`
```
Solution: Ensure your DATABASE_URL ends with ?sslmode=require
The pg library handles SSL automatically when this is set.
```

**Problem:** `Connection timeout`
```
Solution: Check Neon dashboard — compute may be "sleeping" (auto-scales to zero).
The first request wakes it up (~2 seconds). This is normal behavior.
```

**Problem:** `Too many connections`
```
Solution: Use connection pooling (max: 5). Reuse the pool across requests
using the singleton pattern in the API route.
```

### Netlify Issues

**Problem:** Build fails with `Module not found`
```
Solution: Clear cache and rebuild:
netlify build --clearCache
netlify deploy --prod
```

**Problem:** API route returns 500 error
```
Solution: Check Netlify function logs:
netlify logs
Or: Netlify dashboard → Functions → Your API route → Logs
```

**Problem:** Client-side routing gives 404
```
Solution: Ensure the SPA redirect is in netlify.toml:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Render / RAG Issues

**Problem:** First request takes 30 seconds
```
Solution: Render free tier "spins down" after inactivity.
Use UptimeRobot (free) to ping /health every 5 minutes:
https://uptimerobot.com → Add monitor → https://your-app.onrender.com/health
```

**Problem:** `OPENAI_API_KEY not found`
```
Solution: Add it in Render dashboard → Environment → Add Variable
Key: OPENAI_API_KEY
Value: sk-proj-xxxxx
```

**Problem:** PageIndex import error
```
Solution: Ensure pageindex is in requirements.txt:
pageindex==0.1.0
And Render has finished installing dependencies (check build logs).
```

### Chat Widget Issues

**Problem:** Widget doesn't appear
```
Solution: Check browser console for errors.
Ensure NEXT_PUBLIC_RAG_API_URL is set correctly.
In development, use http://localhost:8000
In production, use your Render URL.
```

**Problem:** Chat returns generic answers
```
Solution: Update the knowledge base files in backend/knowledge/
Add more specific content about your services and pricing.
```

---

## Quick Start Commands

```bash
# === 1. LOCAL SETUP ===
npm install
npm install --save-dev @netlify/plugin-nextjs

# Set up .env.local
cp .env.example .env.local
# Edit DATABASE_URL with your Neon connection string

npm run dev  # Test locally

# === 2. DEPLOY RAG BACKEND ===
# Push backend/ to GitHub
# Deploy on Render (connect repo, set env vars)

# === 3. DEPLOY FRONTEND ===
netlify login
netlify init
netlify env:set DATABASE_URL "postgresql://..."
netlify env:set NEXT_PUBLIC_RAG_API_URL "https://your-rag.onrender.com"
netlify deploy --prod

# === 4. TEST ===
# Visit your Netlify URL
# Submit audit form
# Test chat widget
```

---

## Alternative: Even Simpler RAG (No PageIndex)

If PageIndex setup is too complex, use this simpler approach that only needs OpenAI:

**`backend/rag/chat.py` (simplified):**
```python
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

CONTEXT = """You are DevStudio's AI assistant. Here is everything you need to know:

SERVICES:
- Website Design From Scratch: $1,500+
- Website Redesign: $2,000+
- Conversion Optimization
- Google Maps Optimization
- Voice AI Agent: $50-100/month

PRICING:
- Starter: $1,500 (5-7 days, 5 pages)
- Professional: $3,500 (7-10 days, 10 pages) - Most Popular
- Premium: $6,500 (10-14 days, unlimited)

Always direct users to the Free Website Audit form."""

@router.post("/chat")
async def chat(request: ChatRequest):
    response = await openai.ChatCompletion.acreate(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": CONTEXT},
            {"role": "user", "content": request.message}
        ],
        max_tokens=300,
        temperature=0.7
    )

    answer = response.choices[0].message.content

    return ChatResponse(
        answer=answer,
        suggested_actions=["Get your free website audit -"]
    )
```

This approach:
- No PageIndex needed
- No document indexing
- Just OpenAI + a system prompt
- Costs ~$0.0003 per conversation
- Setup time: 5 minutes

---

**Document Version:** 1.0
**Last Updated:** April 2026
**All services verified as free tier available**
