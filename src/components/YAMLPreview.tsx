import React, { useEffect, useState } from 'react';
import { TestCase } from '../types';

interface YAMLPreviewProps {
  testCase: TestCase;
}

const YAMLPreview: React.FC<YAMLPreviewProps> = ({ testCase }) => {
  const [yamlString, setYamlString] = useState<string>('');

  useEffect(() => {
    const yaml = generateYAMLString(testCase);
    setYamlString(yaml);
  }, [testCase]);

  const highlightYAML = (yaml: string): React.ReactNode => {
    const lines = yaml.split('\n');
    
    return lines.map((line, index) => {
      let highlightedLine: React.ReactNode;
      
      if (line.includes(':')) {
        const [key, value] = line.split(':', 2);
        highlightedLine = (
          <>
            <span className="text-blue-600 font-medium">{key}</span>
            <span className="text-gray-500">:</span>
            <span className="text-gray-900">{value}</span>
          </>
        );
      } else {
        highlightedLine = <span className="text-gray-900">{line}</span>;
      }
      
      return (
        <div key={index} className="whitespace-pre font-mono leading-relaxed hover:bg-gray-50 px-2 -mx-2 rounded transition-colors">
          {highlightedLine}
        </div>
      );
    });
  };

  return (
    <div className="overflow-hidden animate-fadeIn">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm overflow-x-auto">
        <pre className="whitespace-pre-wrap">{highlightYAML(yamlString)}</pre>
      </div>
    </div>
  );
};

// This function generates the YAML string based on the test case data
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

export default YAMLPreview;