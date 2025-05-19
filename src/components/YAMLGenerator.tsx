import React, { useState } from 'react';
import TestCaseForm from './TestCaseForm';
import YAMLPreview from './YAMLPreview';
import ResizablePanel from './ResizablePanel';
import { TestCase } from '../types';
import { Download, Copy, Check } from 'lucide-react';

const defaultTestCase: TestCase = {
  testId: '',
  subject: '',
  testName: '',
  description: '',
  type: 'Manual',
  category: '',
  owner: '',
  gxp: 'Y',
  steps: [
    {
      stepId: 'Step-1',
      stepDescription: '',
      sqlQuery: null,
      checkDescription: null,
      expectedResult: '',
      evidenceRequired: 'Y',
      status: null
    }
  ]
};

const YAMLGenerator: React.FC = () => {
  const [testCase, setTestCase] = useState<TestCase>(defaultTestCase);
  const [copied, setCopied] = useState(false);

  const handleTestCaseChange = (updatedTestCase: TestCase) => {
    setTestCase(updatedTestCase);
  };

  const generateYAMLString = (testCase: TestCase): string => {
    let yaml = '';
    
    yaml += `Test ID: ${testCase.testId}\n`;
    yaml += `Subject: ${testCase.subject}\n`;
    yaml += `Test Name: ${testCase.testName}\n`;
    yaml += `Description: |-\n${formatMultiline(testCase.description)}\n`;
    yaml += `Type: ${testCase.type}\n`;
    yaml += `Category: ${testCase.category}\n`;
    yaml += `Owner: ${testCase.owner}\n`;
    yaml += `GxP: ${testCase.gxp}\n`;
    yaml += `Steps:\n`;
    
    testCase.steps.forEach((step) => {
      yaml += `- Step ID: ${step.stepId}\n`;
      yaml += `  Step Description: |-\n${formatMultiline(step.stepDescription, 4)}\n`;
      yaml += `  SQL Query: ${step.sqlQuery ? formatValue(step.sqlQuery) : 'null'}\n`;
      yaml += `  Check description: ${step.checkDescription ? formatValue(step.checkDescription) : 'null'}\n`;
      yaml += `  Expected Result: ${
        step.expectedResult ? `|-\n${formatMultiline(step.expectedResult, 4)}` : 'null'
      }\n`;
      yaml += `  Evidence Required: ${step.evidenceRequired}\n`;
      yaml += `  Status: ${step.status || 'null'}\n`;
    });
    
    return yaml;
  };

  const handleExportYAML = () => {
    const yamlString = generateYAMLString(testCase);
    const blob = new Blob([yamlString], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${testCase.testId || 'test-case'}.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyYAML = async () => {
    const yamlString = generateYAMLString(testCase);
    await navigator.clipboard.writeText(yamlString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const LeftPanel = (
    <div className="p-6">
      <TestCaseForm testCase={testCase} onChange={handleTestCaseChange} />
    </div>
  );

  const RightPanel = (
    <div className="p-6">
      <div className="sticky top-0 bg-white pb-4 flex justify-between items-center z-10">
        <h2 className="text-xl font-medium text-gray-800">YAML Preview</h2>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 group"
            onClick={handleCopyYAML}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 group"
            onClick={handleExportYAML}
          >
            <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Download</span>
          </button>
        </div>
      </div>
      <YAMLPreview testCase={testCase} />
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-2rem)]">
      <ResizablePanel
        leftPanel={LeftPanel}
        rightPanel={RightPanel}
        minWidth={300}
        defaultLeftWidth="50%"
      />
    </div>
  );
};

const formatMultiline = (text: string, indent = 2): string => {
  if (!text) return '';
  const indentation = ' '.repeat(indent);
  return text.split('\n').map(line => `${indentation}${line}`).join('\n');
};

const formatValue = (value: string): string => {
  if (value.includes("'")) {
    return `'${value.replace(/'/g, "''")}'`;
  }
  return value;
};

export default YAMLGenerator;