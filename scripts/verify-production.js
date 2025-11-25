#!/usr/bin/env node

/**
 * Production deployment verification script
 * Verifies that all production requirements are met before deployment
 * Usage: node scripts/verify-production.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const checks = {
  passed: [],
  warnings: [],
  failed: [],
};

function check(name, condition, message, isWarning = false) {
  if (condition) {
    checks.passed.push({ name, message });
    console.log(`${colors.green}✅${colors.reset} ${name}`);
  } else {
    if (isWarning) {
      checks.warnings.push({ name, message });
      console.log(`${colors.yellow}⚠️${colors.reset} ${name}: ${message}`);
    } else {
      checks.failed.push({ name, message });
      console.log(`${colors.red}❌${colors.reset} ${name}: ${message}`);
    }
  }
}

function checkFileExists(filePath, name) {
  const fullPath = path.join(ROOT_DIR, filePath);
  const exists = fs.existsSync(fullPath);
  check(name, exists, exists ? 'Found' : `Missing: ${filePath}`);
  return exists;
}

function checkFileContent(filePath, name, searchText, shouldContain = true) {
  const fullPath = path.join(ROOT_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    check(name, false, `File not found: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  
  // For unsafe-eval check, exclude comments and only check actual CSP policy lines
  let contains = false;
  if (searchText === "'unsafe-eval'" && !shouldContain) {
    // Check only CSP policy lines (lines starting with Content-Security-Policy)
    const cspLines = content.split('\n').filter(line => 
      line.trim().startsWith('Content-Security-Policy:') || 
      line.trim().startsWith('Content-Security-Policy')
    );
    contains = cspLines.some(line => line.includes(searchText));
  } else {
    contains = content.includes(searchText);
  }
  
  check(
    name,
    shouldContain ? contains : !contains,
    shouldContain
      ? contains
        ? 'Found'
        : `Missing: ${searchText}`
      : contains
      ? `Should not contain: ${searchText}`
      : 'OK'
  );
  return shouldContain ? contains : !contains;
}

function checkPackageJson() {
  console.log(`\n${colors.blue}📦 Checking package.json...${colors.reset}`);
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    check('package.json exists', false, 'package.json not found');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  check('package.json has name', !!packageJson.name, 'Package name is set');
  check('package.json has version', !!packageJson.version, 'Package version is set');
  check('package.json has build script', !!packageJson.scripts?.build, 'Build script exists');
}

function checkSecurityHeaders() {
  console.log(`\n${colors.blue}🔒 Checking security headers...${colors.reset}`);
  checkFileExists('public/_headers', 'Security headers file exists');
  checkFileContent(
    'public/_headers',
    'CSP header configured',
    'Content-Security-Policy',
    true
  );
  checkFileContent(
    'public/_headers',
    'unsafe-eval removed',
    "'unsafe-eval'",
    false
  );
  checkFileContent(
    'public/_headers',
    'HSTS configured',
    'Strict-Transport-Security',
    true
  );
}

function checkEnvironmentFiles() {
  console.log(`\n${colors.blue}⚙️  Checking environment configuration...${colors.reset}`);
  checkFileExists('.env.example', '.env.example file exists');
  checkFileContent(
    '.env.example',
    '.env.example has Supabase config',
    'VITE_SUPABASE_URL',
    true
  );
  checkFileContent(
    '.env.example',
    '.env.example has Sentry config',
    'VITE_SENTRY_DSN',
    true
  );
}

function checkBuildOutput() {
  console.log(`\n${colors.blue}🏗️  Checking build output...${colors.reset}`);
  const distPath = path.join(ROOT_DIR, 'dist');
  check('dist directory exists', fs.existsSync(distPath), 'Build output directory found', true);
  
  if (fs.existsSync(distPath)) {
    const indexHtmlPath = path.join(distPath, 'index.html');
    check('index.html exists', fs.existsSync(indexHtmlPath), 'index.html found in dist');
    
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      const jsFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));
      check('JavaScript bundles exist', jsFiles.length > 0, `${jsFiles.length} JS files found`);
    }
  } else {
    check('Build output exists', false, 'Run "npm run build" first', true);
  }
}

function checkDeploymentConfig() {
  console.log(`\n${colors.blue}🚀 Checking deployment configuration...${colors.reset}`);
  checkFileExists('netlify.toml', 'Netlify configuration exists');
  checkFileExists('vercel.json', 'Vercel configuration exists');
  
  if (fs.existsSync(path.join(ROOT_DIR, 'netlify.toml'))) {
    checkFileContent(
      'netlify.toml',
      'Netlify build command configured',
      'command =',
      true
    );
    checkFileContent(
      'netlify.toml',
      'Netlify Node version set',
      'NODE_VERSION',
      true
    );
  }
}

function checkDocumentation() {
  console.log(`\n${colors.blue}📚 Checking documentation...${colors.reset}`);
  checkFileExists('README.md', 'README.md exists');
  checkFileExists('PRODUCTION_DEPLOYMENT.md', 'Production deployment guide exists');
  checkFileContent(
    'README.md',
    'README has production status',
    'PRODUCTION',
    true
  );
}

function checkErrorHandling() {
  console.log(`\n${colors.blue}🛡️  Checking error handling...${colors.reset}`);
  checkFileExists('src/components/common/ErrorBoundary.tsx', 'ErrorBoundary component exists');
  checkFileContent(
    'src/main.tsx',
    'Sentry initialized',
    '@sentry/react',
    true
  );
  checkFileContent(
    'src/lib/logger.ts',
    'Logger has Sentry integration',
    'Sentry',
    true
  );
}

function checkSecurity() {
  console.log(`\n${colors.blue}🔐 Checking security...${colors.reset}`);
  checkFileContent(
    'public/_headers',
    'XSS protection enabled',
    'X-XSS-Protection',
    true
  );
  checkFileContent(
    'public/_headers',
    'Frame protection enabled',
    'X-Frame-Options',
    true
  );
  checkFileContent(
    'public/_headers',
    'MIME type protection enabled',
    'X-Content-Type-Options',
    true
  );
}

function runVerification() {
  console.log(`${colors.cyan}🔍 CyberSoluce Production Readiness Verification${colors.reset}`);
  console.log('='.repeat(60));

  checkPackageJson();
  checkSecurityHeaders();
  checkEnvironmentFiles();
  checkBuildOutput();
  checkDeploymentConfig();
  checkDocumentation();
  checkErrorHandling();
  checkSecurity();

  // Summary
  console.log(`\n${colors.cyan}📊 Verification Summary${colors.reset}`);
  console.log('='.repeat(60));
  console.log(`${colors.green}✅ Passed: ${checks.passed.length}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Warnings: ${checks.warnings.length}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${checks.failed.length}${colors.reset}`);

  if (checks.failed.length > 0) {
    console.log(`\n${colors.red}❌ Production readiness check failed!${colors.reset}`);
    console.log('\nFailed checks:');
    checks.failed.forEach((check) => {
      console.log(`  - ${check.name}: ${check.message}`);
    });
    process.exit(1);
  } else if (checks.warnings.length > 0) {
    console.log(`\n${colors.yellow}⚠️  Production ready with warnings${colors.reset}`);
    console.log('\nWarnings:');
    checks.warnings.forEach((check) => {
      console.log(`  - ${check.name}: ${check.message}`);
    });
    process.exit(0);
  } else {
    console.log(`\n${colors.green}✅ All production readiness checks passed!${colors.reset}`);
    process.exit(0);
  }
}

// Run verification
try {
  runVerification();
} catch (error) {
  console.error(`${colors.red}❌ Verification error:${colors.reset}`, error.message);
  process.exit(1);
}

