import React, { useState } from 'react';
import { Step } from '../types';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface StepFormProps {
  step: Step;
  onChange: (step: Step) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const StepForm: React.FC<StepFormProps> = ({ step, onChange, onRemove, canRemove }) => {
  const [expanded, setExpanded] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...step,
      [name]: value === '' && (name === 'sqlQuery' || name === 'checkDescription') ? null : value
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 animate-fadeIn shadow-sm hover:shadow-md">
      <div 
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-medium text-gray-900">{step.stepId}</h3>
        <div className="flex items-center">
          {canRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-red-500 hover:text-red-700 mr-2 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 space-y-4 bg-white">
          <div>
            <label htmlFor={`stepDescription-${step.stepId}`} className="block text-sm font-medium text-gray-700 mb-1">
              Step Description
            </label>
            <textarea
              id={`stepDescription-${step.stepId}`}
              name="stepDescription"
              value={step.stepDescription}
              onChange={handleInputChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="Login to snowflake and capture the Userid."
            />
          </div>
          
          <div>
            <label htmlFor={`sqlQuery-${step.stepId}`} className="block text-sm font-medium text-gray-700 mb-1">
              SQL Query
            </label>
            <textarea
              id={`sqlQuery-${step.stepId}`}
              name="sqlQuery"
              value={step.sqlQuery || ''}
              onChange={handleInputChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all font-mono text-sm"
              placeholder="select * from odrcore_dev_db.stage_ds_cml.stg_cml_contact where contact_email_address = 'Test@merck.com'"
            />
            <p className="mt-1 text-xs text-gray-500">Leave empty for null value</p>
          </div>
          
          <div>
            <label htmlFor={`checkDescription-${step.stepId}`} className="block text-sm font-medium text-gray-700 mb-1">
              Check Description
            </label>
            <input
              type="text"
              id={`checkDescription-${step.stepId}`}
              name="checkDescription"
              value={step.checkDescription || ''}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="RECORD VERIFICATION"
            />
            <p className="mt-1 text-xs text-gray-500">Leave empty for null value</p>
          </div>
          
          <div>
            <label htmlFor={`expectedResult-${step.stepId}`} className="block text-sm font-medium text-gray-700 mb-1">
              Expected Result
            </label>
            <textarea
              id={`expectedResult-${step.stepId}`}
              name="expectedResult"
              value={step.expectedResult}
              onChange={handleInputChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              placeholder="It should verify the record existence in source / target successfully"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`evidenceRequired-${step.stepId}`} className="block text-sm font-medium text-gray-700 mb-1">
                Evidence Required
              </label>
              <select
                id={`evidenceRequired-${step.stepId}`}
                name="evidenceRequired"
                value={step.evidenceRequired}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              >
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
            
            <div>
              <label htmlFor={`status-${step.stepId}`} className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id={`status-${step.stepId}`}
                name="status"
                value={step.status || ''}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border transition-all"
              >
                <option value="">null</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
                <option value="Blocked">Blocked</option>
                <option value="Not Run">Not Run</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepForm;