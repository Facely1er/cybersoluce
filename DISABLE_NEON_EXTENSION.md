# How to Disable Neon Extension in Netlify

## Problem
Netlify build is failing because the Neon extension is installed but not configured. You don't use Neon, so it needs to be disabled.

## Solution: Disable in Netlify UI

### Step 1: Go to Netlify Dashboard
1. Go to [app.netlify.com](https://app.netlify.com)
2. Select your site: **cybersoluce** (or your site name)

### Step 2: Navigate to Extensions
1. Click on **Site settings** (in the top navigation)
2. Scroll down to **Build & deploy**
3. Click on **Extensions** (or look for "Installed extensions")

### Step 3: Remove Neon Extension
1. Find **Neon** in the list of installed extensions
2. Click on it
3. Click **Uninstall** or **Remove**
4. Confirm removal

### Alternative: Disable Without Removing
If you can't remove it:
1. Click on the **Neon** extension
2. Look for **Disable** or **Deactivate** option
3. Disable it

## Verification

After disabling:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Build should now succeed (no Neon extension error)

## Why This Happens

Netlify extensions are configured in the UI, not in `netlify.toml`. The Neon extension was likely added at some point but never configured with the required credentials (NEON_PROJECT_ID, NEON_API_KEY, etc.), causing the build to fail during the extension installation phase.

## Prevention

To prevent this in the future:
- Only install extensions you actually need
- Remove unused extensions promptly
- Check extension status before deploying

---

**Status**: ⚠️ Needs action in Netlify UI  
**Action Required**: Disable/Remove Neon extension in Netlify Dashboard

