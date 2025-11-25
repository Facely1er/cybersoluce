# PowerShell script to create cybersoluce remote repository
# This script will help you set up the remote repository for cybersoluce

Write-Host "=== Creating cybersoluce Remote Repository ===" -ForegroundColor Cyan
Write-Host ""

$gitPath = "C:\Program Files\Git\bin\git.exe"

# Check if repository already exists on GitHub
Write-Host "Current remote configuration:" -ForegroundColor Yellow
& $gitPath remote -v
Write-Host ""

Write-Host "To create a new repository named 'cybersoluce' on GitHub:" -ForegroundColor Cyan
Write-Host ""
Write-Host "OPTION 1: Create via GitHub Website (Recommended)" -ForegroundColor Green
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: cybersoluce" -ForegroundColor White
Write-Host "3. Description: Strategic cybersecurity governance platform" -ForegroundColor White
Write-Host "4. Choose visibility (Public/Private)" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "6. Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "After creating the repository, run these commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  # Remove old remote (if you want to replace cybersoluce2)" -ForegroundColor Gray
Write-Host "  git remote remove origin" -ForegroundColor Yellow
Write-Host ""
Write-Host "  # Add new remote" -ForegroundColor Gray
Write-Host "  git remote add origin https://github.com/Facely1er/cybersoluce.git" -ForegroundColor Yellow
Write-Host ""
Write-Host "  # Push to new repository" -ForegroundColor Gray
Write-Host "  git push -u origin main" -ForegroundColor Yellow
Write-Host ""

# Ask if user wants to proceed with updating remote
$response = Read-Host "Do you want to update the remote URL now? (y/n)"
if ($response -eq "y") {
    $repoName = Read-Host "Enter repository name (default: cybersoluce)"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "cybersoluce"
    }
    
    Write-Host ""
    Write-Host "Updating remote to: https://github.com/Facely1er/$repoName.git" -ForegroundColor Cyan
    
    # Remove old remote
    & $gitPath remote remove origin 2>$null
    
    # Add new remote
    & $gitPath remote add origin "https://github.com/Facely1er/$repoName.git"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Remote updated successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Current remote configuration:" -ForegroundColor Cyan
        & $gitPath remote -v
        Write-Host ""
        Write-Host "IMPORTANT: Make sure the repository '$repoName' exists on GitHub before pushing!" -ForegroundColor Yellow
        Write-Host ""
        $pushNow = Read-Host "Do you want to push to the new remote now? (y/n)"
        if ($pushNow -eq "y") {
            Write-Host "Pushing to origin/main..." -ForegroundColor Cyan
            & $gitPath push -u origin main
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
            } else {
                Write-Host "✗ Push failed. Make sure the repository exists on GitHub." -ForegroundColor Red
            }
        }
    } else {
        Write-Host "✗ Failed to update remote" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green

