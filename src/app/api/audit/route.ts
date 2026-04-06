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
    const { name, email, website, businessType, message, selectedOffer } = body;

    // Validation
    if (!name || !email || !businessType) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and business type are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('audit_requests')
      .insert([
        {
          name,
          email,
          website: website || null,
          business_type: businessType,
          message: message || null,
          selected_offer: selectedOffer || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to submit audit request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Audit request submitted successfully! We\'ll review your website and contact you within 24 hours.',
      data,
    });
  } catch (error) {
    console.error('Audit submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
