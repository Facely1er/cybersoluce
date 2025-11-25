# Testing Documentation

## Overview

This document describes the comprehensive test suite for the CyberSoluce platform. All tests are written using Vitest and React Testing Library.

## Test Structure

```
src/
├── services/
│   ├── __tests__/
│   │   ├── localBackend.test.ts          # Local backend integration tests
│   │   ├── supabaseBackend.test.ts       # Supabase backend integration tests
│   │   └── evidenceService.test.ts       # Evidence service tests
│   └── reporting/
│       └── __tests__/
│           └── nistCsfReport.test.ts     # Board report generation tests
├── components/
│   ├── auth/
│   │   └── __tests__/
│   │       └── RequireRole.test.tsx       # RBAC component tests
│   ├── common/
│   │   └── __tests__/
│   │       └── ErrorBoundary.test.tsx    # Error handling tests
│   └── framework/
│       └── __tests__/
│           └── ControlEvidencePanel.test.tsx  # Evidence panel tests
├── stores/
│   └── __tests__/
│       └── governanceStore.test.ts        # Store and control mappings tests
└── test/
    ├── setup.ts                          # Test configuration
    └── mocks/
        └── server.ts                     # MSW mock server
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests with UI
```bash
npm run test:ui
```

## Test Coverage

### ✅ Backend Integration Tests

#### Local Backend (`localBackend.test.ts`)
- ✅ User signup/login
- ✅ Assessment CRUD operations
- ✅ Data persistence in localStorage
- ✅ User isolation
- ✅ Error handling

#### Supabase Backend (`supabaseBackend.test.ts`)
- ✅ User signup/login
- ✅ Assessment CRUD operations
- ✅ RLS policy enforcement
- ✅ Multi-user isolation
- ✅ Error handling

### ✅ Evidence System Tests

#### Evidence Service (`evidenceService.test.ts`)
- ✅ Save evidence to Supabase
- ✅ Load evidence from Supabase
- ✅ Delete evidence from Supabase
- ✅ Backend mode detection
- ✅ Authentication checks
- ✅ Error handling

#### Control Evidence Panel (`ControlEvidencePanel.test.tsx`)
- ✅ Render evidence list
- ✅ Add evidence
- ✅ Remove evidence
- ✅ Load evidence on mount
- ✅ User ID integration
- ✅ Form validation

### ✅ Control Mappings Tests (`governanceStore.test.ts`)
- ✅ Add control mappings
- ✅ Get mappings for control
- ✅ Cross-framework mappings
- ✅ Mapping strength levels
- ✅ Evidence management

### ✅ Board Reports Tests (`nistCsfReport.test.ts`)
- ✅ Generate HTML report
- ✅ Include evidence summary
- ✅ Include mappings summary
- ✅ Calculate maturity statistics
- ✅ Handle missing framework
- ✅ Format dates correctly

### ✅ RBAC Tests (`RequireRole.test.tsx`)
- ✅ Role-based access control
- ✅ Role hierarchy (viewer < analyst < admin)
- ✅ Fallback rendering
- ✅ Unauthenticated users
- ✅ Edge cases

### ✅ Error Handling Tests (`ErrorBoundary.test.tsx`)
- ✅ Catch React errors
- ✅ Display error UI
- ✅ Log errors
- ✅ Custom fallback
- ✅ Error details
- ✅ Refresh functionality

## Test Checklist

Based on `STATUS_AND_NEXT_STEPS.md`, the following items have been tested:

### Backend Integration ✅
- [x] Local Backend (`VITE_BACKEND_MODE=local`)
  - [x] User signup/login
  - [x] Assessment creation/update/delete
  - [x] Evidence CRUD operations
  - [x] Data persistence in localStorage

- [x] Supabase Backend (`VITE_BACKEND_MODE=supabase`)
  - [x] User signup/login
  - [x] Assessment CRUD operations
  - [x] Evidence persistence
  - [x] RLS policy enforcement
  - [x] Multi-user isolation
  - [x] Organization-based access control

### Evidence System ✅
- [x] Add evidence to controls
- [x] View evidence list
- [x] Delete evidence
- [x] Evidence sync to Supabase (when enabled)
- [x] Evidence loading from Supabase
- [x] Evidence display in NIST CSF assessment

### Control Mappings ✅
- [x] View mappings in Framework Mapper
- [x] Mappings display in NIST CSF view
- [x] Cross-framework navigation

### Board Reports ✅
- [x] Generate NIST CSF board report
- [x] Export HTML report
- [x] Report includes evidence summary
- [x] Report includes mappings summary

### RBAC ✅
- [x] `RequireRole` component protection
- [x] Role-based UI visibility
- [x] Role enforcement in backend

### Error Handling ✅
- [x] Error boundary catches React errors
- [x] Logging works correctly
- [x] User-friendly error messages

## Mock Data

Test utilities and mock data are available in:
- `src/test/setup.ts` - Test configuration and utilities
- `src/test/mocks/server.ts` - MSW mock server handlers

## Writing New Tests

When adding new features, follow these guidelines:

1. **Test file naming**: Use `.test.ts` or `.test.tsx` extension
2. **Test structure**: Use `describe` blocks to group related tests
3. **Mock dependencies**: Mock external services and APIs
4. **Clean up**: Reset mocks and state in `beforeEach` hooks
5. **Assertions**: Use descriptive test names and clear assertions

### Example Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('FeatureName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('specific functionality', () => {
    it('should do something', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Continuous Integration

Tests run automatically in CI/CD pipeline (`.github/workflows/ci.yml`):
- All tests must pass before merging
- Coverage thresholds: 80% for branches, functions, lines, statements
- Tests run on Node.js 18+

## Coverage Reports

Coverage reports are generated in the `coverage/` directory:
- HTML report: `coverage/index.html`
- LCOV report: `coverage/lcov.info`
- JSON report: `coverage/coverage-final.json`

## Troubleshooting

### Tests failing with "Cannot find module"
- Ensure all dependencies are installed: `npm install`
- Check that test files are in the correct location
- Verify import paths are correct

### Mock not working
- Check that mocks are set up in `beforeEach` hooks
- Verify mock implementations match actual API
- Ensure `vi.mock()` is called before imports

### localStorage errors
- Tests use a mocked localStorage implementation
- Clear localStorage in `beforeEach` if needed

## Next Steps

1. Add E2E tests with Playwright or Cypress
2. Add visual regression tests
3. Add performance tests
4. Increase coverage for edge cases
5. Add integration tests for full user flows

