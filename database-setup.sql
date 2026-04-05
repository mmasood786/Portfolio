-- Neon Database Schema Setup
-- Run this in Neon SQL Editor: https://neon.tech

-- Audit requests table
CREATE TABLE IF NOT EXISTS audit_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(500),
    business_type VARCHAR(100) NOT NULL,
    message TEXT,
    selected_offer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Performance index
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_requests(created_at DESC);

-- Verify table was created
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'audit_requests' 
ORDER BY ordinal_position;
