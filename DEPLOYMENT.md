# CyberSoluce™ - Deployment Guide

Quick reference guide for deploying CyberSoluce to different environments.

## 📋 Quick Links

- **[Production Deployment Guide](PRODUCTION_DEPLOYMENT.md)** - Comprehensive production deployment documentation
- **[Environment Variables](ENV_VARIABLES.md)** - Complete environment variables reference
- **[GitHub Workflows](.github/workflows/)** - CI/CD pipeline configuration

## 🚀 Deployment Environments

### Development
- **Branch**: `develop` or feature branches
- **URL**: Local development server (`npm run dev`)
- **Purpose**: Local development and testing

### Staging
- **Branch**: `staging` or `develop`
- **URL**: `https://staging.cybersoluce.com`
- **Purpose**: Pre-production testing and QA
- **Deployment**: Automatic via GitHub Actions on push to `staging` branch

### Production
- **Branch**: `main` or `master`
- **URL**: `https://cybersoluce.com`
- **Purpose**: Live production environment
- **Deployment**: Automatic via GitHub Actions on push to `main` branch or manual via workflow_dispatch

## 🔧 Prerequisites

1. **Node.js**: Version 20 or higher
2. **npm**: Version 8 or higher
3. **Git**: Latest version
4. **Environment Variables**: Configured in deployment platform (Netlify/Vercel)

## 📦 Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/cybersoluce/app.git
cd app

# Install dependencies
npm ci

# Copy environment variables template
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

### Build for Production
```bash
# Install dependencies
npm ci

# Run tests
npm run test:run

# Build application
npm run build

# Output will be in ./dist directory
```

## 🌐 Deployment Platforms

### Netlify (Primary)

#### Automatic Deployment
- Configured via `.github/workflows/deploy-production.yml` and `deploy-staging.yml`
- Automatic deployment on push to `main` (production) or `staging` (staging)

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=dist

# Deploy preview
netlify deploy --dir=dist
```

#### Configuration
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Configuration file: `netlify.toml`

### Vercel (Alternative)

#### Automatic Deployment
- Configured via `.github/workflows/deploy-production.yml` and `deploy-staging.yml`
- Automatic deployment on push to `main` (production) or `staging` (staging)

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

#### Configuration
- Configuration file: `vercel.json`
- Framework: Vite (auto-detected)

## 🔐 Environment Variables

### Required for Production
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_BACKEND_MODE` - Backend mode (`local` or `supabase`)
- `VITE_APP_ENVIRONMENT` - Environment (`production`, `staging`, `development`)

### Recommended for Production
- `VITE_SENTRY_DSN` - Sentry error tracking DSN
- `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID
- `VITE_ENABLE_ERROR_TRACKING` - Enable error tracking (`true`/`false`)
- `VITE_ENABLE_ANALYTICS` - Enable analytics (`true`/`false`)

See [ENV_VARIABLES.md](ENV_VARIABLES.md) for complete list.

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on: All pushes and pull requests
   - Steps: Install → Lint → Test → Build

2. **Staging Deployment** (`.github/workflows/deploy-staging.yml`)
   - Runs on: Push to `staging` or `develop` branch
   - Steps: Test → Deploy to Netlify Staging → Deploy to Vercel Staging

3. **Production Deployment** (`.github/workflows/deploy-production.yml`)
   - Runs on: Push to `main`/`master` or release publish
   - Steps: Test → Security Scan → Deploy to Netlify Production → Deploy to Vercel Production

### Required GitHub Secrets

#### Netlify
- `NETLIFY_AUTH_TOKEN` - Netlify authentication token
- `NETLIFY_PRODUCTION_SITE_ID` - Production site ID
- `NETLIFY_STAGING_SITE_ID` - Staging site ID

#### Vercel
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PRODUCTION_PROJECT_ID` - Production project ID
- `VERCEL_STAGING_PROJECT_ID` - Staging project ID

#### Environment Variables
- `PRODUCTION_SUPABASE_URL` - Production Supabase URL
- `PRODUCTION_SUPABASE_ANON_KEY` - Production Supabase key
- `STAGING_SUPABASE_URL` - Staging Supabase URL
- `STAGING_SUPABASE_ANON_KEY` - Staging Supabase key
- `PRODUCTION_SENTRY_DSN` - Production Sentry DSN
- `STAGING_SENTRY_DSN` - Staging Sentry DSN
- `PRODUCTION_GOOGLE_ANALYTICS_ID` - Production GA ID

## ✅ Pre-Deployment Checklist

- [ ] All tests passing (`npm run test:run`)
- [ ] No linting errors (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured
- [ ] Security audit passed (`npm audit`)
- [ ] Documentation updated
- [ ] Changelog updated (if applicable)

## 🚨 Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm ci
npm run build
```

### Environment Variable Issues
- Verify all required variables are set in deployment platform
- Check variable names start with `VITE_`
- Ensure no trailing spaces in values
- Restart deployment after adding variables

### Deployment Failures
- Check GitHub Actions logs for detailed error messages
- Verify secrets are correctly configured
- Ensure branch protection rules allow deployment
- Check deployment platform status pages

## 📚 Additional Resources

- [Production Deployment Guide](PRODUCTION_DEPLOYMENT.md) - Comprehensive deployment documentation
- [Environment Variables](ENV_VARIABLES.md) - Complete environment variables reference
- [README.md](README.md) - Project overview and setup
- [Testing Guide](docs/testing.md) - Testing best practices
- [API Documentation](docs/api.md) - API integration guide

## 🆘 Support

For deployment issues or questions:
- **GitHub Issues**: [Create an issue](https://github.com/cybersoluce/app/issues)
- **Email**: support@cybersoluce.com
- **Documentation**: [docs.cybersoluce.com](https://docs.cybersoluce.com)

---

**Last Updated**: January 2025  
**Maintained By**: CyberSoluce Development Team

