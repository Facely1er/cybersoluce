import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'CyberSoluce™ - The Governance Command Center',
  description = 'Strategic cybersecurity governance platform that orchestrates comprehensive security assessments with AI-powered intelligence across global frameworks.',
  keywords = 'cybersecurity, governance, compliance, NIST, ISO 27001, security assessment, risk management, framework mapping',
  image = '/cybersoluce-og.png',
  url = 'https://cybersoluce.com',
  type = 'website',
  noIndex = false
}) => {
  const fullTitle = title.includes('CyberSoluce') ? title : `${title} | CyberSoluce™`;
  const fullUrl = url.startsWith('http') ? url : `https://cybersoluce.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://cybersoluce.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ERMITS LLC" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CyberSoluce™" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@cybersoluce" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#005B96" />
      <meta name="msapplication-TileColor" content="#005B96" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="CyberSoluce" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/cybersoluce.png" as="image" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CyberSoluce™",
          "description": description,
          "url": fullUrl,
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "category": "SaaS"
          },
          "provider": {
            "@type": "Organization",
            "name": "ERMITS LLC",
            "url": "https://ermits.com",
            "logo": "https://cybersoluce.com/cybersoluce.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-888-618-6160",
              "contactType": "customer service",
              "email": "contact@ermits.com"
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;