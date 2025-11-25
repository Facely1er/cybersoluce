# GitHub Secrets Setup Guide

This guide helps you configure GitHub Secrets for CI/CD deployments.

## 🔐 Required GitHub Secrets

### Supabase Configuration

#### Production Secrets
- `PRODUCTION_SUPABASE_URL` - Your production Supabase project URL
- `PRODUCTION_SUPABASE_ANON_KEY` - Your production Supabase anonymous key
- `PRODUCTION_BACKEND_MODE` - Backend mode (usually `supabase`)

#### Staging Secrets
- `STAGING_SUPABASE_URL` - Your staging Supabase project URL
- `STAGING_SUPABASE_ANON_KEY` - Your staging Supabase anonymous key
- `STAGING_BACKEND_MODE` - Backend mode (usually `supabase`)

### Vercel Configuration
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PRODUCTION_PROJECT_ID` - Production project ID
- `VERCEL_STAGING_PROJECT_ID` - Staging project ID

### Netlify Configuration
- `NETLIFY_AUTH_TOKEN` - Netlify authentication token
- `NETLIFY_PRODUCTION_SITE_ID` - Production site ID
- `NETLIFY_STAGING_SITE_ID` - Staging site ID

### Monitoring & Analytics (Optional but Recommended)
- `PRODUCTION_SENTRY_DSN` - Sentry DSN for production error tracking
- `STAGING_SENTRY_DSN` - Sentry DSN for staging error tracking
- `PRODUCTION_GOOGLE_ANALYTICS_ID` - Google Analytics ID for production

## 📝 How to Add GitHub Secrets

### Step 1: Navigate to Repository Settings
1. Go to your GitHub repository
2. Click on **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Secrets
1. Click **New repository secret**
2. Enter the secret name (e.g., `PRODUCTION_SUPABASE_URL`)
3. Enter the secret value
4. Click **Add secret**
5. Repeat for all required secrets

### Step 3: Verify Secrets
After adding secrets, they will appear in the secrets list (values are hidden for security).

## 🔑 Your Current Credentials

### Supabase (Production)
```
VITE_SUPABASE_URL=https://uvdrwbmhmtgacwzujfzc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs
```

**Add these as GitHub Secrets:**
- `PRODUCTION_SUPABASE_URL` = `https://uvdrwbmhmtgacwzujfzc.supabase.co`
- `PRODUCTION_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHJ3Ym1obXRnYWN3enVqZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTgxOTEsImV4cCI6MjA3ODY5NDE5MX0.VgsSXsKsPspHToKb2a8m4myz6PDw3GRyPJke4ZXiUTs`
- `PRODUCTION_BACKEND_MODE` = `supabase`

### Vercel Token
```
VERCEL_TOKEN=wmxWT3f4CQbFUv7qEEOB6p7K
```

**Add as GitHub Secret:**
- `VERCEL_TOKEN` = `wmxWT3f4CQbFUv7qEEOB6p7K`

## 🔍 Finding Additional Required Values

### Vercel Organization ID and Project IDs

1. **Get Vercel Organization ID:**
   ```bash
   # Install Vercel CLI if not already installed
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link your project (this will show your org ID)
   vercel link
   ```
   
   Or check in Vercel Dashboard:
   - Go to your project settings
   - Organization ID is visible in the URL or project settings

2. **Get Project IDs:**
   - Go to Vercel Dashboard → Your Project → Settings → General
   - Project ID is displayed in the project settings
   - You'll need separate IDs for staging and production projects

### Netlify Site IDs and Token

1. **Get Netlify Auth Token:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login (this generates a token)
   netlify login
   
   # Get your token
   netlify status
   ```
   
   Or in Netlify Dashboard:
   - User Settings → Applications → New access token

2. **Get Site IDs:**
   - Go to Netlify Dashboard → Site Settings → General
   - Site ID is displayed at the top of the page
   - You'll need separate IDs for staging and production sites

## ✅ Quick Setup Checklist

- [ ] Add `PRODUCTION_SUPABASE_URL` to GitHub Secrets
- [ ] Add `PRODUCTION_SUPABASE_ANON_KEY` to GitHub Secrets
- [ ] Add `PRODUCTION_BACKEND_MODE` to GitHub Secrets
- [ ] Add `VERCEL_TOKEN` to GitHub Secrets
- [ ] Get and add `VERCEL_ORG_ID` to GitHub Secrets
- [ ] Get and add `VERCEL_PRODUCTION_PROJECT_ID` to GitHub Secrets
- [ ] Get and add `VERCEL_STAGING_PROJECT_ID` to GitHub Secrets (if using staging)
- [ ] Get and add `NETLIFY_AUTH_TOKEN` to GitHub Secrets (if using Netlify)
- [ ] Get and add `NETLIFY_PRODUCTION_SITE_ID` to GitHub Secrets (if using Netlify)
- [ ] Get and add `NETLIFY_STAGING_SITE_ID` to GitHub Secrets (if using Netlify)
- [ ] Add `STAGING_SUPABASE_URL` and `STAGING_SUPABASE_ANON_KEY` (if using staging)
- [ ] Add Sentry DSNs (optional but recommended)
- [ ] Add Google Analytics ID (optional)

## 🧪 Testing the Setup

After adding secrets, test the workflows:

1. **Test Staging Deployment:**
   ```bash
   git checkout staging
   git push origin staging
   ```
   Check GitHub Actions tab to see if deployment succeeds

2. **Test Production Deployment:**
   ```bash
   git checkout main
   git push origin main
   ```
   Check GitHub Actions tab to see if deployment succeeds

## 🔒 Security Best Practices

1. **Never commit secrets to code** - Always use GitHub Secrets
2. **Rotate tokens regularly** - Update tokens every 90 days
3. **Use different credentials for staging/production** - Never share credentials between environments
4. **Limit access** - Only grant access to team members who need it
5. **Monitor usage** - Regularly check GitHub Actions logs for any unauthorized access

## 🆘 Troubleshooting

### "Secret not found" error
- Verify the secret name matches exactly (case-sensitive)
- Ensure you're using the correct secret name in workflows
- Check that secrets are added to the correct repository

### "Invalid token" error
- Verify the token is correct and hasn't expired
- Check if the token has the required permissions
- Regenerate the token if necessary

### Deployment fails with authentication error
- Double-check all required secrets are added
- Verify secret values are correct (no extra spaces)
- Check if tokens have expired and need regeneration

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Netlify CLI Documentation](https://docs.netlify.com/cli/get-started/)
- [Supabase Documentation](https://supabase.com/docs)

---

**⚠️ IMPORTANT**: Never share these credentials publicly or commit them to version control!

