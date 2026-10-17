import { NextRequest, NextResponse } from 'next/server';
import {
  calculateDGRF,
  PrjGovInputs,
  PrjDelInputs,
  D1Anchor,
  D2Anchor,
  D3Anchor,
  D4Anchor,
  D5Anchor,
  O1Anchor,
  O2Anchor,
  O3Anchor,
  O4Anchor,
  O5Anchor,
} from '@/lib/engine/prj-evaluator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gov, del } = body as { gov?: PrjGovInputs; del?: PrjDelInputs };

    if (!gov || !del) {
      return NextResponse.json(
        { error: 'Missing required "gov" or "del" assessment inputs in request body.' },
        { status: 400 }
      );
    }

    // Validate Gov Anchors
    const validD1 = [3, 10, 18, 25];
    const validD2 = [3, 9, 15, 20];
    const validD3 = [3, 9, 15, 20];
    const validD4 = [3, 8, 14, 20];
    const validD5 = [2, 7, 11, 15];

    if (
      !validD1.includes(gov.d1) ||
      !validD2.includes(gov.d2) ||
      !validD3.includes(gov.d3) ||
      !validD4.includes(gov.d4) ||
      !validD5.includes(gov.d5)
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid PrjGov anchor values provided. Anchors must match calibrated DGRF scales: D1 in [3,10,18,25], D2 in [3,9,15,20], D3 in [3,9,15,20], D4 in [3,8,14,20], D5 in [2,7,11,15].',
        },
        { status: 400 }
      );
    }

    // Validate Del Anchors
    const validO1 = [3, 10, 18, 25];
    const validO2 = [3, 8, 14, 20];
    const validO3 = [3, 8, 14, 20];
    const validO4 = [2, 6, 11, 15];
    const validO5 = [3, 8, 14, 20];

    if (
      !validO1.includes(del.o1) ||
      !validO2.includes(del.o2) ||
      !validO3.includes(del.o3) ||
      !validO4.includes(del.o4) ||
      !validO5.includes(del.o5)
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid PrjDel anchor values provided. Anchors must match calibrated DGRF scales: O1 in [3,10,18,25], O2 in [3,8,14,20], O3 in [3,8,14,20], O4 in [2,6,11,15], O5 in [3,8,14,20].',
        },
        { status: 400 }
      );
    }

    const evaluation = calculateDGRF(gov, del);

    return NextResponse.json(
      {
        success: true,
        evaluation,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API /api/evaluate error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while evaluating DGRF matrix.' },
      { status: 500 }
    );
  }
}
