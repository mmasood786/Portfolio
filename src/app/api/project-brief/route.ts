import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { success: false, message: 'Supabase not configured. Please set up environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      businessName,
      industry,
      currentWebsite,
      contactName,
      contactEmail,
      projectType,
      features,
      existingTools,
      notes,
      exampleWebsites,
      stylePreference,
      hasContent,
      budgetRange,
      desiredLaunchDate,
      deadline,
    } = body;

    // Validation
    if (!businessName || !contactName || !contactEmail) {
      return NextResponse.json(
        { success: false, message: 'Business name, contact name, and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('project_briefs')
      .insert([
        {
          business_name: businessName,
          industry,
          current_website: currentWebsite || null,
          contact_name: contactName,
          contact_email: contactEmail,
          project_type: projectType || null,
          features: features || [],
          existing_tools: existingTools || [],
          notes: notes || null,
          example_websites: exampleWebsites || null,
          style_preference: stylePreference || null,
          has_content: hasContent || null,
          budget_range: budgetRange || null,
          desired_launch_date: desiredLaunchDate || null,
          deadline: deadline || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to submit project brief' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project brief submitted successfully! I\'ll review your requirements and get back to you with a personalized proposal.',
      data,
    });
  } catch (error) {
    console.error('Project brief error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
