import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Connection pool (not exported to avoid Next.js type conflict)
const getPool = () => {
  const globalForPg = globalThis as unknown as {
    _pool: Pool | undefined;
  };

  if (!globalForPg._pool) {
    globalForPg._pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return globalForPg._pool;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      // Step 1
      businessName,
      industry,
      currentWebsite,
      contactName,
      contactEmail,
      contactPhone,
      // Step 2
      projectType,
      currentIssues,
      competitorWebsites,
      // Step 3
      features,
      // Step 4
      integrations,
      // Step 5
      exampleWebsites,
      brandColors,
      hasLogo,
      stylePreference,
      // Step 6
      contentReady,
      hasProfessionalPhotos,
      // Step 7
      budgetRange,
      desiredLaunchDate,
      hasDeadline,
      deadlineDetails,
      // Additional
      additionalNotes,
    } = body;

    // Validation
    if (!businessName || !contactName || !contactEmail || !projectType) {
      return NextResponse.json(
        { error: "Business name, contact name, email, and project type are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Insert into database
    const pool = getPool();
    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO project_briefs (
          business_name, industry, current_website, contact_name, contact_email, contact_phone,
          project_type, current_issues, competitor_websites,
          features_needed, integrations,
          example_websites, brand_colors, has_logo, style_preference,
          content_ready, has_professional_photos,
          budget_range, desired_launch_date, has_deadline, deadline_details,
          additional_notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
        [
          businessName, industry, currentWebsite || null, contactName, contactEmail, contactPhone || null,
          projectType, currentIssues || null, competitorWebsites || null,
          features ? JSON.stringify(features) : null, integrations ? JSON.stringify(integrations) : null,
          exampleWebsites || null, brandColors || null, hasLogo || false, stylePreference || null,
          contentReady || null, hasProfessionalPhotos || false,
          budgetRange || null, desiredLaunchDate || null, hasDeadline || false, deadlineDetails || null,
          additionalNotes || null,
        ]
      );
    } finally {
      client.release();
    }

    return NextResponse.json({
      success: true,
      message: "Project brief submitted successfully! We'll review your requirements and get back to you within 24 hours with a personalized proposal.",
    });
  } catch (error) {
    console.error("Error submitting project brief:", error);

    // Fallback for development mode when DB is unavailable
    if (process.env.NODE_ENV === "development") {
      console.log("Project brief received (DB unavailable - dev mode):", {
        businessName: (await (request.clone().json())).businessName,
      });
      return NextResponse.json({
        success: true,
        message: "Project brief received! We'll be in touch soon.",
      });
    }

    return NextResponse.json(
      { error: "Failed to submit project brief. Please email us directly at hello@devstudio.com." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Project Brief API",
    endpoints: ["POST /api/project-brief"],
  });
}