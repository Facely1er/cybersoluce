import React, { useState } from 'react';
import ExecutiveDashboard from '../components/executive/ExecutiveDashboard';

const ExecutiveReporting: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ExecutiveDashboard />
    </div>
  );
};

export default ExecutiveReporting;