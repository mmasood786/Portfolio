-- Supabase Database Schema for Portfolio Website
-- Run this in Supabase SQL Editor: https://app.supabase.com

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. AUDIT REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(500),
    business_type VARCHAR(100) NOT NULL,
    message TEXT,
    selected_offer VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending'
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_audit_requests_created_at ON audit_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_requests_email ON audit_requests(email);

-- ============================================
-- 2. CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'unread'
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at DESC);

-- ============================================
-- 3. PROJECT BRIEFS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS project_briefs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Step 1: About You
    business_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    current_website VARCHAR(500),
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    project_type VARCHAR(50), -- 'redesign', 'new', 'not-sure'
    
    -- Step 2: What You Need
    features TEXT[], -- Array of feature keys
    existing_tools TEXT[], -- Array of tool names
    notes TEXT,
    
    -- Step 3: Look & Feel
    example_websites TEXT,
    style_preference VARCHAR(50), -- 'modern', 'corporate', 'playful', 'minimal'
    has_content VARCHAR(50), -- 'ready', 'partial', 'need-help'
    
    -- Step 4: Budget & Timing
    budget_range VARCHAR(50),
    desired_launch_date VARCHAR(100),
    deadline VARCHAR(100),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new'
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_project_briefs_created_at ON project_briefs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_briefs_email ON project_briefs(contact_email);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_briefs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for form submissions)
-- Includes email validation to prevent spam/bot submissions
CREATE POLICY "Allow public inserts on audit_requests"
    ON audit_requests
    FOR INSERT
    TO anon
    WITH CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE POLICY "Allow public inserts on contact_submissions"
    ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE POLICY "Allow public inserts on project_briefs"
    ON project_briefs
    FOR INSERT
    TO anon
    WITH CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Policy: Allow authenticated users to read all data (for admin dashboard)
CREATE POLICY "Allow authenticated reads on audit_requests"
    ON audit_requests
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated reads on contact_submissions"
    ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated reads on project_briefs"
    ON project_briefs
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- 5. ADMIN VIEWS
-- ============================================

-- View: Audit requests summary
-- SECURITY INVOKER ensures the view respects the querying user's permissions
CREATE OR REPLACE VIEW audit_requests_summary
WITH (security_invoker = true)
AS
SELECT
    business_type,
    status,
    COUNT(*) as count,
    MIN(created_at) as first_request,
    MAX(created_at) as last_request
FROM audit_requests
GROUP BY business_type, status;

-- View: Project briefs summary
-- SECURITY INVOKER ensures the view respects the querying user's permissions
CREATE OR REPLACE VIEW project_briefs_summary
WITH (security_invoker = true)
AS
SELECT
    project_type,
    budget_range,
    status,
    COUNT(*) as count
FROM project_briefs
GROUP BY project_type, budget_range, status;

-- ============================================
-- 6. VERIFY TABLES CREATED
-- ============================================
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
