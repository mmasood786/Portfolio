# How to Integrate Neon Database + Netlify Hosting — 100% Free

> Complete step-by-step guide for the DevStudio portfolio application.

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Phase 1: Neon Database Setup](#phase-1-neon-database-setup)
3. [Phase 2: Netlify Hosting Setup](#phase-2-netlify-hosting-setup)
4. [Phase 3: Environment Configuration](#phase-3-environment-configuration)
5. [Deployment Checklist](#deployment-checklist)
6. [Cost Breakdown](#cost-breakdown)
7. [Troubleshooting](#troubleshooting)

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
```

### What Each Service Does:

| Service | Role | Free Tier |
|---------|------|-----------|
| **Netlify** | Hosts Next.js frontend + API routes | 100GB bandwidth, 300 build min/month |
| **Neon** | Serverless PostgreSQL for data storage | 0.5 GB, unlimited compute hours |

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

-- Performance index
CREATE INDEX idx_audit_created_at ON audit_requests(created_at DESC);
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

## Phase 3: Environment Configuration

### Environment Variables Summary

**`.env.local` (local development):**
```env
# Database
DATABASE_URL=postgresql://user:pass@ep-xxxx.neon.tech/devstudio?sslmode=require

# Frontend
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact
CONTACT_EMAIL=hello@devstudio.com
WHATSAPP_NUMBER=1234567890
```

**Netlify Environment Variables:**
```
DATABASE_URL=postgresql://your-full-connection-string
NEXT_PUBLIC_SITE_URL=https://devstudio-portfolio.netlify.app
CONTACT_EMAIL=hello@devstudio.com
WHATSAPP_NUMBER=1234567890
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
2. **Netlify (Frontend)** — `netlify deploy --prod`
3. **Test** — Submit audit form, visit `/work`, `/offers`

### After Deploying:
- [ ] Visit your site on Netlify URL
- [ ] Fill out audit form → check Neon for the record
- [ ] Navigate: Home → Offers → Work → Contact
- [ ] Test on mobile device
- [ ] Check page speed (Lighthouse)

---

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|-------------|
| **Neon Database** | Free (0.5 GB PostgreSQL) | **$0** |
| **Netlify Hosting** | Free (100 GB bandwidth) | **$0** |
| **Domain name** | Optional (e.g., devstudio.com) | **~$10/year** |
| | | |
| **TOTAL** | | **$0/month** |

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

---

## Quick Start Commands

```bash
# === 1. LOCAL SETUP ===
npm install
npm install --save-dev @netlify/plugin-nextjs

# Set up .env.local with your Neon DATABASE_URL

npm run dev  # Test locally

# === 2. DEPLOY FRONTEND ===
netlify login
netlify init
netlify env:set DATABASE_URL "postgresql://..."
netlify deploy --prod

# === 3. TEST ===
# Visit your Netlify URL
# Submit audit form
# Check Neon database for the new record
```

---

**Document Version:** 2.0
**Last Updated:** April 2026
**All services verified as free tier available**
