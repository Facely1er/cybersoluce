import React from 'react';
import FrameworkMapper from '../components/framework/FrameworkMapper';
import SEOHead from '../components/common/SEOHead';

const FrameworkMapperPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Framework Mapper - CyberSoluce™"
        description="Map and align security controls across multiple cybersecurity frameworks with intelligent crosswalk capabilities."
        keywords="framework mapping, NIST CSF, ISO 27001, control mapping, cybersecurity frameworks"
      />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FrameworkMapper />
    </div>
    </>
  );
};

export default FrameworkMapperPage;