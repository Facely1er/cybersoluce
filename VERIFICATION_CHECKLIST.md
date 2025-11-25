# Supabase Integration Verification Checklist

Use this checklist to verify that your Supabase backend integration is working correctly.

## Pre-Flight Checks

- [ ] `.env` file created in project root with correct Supabase credentials
- [ ] `VITE_BACKEND_MODE=supabase` is set in `.env`
- [ ] Database schema (`supabase/schema.cybersoluce.sql`) has been run in Supabase SQL Editor
- [ ] Development server restarted after creating `.env` file

## Database Schema Verification

Run these queries in Supabase SQL Editor to verify tables exist:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'cs_%';

-- Expected tables:
-- cs_profiles
-- cs_assessments
-- cs_evidence
-- cs_control_mappings
```

- [ ] All 4 tables (`cs_profiles`, `cs_assessments`, `cs_evidence`, `cs_control_mappings`) exist
- [ ] RLS is enabled on all tables (check in Supabase Dashboard → Authentication → Policies)

## Frontend Connection Test

1. **Check Browser Console** (F12 → Console tab):
   - [ ] No Supabase connection errors on page load
   - [ ] No "Supabase not configured" errors

2. **Check Network Tab** (F12 → Network tab):
   - [ ] When signing up/logging in, see requests to `*.supabase.co`
   - [ ] Requests return 200/201 status codes (not 401/403)

## Authentication Flow Test

### Sign Up Test
- [ ] Navigate to `/signup`
- [ ] Fill in signup form with test credentials
- [ ] Submit form
- [ ] Check Supabase Dashboard → Authentication → Users
- [ ] New user appears in `auth.users` table
- [ ] Profile created in `cs_profiles` table

### Login Test
- [ ] Navigate to `/login`
- [ ] Use credentials from signup test
- [ ] Login succeeds
- [ ] User redirected to dashboard
- [ ] `getCurrentUser()` returns user data

### Logout Test
- [ ] Click logout
- [ ] User session cleared
- [ ] Redirected to login/home page

## Assessment CRUD Test

### Create Assessment
- [ ] Create a new assessment
- [ ] Check `cs_assessments` table in Supabase
- [ ] New assessment record exists with correct `owner_id`

### List Assessments
- [ ] Navigate to assessments page
- [ ] Assessments load from Supabase
- [ ] Only current user's assessments are shown (RLS working)

### Update Assessment
- [ ] Update an assessment (progress, score, status)
- [ ] Changes persist in `cs_assessments` table
- [ ] `updated_at` timestamp updates

### Delete Assessment
- [ ] Delete an assessment
- [ ] Record removed from `cs_assessments` table

## Security Verification (RLS)

Test that Row Level Security is working:

1. **Create two test users** (User A and User B)
2. **As User A:**
   - [ ] Create an assessment
   - [ ] Can see only User A's assessments
   - [ ] Cannot see User B's assessments
3. **As User B:**
   - [ ] Can see only User B's assessments
   - [ ] Cannot see or modify User A's assessments

## Backend Mode Switching Test

### Test Local Backend
- [ ] Set `VITE_BACKEND_MODE=local` in `.env`
- [ ] Restart dev server
- [ ] App works with localStorage (no Supabase calls)
- [ ] Data persists in browser localStorage

### Test Supabase Backend
- [ ] Set `VITE_BACKEND_MODE=supabase` in `.env`
- [ ] Restart dev server
- [ ] App uses Supabase backend
- [ ] Data persists in Supabase database

## Common Issues & Solutions

### Issue: "Supabase not configured" error
**Solution:**
- Verify `.env` file exists in project root
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after creating/updating `.env`

### Issue: Authentication fails with 400/401
**Solution:**
- Verify schema has been run (tables exist)
- Check RLS policies are enabled
- Verify anon key is correct (not service_role key)

### Issue: Data not persisting
**Solution:**
- Check browser console for Supabase errors
- Verify RLS policies allow authenticated users to insert/update
- Check `auth.users` table - user must exist and be authenticated

### Issue: "Profile not found" error
**Solution:**
- Profile should be created automatically on signup
- Check `cs_profiles` table for user record
- Verify foreign key relationship to `auth.users` is correct

## Performance Checks

- [ ] Initial page load time acceptable (< 3 seconds)
- [ ] Authentication requests complete in < 1 second
- [ ] Assessment queries return quickly (< 500ms)

## Production Readiness

Before deploying to production:

- [ ] Environment variables set in hosting platform (Netlify/Vercel)
- [ ] `VITE_BACKEND_MODE=supabase` set in production
- [ ] Supabase project has production URL configured
- [ ] RLS policies tested and verified
- [ ] Database backups configured in Supabase
- [ ] Monitoring/alerts set up in Supabase dashboard

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Last Verified:** _______________

**Notes:**
_________________________________
_________________________________

