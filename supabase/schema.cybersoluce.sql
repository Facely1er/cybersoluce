-- ============================================================================
-- CyberSoluce Namespaced Schema (public.cs_* tables)
-- Safe to run alongside other projects in the same Supabase instance.
-- Optimized for security, performance, and proper dependency ordering.
-- ============================================================================

-- EXTENSIONS (safe / idempotent)
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ============================================================================
-- CORE TABLES (ordered by dependencies)
-- ============================================================================

-- ORGANIZATIONS TABLE (must be created first - referenced by other tables)
create table if not exists public.cs_organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  size_range text check (size_range in ('small', 'medium', 'large', 'enterprise')),
  subscription_tier text not null default 'team' check (subscription_tier in ('team', 'business', 'enterprise')),
  settings jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- PROFILES TABLE (references auth.users and cs_organizations)
create table if not exists public.cs_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  first_name text,
  last_name text,
  organization text,
  organization_id uuid references public.cs_organizations(id) on delete set null,
  user_tier text not null default 'free' check (user_tier in ('free', 'professional', 'enterprise')),
  role text not null default 'analyst' check (role in ('viewer', 'analyst', 'admin', 'manager')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ASSESSMENTS TABLE
create table if not exists public.cs_assessments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  domain text not null,
  name text not null,
  config jsonb not null default '{}'::jsonb,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'archived', 'notStarted')),
  scores jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cs_assessments_owner_check check (owner_id is not null)
);

-- EVIDENCE TABLE (now references cs_organizations which exists)
create table if not exists public.cs_evidence (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  control_id text not null,
  framework_id text not null,
  title text not null,
  description text,
  type text not null default 'other' check (type in ('policy', 'procedure', 'log', 'screenshot', 'ticket', 'other', 'document', 'report', 'checklist', 'artifact')),
  location text,
  file_hash text,
  file_size_bytes bigint check (file_size_bytes >= 0),
  collected_by text not null default 'manual' check (collected_by in ('manual', 'automated')),
  collection_date timestamptz not null default now(),
  validity_period_days integer check (validity_period_days > 0),
  expires_at timestamptz,
  validation_status text not null default 'pending' check (validation_status in ('pending', 'valid', 'invalid', 'expired')),
  retention_policy text,
  tags text[] default '{}',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cs_evidence_owner_check check (owner_id is not null),
  constraint cs_evidence_control_framework_check check (control_id is not null and framework_id is not null)
);

-- CONTROL MAPPINGS TABLE (read-only from app for now)
create table if not exists public.cs_control_mappings (
  id uuid primary key default gen_random_uuid(),
  source_control_id text not null,
  source_framework_id text not null,
  target_control_id text not null,
  target_framework_id text not null,
  strength text not null default 'related' check (strength in ('strong', 'partial', 'related')),
  rationale text,
  created_at timestamptz not null default now(),
  constraint cs_control_mappings_unique check (
    source_control_id != target_control_id or source_framework_id != target_framework_id
  )
);

-- ============================================================================
-- ADDITIONAL TABLES (ordered by dependencies)
-- ============================================================================

-- TASKS TABLE
create table if not exists public.cs_tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  title text not null,
  description text,
  task_type text not null default 'remediation' check (task_type in ('evidence', 'remediation', 'review', 'testing')),
  framework_id text,
  control_id text,
  priority text not null default 'medium' check (priority in ('critical', 'high', 'medium', 'low')),
  status text not null default 'draft' check (status in ('draft', 'assigned', 'in_progress', 'review', 'completed', 'blocked')),
  assigned_to uuid references auth.users(id),
  assigned_by uuid references auth.users(id),
  estimated_hours integer check (estimated_hours >= 0),
  actual_hours integer check (actual_hours >= 0),
  due_date timestamptz,
  completed_at timestamptz,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  tags text[] default '{}',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cs_tasks_owner_check check (owner_id is not null),
  constraint cs_tasks_due_date_check check (due_date is null or due_date > created_at)
);

-- TASK DEPENDENCIES TABLE
create table if not exists public.cs_task_dependencies (
  id uuid primary key default gen_random_uuid(),
  parent_task_id uuid not null references public.cs_tasks(id) on delete cascade,
  dependent_task_id uuid not null references public.cs_tasks(id) on delete cascade,
  dependency_type text not null default 'blocks' check (dependency_type in ('blocks', 'triggers', 'informs')),
  created_at timestamptz not null default now(),
  constraint cs_task_dependencies_no_self_reference check (parent_task_id != dependent_task_id),
  unique(parent_task_id, dependent_task_id)
);

