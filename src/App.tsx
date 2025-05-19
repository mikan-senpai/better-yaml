import React from 'react';
import { PenLine } from 'lucide-react';
import YAMLGenerator from './components/YAMLGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <PenLine className="h-7 w-7 text-blue-600 mr-3" />
          <h1 className="text-2xl font-medium text-gray-800">YAML Test Case Generator</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <YAMLGenerator />
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} YAML Test Case Generator
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;