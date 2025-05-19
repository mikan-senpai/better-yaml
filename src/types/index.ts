export interface Step {
  stepId: string;
  stepDescription: string;
  sqlQuery: string | null;
  checkDescription: string | null;
  expectedResult: string;
  evidenceRequired: 'Y' | 'N';
  status: string | null;
}

export interface TestCase {
  testId: string;
  subject: string;
  testName: string;
  description: string;
  type: string;
  category: string;
  owner: string;
  gxp: 'Y' | 'N';
  steps: Step[];
}