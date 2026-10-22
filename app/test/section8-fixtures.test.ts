import { calculateDGRF, PrjGovInputs, PrjDelInputs } from '../src/lib/engine/prj-evaluator';
import { caseA, caseB, caseC } from '../src/fixtures';

function runTests() {
  console.log('=================================================================');
  console.log('Running DGRF Engine Benchmark Suite (PMWJ Section 8 Verification)');
  console.log('=================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(name: string, condition: boolean, detail: string) {
    if (condition) {
      console.log(`  [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${name} -> ${detail}`);
      failed++;
    }
  }

  // --- Case A: BI Modernization ---
  console.log('Test 1: Case A (BI Modernization)');
  const resA = calculateDGRF(
    caseA.inputs.gov as unknown as PrjGovInputs,
    caseA.inputs.del as unknown as PrjDelInputs,
    'active_execution'
  );

  assert('Case A Base Gov is 79', resA.gov.rawBase === 79, `Got ${resA.gov.rawBase}`);
  assert('Case A Structural Penalty is 0', resA.gov.penalty === 0, `Got ${resA.gov.penalty}`);
  assert('Case A Final Gov is 79', resA.gov.totalScore === 79, `Got ${resA.gov.totalScore}`);
  assert('Case A Base Del is 78', resA.del.rawBase === 78, `Got ${resA.del.rawBase}`);
  assert('Case A Operational Penalty is 0', resA.del.penalty === 0, `Got ${resA.del.penalty}`);
  assert('Case A Final Del is 78', resA.del.totalScore === 78, `Got ${resA.del.totalScore}`);
  assert('Case A Quadrant is Q1', resA.quadrant.id === 'Q1', `Got ${resA.quadrant.id}`);
  assert('Case A inBufferZone is false', resA.inBufferZone === false, `Got ${resA.inBufferZone}`);

  // --- Case B: Commercial Software Implementation ---
  console.log('\nTest 2: Case B (Commercial Software Implementation)');
  const resB = calculateDGRF(
    caseB.inputs.gov as unknown as PrjGovInputs,
    caseB.inputs.del as unknown as PrjDelInputs,
    'active_execution'
  );

  assert('Case B Base Gov is 100', resB.gov.rawBase === 100, `Got ${resB.gov.rawBase}`);
  assert('Case B Structural Penalty is 10 (D1=25, D2=20 >= 15)', resB.gov.penalty === 10, `Got ${resB.gov.penalty}`);
  assert('Case B Final Gov is capped at 100', resB.gov.totalScore === 100, `Got ${resB.gov.totalScore}`);
  assert('Case B Base Del is 64', resB.del.rawBase === 64, `Got ${resB.del.rawBase}`);
  assert('Case B Final Del is 64', resB.del.totalScore === 64, `Got ${resB.del.totalScore}`);
  assert('Case B Quadrant is Q1', resB.quadrant.id === 'Q1', `Got ${resB.quadrant.id}`);
  assert('Case B inBufferZone is false', resB.inBufferZone === false, `Got ${resB.inBufferZone}`);

  // --- Case C: Modular Enterprise Solution ---
  console.log('\nTest 3: Case C (Modular Enterprise Solution)');
  const resC = calculateDGRF(
    caseC.inputs.gov as unknown as PrjGovInputs,
    caseC.inputs.del as unknown as PrjDelInputs,
    'active_execution'
  );

  assert('Case C Base Gov is 58', resC.gov.rawBase === 58, `Got ${resC.gov.rawBase}`);
  assert('Case C Final Gov is 58', resC.gov.totalScore === 58, `Got ${resC.gov.totalScore}`);
  assert('Case C Base Del is 28', resC.del.rawBase === 28, `Got ${resC.del.rawBase}`);
  assert('Case C Final Del is 28', resC.del.totalScore === 28, `Got ${resC.del.totalScore}`);
  assert('Case C Quadrant is Q2', resC.quadrant.id === 'Q2', `Got ${resC.quadrant.id}`);
  assert('Case C inBufferZone is true (58 in [40, 60])', resC.inBufferZone === true, `Got ${resC.inBufferZone}`);

  // --- Case C Sensitivity: Governance optimization (D1 = 10) ---
  console.log('\nTest 4: Case C Sensitivity Optimization (D1 = 10)');
  const govOptimized: PrjGovInputs = {
    ...caseC.inputs.gov,
    d1: 10 as any,
  } as unknown as PrjGovInputs;

  const resCSens = calculateDGRF(
    govOptimized,
    caseC.inputs.del as unknown as PrjDelInputs,
    'active_execution'
  );

  assert('Case C Sensitivity Base Gov is 50', resCSens.gov.rawBase === 50, `Got ${resCSens.gov.rawBase}`);
  assert('Case C Sensitivity Final Gov is 50', resCSens.gov.totalScore === 50, `Got ${resCSens.gov.totalScore}`);
  assert('Case C Sensitivity Final Del is 28', resCSens.del.totalScore === 28, `Got ${resCSens.del.totalScore}`);
  assert('Case C Sensitivity Quadrant transitions to Q3 (Resilient Conditions)', resCSens.quadrant.id === 'Q3', `Got ${resCSens.quadrant.id}`);
  assert('Case C Sensitivity inBufferZone is true (50 in [40, 60])', resCSens.inBufferZone === true, `Got ${resCSens.inBufferZone}`);

  // Summary
  console.log('\n-----------------------------------------------------------------');
  console.log(`Results: ${passed} passed, ${failed} failed.`);
  console.log('-----------------------------------------------------------------');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