-- TASK UPDATES (comments and activity)
create table if not exists public.cs_task_updates (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.cs_tasks(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  update_type text not null check (update_type in ('comment', 'status_change', 'assignment', 'attachment')),
  content text,
  old_value text,
  new_value text,
  created_at timestamptz not null default now()
);

-- TASK ATTACHMENTS TABLE
create table if not exists public.cs_task_attachments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.cs_tasks(id) on delete cascade,
  name text not null,
  url text not null,
  type text,
  size_bytes bigint check (size_bytes >= 0),
  uploaded_by uuid not null references auth.users(id),
  uploaded_at timestamptz not null default now()
);

-- TIMELINES TABLE
create table if not exists public.cs_timelines (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  name text not null,
  description text,
  framework text,
  start_date date not null,
  target_completion date not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed', 'cancelled')),
  current_progress integer not null default 0 check (current_progress >= 0 and current_progress <= 100),
  health_score integer not null default 100 check (health_score >= 0 and health_score <= 100),
  critical_path text[] default '{}',
  resource_allocation jsonb default '{}'::jsonb,
  analytics jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cs_timelines_date_check check (target_completion >= start_date)
);

-- MILESTONES TABLE
create table if not exists public.cs_milestones (
  id uuid primary key default gen_random_uuid(),
  timeline_id uuid not null references public.cs_timelines(id) on delete cascade,
  name text not null,
  type text not null default 'framework' check (type in ('framework', 'business', 'risk')),
  target_date date not null,
  completion_date date,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'delayed', 'cancelled')),
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  dependencies text[] default '{}',
  success_criteria text,
  attendees text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cs_milestones_date_check check (completion_date is null or completion_date >= target_date)
);

-- RISKS TABLE
create table if not exists public.cs_risks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  risk_id text unique not null,
  risk_title text not null,
  risk_description text,
  risk_category text check (risk_category in ('technical', 'operational', 'financial', 'compliance')),
  threat_source text,
  vulnerability text,
  asset_affected text,
  likelihood text check (likelihood in ('low', 'medium', 'high', 'critical')),
  impact text check (impact in ('low', 'medium', 'high', 'critical')),
  inherent_risk_score integer check (inherent_risk_score >= 1 and inherent_risk_score <= 25),
  treatment_strategy text check (treatment_strategy in ('accept', 'mitigate', 'transfer', 'avoid')),
  treatment_plan text,
  control_ids jsonb default '[]'::jsonb,
  residual_risk_score integer check (residual_risk_score is null or (residual_risk_score >= 1 and residual_risk_score <= 25)),
  risk_owner uuid references auth.users(id),
  status text not null default 'identified' check (status in ('identified', 'assessed', 'treated', 'monitoring', 'closed')),
  review_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RISK HISTORY TABLE (for trend analysis)
create table if not exists public.cs_risk_history (
  id uuid primary key default gen_random_uuid(),
  risk_id uuid not null references public.cs_risks(id) on delete cascade,
  snapshot_date timestamptz not null default now(),
  likelihood text check (likelihood in ('low', 'medium', 'high', 'critical')),
  impact text check (impact in ('low', 'medium', 'high', 'critical')),
  risk_score integer check (risk_score >= 1 and risk_score <= 25),
  status text check (status in ('identified', 'assessed', 'treated', 'monitoring', 'closed')),
  notes text
);

-- POLICIES TABLE
create table if not exists public.cs_policies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  policy_id text unique not null,
  policy_title text not null,
  policy_type text check (policy_type in ('security', 'privacy', 'hr', 'it', 'business')),
  policy_content text not null,
  version text not null default '1.0',
  effective_date date,
  review_frequency_months integer default 12 check (review_frequency_months > 0),
  next_review_date date,
  status text not null default 'draft' check (status in ('draft', 'pending_approval', 'approved', 'published', 'retired')),
  approval_workflow jsonb default '{}'::jsonb,
  current_approval_stage integer default 0 check (current_approval_stage >= 0),
  framework_controls jsonb default '[]'::jsonb,
  created_by uuid not null references auth.users(id),
  approved_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- POLICY VERSIONS TABLE
create table if not exists public.cs_policy_versions (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid not null references public.cs_policies(id) on delete cascade,
  version text not null,
  policy_content text not null,
  change_summary text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique(policy_id, version)
);

