# Quick Start Guide

Get your CyberSoluce application running with Supabase backend in 5 minutes.

## Step 1: Create `.env` File

Create a `.env` file in the project root (`cybersoluce-merged/`) with:

```env
VITE_SUPABASE_URL=https://uvdrwbmhmtgacwzujfzc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs
VITE_BACKEND_MODE=supabase
```

## Step 2: Run Database Schema

1. Open your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy the entire contents of `supabase/schema.cybersoluce.sql`
6. Paste and click **Run** (or press Ctrl+Enter)
7. Verify success message

## Step 3: Start Development Server

```bash
cd cybersoluce-merged
npm install  # if you haven't already
npm run dev
```

## Step 4: Test Connection

Open browser console (F12) and run:

```javascript
// Import the test function (if using modules)
// Or access via window.testSupabaseConnection if available

// Test Supabase connection
testSupabaseConnection()
```

Expected output:
- ✅ Supabase client initialized
- ✅ Connection successful
- ✅ All tables accessible

## Step 5: Test Authentication

1. Navigate to `/signup`
2. Create a test account
3. Check Supabase Dashboard → Authentication → Users
4. Verify user appears in `auth.users` and `cs_profiles` tables
5. Login with the new account
6. Create an assessment
7. Verify data appears in `cs_assessments` table

## Troubleshooting

### "Supabase not configured"
- Check `.env` file exists in project root
- Verify variable names are correct (must start with `VITE_`)
- Restart dev server after creating `.env`

### "Table does not exist"
- Run the schema SQL in Supabase SQL Editor
- Check table names start with `cs_` prefix

### Authentication fails
- Verify schema has been run
- Check RLS policies are enabled (Supabase Dashboard → Authentication → Policies)
- Ensure you're using the **anon key**, not service_role key

### Data not saving
- Check browser console for errors
- Verify user is authenticated
- Check RLS policies allow insert/update operations

## Switching Back to Local Storage

To use localStorage instead of Supabase:

```env
VITE_BACKEND_MODE=local
```

Or simply remove/comment out the Supabase variables - it defaults to `local`.

## Need Help?

- See `SUPABASE_SETUP.md` for detailed setup instructions
- See `VERIFICATION_CHECKLIST.md` for comprehensive testing steps
- Check browser console for error messages
- Verify Supabase dashboard for data and logs

---

**Ready to go!** 🚀

