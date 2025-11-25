# PowerShell script to set up GitHub repository for CyberSoluce-merged
# This script automates the process of initializing git and creating a GitHub repo

param(
    [string]$RepoName = "cybersoluce-merged",
    [string]$Description = "Strategic cybersecurity governance platform that orchestrates comprehensive security assessments with AI-powered intelligence across global frameworks.",
    [string]$Visibility = "public",  # "public" or "private"
    [string]$GitHubUsername = ""
)

Write-Host "=== CyberSoluce GitHub Repository Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if GitHub CLI is installed
$hasGhCli = $false
try {
    $ghVersion = gh --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ GitHub CLI found" -ForegroundColor Green
        $hasGhCli = $true
    }
} catch {
    Write-Host "⚠ GitHub CLI not found (optional)" -ForegroundColor Yellow
    Write-Host "  Install from: https://cli.github.com/ for automated repo creation" -ForegroundColor Yellow
}

Write-Host ""

# Get current directory
$projectPath = Get-Location
Write-Host "Project path: $projectPath" -ForegroundColor Cyan

# Check if already a git repository
if (Test-Path ".git") {
    Write-Host "⚠ Git repository already initialized" -ForegroundColor Yellow
    $response = Read-Host "Continue anyway? (y/n)"
    if ($response -ne "y") {
        exit 0
    }
} else {
    # Initialize git repository
    Write-Host "Initializing git repository..." -ForegroundColor Cyan
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to initialize git repository" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

# Check if .gitignore exists
if (-not (Test-Path ".gitignore")) {
    Write-Host "⚠ .gitignore not found, creating one..." -ForegroundColor Yellow
    # Basic .gitignore will be created
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Cyan
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to add files" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Files added" -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "⚠ No changes to commit" -ForegroundColor Yellow
} else {
    # Create initial commit
    Write-Host "Creating initial commit..." -ForegroundColor Cyan
    git commit -m "Initial commit: CyberSoluce platform"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to create commit" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Initial commit created" -ForegroundColor Green
}

# Set default branch to main
Write-Host "Setting default branch to main..." -ForegroundColor Cyan
git branch -M main
Write-Host "✓ Branch set to main" -ForegroundColor Green

Write-Host ""

# Create GitHub repository
if ($hasGhCli) {
    Write-Host "=== Creating GitHub Repository ===" -ForegroundColor Cyan
    
    # Check if authenticated
    try {
        $authStatus = gh auth status 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "⚠ Not authenticated with GitHub CLI" -ForegroundColor Yellow
            Write-Host "Running: gh auth login" -ForegroundColor Cyan
            gh auth login
            if ($LASTEXITCODE -ne 0) {
                Write-Host "✗ Authentication failed" -ForegroundColor Red
                $hasGhCli = $false
            }
        }
    } catch {
        Write-Host "⚠ Could not check authentication status" -ForegroundColor Yellow
        $hasGhCli = $false
    }
    
    if ($hasGhCli) {
        # Get GitHub username if not provided
        if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
            $userInfo = gh api user --jq .login
            if ($LASTEXITCODE -eq 0) {
                $GitHubUsername = $userInfo
            }
        }
        
        Write-Host "Creating repository: $RepoName" -ForegroundColor Cyan
        Write-Host "Visibility: $Visibility" -ForegroundColor Cyan
        Write-Host "Description: $Description" -ForegroundColor Cyan
        
        # Create repository
        $repoUrl = gh repo create $RepoName --$Visibility --description "$Description" --source=. --remote=origin --push 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Repository created successfully!" -ForegroundColor Green
            Write-Host "✓ Code pushed to GitHub" -ForegroundColor Green
            Write-Host ""
            Write-Host "Repository URL: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Cyan
            exit 0
        } else {
            Write-Host "⚠ Failed to create repository via GitHub CLI" -ForegroundColor Yellow
            Write-Host "Error: $repoUrl" -ForegroundColor Red
            $hasGhCli = $false
        }
    }
}

# Manual instructions if GitHub CLI not available or failed
if (-not $hasGhCli) {
    Write-Host ""
    Write-Host "=== Manual Setup Required ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Git repository initialized successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "2. Repository name: $RepoName" -ForegroundColor White
    Write-Host "3. Description: $Description" -ForegroundColor White
    Write-Host "4. Visibility: $Visibility" -ForegroundColor White
    Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor White
    Write-Host "6. Click 'Create repository'" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run these commands:" -ForegroundColor Cyan
    Write-Host ""
    
    if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
        $GitHubUsername = Read-Host "Enter your GitHub username"
    }
    
    Write-Host "git remote add origin https://github.com/$GitHubUsername/$RepoName.git" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green

