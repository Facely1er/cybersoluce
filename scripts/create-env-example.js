#!/usr/bin/env node

/**
 * Script to create .env.example file from ENV_VARIABLES.md template
 * Usage: node scripts/create-env-example.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envTemplate = `# =============================================================================
# CyberSoluce Environment Variables Template
# =============================================================================
# Copy this file to .env and fill in your values
# Never commit .env files to version control
# =============================================================================

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
VITE_APP_ENVIRONMENT=development
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
`;

const rootDir = path.resolve(__dirname, '..');
const envExamplePath = path.join(rootDir, '.env.example');

try {
  // Check if .env.example already exists
  if (fs.existsSync(envExamplePath)) {
    console.log('⚠️  .env.example already exists');
    console.log('   To regenerate, delete it first and run this script again.');
    process.exit(0);
  }

  // Write .env.example file
  fs.writeFileSync(envExamplePath, envTemplate, 'utf8');
  console.log('✅ Created .env.example file successfully!');
  console.log(`   Location: ${envExamplePath}`);
  console.log('\n📝 Next steps:');
  console.log('   1. Copy .env.example to .env');
  console.log('   2. Fill in your actual values');
  console.log('   3. Never commit .env to version control');
} catch (error) {
  console.error('❌ Error creating .env.example:', error.message);
  process.exit(1);
}

