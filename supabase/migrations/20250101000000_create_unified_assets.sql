-- ============================================================================
-- Unified Assets Table Migration
-- Creates the foundational asset inventory table with polymorphic JSONB extensions
-- for TechnoSoluce, VendorSoluce, and CyberCorrect product extensions
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- ============================================================================
-- CORE ASSETS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.cs_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.cs_organizations(id) ON DELETE CASCADE,
  
  -- Universal fields (95% of code)
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(50),
  subcategory VARCHAR(100),
  
  -- Ownership & Location
  owner VARCHAR(255) NOT NULL,
  custodian VARCHAR(255),
  location TEXT, -- Can be string or JSONB, stored as text for simplicity
  ip_address VARCHAR(45), -- IPv6 support
  
  -- Classification
  criticality VARCHAR(20) NOT NULL CHECK (criticality IN ('Critical', 'High', 'Medium', 'Low', 'critical', 'high', 'medium', 'low')),
  data_classification VARCHAR(20) CHECK (data_classification IN ('Public', 'Internal', 'Confidential', 'Restricted', 'Top Secret', 'public', 'internal', 'confidential', 'restricted', 'top-secret')),
  business_value VARCHAR(50),
  
  -- Status & Lifecycle
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Retired', 'Planned', 'active', 'inactive', 'disposed', 'maintenance', 'quarantined', 'decommissioned')),
  
  -- Risk & Compliance
  risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  compliance_frameworks TEXT[] DEFAULT '{}',
  
  -- Privacy & Data Protection
  data_types TEXT[] DEFAULT '{}',
  retention_period INTEGER, -- in days
  legal_basis TEXT[] DEFAULT '{}',
  data_subject_rights TEXT[] DEFAULT '{}',
  cross_border_transfer BOOLEAN DEFAULT false,
  third_party_sharing BOOLEAN DEFAULT false,
  encryption_status VARCHAR(30) CHECK (encryption_status IN ('Encrypted', 'Not Encrypted', 'Partially Encrypted', 'Unknown')),
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Product Extensions (JSONB columns - 5% product-specific code)
  technosoluce_data JSONB DEFAULT '{}'::jsonb,
  vendorsoluce_data JSONB DEFAULT '{}'::jsonb,
  cybercorrect_data JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_assessed TIMESTAMPTZ,
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  
  -- Constraints
  CONSTRAINT cs_assets_name_check CHECK (LENGTH(name) > 0),
  CONSTRAINT cs_assets_risk_score_check CHECK (risk_score >= 0 AND risk_score <= 100)
);

-- ============================================================================
-- ASSET RELATIONSHIPS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.cs_asset_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_asset_id UUID NOT NULL REFERENCES public.cs_assets(id) ON DELETE CASCADE,
  target_asset_id UUID NOT NULL REFERENCES public.cs_assets(id) ON DELETE CASCADE,
  relationship_type VARCHAR(50) NOT NULL,
  strength VARCHAR(20) CHECK (strength IN ('Strong', 'Medium', 'Weak', 'strong', 'moderate', 'weak', 'critical')),
  data_flow_direction VARCHAR(20) CHECK (data_flow_direction IN ('Inbound', 'Outbound', 'Bidirectional', 'None')),
  is_personal_data BOOLEAN DEFAULT false,
  purpose TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT cs_asset_relationships_no_self_reference CHECK (source_asset_id != target_asset_id),
  CONSTRAINT cs_asset_relationships_unique CHECK (
    source_asset_id != target_asset_id
  )
);

-- ============================================================================
-- ASSET VULNERABILITIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.cs_asset_vulnerabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES public.cs_assets(id) ON DELETE CASCADE,
  cve_id VARCHAR(20),
  ghsa_id VARCHAR(20),
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('Critical', 'High', 'Medium', 'Low', 'critical', 'high', 'medium', 'low', 'informational')),
  cvss_score DECIMAL(3,1) CHECK (cvss_score >= 0 AND cvss_score <= 10),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Accepted Risk', 'open', 'in-progress', 'resolved', 'risk-accepted', 'false-positive')),
  remediation_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ASSET DEPENDENCIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.cs_asset_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES public.cs_assets(id) ON DELETE CASCADE,
  dependent_asset_id UUID NOT NULL REFERENCES public.cs_assets(id) ON DELETE CASCADE,
  dependency_type VARCHAR(50) NOT NULL,
  criticality VARCHAR(20) NOT NULL CHECK (criticality IN ('Critical', 'High', 'Medium', 'Low', 'critical', 'high', 'medium', 'low')),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  last_validated TIMESTAMPTZ DEFAULT NOW(),
  risk_level VARCHAR(20) CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
  bidirectional BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT cs_asset_dependencies_no_self_reference CHECK (asset_id != dependent_asset_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Assets table indexes
CREATE INDEX IF NOT EXISTS idx_cs_assets_organization_id ON public.cs_assets(organization_id);
CREATE INDEX IF NOT EXISTS idx_cs_assets_type ON public.cs_assets(type);
CREATE INDEX IF NOT EXISTS idx_cs_assets_criticality ON public.cs_assets(criticality);
CREATE INDEX IF NOT EXISTS idx_cs_assets_status ON public.cs_assets(status);
CREATE INDEX IF NOT EXISTS idx_cs_assets_owner ON public.cs_assets(owner);
CREATE INDEX IF NOT EXISTS idx_cs_assets_risk_score ON public.cs_assets(risk_score);
CREATE INDEX IF NOT EXISTS idx_cs_assets_created_at ON public.cs_assets(created_at DESC);

-- GIN indexes for JSONB columns (enables fast queries on extension data)
CREATE INDEX IF NOT EXISTS idx_cs_assets_technosoluce_data ON public.cs_assets USING GIN (technosoluce_data);
CREATE INDEX IF NOT EXISTS idx_cs_assets_vendorsoluce_data ON public.cs_assets USING GIN (vendorsoluce_data);
CREATE INDEX IF NOT EXISTS idx_cs_assets_cybercorrect_data ON public.cs_assets USING GIN (cybercorrect_data);
CREATE INDEX IF NOT EXISTS idx_cs_assets_metadata ON public.cs_assets USING GIN (metadata);

-- Full-text search index on name and description
CREATE INDEX IF NOT EXISTS idx_cs_assets_name_search ON public.cs_assets USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_cs_assets_description_search ON public.cs_assets USING GIN (description gin_trgm_ops);

-- Relationships indexes
CREATE INDEX IF NOT EXISTS idx_cs_asset_relationships_source ON public.cs_asset_relationships(source_asset_id);
CREATE INDEX IF NOT EXISTS idx_cs_asset_relationships_target ON public.cs_asset_relationships(target_asset_id);
CREATE INDEX IF NOT EXISTS idx_cs_asset_relationships_type ON public.cs_asset_relationships(relationship_type);

-- Vulnerabilities indexes
CREATE INDEX IF NOT EXISTS idx_cs_asset_vulnerabilities_asset_id ON public.cs_asset_vulnerabilities(asset_id);
CREATE INDEX IF NOT EXISTS idx_cs_asset_vulnerabilities_severity ON public.cs_asset_vulnerabilities(severity);
CREATE INDEX IF NOT EXISTS idx_cs_asset_vulnerabilities_status ON public.cs_asset_vulnerabilities(status);
CREATE INDEX IF NOT EXISTS idx_cs_asset_vulnerabilities_cve_id ON public.cs_asset_vulnerabilities(cve_id) WHERE cve_id IS NOT NULL;

-- Dependencies indexes
CREATE INDEX IF NOT EXISTS idx_cs_asset_dependencies_asset_id ON public.cs_asset_dependencies(asset_id);
CREATE INDEX IF NOT EXISTS idx_cs_asset_dependencies_dependent_asset_id ON public.cs_asset_dependencies(dependent_asset_id);
CREATE INDEX IF NOT EXISTS idx_cs_asset_dependencies_type ON public.cs_asset_dependencies(dependency_type);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.cs_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cs_asset_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cs_asset_vulnerabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cs_asset_dependencies ENABLE ROW LEVEL SECURITY;

-- Assets: Users can view assets in their organization
CREATE POLICY "Users can view organization assets"
  ON public.cs_assets
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.cs_profiles 
      WHERE id = auth.uid()
    )
  );

-- Assets: Users can create assets in their organization
CREATE POLICY "Users can create organization assets"
  ON public.cs_assets
  FOR INSERT
  TO authenticated
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.cs_profiles 
      WHERE id = auth.uid()
    )
  );

-- Assets: Users can update assets in their organization
CREATE POLICY "Users can update organization assets"
  ON public.cs_assets
  FOR UPDATE
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.cs_profiles 
      WHERE id = auth.uid()
    )
  );

-- Assets: Users can delete assets in their organization
CREATE POLICY "Users can delete organization assets"
  ON public.cs_assets
  FOR DELETE
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.cs_profiles 
      WHERE id = auth.uid()
    )
  );

-- Relationships: Users can view relationships for their organization's assets
CREATE POLICY "Users can view organization asset relationships"
  ON public.cs_asset_relationships
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cs_assets a
      WHERE a.id = source_asset_id
      AND a.organization_id IN (
        SELECT organization_id FROM public.cs_profiles 
        WHERE id = auth.uid()
      )
    )
  );

-- Relationships: Users can create relationships for their organization's assets
CREATE POLICY "Users can create organization asset relationships"
  ON public.cs_asset_relationships
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cs_assets a
      WHERE a.id = source_asset_id
      AND a.organization_id IN (
        SELECT organization_id FROM public.cs_profiles 
        WHERE id = auth.uid()
      )
    )
  );

-- Vulnerabilities: Users can view vulnerabilities for their organization's assets
CREATE POLICY "Users can view organization asset vulnerabilities"
  ON public.cs_asset_vulnerabilities
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cs_assets a
      WHERE a.id = asset_id
      AND a.organization_id IN (
        SELECT organization_id FROM public.cs_profiles 
        WHERE id = auth.uid()
      )
    )
  );

-- Vulnerabilities: Users can create vulnerabilities for their organization's assets
CREATE POLICY "Users can create organization asset vulnerabilities"
  ON public.cs_asset_vulnerabilities
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cs_assets a
      WHERE a.id = asset_id
      AND a.organization_id IN (
        SELECT organization_id FROM public.cs_profiles 
        WHERE id = auth.uid()
      )
    )
  );

-- Dependencies: Users can view dependencies for their organization's assets
CREATE POLICY "Users can view organization asset dependencies"
  ON public.cs_asset_dependencies
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cs_assets a
      WHERE a.id = asset_id
      AND a.organization_id IN (
        SELECT organization_id FROM public.cs_profiles 
        WHERE id = auth.uid()
      )
    )
  );

-- Dependencies: Users can create dependencies for their organization's assets
CREATE POLICY "Users can create organization asset dependencies"
  ON public.cs_asset_dependencies
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cs_assets a
      WHERE a.id = asset_id
      AND a.organization_id IN (
        SELECT organization_id FROM public.cs_profiles 
        WHERE id = auth.uid()
      )
    )
  );

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for assets table
CREATE TRIGGER handle_cs_assets_updated_at
  BEFORE UPDATE ON public.cs_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for relationships table
CREATE TRIGGER handle_cs_asset_relationships_updated_at
  BEFORE UPDATE ON public.cs_asset_relationships
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for vulnerabilities table
CREATE TRIGGER handle_cs_asset_vulnerabilities_updated_at
  BEFORE UPDATE ON public.cs_asset_vulnerabilities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for dependencies table
CREATE TRIGGER handle_cs_asset_dependencies_updated_at
  BEFORE UPDATE ON public.cs_asset_dependencies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.cs_assets IS 'Unified asset inventory table with polymorphic JSONB extensions for product-specific data';
COMMENT ON COLUMN public.cs_assets.technosoluce_data IS 'TechnoSoluce extension: SBOM, vulnerabilities, dependencies (JSONB)';
COMMENT ON COLUMN public.cs_assets.vendorsoluce_data IS 'VendorSoluce extension: Vendor risk, contracts, ESG (JSONB)';
COMMENT ON COLUMN public.cs_assets.cybercorrect_data IS 'CyberCorrect extension: Privacy compliance, GDPR, data classification (JSONB)';

COMMENT ON TABLE public.cs_asset_relationships IS 'Relationships between assets (dependencies, connections, etc.)';
COMMENT ON TABLE public.cs_asset_vulnerabilities IS 'Vulnerabilities associated with assets';
COMMENT ON TABLE public.cs_asset_dependencies IS 'Dependencies between assets';

