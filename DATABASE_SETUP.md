# Database Setup Guide

## Quick Start

Your Supabase database is configured and ready to use.

### Connection Details

**Supabase URL:** `https://uvdrwbmhmtgacwzujfzc.supabase.co`  
**Direct PostgreSQL:** `postgresql://postgres:[K1551d0ug0u]@db.uvdrwbmhmtgacwzujfzc.supabase.co:5432/postgres`

---

## Environment Configuration

### ✅ Local Development (.env.local)

The `.env.local` file has been created with your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://uvdrwbmhmtgacwzujfzc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_BACKEND_MODE=supabase
```

**Note:** `.env.local` is in `.gitignore` and will not be committed to version control.

---

## Running Database Migrations

### Option 1: Using the Migration Script (Recommended)

```bash
# Install pg package if not already installed
npm install pg

# Run all pending migrations
node scripts/run-migrations.js

# Run a specific migration
node scripts/run-migrations.js 20250101000000_create_unified_assets.sql

# Run all migrations (including already applied)
node scripts/run-migrations.js --all
```

### Option 2: Using psql Command Line

```bash
# Run a specific migration
psql "postgresql://postgres:K1551d0ug0u@db.uvdrwbmhmtgacwzujfzc.supabase.co:5432/postgres" -f supabase/migrations/20250101000000_create_unified_assets.sql

# Run the enhanced indexes migration
psql "postgresql://postgres:K1551d0ug0u@db.uvdrwbmhmtgacwzujfzc.supabase.co:5432/postgres" -f supabase/migrations/20250102000000_enhance_asset_indexes.sql
```

### Option 3: Using Supabase Dashboard

1. Go to: https://app.supabase.com/project/uvdrwbmhmtgacwzujfzc
2. Navigate to: SQL Editor
3. Copy and paste the migration SQL
4. Click "Run"

---

## Available Migrations

### 1. Unified Assets Table
**File:** `supabase/migrations/20250101000000_create_unified_assets.sql`

**Creates:**
- `cs_assets` table with JSONB extensions
- `cs_asset_relationships` table
- `cs_asset_vulnerabilities` table
- `cs_asset_dependencies` table
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for updated_at timestamps

### 2. Enhanced Asset Indexes
**File:** `supabase/migrations/20250102000000_enhance_asset_indexes.sql`

**Adds:**
- Date-based filtering indexes
- Array indexes (GIN) for compliance frameworks and tags
- Full-text search indexes
- Composite indexes for common filter combinations
- Partial indexes for specific conditions
- Helper functions for complex queries

---

## Verification

### Check Tables Exist

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'cs_%';
```

Expected tables:
- `cs_assets`
- `cs_asset_relationships`
- `cs_asset_vulnerabilities`
- `cs_asset_dependencies`
- `schema_migrations` (created by migration script)

### Check Indexes

```sql
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename = 'cs_assets';
```

### Check RLS Policies

```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename LIKE 'cs_%';
```

---

## Testing the Connection

### From Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to Asset Inventory page
3. Try creating an asset
4. Check browser console for any connection errors

### From Command Line

```bash
# Test connection
psql "postgresql://postgres:K1551d0ug0u@db.uvdrwbmhmtgacwzujfzc.supabase.co:5432/postgres" -c "SELECT version();"
```

---

## Troubleshooting

### Connection Issues

**Error: "connection refused"**
- Check if Supabase project is active
- Verify connection string is correct
- Check firewall/network settings

**Error: "authentication failed"**
- Verify password is correct: `K1551d0ug0u`
- Check if user has proper permissions

**Error: "relation does not exist"**
- Run migrations first
- Check if migrations completed successfully

### Migration Issues

**Error: "relation already exists"**
- Migration may have already been applied
- Check `schema_migrations` table
- Use `--all` flag to re-run if needed

**Error: "permission denied"**
- Ensure using `postgres` user (has full permissions)
- Check RLS policies if querying from application

---

## Security Notes

⚠️ **Important:**
- The `.env.local` file contains sensitive credentials
- Never commit `.env.local` to version control
- The direct PostgreSQL connection string includes the password
- Use environment variables in production
- Rotate credentials if exposed

---

## Next Steps

1. ✅ Run migrations to create database schema
2. ✅ Verify connection from application
3. ✅ Test creating assets
4. ✅ Test advanced filtering
5. ✅ Test bulk operations

---

**Status:** ✅ Database Configured  
**Last Updated:** January 2025

