import { NextRequest, NextResponse } from 'next/server';
import { generateTriAgentBrief } from '@/lib/gemini';
import { DualModeEvaluation } from '@/lib/engine/dual-mode-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { evaluation, projectContext } = body as {
      evaluation?: DualModeEvaluation;
      projectContext?: { name?: string; industry?: string; budget?: string };
    };

    if (!evaluation || !evaluation.quadrant) {
      return NextResponse.json(
        { error: 'Valid DGRF dual-mode evaluation payload is required for diagnostic brief generation.' },
        { status: 400 }
      );
    }

    const brief = await generateTriAgentBrief(evaluation, projectContext);

    return NextResponse.json(
      {
        success: true,
        brief,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API /api/diagnose error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while generating Tri-Agent clinical brief.' },
      { status: 500 }
    );
  }
}
