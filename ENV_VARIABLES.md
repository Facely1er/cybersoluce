# Environment Variables Reference

This document lists all environment variables used by the CyberSoluce platform. Create a `.env` file in the project root with these variables for local development.

**⚠️ IMPORTANT**: Never commit `.env` files to version control. The `.env` file is already in `.gitignore`.

## Quick Start

1. Copy the template below to create your `.env` file
2. Fill in the values for your environment
3. Restart your development server

## Environment Variables Template

```env
# =============================================================================
# SUPABASE CONFIGURATION (Optional - defaults to localStorage)
# =============================================================================
# If using Supabase backend, provide your Supabase project credentials
# Get these from: https://app.supabase.com → Project Settings → API
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_BACKEND_MODE=local
# Options: "local" (localStorage) or "supabase" (Supabase backend)

# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
VITE_APP_NAME=CyberSoluce
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
# Options: "development", "staging", "production"

# =============================================================================
# API CONFIGURATION
# =============================================================================
# Base URL for CyberSoluce API (if using external API)
VITE_CS_API_BASE_URL=https://api.cybersoluce.com
VITE_CS_API_VERSION=v1
VITE_CS_API_TIMEOUT=30000

# =============================================================================
# AUTHENTICATION CONFIGURATION
# =============================================================================
VITE_AUTH_TOKEN_STORAGE_KEY=cs_auth_token
VITE_AUTH_REFRESH_TOKEN_KEY=cs_refresh_token
VITE_AUTH_SESSION_TIMEOUT=3600000
# Session timeout in milliseconds (default: 1 hour)

# =============================================================================
# ANALYTICS & MONITORING (Optional)
# =============================================================================
# Google Analytics Tracking ID
VITE_GOOGLE_ANALYTICS_ID=

# Sentry Error Tracking DSN
# Get from: https://sentry.io → Project Settings → Client Keys (DSN)
VITE_SENTRY_DSN=
VITE_SENTRY_ENVIRONMENT=production

# Hotjar Site ID (for user behavior analytics)
VITE_HOTJAR_ID=

# Enable/disable analytics and monitoring
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
VITE_ENABLE_PERFORMANCE_MONITORING=false

# =============================================================================
# FEATURE FLAGS
# =============================================================================
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_DEMO_MODE=false
VITE_ENABLE_LAZY_LOADING=true
VITE_ENABLE_COMPRESSION=true

# =============================================================================
# SECURITY CONFIGURATION
# =============================================================================
VITE_ENABLE_CSP=true
# Comma-separated list of allowed origins for CORS
VITE_ALLOWED_ORIGINS=https://cybersoluce.com,https://www.cybersoluce.com
# Maximum file upload size in bytes (default: 10MB)
VITE_MAX_FILE_SIZE=10485760

# =============================================================================
# SERVICE ENDPOINTS (Optional)
# =============================================================================
# PDF Generation Service
VITE_CS_PDF_SERVICE_URL=
# Notification Service
VITE_CS_NOTIFICATION_SERVICE_URL=
# Storage Service
VITE_CS_STORAGE_SERVICE_URL=

# =============================================================================
# CDN CONFIGURATION (Optional)
# =============================================================================
VITE_CDN_BASE_URL=
VITE_STATIC_ASSETS_URL=

# =============================================================================
# LOGGING CONFIGURATION (Optional)
# =============================================================================
# Log level: debug, info, warn, error, critical
VITE_LOG_LEVEL=error
# Remote logging endpoint (if using external logging service)
VITE_LOG_ENDPOINT=

# =============================================================================
# CUSTOM ANALYTICS (Optional)
# =============================================================================
VITE_CS_ANALYTICS_ID=
VITE_CUSTOM_ANALYTICS_ENDPOINT=

# =============================================================================
# LOCAL STORAGE PREFIX (Optional)
# =============================================================================
# Prefix for localStorage keys when using local backend mode
VITE_LOCAL_STORAGE_PREFIX=cybersoluce
```

## Variable Descriptions

### Required for Production

#### Supabase Configuration (if using Supabase backend)
- **VITE_SUPABASE_URL**: Your Supabase project URL
- **VITE_SUPABASE_ANON_KEY**: Your Supabase anonymous key (safe for client-side)
- **VITE_BACKEND_MODE**: `"local"` or `"supabase"`

#### Application Configuration
- **VITE_APP_ENVIRONMENT**: `"production"` for production deployments

### Optional but Recommended

#### Error Tracking
- **VITE_SENTRY_DSN**: Sentry DSN for error tracking (highly recommended for production)
- **VITE_ENABLE_ERROR_TRACKING**: Set to `"true"` to enable error tracking

#### Analytics
- **VITE_GOOGLE_ANALYTICS_ID**: Google Analytics tracking ID
- **VITE_ENABLE_ANALYTICS**: Set to `"true"` to enable analytics

### Development Only

These variables are typically only needed for local development:
- **VITE_ENABLE_DEBUG_MODE**: Enable debug logging
- **VITE_ENABLE_DEMO_MODE**: Enable demo mode features

## Environment-Specific Values

### Development
```env
VITE_APP_ENVIRONMENT=development
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_ERROR_TRACKING=false
VITE_ENABLE_ANALYTICS=false
```

### Staging
```env
VITE_APP_ENVIRONMENT=staging
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_ANALYTICS=false
```

### Production
```env
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn-here
VITE_GOOGLE_ANALYTICS_ID=your-ga-id-here
```

## Setting Environment Variables in Netlify

For production deployments on Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add each variable with its production value
4. Redeploy your site

Variables can also be set in `netlify.toml` under `[context.production.environment]`, but sensitive values should be set in the Netlify dashboard.

## Validation

The application validates required environment variables in production mode. Missing critical variables will cause the application to fail at startup with a clear error message.

## Security Notes

- **Never commit `.env` files** - They are in `.gitignore`
- **Use ANON key for Supabase** - Never use the service_role key in frontend code
- **Keep Sentry DSN private** - While DSNs are designed to be public, keep them secure
- **Rotate keys regularly** - Update API keys and tokens periodically

## Troubleshooting

### "Missing required environment variables" error
- Check that all required variables are set
- Verify variable names start with `VITE_`
- Restart your development server after changing `.env`

### Supabase connection errors
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check that you're using the ANON key, not the service_role key
- Ensure Supabase schema has been deployed

### Sentry not working
- Verify `VITE_SENTRY_DSN` is set correctly
- Check that `VITE_ENABLE_ERROR_TRACKING=true`
- Ensure you're running in production mode (`VITE_APP_ENVIRONMENT=production`)

