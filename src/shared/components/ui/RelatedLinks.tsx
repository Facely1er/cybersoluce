import React from 'react';

interface RelatedLinksProps {
  links?: Array<{ label: string; href: string }>;
}

export const RelatedLinks: React.FC<RelatedLinksProps> = ({ links = [] }) => {
  return (
    <div className="related-links">
      {/* Related links placeholder */}
    </div>
  );
};

