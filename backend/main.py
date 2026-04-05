"""
FastAPI Backend for Portfolio Website
Handles audit form submissions and stores them in PostgreSQL
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="WebCraft Pro Portfolio API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/portfolio")

# Pydantic models
class AuditRequest(BaseModel):
    name: str
    email: EmailStr
    website: Optional[str] = None
    business_type: str
    message: Optional[str] = None

class AuditResponse(BaseModel):
    success: bool
    message: str

# Database helper
async def get_db_pool():
    return await asyncpg.create_pool(DATABASE_URL)

# Initialize database
@app.on_event("startup")
async def startup():
    try:
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS audit_requests (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    website VARCHAR(500),
                    business_type VARCHAR(100) NOT NULL,
                    message TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    status VARCHAR(50) DEFAULT 'pending'
                )
            """)
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database connection error: {e}")

@app.get("/")
async def root():
    return {"message": "WebCraft Pro Portfolio API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.post("/api/audit", response_model=AuditResponse)
async def submit_audit_request(audit_request: AuditRequest):
    """Handle audit form submissions"""
    try:
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            await conn.execute("""
                INSERT INTO audit_requests 
                (name, email, website, business_type, message)
                VALUES ($1, $2, $3, $4, $5)
            """, audit_request.name, audit_request.email, 
                audit_request.website, audit_request.business_type, 
                audit_request.message)
        
        return AuditResponse(
            success=True,
            message="Audit request submitted successfully! We'll review your website and contact you within 24 hours."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit request: {str(e)}")

@app.get("/api/audit-requests")
async def get_audit_requests():
    """Get all audit requests (for admin use)"""
    try:
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            rows = await conn.fetch("""
                SELECT id, name, email, website, business_type, message, created_at, status
                FROM audit_requests
                ORDER BY created_at DESC
            """)
        
        return [
            {
                "id": row["id"],
                "name": row["name"],
                "email": row["email"],
                "website": row["website"],
                "business_type": row["business_type"],
                "message": row["message"],
                "created_at": row["created_at"].isoformat(),
                "status": row["status"],
            }
            for row in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch requests: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)