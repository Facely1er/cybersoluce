import React from 'react';

const ImplementationPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Implementation Guide</h1>
      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-700">
            Our implementation process is designed to ensure a smooth transition and successful deployment
            of our platform in your environment.
          </p>
        </section>
        
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Implementation Steps</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>Initial Assessment and Planning</li>
            <li>System Configuration and Setup</li>
            <li>Data Migration and Integration</li>
            <li>User Training and Documentation</li>
            <li>Testing and Quality Assurance</li>
            <li>Go-Live and Support</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default ImplementationPage;