import { NextRequest, NextResponse } from 'next/server';
import { generateExecutiveBrief } from '@/lib/gemini';
import { EvaluationResult } from '@/lib/engine/prj-evaluator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { evaluation, projectContext } = body as {
      evaluation?: EvaluationResult;
      projectContext?: { name?: string; industry?: string; budget?: string };
    };

    if (!evaluation || !evaluation.gov || !evaluation.del || !evaluation.quadrant) {
      return NextResponse.json(
        { error: 'Valid evaluation result payload is required for diagnostic brief generation.' },
        { status: 400 }
      );
    }

    const brief = await generateExecutiveBrief(evaluation, projectContext);

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
      { error: 'Internal Server Error while generating executive clinical brief.' },
      { status: 500 }
    );
  }
}
