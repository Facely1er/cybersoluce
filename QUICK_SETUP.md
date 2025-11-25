# Quick Setup Guide

This guide helps you quickly set up your local development environment and GitHub Actions.

## 🚀 Local Development Setup

### Step 1: Create Local Environment File

Create a `.env.local` file in the project root with your Supabase credentials:

```bash
# Copy the template (if .env.example exists)
cp .env.example .env.local

# Or create manually
```

### Step 2: Add Your Supabase Credentials

Edit `.env.local` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://uvdrwbmhmtgacwzujfzc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs
VITE_BACKEND_MODE=supabase
VITE_APP_ENVIRONMENT=development
```

### Step 3: Install Dependencies and Run

```bash
npm install
npm run dev
```

## 🔐 GitHub Secrets Setup

### Required Secrets for CI/CD

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

#### Supabase (Production)
- **Name**: `PRODUCTION_SUPABASE_URL`
- **Value**: `https://uvdrwbmhmtgacwzujfzc.supabase.co`

- **Name**: `PRODUCTION_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs`

- **Name**: `PRODUCTION_BACKEND_MODE`
- **Value**: `supabase`

#### Vercel
- **Name**: `VERCEL_TOKEN`
- **Value**: `wmxWT3f4CQbFUv7qEEOB6p7K`

#### Additional Vercel Secrets Needed
You'll need to get these from your Vercel dashboard:
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PRODUCTION_PROJECT_ID` - Your production project ID
- `VERCEL_STAGING_PROJECT_ID` - Your staging project ID (if using staging)

#### Netlify (Optional - if using Netlify)
- `NETLIFY_AUTH_TOKEN` - Your Netlify auth token
- `NETLIFY_PRODUCTION_SITE_ID` - Production site ID
- `NETLIFY_STAGING_SITE_ID` - Staging site ID

## 📋 Complete Setup Checklist

### Local Development
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Add Supabase credentials to `.env.local`
- [ ] Run `npm run dev`
- [ ] Verify application loads correctly

### GitHub Actions
- [ ] Add `PRODUCTION_SUPABASE_URL` secret
- [ ] Add `PRODUCTION_SUPABASE_ANON_KEY` secret
- [ ] Add `PRODUCTION_BACKEND_MODE` secret
- [ ] Add `VERCEL_TOKEN` secret
- [ ] Get and add `VERCEL_ORG_ID` secret
- [ ] Get and add `VERCEL_PRODUCTION_PROJECT_ID` secret
- [ ] Test deployment by pushing to `main` branch

## 🔍 Getting Vercel IDs

### Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link your project (shows org ID)
vercel link

# Check project info
vercel project ls
```

### Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to Settings → General
4. Find:
   - **Organization ID** - In the project URL or settings
   - **Project ID** - Displayed in project settings

## ✅ Verify Setup

### Test Local Development
```bash
npm run dev
# Should start on http://localhost:5173
# Should connect to Supabase successfully
```

### Test GitHub Actions
1. Make a small change
2. Commit and push to `main` branch
3. Go to GitHub → Actions tab
4. Watch the workflow run
5. Check if deployment succeeds

## 🆘 Troubleshooting

### Local Development Issues
- **"Cannot connect to Supabase"**: Check `.env.local` file exists and has correct credentials
- **"Module not found"**: Run `npm install` again
- **Port already in use**: Change port in `vite.config.ts` or kill process using port 5173

### GitHub Actions Issues
- **"Secret not found"**: Verify secret names match exactly (case-sensitive)
- **"Invalid token"**: Check if token is correct and hasn't expired
- **"Deployment failed"**: Check workflow logs for specific error messages

## 📚 Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment information
- Read [SETUP_GITHUB_SECRETS.md](SETUP_GITHUB_SECRETS.md) for complete secrets guide
- Read [ENV_VARIABLES.md](ENV_VARIABLES.md) for all environment variables

---

**⚠️ Security Note**: Never commit `.env.local` or any file containing credentials to version control!

