# Integration Quick Start Guide

## What Has Been Done ✅

1. **Dependencies Updated**: All required packages from NIST-Implementator and ERMITS-AUDITOR have been added to `package.json`
2. **Supabase Setup**: Created unified Supabase client at `src/lib/supabase.ts`
3. **Directory Structure**: Created `src/data/frameworks/` and `src/features/` directories
4. **Documentation**: Created integration plan and summary documents

## What You Need to Do Next

### Step 1: Install Dependencies
```bash
cd "C:\Users\facel\Downloads\CyberSoluce WorkSpace\cybersoluceplatform-main\cybersoluceplatform-main"
npm install
```

### Step 2: Copy Framework Files

You have two options:

#### Option A: Manual Copy (Recommended for first-time integration)
Copy these files manually:

**From ERMITS-AUDITOR-main:**
- `src/data/frameworks/*.ts` → `cybersoluceplatform-main/src/data/frameworks/`
- Copy all framework files: nist.ts, iso27001.ts, hipaa.ts, cmmc.ts, ferpa.ts, privacy.ts, scrm.ts, hecvat.ts, soc2.ts, pci-dss.ts, nist-800-171.ts

**From NIST-Implementator-main:**
- `src/data/frameworks/nist-csf-v2.ts` → `cybersoluceplatform-main/src/data/frameworks/`

#### Option B: Use PowerShell Script
```powershell
# Copy ERMITS frameworks
$ermitsPath = "C:\Users\facel\Downloads\CyberSoluce WorkSpace\ERMITS-AUDITOR-main\ERMITS-AUDITOR-main\src\data\frameworks"
$targetPath = "C:\Users\facel\Downloads\CyberSoluce WorkSpace\cybersoluceplatform-main\cybersoluceplatform-main\src\data\frameworks"
Copy-Item "$ermitsPath\*.ts" -Destination $targetPath -Force

# Copy NIST CSF v2 framework
$nistPath = "C:\Users\facel\Downloads\CyberSoluce WorkSpace\NIST-Implementator-main\NIST-Implementator-main\src\data\frameworks\nist-csf-v2.ts"
Copy-Item $nistPath -Destination $targetPath -Force
```

### Step 3: Create Framework Index

Create `src/data/frameworks/index.ts`:

```typescript
// Import all frameworks
import { nistFramework } from './nist';
import { nistCSFv2Framework } from './nist-csf-v2';
import { iso27001Framework } from './iso27001';
import { hipaaFramework } from './hipaa';
import { cmmcFramework } from './cmmc';
// ... import other frameworks

// Export unified list
export const frameworks = [
  nistFramework,
  nistCSFv2Framework,
  iso27001Framework,
  hipaaFramework,
  cmmcFramework,
  // ... other frameworks
];

// Export individual frameworks
export {
  nistFramework,
  nistCSFv2Framework,
  iso27001Framework,
  hipaaFramework,
  cmmcFramework,
  // ... other frameworks
};

// Helper function to get framework by ID
export const getFrameworkById = (id: string) => {
  return frameworks.find(f => f.id === id);
};
```

### Step 4: Update Type Definitions

You'll need to extend the Framework type in `src/types/cybersoluce.ts` to support both data models, or create a new unified type. See INTEGRATION_SUMMARY.md for details.

### Step 5: Copy Key Components (Start Small)

Start by copying and adapting one feature at a time:

1. **Start with NIST Compliance Status** (simpler, good test case)
   - Copy from: `NIST-Implementator-main/src/features/compliance/components/RealTimeComplianceStatus.tsx`
   - Adapt to use CyberSoluce UI components
   - Add route: `/nist/compliance`

2. **Then Multi-Framework Assessment** (core ERMITS feature)
   - Copy assessment components from ERMITS
   - Adapt to match design
   - Add routes: `/assessments/multi-framework`, `/assessments/:frameworkId`

### Step 6: Add Routes to App.tsx

Add new routes incrementally. Example:

```typescript
// In App.tsx, add these routes:
<Route path="/nist/compliance" element={<NistCompliancePage />} />
<Route path="/nist/evidence" element={<NistEvidencePage />} />
<Route path="/assessments/multi-framework" element={<MultiFrameworkAssessmentPage />} />
<Route path="/assessments/:frameworkId" element={<FrameworkAssessmentPage />} />
```

### Step 7: Test Incrementally

After each feature integration:
1. Run `npm run dev`
2. Test the new route
3. Fix any errors
4. Commit changes
5. Move to next feature

## Design System Adaptation Checklist

When copying components, ensure they:
- [ ] Use CyberSoluce's UI components (`src/components/ui/*`)
- [ ] Match existing color scheme and styling
- [ ] Use existing Layout and Navbar components
- [ ] Follow existing code patterns
- [ ] Use Zustand for state management (if applicable)
- [ ] Use TanStack Query for data fetching (if applicable)

## Common Issues & Solutions

### Issue: Type Mismatches
**Solution**: Create adapter functions or extend types to support both models

### Issue: Import Errors
**Solution**: Check import paths, ensure all dependencies are installed

### Issue: Styling Conflicts
**Solution**: Use Tailwind classes consistently, remove conflicting CSS

### Issue: Route Conflicts
**Solution**: Use unique route prefixes (`/nist/`, `/assessments/`)

## Recommended Integration Order

1. ✅ Dependencies & Infrastructure (Done)
2. ⏳ Framework Data (Next)
3. ⏳ NIST Compliance Status (Simple feature)
4. ⏳ Multi-Framework Assessment (Core feature)
5. ⏳ Evidence Collection
6. ⏳ Other NIST features
7. ⏳ Other ERMITS features
8. ⏳ Authentication integration
9. ⏳ Testing & polish

## Getting Help

- Review `INTEGRATION_PLAN.md` for detailed strategy
- Review `INTEGRATION_SUMMARY.md` for challenges and solutions
- Check original projects for component patterns
- Test incrementally after each change

## Environment Variables Needed

Add to `.env` or `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_LOCAL_STORAGE_PREFIX=cybersoluce
```

## Next Immediate Action

**Run this command to install dependencies:**
```bash
npm install
```

Then proceed with Step 2 (copying framework files).

