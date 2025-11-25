# GitHub Repository Setup Guide

This guide will help you create a GitHub repository for the CyberSoluce-merged project.

## Prerequisites

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Or install via winget: `winget install Git.Git`
   - Or install via Chocolatey: `choco install git`

2. **Install GitHub CLI** (optional but recommended):
   - Download from: https://cli.github.com/
   - Or install via winget: `winget install GitHub.cli`
   - Or install via Chocolatey: `choco install gh`

3. **GitHub Account**: Make sure you have a GitHub account and are logged in.

## Method 1: Using GitHub CLI (Recommended)

If you have GitHub CLI installed, run the PowerShell script:

```powershell
.\setup-github-repo.ps1
```

This will:
- Initialize a git repository
- Create a .gitignore if needed
- Add all files
- Create an initial commit
- Create a GitHub repository
- Push the code to GitHub

## Method 2: Manual Setup

### Step 1: Initialize Git Repository

Open PowerShell in the project directory and run:

```powershell
# Navigate to project directory
cd "C:\Users\facel\Downloads\CyberSoluce WorkSpace\cybersoluce-merged"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CyberSoluce platform"
```

### Step 2: Create GitHub Repository

**Option A: Using GitHub CLI**
```powershell
# Authenticate (if not already done)
gh auth login

# Create repository
gh repo create cybersoluce-merged --public --source=. --remote=origin --push
```

**Option B: Using GitHub Website**
1. Go to https://github.com/new
2. Repository name: `cybersoluce-merged`
3. Description: "Strategic cybersecurity governance platform that orchestrates comprehensive security assessments with AI-powered intelligence across global frameworks."
4. Choose visibility (Public/Private)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 3: Connect and Push

After creating the repository on GitHub, run:

```powershell
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cybersoluce-merged.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/cybersoluce-merged.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Method 3: Using GitHub Desktop

1. Install GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository
4. Select the `cybersoluce-merged` folder
5. Click "Publish repository" button
6. Choose repository name and visibility
7. Click "Publish Repository"

## Verification

After setup, verify the repository:

```powershell
# Check remote
git remote -v

# Check status
git status

# View commit history
git log --oneline
```

## Next Steps

1. **Set up branch protection** (optional):
   - Go to repository Settings → Branches
   - Add rule for `main` branch
   - Require pull request reviews

2. **Configure GitHub Actions** (if needed):
   - The project already has `.github/workflows/ci.yml`
   - Actions will run automatically on push

3. **Add collaborators** (if needed):
   - Go to repository Settings → Collaborators
   - Add team members

4. **Set up webhooks** (if needed):
   - For CI/CD integration with other services

## Troubleshooting

### Git not found
- Make sure Git is installed and added to PATH
- Restart PowerShell/terminal after installation
- Verify with: `git --version`

### Authentication issues
- Use GitHub CLI: `gh auth login`
- Or use Personal Access Token: https://github.com/settings/tokens
- Configure credential helper: `git config --global credential.helper wincred`

### Large files
- If you have large files, consider Git LFS: `git lfs install`
- Or add them to `.gitignore`

### Push rejected
- Make sure you have write access to the repository
- Check if remote URL is correct: `git remote -v`
- Try force push (use with caution): `git push -f origin main`

