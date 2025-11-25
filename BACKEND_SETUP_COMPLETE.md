# Backend Setup - Completion Guide

This guide will help you complete the Supabase backend setup and verify everything is working.

## ✅ Setup Checklist

### Step 1: Environment Configuration

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://uvdrwbmhmtgacwzujfzc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs
VITE_BACKEND_MODE=supabase
```

**Status:** ⬜ Created | ✅ Verified

---

### Step 2: Database Schema

1. Open Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy entire contents of `supabase/schema.cybersoluce.sql`
6. Paste and click **Run** (Ctrl+Enter)
7. Verify success message

**Expected Output:**
```
Success. No rows returned
```

**Verify Tables Created:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'cs_%';
```

Should return:
- cs_profiles
- cs_assessments
- cs_evidence
- cs_control_mappings

**Status:** ⬜ Schema Run | ✅ Tables Verified

---

### Step 3: Verify RLS Policies

In Supabase Dashboard → Authentication → Policies:

- [ ] `cs_profiles` has RLS enabled
- [ ] `cs_assessments` has RLS enabled
- [ ] `cs_evidence` has RLS enabled
- [ ] `cs_control_mappings` has RLS enabled

**Status:** ⬜ Verified | ✅ All Enabled

---

### Step 4: Test Connection

1. Start dev server: `npm run dev`
2. Open browser console (F12)
3. Run: `testSupabaseConnection()`

**Expected Output:**
```
✅ Supabase client initialized
✅ Connection successful
✅ All tables accessible
```

**Status:** ⬜ Tested | ✅ Connection Verified

---

### Step 5: Test Authentication Flow

#### Sign Up Test
1. Navigate to `/signup`
2. Fill form:
   - Email: `test@example.com`
   - Password: `Test123!@#`
   - First Name: `Test`
   - Last Name: `User`
   - Organization: `Test Org`
3. Submit
4. Check Supabase Dashboard → Authentication → Users
5. Verify user appears in `auth.users`
6. Verify profile in `cs_profiles` table

**Status:** ⬜ Tested | ✅ Working

#### Login Test
1. Navigate to `/login`
2. Use credentials from signup
3. Login should succeed
4. User redirected to dashboard
5. Check browser console - no errors

**Status:** ⬜ Tested | ✅ Working

#### Session Persistence Test
1. Login successfully
2. Refresh page (F5)
3. User should remain logged in
4. Check `getCurrentUser()` returns user data

**Status:** ⬜ Tested | ✅ Working

---

### Step 6: Test Data Operations

#### Create Assessment
1. While logged in, create a new assessment
2. Check `cs_assessments` table in Supabase
3. Verify record exists with correct `owner_id`

**Status:** ⬜ Tested | ✅ Working

#### List Assessments
1. Navigate to assessments page
2. Assessments should load from Supabase
3. Only current user's assessments visible

**Status:** ⬜ Tested | ✅ Working

#### Update Assessment
1. Update an assessment (progress, status)
2. Check `cs_assessments` table
3. Verify `updated_at` timestamp changes

**Status:** ⬜ Tested | ✅ Working

---

### Step 7: Security Verification

#### RLS Test (Multi-User)
1. Create User A account
2. Create Assessment A (owned by User A)
3. Logout
4. Create User B account
5. Verify User B cannot see Assessment A
6. Verify User B can only see their own assessments

**Status:** ⬜ Tested | ✅ RLS Working

---

## 🔧 Troubleshooting

### Issue: "Supabase not configured"
**Solution:**
- Verify `.env` file exists in project root
- Check variable names (must start with `VITE_`)
- Restart dev server after creating `.env`

### Issue: "Table does not exist"
**Solution:**
- Run schema SQL in Supabase SQL Editor
- Verify table names start with `cs_` prefix
- Check for SQL errors in Supabase dashboard

### Issue: Authentication fails (400/401)
**Solution:**
- Verify schema has been run
- Check RLS policies are enabled
- Ensure using anon key (not service_role)
- Check Supabase Dashboard → Authentication → Users

### Issue: "Profile not found"
**Solution:**
- Profile should auto-create on signup
- Check `cs_profiles` table for user record
- Verify foreign key to `auth.users` is correct
- Check RLS policies allow insert

### Issue: Data not persisting
**Solution:**
- Check browser console for Supabase errors
- Verify user is authenticated (`auth.users` table)
- Check RLS policies allow insert/update
- Verify `owner_id` matches authenticated user ID

### Issue: Session not persisting
**Solution:**
- Supabase stores session in localStorage automatically
- Check browser localStorage for `sb-*` keys
- Verify `onAuthStateChange` listener is active
- Check browser console for auth errors

---

## 📊 Verification Queries

Run these in Supabase SQL Editor to verify setup:

### Check Tables
```sql
SELECT table_name, 
       (SELECT count(*) FROM information_schema.table_constraints 
        WHERE table_name = t.table_name AND constraint_type = 'PRIMARY KEY') as has_pk
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name LIKE 'cs_%'
ORDER BY table_name;
```

### Check RLS Status
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'cs_%';
```

### Check Policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename LIKE 'cs_%'
ORDER BY tablename, policyname;
```

---

## ✅ Setup Complete When:

- [ ] `.env` file created with correct credentials
- [ ] Database schema run successfully
- [ ] All 4 tables exist (`cs_profiles`, `cs_assessments`, `cs_evidence`, `cs_control_mappings`)
- [ ] RLS enabled on all tables
- [ ] Connection test passes
- [ ] Sign up works and creates user + profile
- [ ] Login works and persists session
- [ ] Assessments can be created and retrieved
- [ ] RLS prevents cross-user data access
- [ ] Session persists across page refreshes

---

## 🚀 Next Steps After Setup

1. **Seed Initial Data** (Optional):
   - Add sample control mappings to `cs_control_mappings`
   - Add sample evidence if needed

2. **Configure Production**:
   - Set environment variables in hosting platform
   - Enable Supabase project for production URL
   - Configure CORS if needed

3. **Monitor**:
   - Set up Supabase dashboard alerts
   - Monitor API usage
   - Check error logs regularly

---

**Setup Status:** ⬜ In Progress | ✅ Complete

**Completed By:** _______________

**Date:** _______________

**Notes:**
_________________________________
_________________________________

