# Netlify Neon Extension Fix

## Problem
Netlify build fails during "Installing extensions" phase because Neon extension is installed but not configured.

**Error**: Build stops at line 68 (Neon extension installation) with exit code 2.

## Root Cause
- Neon extension is installed in Netlify UI
- Extension requires configuration (NEON_PROJECT_ID, NEON_API_KEY, NEON_DATABASE_URL)
- Since you don't use Neon, the extension fails to install

## Solution

### Option 1: Disable in Netlify UI (Recommended)

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Extensions**
   - Site settings → Build & deploy → Extensions
   - OR: Site settings → Extensions (direct link)

3. **Remove/Disable Neon**
   - Find "Neon" extension
   - Click "Uninstall" or "Remove"
   - Confirm removal

4. **Redeploy**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"
   - Build should now succeed

### Option 2: Configure Neon (If You Need It)

If you actually need Neon:
1. Go to Neon extension settings
2. Connect to your Neon project
3. Add required environment variables:
   - `NEON_PROJECT_ID`
   - `NEON_API_KEY`
   - `NEON_DATABASE_URL`

## Verification

After disabling Neon:
- ✅ Build should proceed past "Installing extensions"
- ✅ Build should complete successfully
- ✅ No Neon-related errors

## Files Updated

- `netlify.toml` - Added note about extensions being configured in UI
- `DISABLE_NEON_EXTENSION.md` - Step-by-step guide

---

**Action Required**: Disable Neon extension in Netlify Dashboard  
**Status**: ⚠️ Waiting for UI action