-- POLICY ACKNOWLEDGMENTS TABLE
create table if not exists public.cs_policy_acknowledgments (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid not null references public.cs_policies(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  version text not null,
  acknowledged_at timestamptz not null default now(),
  ip_address inet,
  unique(policy_id, user_id, version)
);

-- COMPLIANCE CALENDAR TABLE
create table if not exists public.cs_compliance_calendar (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  event_type text not null check (event_type in ('audit', 'assessment', 'training', 'policy_review', 'vendor_assessment', 'regulatory_filing', 'control_testing')),
  title text not null,
  description text,
  start_date timestamptz not null,
  end_date timestamptz,
  due_date timestamptz,
  framework_id text,
  control_id text,
  is_recurring boolean default false,
  recurrence_pattern jsonb default '{}'::jsonb,
  reminder_days integer[] default '{}',
  status text not null default 'scheduled' check (status in ('scheduled', 'in_progress', 'completed', 'cancelled')),
  attendees text[] default '{}',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cs_calendar_date_check check (end_date is null or end_date >= start_date)
);

-- TRAINING COURSES TABLE
create table if not exists public.cs_training_courses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  course_name text not null,
  course_description text,
  course_type text not null check (course_type in ('security_awareness', 'compliance', 'technical', 'custom')),
  provider text,
  duration_hours integer check (duration_hours > 0),
  prerequisites text[] default '{}',
  target_roles text[] default '{}',
  content_url text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- TRAINING COMPLETIONS TABLE
create table if not exists public.cs_training_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.cs_training_courses(id) on delete cascade,
  assigned_date date not null,
  due_date date,
  completed_date date,
  completion_status text not null default 'assigned' check (completion_status in ('assigned', 'in_progress', 'completed', 'expired', 'failed')),
  score integer check (score is null or (score >= 0 and score <= 100)),
  certificate_url text,
  expiration_date date,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, course_id),
  constraint cs_training_date_check check (completed_date is null or completed_date >= assigned_date)
);

