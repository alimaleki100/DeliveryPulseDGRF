import { NextRequest, NextResponse } from 'next/server';

export interface LeadCapturePayload {
  name: string;
  email: string;
  company: string;
  role: string;
  programName?: string;
  quadrantId?: string;
  govScore?: number;
  delScore?: number;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadCapturePayload;
    const { name, email, company, role, programName, quadrantId, govScore, delScore, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Name, corporate email, and organization are required fields.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid corporate email address.' },
        { status: 400 }
      );
    }

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      company,
      role: role || 'IT Executive',
      programName: programName || 'Confidential Program',
      diagnosticProfile: {
        quadrantId: quadrantId || 'N/A',
        govScore: govScore ?? null,
        delScore: delScore ?? null,
      },
      message: message || '',
      submittedAt: new Date().toISOString(),
      status: 'SCHEDULED_FOR_EXECUTIVE_TRIAGE',
    };

    console.log('[DeliveryPulse Lead Captured]:', JSON.stringify(leadRecord, null, 2));

    // Simulated email dispatch notification
    const triageConfirmation = {
      leadId: leadRecord.id,
      advisoryTier: quadrantId === 'Q1' ? 'EMERGENCY_TURNAROUND' : 'STRATEGIC_GOVERNANCE',
      estimatedResponseHours: quadrantId === 'Q1' ? 4 : 24,
      advisorAssigned: 'Ali Maleki & Principal Governance Practice',
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Executive consultation request received. An enterprise governance lead has been assigned.',
        data: triageConfirmation,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API /api/lead error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error processing executive lead consultation.' },
      { status: 500 }
    );
  }
}
