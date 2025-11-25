# Create Clean Repository Location

## Current Structure
```
CyberSoluce-Files/
└── cybersoluce-merged-main/    ← Nested inside parent folder
```

## Desired Clean Structure
```
cybersoluce/                    ← Clean, standalone repository
├── src/
├── public/
├── package.json
├── netlify.toml
└── ...
```

---

## Option 1: Move Repository to Clean Location (Recommended)

### Step 1: Create New Clean Location
```powershell
# Navigate to Downloads
cd C:\Users\facel\Downloads

# Create new clean directory
New-Item -ItemType Directory -Path "cybersoluce" -Force
```

### Step 2: Copy Repository Contents
```powershell
# Copy all files from nested location to clean location
Copy-Item -Path "CyberSoluce-Files\cybersoluce-merged-main\*" -Destination "cybersoluce\" -Recurse -Force

# Copy hidden files (.git, .vscode, etc.)
Copy-Item -Path "CyberSoluce-Files\cybersoluce-merged-main\.git" -Destination "cybersoluce\" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "CyberSoluce-Files\cybersoluce-merged-main\.vscode" -Destination "cybersoluce\" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 3: Initialize Git (if needed)
```powershell
cd cybersoluce

# If .git doesn't exist, initialize
if (-not (Test-Path ".git")) {
    git init
    git remote add origin https://github.com/Facely1er/cybersoluce-merged.git
}

# Verify remote
git remote -v
```

### Step 4: Verify Structure
```powershell
# Check that all files are present
Get-ChildItem -Force | Select-Object Name

# Verify key files exist
Test-Path "package.json"
Test-Path "netlify.toml"
Test-Path "src"
Test-Path "public"
```

---

## Option 2: Clone Fresh Repository

### Step 1: Clone Repository
```powershell
cd C:\Users\facel\Downloads
git clone https://github.com/Facely1er/cybersoluce-merged.git cybersoluce
cd cybersoluce
```

### Step 2: Verify and Install
```powershell
# Install dependencies
npm install

# Verify build works
npm run build
```

---

## Option 3: Use PowerShell Script (Automated)

I'll create a script to automate this process.

---

## After Creating Clean Repo

### 1. Update Netlify Configuration
If deploying to Netlify:
- **Base directory**: Leave empty (or remove if set)
- **Build command**: `npm ci && npm run build`
- **Publish directory**: `dist`

### 2. Verify Git Remote
```powershell
git remote -v
# Should show your GitHub repository
```

### 3. Test Build
```powershell
npm run build
# Should complete successfully
```

### 4. Push Changes
```powershell
git add .
git commit -m "Initial clean repository setup"
git push origin main
```

---

## Recommended Clean Structure

```
cybersoluce/                    ← Repository root
├── .github/
│   └── workflows/
├── public/
├── src/
├── supabase/
├── scripts/
├── docs/
├── .env.example
├── .gitignore
├── netlify.toml
├── package.json
├── README.md
└── ...
```

---

## Next Steps After Clean Repo

1. ✅ Verify all files copied correctly
2. ✅ Test build: `npm run build`
3. ✅ Update Netlify base directory (if needed)
4. ✅ Push to GitHub
5. ✅ Deploy!

---

**Note**: After creating the clean repo, you can delete the old nested structure if desired.

