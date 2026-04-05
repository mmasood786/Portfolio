-- Portfolio Database Schema
-- Run this SQL to set up the database

CREATE DATABASE portfolio;

\c portfolio;

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

-- Index for faster queries
CREATE INDEX idx_audit_requests_email ON audit_requests(email);
CREATE INDEX idx_audit_requests_created_at ON audit_requests(created_at DESC);

-- View for admin dashboard
CREATE OR REPLACE VIEW audit_requests_summary AS
SELECT 
    business_type,
    status,
    COUNT(*) as count,
    MIN(created_at) as first_request,
    MAX(created_at) as last_request
FROM audit_requests
GROUP BY business_type, status;