#!/usr/bin/env node

/**
 * Launch Readiness Verification Script
 * Checks critical components and configurations before launch
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const checks = [];
let passed = 0;
let failed = 0;
let warnings = 0;

function check(name, condition, isWarning = false) {
  checks.push({ name, condition, isWarning });
  if (condition) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    if (isWarning) {
      console.log(`⚠️  ${name} (WARNING)`);
      warnings++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  }
}

function checkFileExists(filePath, description) {
  const fullPath = join(rootDir, filePath);
  const exists = existsSync(fullPath);
  check(description, exists);
  return exists;
}

function checkFileContains(filePath, searchText, description) {
  const fullPath = join(rootDir, filePath);
  if (!existsSync(fullPath)) {
    check(description, false);
    return false;
  }
  const content = readFileSync(fullPath, 'utf-8');
  const contains = content.includes(searchText);
  check(description, contains);
  return contains;
}

console.log('\n🚀 CyberSoluce Platform - Launch Readiness Verification\n');
console.log('='.repeat(60));

// 1. Critical Files
console.log('\n📁 Critical Files:');
checkFileExists('package.json', 'package.json exists');
checkFileExists('src/App.tsx', 'App.tsx exists');
checkFileExists('src/main.tsx', 'main.tsx exists');
checkFileExists('vite.config.ts', 'vite.config.ts exists');
checkFileExists('supabase/schema.cybersoluce.sql', 'Supabase schema exists');

// 2. Environment Configuration
console.log('\n⚙️  Environment Configuration:');
const envExampleExists = checkFileExists('.env.example', '.env.example exists');
const envExists = checkFileExists('.env', '.env file exists');
check('ENV_VARIABLES.md documentation exists', existsSync(join(rootDir, 'ENV_VARIABLES.md')));

// 3. Core Services
console.log('\n🔧 Core Services:');
checkFileExists('src/services/apiService.ts', 'apiService.ts exists');
checkFileExists('src/services/localBackend.ts', 'localBackend.ts exists');
checkFileExists('src/services/supabaseBackend.ts', 'supabaseBackend.ts exists');
checkFileExists('src/services/evidenceService.ts', 'evidenceService.ts exists');
checkFileExists('src/config/env.ts', 'env.ts exists');

// 4. Components
console.log('\n🧩 Critical Components:');
checkFileExists('src/components/framework/ControlEvidencePanel.tsx', 'ControlEvidencePanel exists');
checkFileExists('src/components/common/ErrorBoundary.tsx', 'ErrorBoundary exists');
checkFileExists('src/components/auth/RequireRole.tsx', 'RequireRole exists');
checkFileExists('src/context/AuthContext.tsx', 'AuthContext exists');

// 5. Stores
console.log('\n📦 State Management:');
checkFileExists('src/stores/governanceStore.ts', 'governanceStore exists');

// 6. Configuration Files
console.log('\n📋 Configuration:');
checkFileExists('tsconfig.json', 'TypeScript config exists');
checkFileExists('tailwind.config.js', 'Tailwind config exists');
checkFileExists('.gitignore', '.gitignore exists');

// 7. Documentation
console.log('\n📚 Documentation:');
checkFileExists('README.md', 'README.md exists');
checkFileExists('STATUS_AND_NEXT_STEPS.md', 'STATUS_AND_NEXT_STEPS.md exists');
checkFileExists('LAUNCH_CHECKLIST.md', 'LAUNCH_CHECKLIST.md exists');
checkFileExists('SUPABASE_SETUP.md', 'SUPABASE_SETUP.md exists');

// 8. Build Configuration
console.log('\n🏗️  Build Configuration:');
const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
check('package.json has build script', !!packageJson.scripts?.build);
check('package.json has dev script', !!packageJson.scripts?.dev);
check('package.json has type-check script', !!packageJson.scripts?.['type-check']);

// 9. Dependencies
console.log('\n📦 Dependencies:');
check('React is installed', !!packageJson.dependencies?.react);
check('React Router is installed', !!packageJson.dependencies?.['react-router-dom']);
check('Zustand is installed', !!packageJson.dependencies?.zustand);
check('Supabase client is installed', !!packageJson.dependencies?.['@supabase/supabase-js']);

// 10. Environment Validation
console.log('\n🔍 Code Quality:');
checkFileContains('src/main.tsx', 'validateEnvironmentOnStartup', 'Environment validation in main.tsx');
checkFileExists('src/utils/validateEnvironment.ts', 'validateEnvironment.ts exists');

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`⚠️  Warnings: ${warnings}`);

if (failed === 0 && warnings === 0) {
  console.log('\n🎉 All checks passed! Platform is ready for launch.');
  process.exit(0);
} else if (failed === 0) {
  console.log('\n✅ All critical checks passed. Review warnings before launch.');
  process.exit(0);
} else {
  console.log('\n❌ Some critical checks failed. Please fix issues before launch.');
  process.exit(1);
}

