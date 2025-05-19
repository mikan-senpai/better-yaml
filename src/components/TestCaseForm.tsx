import React from 'react';
import { TestCase, Step } from '../types';
import StepForm from './StepForm';
import { PlusCircle } from 'lucide-react';

interface TestCaseFormProps {
  testCase: TestCase;
  onChange: (testCase: TestCase) => void;
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({ testCase, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...testCase,
      [name]: value
    });
  };

  const handleStepChange = (index: number, updatedStep: Step) => {
    const updatedSteps = [...testCase.steps];
    updatedSteps[index] = updatedStep;
    onChange({
      ...testCase,
      steps: updatedSteps
    });
  };

  const addStep = () => {
    const lastStep = testCase.steps[testCase.steps.length - 1];
    const stepNumber = parseInt(lastStep.stepId.split('-')[1]) + 1;
    
    const newStep: Step = {
      stepId: `Step-${stepNumber}`,
      stepDescription: '',
      sqlQuery: null,
      checkDescription: null,
      expectedResult: '',
      evidenceRequired: 'Y',
      status: null
    };
    
    onChange({
      ...testCase,
      steps: [...testCase.steps, newStep]
    });
  };

  const removeStep = (index: number) => {
    if (testCase.steps.length <= 1) {
      return; // Keep at least one step
    }
    
    const updatedSteps = testCase.steps.filter((_, i) => i !== index);
    
    // Update step IDs to maintain sequence
    const renumberedSteps = updatedSteps.map((step, i) => ({
      ...step,
      stepId: `Step-${i + 1}`
    }));
    
    onChange({
      ...testCase,
      steps: renumberedSteps
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-gray-800">Test Case Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="testId" className="block text-sm font-medium text-gray-700 mb-1">
              Test ID
            </label>
            <input
              type="text"
              id="testId"
              name="testId"
              value={testCase.testId}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="RD253_OPQ_CUR_CML_UPDATE_TC003"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={testCase.subject}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="Use Case\RD253_OPQ_CUR_CML_TC001\OPQ Testing"
            />
          </div>
          
          <div>
            <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-1">
              Test Name
            </label>
            <input
              type="text"
              id="testName"
              name="testName"
              value={testCase.testName}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="RD253_OPQ_CUR_CML_TC003 | Verify the table structure..."
            />
          </div>
          
          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
              Owner
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={testCase.owner}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="X256438"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={testCase.type}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
            >
              <option value="Manual">Manual</option>
              <option value="Automated">Automated</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={testCase.category}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="Validation Not Relevant"
            />
          </div>
          
          <div>
            <label htmlFor="gxp" className="block text-sm font-medium text-gray-700 mb-1">
              GxP
            </label>
            <select
              id="gxp"
              name="gxp"
              value={testCase.gxp}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
            >
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={testCase.description}
            onChange={handleInputChange}
            rows={5}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
            placeholder="Verify the table structure and data integrity between staging to curated layer..."
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-800">Test Steps</h2>
          <button
            type="button"
            onClick={addStep}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            <span>Add Step</span>
          </button>
        </div>
        
        <div className="space-y-8">
          {testCase.steps.map((step, index) => (
            <StepForm
              key={index}
              step={step}
              onChange={(updatedStep) => handleStepChange(index, updatedStep)}
              onRemove={() => removeStep(index)}
              canRemove={testCase.steps.length > 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCaseForm;