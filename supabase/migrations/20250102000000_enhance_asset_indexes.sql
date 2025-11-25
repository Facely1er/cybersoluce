-- ============================================================================
-- Enhanced Asset Indexes Migration
-- Adds indexes to optimize advanced filtering and bulk operations
-- ============================================================================

-- Indexes for advanced filtering features

-- Date-based filtering indexes
CREATE INDEX IF NOT EXISTS idx_cs_assets_last_assessed ON public.cs_assets(last_assessed) WHERE last_assessed IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cs_assets_last_reviewed ON public.cs_assets(last_reviewed) WHERE last_reviewed IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cs_assets_next_review ON public.cs_assets(next_review) WHERE next_review IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cs_assets_created_at_range ON public.cs_assets(created_at DESC);

-- Compliance framework filtering (array contains)
CREATE INDEX IF NOT EXISTS idx_cs_assets_compliance_frameworks ON public.cs_assets USING GIN (compliance_frameworks);

-- Tag filtering (array contains)
CREATE INDEX IF NOT EXISTS idx_cs_assets_tags ON public.cs_assets USING GIN (tags);

-- Data classification filtering
CREATE INDEX IF NOT EXISTS idx_cs_assets_data_classification ON public.cs_assets(data_classification) WHERE data_classification IS NOT NULL;

-- Encryption status filtering
CREATE INDEX IF NOT EXISTS idx_cs_assets_encryption_status ON public.cs_assets(encryption_status) WHERE encryption_status IS NOT NULL;

-- Location filtering (for text search)
CREATE INDEX IF NOT EXISTS idx_cs_assets_location_search ON public.cs_assets USING GIN (location gin_trgm_ops) WHERE location IS NOT NULL;

-- Owner filtering
CREATE INDEX IF NOT EXISTS idx_cs_assets_owner_search ON public.cs_assets USING GIN (owner gin_trgm_ops);

-- Risk score range queries
CREATE INDEX IF NOT EXISTS idx_cs_assets_risk_score_range ON public.cs_assets(risk_score) WHERE risk_score > 0;

-- Composite indexes for common filter combinations
CREATE INDEX IF NOT EXISTS idx_cs_assets_type_criticality ON public.cs_assets(type, criticality);
CREATE INDEX IF NOT EXISTS idx_cs_assets_status_risk_score ON public.cs_assets(status, risk_score);
CREATE INDEX IF NOT EXISTS idx_cs_assets_org_type_status ON public.cs_assets(organization_id, type, status) WHERE organization_id IS NOT NULL;

-- Index for assets with vulnerabilities (for "has vulnerabilities" filter)
CREATE INDEX IF NOT EXISTS idx_cs_assets_has_vulnerabilities ON public.cs_assets(id) 
WHERE EXISTS (
  SELECT 1 FROM public.cs_asset_vulnerabilities v 
  WHERE v.asset_id = cs_assets.id 
  AND v.status IN ('Open', 'open', 'In Progress', 'in-progress')
);

-- Index for assets with dependencies (for "has dependencies" filter)
CREATE INDEX IF NOT EXISTS idx_cs_assets_has_dependencies ON public.cs_assets(id) 
WHERE EXISTS (
  SELECT 1 FROM public.cs_asset_dependencies d 
  WHERE d.asset_id = cs_assets.id 
  AND d.is_active = true
);

-- Index for assets without relationships (for "isolated assets" filter)
-- This is a partial index for assets that have no relationships
CREATE INDEX IF NOT EXISTS idx_cs_assets_isolated ON public.cs_assets(id) 
WHERE NOT EXISTS (
  SELECT 1 FROM public.cs_asset_relationships r 
  WHERE r.source_asset_id = cs_assets.id OR r.target_asset_id = cs_assets.id
)
AND NOT EXISTS (
  SELECT 1 FROM public.cs_asset_dependencies d 
  WHERE d.asset_id = cs_assets.id OR d.dependent_asset_id = cs_assets.id
);

-- Index for overdue assessments (for "overdue assessment" filter)
CREATE INDEX IF NOT EXISTS idx_cs_assets_overdue_assessment ON public.cs_assets(id, next_review) 
WHERE next_review IS NOT NULL AND next_review < NOW();

-- Index for missing compliance (assets with no compliance frameworks)
CREATE INDEX IF NOT EXISTS idx_cs_assets_missing_compliance ON public.cs_assets(id) 
WHERE array_length(compliance_frameworks, 1) IS NULL OR array_length(compliance_frameworks, 1) = 0;

-- Index for multiple compliance frameworks (for "multiple frameworks" filter)
CREATE INDEX IF NOT EXISTS idx_cs_assets_multiple_frameworks ON public.cs_assets(id) 
WHERE array_length(compliance_frameworks, 1) > 1;

-- ============================================================================
-- FUNCTION: Get assets with vulnerabilities count
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_assets_with_vulnerability_count()
RETURNS TABLE(asset_id UUID, vulnerability_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id as asset_id,
    COUNT(v.id) as vulnerability_count
  FROM public.cs_assets a
  LEFT JOIN public.cs_asset_vulnerabilities v ON v.asset_id = a.id
  WHERE v.status IN ('Open', 'open', 'In Progress', 'in-progress')
  GROUP BY a.id;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- FUNCTION: Get assets with dependency count
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_assets_with_dependency_count()
RETURNS TABLE(asset_id UUID, dependency_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id as asset_id,
    COUNT(d.id) as dependency_count
  FROM public.cs_assets a
  LEFT JOIN public.cs_asset_dependencies d ON d.asset_id = a.id
  WHERE d.is_active = true
  GROUP BY a.id;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- FUNCTION: Check if asset is on critical path
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_critical_path_asset(p_asset_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_dependent_count INTEGER;
  v_dependency_count INTEGER;
BEGIN
  -- Count how many assets depend on this one
  SELECT COUNT(*) INTO v_dependent_count
  FROM public.cs_asset_dependencies
  WHERE dependent_asset_id = p_asset_id AND is_active = true;
  
  -- Count how many assets this one depends on
  SELECT COUNT(*) INTO v_dependency_count
  FROM public.cs_asset_dependencies
  WHERE asset_id = p_asset_id AND is_active = true;
  
  -- Critical path: has both dependencies and dependents, or is critical and has dependencies
  RETURN (v_dependent_count > 0 AND v_dependency_count > 0) OR 
         (EXISTS (
           SELECT 1 FROM public.cs_assets 
           WHERE id = p_asset_id 
           AND criticality IN ('Critical', 'critical')
           AND v_dependency_count > 0
         ));
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON FUNCTION public.get_assets_with_vulnerability_count() IS 'Returns asset IDs with their open vulnerability counts for filtering';
COMMENT ON FUNCTION public.get_assets_with_dependency_count() IS 'Returns asset IDs with their active dependency counts for filtering';
COMMENT ON FUNCTION public.is_critical_path_asset(UUID) IS 'Determines if an asset is on a critical path (has both dependencies and dependents)';

