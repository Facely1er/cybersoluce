# Supabase Backend Setup Guide

This guide will help you configure the CyberSoluce application to use Supabase as the backend instead of localStorage.

## Prerequisites

1. A Supabase account and project
2. The Supabase schema has been run in your Supabase SQL editor (see `supabase/schema.cybersoluce.sql`)

## Step 1: Run the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.cybersoluce.sql`
4. Run the SQL script to create all necessary tables and policies

## Step 2: Configure Environment Variables

Create a `.env` file in the root of the project with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://uvdrwbmhmtgacwzujfzc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs

# Backend Mode: "local" (localStorage) or "supabase" (Supabase backend)
VITE_BACKEND_MODE=supabase
```

**Important**: 
- The `.env` file is already in `.gitignore` and will not be committed to version control.
- **Use the ANON KEY, NOT the service_role key** for the frontend application.
- The service_role key bypasses Row Level Security and should ONLY be used in secure backend environments.

### Key Types Explained

- **Anon Key** (`role: "anon"`): Safe for client-side use. Respects RLS policies. ✅ Use this for frontend.
- **Service Role Key** (`role: "service_role"`): Bypasses RLS. ⚠️ **NEVER use in frontend code**. Only for secure backend services.

## Step 3: Restart Development Server

After creating/updating the `.env` file, restart your development server:

```bash
npm run dev
```

## Step 4: Verify Configuration

1. Open the browser console
2. Check for any Supabase connection errors
3. Try logging in or signing up - authentication should now use Supabase

## Switching Between Backends

You can switch between backends by changing the `VITE_BACKEND_MODE` variable:

- `VITE_BACKEND_MODE=local` - Uses localStorage (default, no Supabase required)
- `VITE_BACKEND_MODE=supabase` - Uses Supabase backend (requires Supabase credentials)

If `VITE_BACKEND_MODE` is not set, it defaults to `"local"`.

## Troubleshooting

### "Supabase not configured" error
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly
- Restart the development server after updating `.env`

### Authentication fails
- Verify the schema has been run in Supabase SQL editor
- Check that RLS policies are enabled on all tables
- Verify the anon key has the correct permissions

### Data not persisting
- Check browser console for Supabase errors
- Verify RLS policies allow the authenticated user to read/write their own data
- Ensure the user is properly authenticated (check `auth.users` table in Supabase)

## Direct Database Access (Optional)

If you need direct PostgreSQL access for migrations or administration, you can use:

```
postgresql://postgres:[PASSWORD]@db.uvdrwbmhmtgacwzujfzc.supabase.co:5432/postgres
```

**Note**: This connection string is NOT used by the frontend application. The React app uses the Supabase client library with the anon key. This connection string is only for:
- Database administration tools (pgAdmin, DBeaver, etc.)
- Running migrations directly
- Backend services that need direct DB access

## Security Notes

- **Use the ANON KEY for frontend** - it's safe to use in client-side code (it's designed for this)
- **NEVER use the service_role key in frontend** - it bypasses all security policies and should only be used in secure backend environments
- Row Level Security (RLS) policies ensure users can only access their own data (when using anon key)
- Never commit your `.env` file to version control
- Never commit database connection strings with passwords
- Never commit service_role keys
- For production, set environment variables in your hosting platform (Netlify, Vercel, etc.)

### Finding Your Keys

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. **Project API keys** section:
   - `anon` `public` key → Use this for `VITE_SUPABASE_ANON_KEY` ✅
   - `service_role` `secret` key → **DO NOT use in frontend** ⚠️

