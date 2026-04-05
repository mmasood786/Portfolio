import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// Check if database is configured (skip localhost during build)
const isDatabaseConfigured = () => {
  // Skip DB during build if SKIP_DB_DURING_BUILD is set
  if (process.env.SKIP_DB_DURING_BUILD === "true" && process.env.NODE_ENV === "production") {
    return false;
  }
  
  return process.env.DATABASE_URL && 
         !process.env.DATABASE_URL.includes("localhost");
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, website, businessType, message, selectedOffer } = body;

    // Validation
    if (!name || !email || !businessType) {
      return NextResponse.json(
        { error: "Name, email, and business type are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Try to insert into database if configured
    if (isDatabaseConfigured()) {
      try {
        const client = await pool.connect();
        try {
          await client.query(
            `INSERT INTO audit_requests (name, email, website, business_type, message, selected_offer)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, email, website || null, businessType, message || null, selectedOffer || null]
          );
        } finally {
          client.release();
        }
      } catch (dbError) {
        console.error("Database insert failed:", dbError);
        // Log as fallback
        console.log("Audit request (fallback):", { name, email, website, businessType, message, selectedOffer });
      }
    } else {
      // Fallback: Log the request for demo purposes
      console.log("Audit request (DB not configured):", { name, email, website, businessType, message, selectedOffer });
    }

    return NextResponse.json({
      success: true,
      message: "Audit request submitted successfully! We'll review your website and contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Error submitting audit request:", error);

    return NextResponse.json(
      { error: "Failed to submit request. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Portfolio API is running",
    endpoints: ["POST /api/audit"],
    database: isDatabaseConfigured() ? "configured" : "not-configured",
  });
}
