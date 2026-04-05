-- Additional schema for project briefs
-- Run this in Neon SQL Editor to add project brief tracking

CREATE TABLE IF NOT EXISTS project_briefs (
    id SERIAL PRIMARY KEY,

    -- Step 1: Business Info
    business_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    current_website VARCHAR(500),
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),

    -- Step 2: Project Type
    project_type VARCHAR(50) NOT NULL, -- 'redesign', 'new', 'not-sure'
    current_issues TEXT,
    competitor_websites TEXT,

    -- Step 3: Features (stored as JSON array)
    features_needed JSONB,
    -- Example: ["contact_form", "booking", "ecommerce", "blog"]

    -- Step 4: Integrations (stored as JSON)
    integrations JSONB,
    /* Example:
    {
      "crm": { "uses": true, "platform": "HubSpot", "has_access": true, "needs_setup": false },
      "email_marketing": { "uses": false, "platform": null, "has_access": false, "needs_setup": true },
      "sms_marketing": { "uses": false },
      "payment_gateway": { "uses": true, "platform": "Stripe" },
      "booking_system": { "uses": true, "platform": "Calendly" },
      "loyalty_coupons": { "uses": false, "needs_setup": true },
      "google_analytics": { "uses": true },
      "google_business": { "uses": true },
      "social_media": { "uses": true, "platforms": ["Facebook", "Instagram"] },
      "inventory_pos": { "uses": false },
      "accounting": { "uses": true, "platform": "QuickBooks" }
    }
    */

    -- Step 5: Design Preferences
    example_websites TEXT,
    brand_colors VARCHAR(100),
    has_logo BOOLEAN DEFAULT false,
    style_preference VARCHAR(50),

    -- Step 6: Content
    content_ready VARCHAR(50), -- 'ready', 'partial', 'need-help'
    has_professional_photos BOOLEAN DEFAULT false,

    -- Step 7: Budget & Timeline
    budget_range VARCHAR(50),
    desired_launch_date DATE,
    has_deadline BOOLEAN DEFAULT false,
    deadline_details TEXT,

    -- Additional notes
    additional_notes TEXT,

    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new' -- 'new', 'reviewed', 'contacted', 'proposal-sent', 'won', 'lost'
);

-- Index for performance
CREATE INDEX idx_briefs_created_at ON project_briefs(created_at DESC);
CREATE INDEX idx_briefs_status ON project_briefs(status);
CREATE INDEX idx_briefs_email ON project_briefs(contact_email);
