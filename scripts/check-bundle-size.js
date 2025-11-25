#!/usr/bin/env node

/**
 * Bundle size monitoring script
 * Checks bundle sizes and warns if they exceed thresholds
 * Usage: npm run build && node scripts/check-bundle-size.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

// Size thresholds (in bytes)
const THRESHOLDS = {
  // Main bundle should be under 500KB
  main: 500 * 1024,
  // Vendor chunks should be under 1MB each
  vendor: 1024 * 1024,
  // Total assets should be under 5MB
  total: 5 * 1024 * 1024,
  // Individual chunks should be under 2MB
  chunk: 2 * 1024 * 1024,
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function analyzeBundle() {
  console.log(`${colors.blue}📦 Analyzing bundle sizes...${colors.reset}\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`${colors.red}❌ Dist directory not found. Run 'npm run build' first.${colors.reset}`);
    process.exit(1);
  }

  const issues = [];
  const warnings = [];
  const files = [];

  // Get all JavaScript files
  if (fs.existsSync(ASSETS_DIR)) {
    const assetFiles = fs.readdirSync(ASSETS_DIR);
    assetFiles.forEach((file) => {
      if (file.endsWith('.js')) {
        const filePath = path.join(ASSETS_DIR, file);
        const size = getFileSize(filePath);
        files.push({ name: file, size, path: filePath });
      }
    });
  }

  // Get HTML file size
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    const htmlSize = getFileSize(indexHtmlPath);
    files.push({ name: 'index.html', size: htmlSize, path: indexHtmlPath });
  }

  // Analyze files
  let totalSize = 0;
  let mainBundleSize = 0;
  const vendorChunks = [];

  files.forEach((file) => {
    totalSize += file.size;

    if (file.name.includes('main') || file.name.includes('index')) {
      mainBundleSize = Math.max(mainBundleSize, file.size);
    }

    if (file.name.includes('vendor') || file.name.includes('chunk')) {
      vendorChunks.push(file);
    }

    // Check individual chunk size
    if (file.size > THRESHOLDS.chunk && file.name.endsWith('.js')) {
      warnings.push({
        type: 'chunk',
        file: file.name,
        size: file.size,
        threshold: THRESHOLDS.chunk,
      });
    }
  });

  // Check main bundle size
  if (mainBundleSize > THRESHOLDS.main) {
    issues.push({
      type: 'main',
      size: mainBundleSize,
      threshold: THRESHOLDS.main,
    });
  }

  // Check vendor chunks
  vendorChunks.forEach((chunk) => {
    if (chunk.size > THRESHOLDS.vendor) {
      warnings.push({
        type: 'vendor',
        file: chunk.name,
        size: chunk.size,
        threshold: THRESHOLDS.vendor,
      });
    }
  });

  // Check total size
  if (totalSize > THRESHOLDS.total) {
    issues.push({
      type: 'total',
      size: totalSize,
      threshold: THRESHOLDS.total,
    });
  }

  // Display results
  console.log(`${colors.blue}Bundle Size Report${colors.reset}`);
  console.log('='.repeat(50));
  console.log(`\n${colors.green}Total Bundle Size:${colors.reset} ${formatBytes(totalSize)}`);
  console.log(`Main Bundle: ${formatBytes(mainBundleSize)} (threshold: ${formatBytes(THRESHOLDS.main)})`);
  console.log(`Vendor Chunks: ${vendorChunks.length} files`);

  // Display file sizes
  console.log(`\n${colors.blue}File Sizes:${colors.reset}`);
  files
    .sort((a, b) => b.size - a.size)
    .slice(0, 10) // Top 10 largest files
    .forEach((file) => {
      const sizeStr = formatBytes(file.size);
      const isLarge = file.size > THRESHOLDS.chunk;
      const color = isLarge ? colors.yellow : colors.green;
      console.log(`  ${color}${file.name.padEnd(40)}${sizeStr}${colors.reset}`);
    });

  // Display warnings
  if (warnings.length > 0) {
    console.log(`\n${colors.yellow}⚠️  Warnings:${colors.reset}`);
    warnings.forEach((warning) => {
      console.log(
        `  ${warning.file}: ${formatBytes(warning.size)} exceeds threshold of ${formatBytes(warning.threshold)}`
      );
    });
  }

  // Display issues
  if (issues.length > 0) {
    console.log(`\n${colors.red}❌ Issues Found:${colors.reset}`);
    issues.forEach((issue) => {
      if (issue.type === 'main') {
        console.log(
          `  Main bundle (${formatBytes(issue.size)}) exceeds threshold (${formatBytes(issue.threshold)})`
        );
      } else if (issue.type === 'total') {
        console.log(
          `  Total bundle size (${formatBytes(issue.size)}) exceeds threshold (${formatBytes(issue.threshold)})`
        );
      }
    });
    console.log(`\n${colors.yellow}Consider:${colors.reset}`);
    console.log('  - Code splitting');
    console.log('  - Lazy loading routes');
    console.log('  - Removing unused dependencies');
    console.log('  - Tree shaking optimization');
    process.exit(1);
  }

  // Success
  if (warnings.length === 0 && issues.length === 0) {
    console.log(`\n${colors.green}✅ All bundle sizes are within thresholds!${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.yellow}⚠️  Some warnings found, but no critical issues.${colors.reset}`);
    process.exit(0);
  }
}

// Run analysis
try {
  analyzeBundle();
} catch (error) {
  console.error(`${colors.red}❌ Error analyzing bundle:${colors.reset}`, error.message);
  process.exit(1);
}

