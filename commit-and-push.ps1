# PowerShell script to commit and push changes
# Run this script from the cybersoluce-merged-main directory

Write-Host "Staging files..." -ForegroundColor Cyan

# Stage all changed files
git add package.json
git add netlify.toml
git add NETLIFY_BUILD_FIX.md
git add DEPLOYMENT_GUIDE.md
git add DEPLOYMENT_PLATFORM_COMPARISON.md
git add PRODUCTION_STATUS.md
git add UI_UX_PRODUCTION_STATUS.md
git add SETUP_GITHUB_SECRETS.md
git add QUICK_SETUP.md
git add SETUP_SUMMARY.md
git add STRUCTURE_ENHANCEMENTS.md
git add .github/workflows/deploy-staging.yml
git add .github/workflows/deploy-production.yml
git add public/images/.gitkeep
git add public/README.md
git add public/images/README.md
git add DEPLOYMENT.md
git add scripts/create-env-example.js

Write-Host "Files staged successfully!" -ForegroundColor Green

Write-Host "Committing changes..." -ForegroundColor Cyan

git commit -m "Fix: Skip Husky during Netlify builds and add deployment documentation

- Fix Husky build error by skipping in CI/production environments
- Add comprehensive deployment documentation and guides
- Add GitHub Actions workflows for staging and production
- Add deployment platform comparison (Netlify vs Vercel)
- Add production status and UI/UX status documentation
- Add setup guides for GitHub Secrets and quick start
- Add public assets structure and documentation
- Add environment setup script"

Write-Host "Commit successful!" -ForegroundColor Green

Write-Host "Pushing to remote..." -ForegroundColor Cyan

git push

Write-Host "Push completed!" -ForegroundColor Green
Write-Host "Netlify will automatically rebuild with the fixes." -ForegroundColor Yellow

