# PowerShell script to create clean repository location
# This script copies the repository to a clean location: C:\Users\facel\Downloads\cybersoluce

$sourcePath = "C:\Users\facel\Downloads\CyberSoluce-Files\cybersoluce-merged-main"
$targetPath = "C:\Users\facel\Downloads\cybersoluce"

Write-Host "Creating clean repository location..." -ForegroundColor Cyan
Write-Host "Source: $sourcePath" -ForegroundColor Gray
Write-Host "Target: $targetPath" -ForegroundColor Gray
Write-Host ""

# Check if source exists
if (-not (Test-Path $sourcePath)) {
    Write-Host "Error: Source path does not exist!" -ForegroundColor Red
    Write-Host "Please run this script from the cybersoluce-merged-main directory" -ForegroundColor Yellow
    exit 1
}

# Create target directory if it doesn't exist
if (-not (Test-Path $targetPath)) {
    Write-Host "Creating target directory: $targetPath" -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
} else {
    Write-Host "Warning: Target directory already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to continue? This will overwrite existing files. (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Aborted." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Copying files..." -ForegroundColor Cyan

# Copy all visible files and folders
$itemsToCopy = @(
    "src",
    "public",
    "supabase",
    "scripts",
    "docs",
    ".github",
    "package.json",
    "package-lock.json",
    "netlify.toml",
    "vercel.json",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "tailwind.config.js",
    "postcss.config.js",
    "eslint.config.cjs",
    "vitest.config.ts",
    "index.html",
    ".gitignore",
    "README.md"
)

# Copy all markdown files
Get-ChildItem -Path $sourcePath -Filter "*.md" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $targetPath -Force
}

# Copy directories
foreach ($item in $itemsToCopy) {
    $sourceItem = Join-Path $sourcePath $item
    if (Test-Path $sourceItem) {
        Write-Host "  Copying $item..." -ForegroundColor Gray
        Copy-Item -Path $sourceItem -Destination $targetPath -Recurse -Force
    }
}

# Copy hidden files (.git, .vscode, etc.)
Write-Host "Copying hidden files..." -ForegroundColor Gray
if (Test-Path (Join-Path $sourcePath ".git")) {
    Copy-Item -Path (Join-Path $sourcePath ".git") -Destination $targetPath -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path (Join-Path $sourcePath ".vscode")) {
    Copy-Item -Path (Join-Path $sourcePath ".vscode") -Destination $targetPath -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Verifying copy..." -ForegroundColor Cyan

# Verify key files
$keyFiles = @("package.json", "netlify.toml", "README.md")
$allPresent = $true

foreach ($file in $keyFiles) {
    $filePath = Join-Path $targetPath $file
    if (Test-Path $filePath) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file (missing!)" -ForegroundColor Red
        $allPresent = $false
    }
}

# Verify directories
$keyDirs = @("src", "public", "supabase")
foreach ($dir in $keyDirs) {
    $dirPath = Join-Path $targetPath $dir
    if (Test-Path $dirPath) {
        Write-Host "  ✓ $dir/" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $dir/ (missing!)" -ForegroundColor Red
        $allPresent = $false
    }
}

Write-Host ""
if ($allPresent) {
    Write-Host "✓ Copy completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Navigate to: $targetPath" -ForegroundColor White
    Write-Host "2. Run: npm install" -ForegroundColor White
    Write-Host "3. Run: npm run build" -ForegroundColor White
    Write-Host "4. Verify Git remote: git remote -v" -ForegroundColor White
    Write-Host "5. Update Netlify base directory (if needed)" -ForegroundColor White
} else {
    Write-Host "✗ Copy completed with errors. Please check manually." -ForegroundColor Red
}

Write-Host ""
Write-Host "Clean repository location: $targetPath" -ForegroundColor Cyan