-- VENDORS TABLE
create table if not exists public.cs_vendors (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  vendor_name text not null,
  vendor_type text check (vendor_type in ('software', 'service', 'cloud', 'hardware')),
  contact_email text,
  contact_phone text,
  risk_score integer check (risk_score is null or (risk_score >= 0 and risk_score <= 100)),
  criticality text check (criticality in ('low', 'medium', 'high', 'critical')),
  status text not null default 'active' check (status in ('active', 'inactive', 'terminated')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- VENDOR RISKS TABLE
create table if not exists public.cs_vendor_risks (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.cs_vendors(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  risk_type text not null check (risk_type in ('security', 'compliance', 'operational', 'financial')),
  risk_description text,
  risk_score integer check (risk_score is null or (risk_score >= 0 and risk_score <= 100)),
  assessment_date date,
  mitigation_status text check (mitigation_status in ('none', 'planned', 'in_progress', 'mitigated')),
  control_ids jsonb default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- EVIDENCE VALIDATIONS TABLE (enhancement to evidence)
create table if not exists public.cs_evidence_validations (
  id uuid primary key default gen_random_uuid(),
  evidence_id uuid not null references public.cs_evidence(id) on delete cascade,
  validator_id uuid not null references auth.users(id),
  validation_date timestamptz not null default now(),
  status text not null check (status in ('approved', 'rejected', 'needs_revision')),
  comments text,
  validation_criteria jsonb default '{}'::jsonb,
  compliance_score integer check (compliance_score is null or (compliance_score >= 0 and compliance_score <= 100))
);

-- NOTIFICATION RULES TABLE
create table if not exists public.cs_notification_rules (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.cs_organizations(id) on delete cascade,
  rule_name text not null,
  description text,
  trigger jsonb not null default '{}'::jsonb,
  recipients jsonb not null default '[]'::jsonb,
  delivery_channels jsonb not null default '[]'::jsonb,
  escalation jsonb default '{}'::jsonb,
  active boolean not null default true,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE (ordered by priority)
-- ============================================================================

-- Core table indexes (most frequently queried)
create index if not exists idx_cs_profiles_email on public.cs_profiles(email);
create index if not exists idx_cs_profiles_org_id on public.cs_profiles(organization_id);
create index if not exists idx_cs_profiles_role on public.cs_profiles(role);

create index if not exists idx_cs_assessments_owner_id on public.cs_assessments(owner_id);
create index if not exists idx_cs_assessments_org_id on public.cs_assessments(organization_id);
create index if not exists idx_cs_assessments_domain on public.cs_assessments(domain);
create index if not exists idx_cs_assessments_status on public.cs_assessments(status);
create index if not exists idx_cs_assessments_created_at on public.cs_assessments(created_at desc);

create index if not exists idx_cs_evidence_owner_id on public.cs_evidence(owner_id);
create index if not exists idx_cs_evidence_org_id on public.cs_evidence(organization_id);
create index if not exists idx_cs_evidence_control_framework on public.cs_evidence(control_id, framework_id);
create index if not exists idx_cs_evidence_expires_at on public.cs_evidence(expires_at) where expires_at is not null;
create index if not exists idx_cs_evidence_validation_status on public.cs_evidence(validation_status);
create index if not exists idx_cs_evidence_type on public.cs_evidence(type);

create index if not exists idx_cs_control_mappings_source on public.cs_control_mappings(source_control_id, source_framework_id);
create index if not exists idx_cs_control_mappings_target on public.cs_control_mappings(target_control_id, target_framework_id);
create index if not exists idx_cs_control_mappings_strength on public.cs_control_mappings(strength);

-- Organization indexes
create index if not exists idx_cs_organizations_name on public.cs_organizations(name);

-- Task indexes (high query volume)
create index if not exists idx_cs_tasks_owner_id on public.cs_tasks(owner_id);
create index if not exists idx_cs_tasks_org_id on public.cs_tasks(organization_id);
create index if not exists idx_cs_tasks_assigned_to on public.cs_tasks(assigned_to) where assigned_to is not null;
create index if not exists idx_cs_tasks_status on public.cs_tasks(status);
create index if not exists idx_cs_tasks_due_date on public.cs_tasks(due_date) where due_date is not null;
create index if not exists idx_cs_tasks_control_id on public.cs_tasks(control_id) where control_id is not null;
create index if not exists idx_cs_tasks_framework on public.cs_tasks(framework_id) where framework_id is not null;
create index if not exists idx_cs_tasks_priority_status on public.cs_tasks(priority, status);

-- Task dependencies indexes
create index if not exists idx_cs_task_deps_parent on public.cs_task_dependencies(parent_task_id);
create index if not exists idx_cs_task_deps_dependent on public.cs_task_dependencies(dependent_task_id);
create index if not exists idx_cs_task_deps_type on public.cs_task_dependencies(dependency_type);

-- Task updates indexes
create index if not exists idx_cs_task_updates_task_id on public.cs_task_updates(task_id);
create index if not exists idx_cs_task_updates_user_id on public.cs_task_updates(user_id);
create index if not exists idx_cs_task_updates_created_at on public.cs_task_updates(created_at desc);

-- Timeline indexes
create index if not exists idx_cs_timelines_owner_id on public.cs_timelines(owner_id);
create index if not exists idx_cs_timelines_org_id on public.cs_timelines(organization_id);
create index if not exists idx_cs_timelines_status on public.cs_timelines(status);
create index if not exists idx_cs_timelines_target_completion on public.cs_timelines(target_completion);

-- Milestone indexes
create index if not exists idx_cs_milestones_timeline_id on public.cs_milestones(timeline_id);
create index if not exists idx_cs_milestones_status on public.cs_milestones(status);
create index if not exists idx_cs_milestones_target_date on public.cs_milestones(target_date);

-- Risk indexes
create index if not exists idx_cs_risks_owner_id on public.cs_risks(owner_id);
create index if not exists idx_cs_risks_org_id on public.cs_risks(organization_id);
create index if not exists idx_cs_risks_status on public.cs_risks(status);
create index if not exists idx_cs_risks_owner on public.cs_risks(risk_owner) where risk_owner is not null;
create index if not exists idx_cs_risks_category on public.cs_risks(risk_category) where risk_category is not null;
create index if not exists idx_cs_risks_risk_id on public.cs_risks(risk_id);

-- Risk history indexes
create index if not exists idx_cs_risk_history_risk_id on public.cs_risk_history(risk_id);
create index if not exists idx_cs_risk_history_date on public.cs_risk_history(snapshot_date desc);

-- Policy indexes
create index if not exists idx_cs_policies_owner_id on public.cs_policies(owner_id);
create index if not exists idx_cs_policies_org_id on public.cs_policies(organization_id);
create index if not exists idx_cs_policies_status on public.cs_policies(status);
create index if not exists idx_cs_policies_review_date on public.cs_policies(next_review_date) where next_review_date is not null;
create index if not exists idx_cs_policies_type on public.cs_policies(policy_type) where policy_type is not null;
create index if not exists idx_cs_policies_policy_id on public.cs_policies(policy_id);

-- Policy version indexes
create index if not exists idx_cs_policy_versions_policy_id on public.cs_policy_versions(policy_id);
create index if not exists idx_cs_policy_versions_version on public.cs_policy_versions(version);

-- Policy acknowledgment indexes
create index if not exists idx_cs_policy_ack_policy_id on public.cs_policy_acknowledgments(policy_id);
create index if not exists idx_cs_policy_ack_user_id on public.cs_policy_acknowledgments(user_id);
create index if not exists idx_cs_policy_ack_composite on public.cs_policy_acknowledgments(policy_id, user_id, version);

-- Calendar indexes
create index if not exists idx_cs_calendar_owner_id on public.cs_compliance_calendar(owner_id);
create index if not exists idx_cs_calendar_org_id on public.cs_compliance_calendar(organization_id);
create index if not exists idx_cs_calendar_start_date on public.cs_compliance_calendar(start_date);
create index if not exists idx_cs_calendar_event_type on public.cs_compliance_calendar(event_type);
create index if not exists idx_cs_calendar_status on public.cs_compliance_calendar(status);
create index if not exists idx_cs_calendar_due_date on public.cs_compliance_calendar(due_date) where due_date is not null;

-- Training indexes
create index if not exists idx_cs_training_courses_org_id on public.cs_training_courses(organization_id);
create index if not exists idx_cs_training_completions_user_id on public.cs_training_completions(user_id);
create index if not exists idx_cs_training_completions_course_id on public.cs_training_completions(course_id);
create index if not exists idx_cs_training_completions_status on public.cs_training_completions(completion_status);
create index if not exists idx_cs_training_completions_due_date on public.cs_training_completions(due_date) where due_date is not null;
create index if not exists idx_cs_training_completions_composite on public.cs_training_completions(user_id, course_id);

-- Vendor indexes
create index if not exists idx_cs_vendors_org_id on public.cs_vendors(organization_id);
create index if not exists idx_cs_vendors_status on public.cs_vendors(status);
create index if not exists idx_cs_vendors_criticality on public.cs_vendors(criticality) where criticality is not null;

-- Vendor risk indexes
create index if not exists idx_cs_vendor_risks_vendor_id on public.cs_vendor_risks(vendor_id);
create index if not exists idx_cs_vendor_risks_org_id on public.cs_vendor_risks(organization_id);
create index if not exists idx_cs_vendor_risks_type on public.cs_vendor_risks(risk_type);

-- Evidence validation indexes
create index if not exists idx_cs_evidence_validations_evidence_id on public.cs_evidence_validations(evidence_id);
create index if not exists idx_cs_evidence_validations_validator_id on public.cs_evidence_validations(validator_id);
create index if not exists idx_cs_evidence_validations_status on public.cs_evidence_validations(status);

-- Notification rule indexes
create index if not exists idx_cs_notification_rules_owner_id on public.cs_notification_rules(owner_id);
create index if not exists idx_cs_notification_rules_org_id on public.cs_notification_rules(organization_id);
create index if not exists idx_cs_notification_rules_active on public.cs_notification_rules(active) where active = true;

-- Full-text search indexes (for search functionality)
create index if not exists idx_cs_tasks_search on public.cs_tasks using gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));
create index if not exists idx_cs_policies_search on public.cs_policies using gin(to_tsvector('english', coalesce(policy_title, '') || ' ' || coalesce(policy_content, '')));
create index if not exists idx_cs_risks_search on public.cs_risks using gin(to_tsvector('english', coalesce(risk_title, '') || ' ' || coalesce(risk_description, '')));

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) ENABLEMENT
-- ============================================================================

alter table public.cs_organizations enable row level security;
alter table public.cs_profiles enable row level security;
alter table public.cs_assessments enable row level security;
alter table public.cs_evidence enable row level security;
alter table public.cs_control_mappings enable row level security;
alter table public.cs_tasks enable row level security;
alter table public.cs_task_dependencies enable row level security;
alter table public.cs_task_updates enable row level security;
alter table public.cs_task_attachments enable row level security;
alter table public.cs_timelines enable row level security;
alter table public.cs_milestones enable row level security;
alter table public.cs_risks enable row level security;
alter table public.cs_risk_history enable row level security;
alter table public.cs_policies enable row level security;
alter table public.cs_policy_versions enable row level security;
alter table public.cs_policy_acknowledgments enable row level security;
alter table public.cs_compliance_calendar enable row level security;
alter table public.cs_training_courses enable row level security;
alter table public.cs_training_completions enable row level security;
alter table public.cs_vendors enable row level security;
alter table public.cs_vendor_risks enable row level security;
alter table public.cs_evidence_validations enable row level security;
alter table public.cs_notification_rules enable row level security;

-- ============================================================================
-- RLS POLICIES (ordered by table dependencies)
-- ============================================================================

-- Drop existing policies if they exist (for idempotency)
do $$
declare
  pol record;
begin
  -- Drop all policies on cs_* tables using pg_policy catalog
  for pol in (
    select 
      schemaname,
      tablename,
      policyname
    from pg_policies
    where schemaname = 'public'
      and tablename like 'cs_%'
      and policyname like 'cs_%'
  ) loop
    execute format('drop policy if exists %I on %I.%I', 
      pol.policyname, 
      pol.schemaname, 
      pol.tablename
    );
  end loop;
end $$;

-- Organizations: users can access their organization
drop policy if exists "cs_organizations_select" on public.cs_organizations;
create policy "cs_organizations_select"
  on public.cs_organizations
  for select
  using (
    id in (
      select organization_id from public.cs_profiles where id = (select auth.uid()) and organization_id is not null
    )
  );

-- Profiles: user can see/update only their profile
create policy "cs_profiles_self_select"
  on public.cs_profiles
  for select
  using ((select auth.uid()) = id);

create policy "cs_profiles_self_update"
  on public.cs_profiles
  for update
  using ((select auth.uid()) = id);

create policy "cs_profiles_self_insert"
  on public.cs_profiles
  for insert
  with check ((select auth.uid()) = id);

-- Assessments: owner-only read/write
create policy "cs_assessments_owner_select"
  on public.cs_assessments
  for select
  using ((select auth.uid()) = owner_id);

create policy "cs_assessments_owner_insert"
  on public.cs_assessments
  for insert
  with check ((select auth.uid()) = owner_id);

create policy "cs_assessments_owner_update"
  on public.cs_assessments
  for update
  using ((select auth.uid()) = owner_id);

create policy "cs_assessments_owner_delete"
  on public.cs_assessments
  for delete
  using ((select auth.uid()) = owner_id);

-- Evidence: owner can access, org admins can access org evidence
create policy "cs_evidence_owner_select"
  on public.cs_evidence
  for select
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_evidence_owner_insert"
  on public.cs_evidence
  for insert
  with check (owner_id = (select auth.uid()));

create policy "cs_evidence_owner_update"
  on public.cs_evidence
  for update
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_evidence_owner_delete"
  on public.cs_evidence
  for delete
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

-- Control mappings: read-only for all authenticated users
create policy "cs_control_mappings_read_all"
  on public.cs_control_mappings
  for select
  using ((select auth.role()) = 'authenticated');

-- Tasks: users can access tasks in their organization
create policy "cs_tasks_select"
  on public.cs_tasks
  for select
  using (
    owner_id = (select auth.uid()) or
    assigned_to = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_tasks_insert"
  on public.cs_tasks
  for insert
  with check (owner_id = (select auth.uid()));

create policy "cs_tasks_update"
  on public.cs_tasks
  for update
  using (
    owner_id = (select auth.uid()) or
    assigned_to = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_tasks_delete"
  on public.cs_tasks
  for delete
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

-- Task dependencies: same access as tasks
create policy "cs_task_dependencies_select"
  on public.cs_task_dependencies
  for select
  using (
    parent_task_id in (
      select id from public.cs_tasks 
      where owner_id = (select auth.uid()) or assigned_to = (select auth.uid())
    )
  );

create policy "cs_task_dependencies_insert"
  on public.cs_task_dependencies
  for insert
  with check (
    parent_task_id in (
      select id from public.cs_tasks where owner_id = (select auth.uid())
    )
  );

create policy "cs_task_dependencies_delete"
  on public.cs_task_dependencies
  for delete
  using (
    parent_task_id in (
      select id from public.cs_tasks where owner_id = (select auth.uid())
    )
  );

-- Task updates: users can read/insert updates for tasks they have access to
create policy "cs_task_updates_select"
  on public.cs_task_updates
  for select
  using (
    task_id in (
      select id from public.cs_tasks 
      where owner_id = (select auth.uid()) or assigned_to = (select auth.uid())
    )
  );

create policy "cs_task_updates_insert"
  on public.cs_task_updates
  for insert
  with check (user_id = (select auth.uid()));

-- Task attachments: same as task updates
create policy "cs_task_attachments_select"
  on public.cs_task_attachments
  for select
  using (
    task_id in (
      select id from public.cs_tasks 
      where owner_id = (select auth.uid()) or assigned_to = (select auth.uid())
    )
  );

create policy "cs_task_attachments_insert"
  on public.cs_task_attachments
  for insert
  with check (
    uploaded_by = (select auth.uid()) and
    task_id in (
      select id from public.cs_tasks where owner_id = (select auth.uid()) or assigned_to = (select auth.uid())
    )
  );

create policy "cs_task_attachments_delete"
  on public.cs_task_attachments
  for delete
  using (
    uploaded_by = (select auth.uid()) or
    task_id in (
      select id from public.cs_tasks where owner_id = (select auth.uid())
    )
  );

-- Timelines: users can access timelines in their organization
create policy "cs_timelines_select"
  on public.cs_timelines
  for select
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_timelines_insert"
  on public.cs_timelines
  for insert
  with check (owner_id = (select auth.uid()));

create policy "cs_timelines_update"
  on public.cs_timelines
  for update
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_timelines_delete"
  on public.cs_timelines
  for delete
  using (owner_id = (select auth.uid()));

-- Milestones: same access as timelines
create policy "cs_milestones_select"
  on public.cs_milestones
  for select
  using (
    timeline_id in (
      select id from public.cs_timelines where owner_id = (select auth.uid())
    )
  );

create policy "cs_milestones_insert"
  on public.cs_milestones
  for insert
  with check (
    timeline_id in (
      select id from public.cs_timelines where owner_id = (select auth.uid())
    )
  );

create policy "cs_milestones_update"
  on public.cs_milestones
  for update
  using (
    timeline_id in (
      select id from public.cs_timelines where owner_id = (select auth.uid())
    )
  );

create policy "cs_milestones_delete"
  on public.cs_milestones
  for delete
  using (
    timeline_id in (
      select id from public.cs_timelines where owner_id = (select auth.uid())
    )
  );

-- Risks: users can access risks in their organization
create policy "cs_risks_select"
  on public.cs_risks
  for select
  using (
    owner_id = (select auth.uid()) or
    risk_owner = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_risks_insert"
  on public.cs_risks
  for insert
  with check (owner_id = (select auth.uid()));

create policy "cs_risks_update"
  on public.cs_risks
  for update
  using (
    owner_id = (select auth.uid()) or
    risk_owner = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_risks_delete"
  on public.cs_risks
  for delete
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

-- Risk history: same access as risks
create policy "cs_risk_history_select"
  on public.cs_risk_history
  for select
  using (
    risk_id in (
      select id from public.cs_risks 
      where owner_id = (select auth.uid()) or risk_owner = (select auth.uid())
    )
  );

create policy "cs_risk_history_insert"
  on public.cs_risk_history
  for insert
  with check (
    risk_id in (
      select id from public.cs_risks where owner_id = (select auth.uid()) or risk_owner = (select auth.uid())
    )
  );

-- Policies: users can access policies in their organization
create policy "cs_policies_select"
  on public.cs_policies
  for select
  using (
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    ) or
    status = 'published'
  );

create policy "cs_policies_insert"
  on public.cs_policies
  for insert
  with check (created_by = (select auth.uid()));

create policy "cs_policies_update"
  on public.cs_policies
  for update
  using (
    created_by = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_policies_delete"
  on public.cs_policies
  for delete
  using (
    created_by = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

-- Policy versions: same access as policies
create policy "cs_policy_versions_select"
  on public.cs_policy_versions
  for select
  using (
    policy_id in (
      select id from public.cs_policies
      where (
        organization_id is not null and
        organization_id in (
          select organization_id from public.cs_profiles 
          where id = (select auth.uid()) and organization_id is not null
        )
      ) or status = 'published'
    )
  );

create policy "cs_policy_versions_insert"
  on public.cs_policy_versions
  for insert
  with check (
    created_by = (select auth.uid()) and
    policy_id in (
      select id from public.cs_policies where created_by = (select auth.uid())
    )
  );

-- Policy acknowledgments: users can see their own, admins can see all in org
create policy "cs_policy_acknowledgments_select"
  on public.cs_policy_acknowledgments
  for select
  using (
    user_id = (select auth.uid()) or
    policy_id in (
      select id from public.cs_policies
      where (
        organization_id is not null and
        organization_id in (
          select organization_id from public.cs_profiles 
          where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
        )
      )
    )
  );

create policy "cs_policy_acknowledgments_insert"
  on public.cs_policy_acknowledgments
  for insert
  with check (user_id = (select auth.uid()));

-- Compliance calendar: users can access calendar events in their organization
create policy "cs_compliance_calendar_select"
  on public.cs_compliance_calendar
  for select
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_compliance_calendar_insert"
  on public.cs_compliance_calendar
  for insert
  with check (owner_id = (select auth.uid()));

create policy "cs_compliance_calendar_update"
  on public.cs_compliance_calendar
  for update
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_compliance_calendar_delete"
  on public.cs_compliance_calendar
  for delete
  using (owner_id = (select auth.uid()));

-- Training courses: users can access courses in their organization
create policy "cs_training_courses_select"
  on public.cs_training_courses
  for select
  using (
    organization_id is null or
    (
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_training_courses_insert"
  on public.cs_training_courses
  for insert
  with check (
    organization_id is null or
    (
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_training_courses_update"
  on public.cs_training_courses
  for update
  using (
    organization_id is null or
    (
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_training_courses_delete"
  on public.cs_training_courses
  for delete
  using (
    organization_id is null or
    (
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

-- Training completions: users can see their own, admins can see all in org
create policy "cs_training_completions_select"
  on public.cs_training_completions
  for select
  using (
    user_id = (select auth.uid()) or
    course_id in (
      select id from public.cs_training_courses
      where (
        organization_id is null or
        (
          organization_id in (
            select organization_id from public.cs_profiles 
            where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
          )
        )
      )
    )
  );

create policy "cs_training_completions_insert"
  on public.cs_training_completions
  for insert
  with check (
    user_id = (select auth.uid()) or
    course_id in (
      select id from public.cs_training_courses
      where (
        organization_id is null or
        (
          organization_id in (
            select organization_id from public.cs_profiles 
            where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
          )
        )
      )
    )
  );

create policy "cs_training_completions_update"
  on public.cs_training_completions
  for update
  using (
    user_id = (select auth.uid()) or
    course_id in (
      select id from public.cs_training_courses
      where (
        organization_id is null or
        (
          organization_id in (
            select organization_id from public.cs_profiles 
            where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
          )
        )
      )
    )
  );

-- Vendors: users can access vendors in their organization
create policy "cs_vendors_select"
  on public.cs_vendors
  for select
  using (
    organization_id is not null and
    organization_id in (
      select organization_id from public.cs_profiles 
      where id = (select auth.uid()) and organization_id is not null
    )
  );

create policy "cs_vendors_insert"
  on public.cs_vendors
  for insert
  with check (
    organization_id is not null and
    organization_id in (
      select organization_id from public.cs_profiles 
      where id = (select auth.uid()) and organization_id is not null
    )
  );

create policy "cs_vendors_update"
  on public.cs_vendors
  for update
  using (
    organization_id is not null and
    organization_id in (
      select organization_id from public.cs_profiles 
      where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
    )
  );

create policy "cs_vendors_delete"
  on public.cs_vendors
  for delete
  using (
    organization_id is not null and
    organization_id in (
      select organization_id from public.cs_profiles 
      where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
    )
  );

-- Vendor risks: same access as vendors
create policy "cs_vendor_risks_select"
  on public.cs_vendor_risks
  for select
  using (
    vendor_id in (
      select id from public.cs_vendors
      where (
        organization_id is not null and
        organization_id in (
          select organization_id from public.cs_profiles 
          where id = (select auth.uid()) and organization_id is not null
        )
      )
    )
  );

create policy "cs_vendor_risks_insert"
  on public.cs_vendor_risks
  for insert
  with check (
    vendor_id in (
      select id from public.cs_vendors
      where (
        organization_id is not null and
        organization_id in (
          select organization_id from public.cs_profiles 
          where id = (select auth.uid()) and organization_id is not null
        )
      )
    )
  );

create policy "cs_vendor_risks_update"
  on public.cs_vendor_risks
  for update
  using (
    vendor_id in (
      select id from public.cs_vendors
      where (
        organization_id is not null and
        organization_id in (
          select organization_id from public.cs_profiles 
          where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
        )
      )
    )
  );

create policy "cs_vendor_risks_delete"
  on public.cs_vendor_risks
  for delete
  using (
    vendor_id in (
      select id from public.cs_vendors
      where (
        organization_id is not null and
        organization_id in (
          select organization_id from public.cs_profiles 
          where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
        )
      )
    )
  );

-- Evidence validations: users can access validations for evidence they own or can view
create policy "cs_evidence_validations_select"
  on public.cs_evidence_validations
  for select
  using (
    evidence_id in (
      select id from public.cs_evidence where owner_id = (select auth.uid())
    ) or
    validator_id = (select auth.uid())
  );

create policy "cs_evidence_validations_insert"
  on public.cs_evidence_validations
  for insert
  with check (validator_id = (select auth.uid()));

create policy "cs_evidence_validations_update"
  on public.cs_evidence_validations
  for update
  using (validator_id = (select auth.uid()));

-- Notification rules: users can access rules in their organization
create policy "cs_notification_rules_select"
  on public.cs_notification_rules
  for select
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and organization_id is not null
      )
    )
  );

create policy "cs_notification_rules_insert"
  on public.cs_notification_rules
  for insert
  with check (owner_id = (select auth.uid()));

create policy "cs_notification_rules_update"
  on public.cs_notification_rules
  for update
  using (
    owner_id = (select auth.uid()) or
    (
      organization_id is not null and
      organization_id in (
        select organization_id from public.cs_profiles 
        where id = (select auth.uid()) and role in ('admin', 'manager') and organization_id is not null
      )
    )
  );

create policy "cs_notification_rules_delete"
  on public.cs_notification_rules
  for delete
  using (owner_id = (select auth.uid()));

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATED_AT TIMESTAMPS
-- ============================================================================

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply triggers to all tables with updated_at
do $$
declare
  r record;
begin
  for r in (
    select t.tablename 
    from pg_tables t
    inner join information_schema.columns c 
      on c.table_schema = t.schemaname 
      and c.table_name = t.tablename
    where t.schemaname = 'public' 
      and t.tablename like 'cs_%'
      and c.column_name = 'updated_at'
  ) loop
    execute format('
      drop trigger if exists update_%I_updated_at on public.%I;
      create trigger update_%I_updated_at
        before update on public.%I
        for each row
        execute function public.update_updated_at_column();
    ', r.tablename, r.tablename, r.tablename, r.tablename);
  end loop;
end $$;

-- ============================================================================
-- HELPER FUNCTION: Get user's organization ID
-- ============================================================================

create or replace function public.get_user_organization_id(user_uuid uuid)
returns uuid
language sql
security definer
set search_path = ''
as $$
  select organization_id from public.cs_profiles where id = user_uuid;
$$;

-- ============================================================================
-- VERIFICATION QUERIES (for testing - can be removed in production)
-- ============================================================================

-- Uncomment to verify schema creation:
-- select tablename from pg_tables where schemaname = 'public' and tablename like 'cs_%' order by tablename;
-- select schemaname, tablename, policyname from pg_policies where schemaname = 'public' and tablename like 'cs_%' order by tablename, policyname;
