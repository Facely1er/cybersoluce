# CyberSoluce™ - The Governance Command Center

[![CI/CD Pipeline](https://github.com/cybersoluce/app/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/cybersoluce/app/actions)
[![Test Coverage](https://codecov.io/gh/cybersoluce/app/branch/main/graph/badge.svg)](https://codecov.io/gh/cybersoluce/app)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=cybersoluce_app&metric=security_rating)](https://sonarcloud.io/dashboard?id=cybersoluce_app)
[![Production Status](https://img.shields.io/badge/Production-Ready-green.svg)](https://cybersoluce.com)

Strategic cybersecurity governance platform that orchestrates comprehensive security assessments with AI-powered intelligence across global frameworks.

## 🎯 Platform Overview

CyberSoluce™ provides a unified, end-to-end compliance lifecycle platform connecting three integrated phases:

1. **Audit & Assessment** (ERMITS Auditor) - Multi-framework compliance assessment and gap analysis
2. **Implementation** (NIST Implementator) - Task management, control implementation, and evidence collection
3. **Centralized Governance** (CyberSoluce Platform) - Unified oversight, orchestration, and executive reporting

## 🚀 Core Features

### Phase 1: Audit & Assessment
- **🛡️ Multi-Framework Assessments**: NIST CSF, ISO 27001, HIPAA, FERPA, CMMC, and more
- **📊 Gap Analysis**: Automated compliance gap identification and scoring
- **📝 Assessment Templates**: Pre-configured templates for rapid assessment
- **🔍 Evidence Collection**: Integrated evidence management during assessment
- **📈 Comparison Tools**: Cross-framework assessment comparison

### Phase 2: Implementation
- **✅ Task Management**: Automated task creation from assessment gaps
- **🛡️ Control Implementation**: Track security control deployment
- **📎 Evidence Linking**: Connect assessment evidence to implementation
- **👥 Team Collaboration**: Role-based task assignment and tracking
- **📅 Timeline Management**: Activity calendar and deadline tracking

### Phase 3: Centralized Governance
- **📊 Unified Dashboard**: Complete compliance lifecycle overview
- **🔄 Framework Mapping**: Cross-framework control alignment
- **📈 Maturity Tracking**: Domain-based maturity progression
- **📋 Executive Reporting**: Board-ready reports and analytics
- **🤖 Intelligence Engine**: AI-powered recommendations and insights
- **💰 Budget Simulation**: Security investment optimization

## 🏗️ Architecture

### Three-Phase Workflow

```
Assessment (ERMITS) 
    ↓ [Gap Analysis via workflowBridge]
Implementation Tasks (NIST)
    ↓ [Task Execution & Control Implementation]
Governance Dashboard (CyberSoluce)
    ↓ [Reporting & Oversight]
```

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand + TanStack Query
- **UI Framework**: Tailwind CSS + Headless UI
- **Charts**: Chart.js + Recharts + D3.js
- **PDF Generation**: jsPDF + jspdf-autotable
- **Testing**: Vitest + React Testing Library + Playwright
- **Deployment**: Netlify with automated CI/CD

### Production Features
- ✅ **100% TypeScript** with strict mode
- ✅ **Comprehensive testing** with >80% coverage
- ✅ **Security headers** and CSP implementation
- ✅ **Performance optimization** with code splitting
- ✅ **PWA capabilities** with offline support
- ✅ **Auto-save functionality** for assessments
- ✅ **Data import/export** (JSON, CSV, PDF)
- ✅ **Error tracking** and monitoring
- ✅ **Automated CI/CD** pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation
```bash
# Clone the repository
git clone https://github.com/cybersoluce/app.git
cd app

# Install dependencies
npm ci

# Copy environment variables
cp .env.example .env.development

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run test             # Run tests
npm run test:ui          # Run tests with UI
npm run lint             # Lint code
npm run format           # Format code
npm run verify:production # Verify production readiness
npm run bundle:check     # Check bundle sizes
npm run pre-deploy       # Full pre-deployment check
```

## 🔧 Environment Configuration

Create a `.env` file in the project root (see `.env.example` for template):

```bash
# Supabase Backend (optional - defaults to localStorage)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BACKEND_MODE=supabase  # or "local" for localStorage

# Other environment variables
VITE_CS_API_BASE_URL: API endpoint
VITE_GOOGLE_ANALYTICS_ID: Analytics tracking ID
VITE_SENTRY_DSN: Error tracking DSN
VITE_ENABLE_ANALYTICS: Enable/disable analytics
```

### Backend Modes

- **Local Mode** (default): Uses browser localStorage. No backend required.
- **Supabase Mode**: Uses Supabase for authentication and data persistence.

See `SUPABASE_SETUP.md` for detailed Supabase configuration instructions.

## 📋 Key Workflows

### Complete Compliance Lifecycle

1. **Start Assessment** (`/assessments/multi-framework`)
   - Select framework(s)
   - Complete assessment questions
   - Auto-save every 5 seconds
   - Collect evidence during assessment

2. **Review Gaps** (`/assessments/comparison`)
   - View gap analysis
   - See compliance scores
   - Identify critical gaps

3. **Create Implementation Tasks** (`/workflow`)
   - Generate tasks from gaps
   - Assign to team members
   - Set priorities and deadlines

4. **Execute Implementation** (`/orchestration/tasks`)
   - Track task progress
   - Implement controls
   - Link evidence

5. **Monitor Governance** (`/dashboard`)
   - View unified dashboard
   - Track maturity progression
   - Generate executive reports

## 🧪 Testing

### Unit & Integration Tests
```bash
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run with coverage report
```

### End-to-End Tests
```bash
npx playwright test  # Run E2E tests
npx playwright test --ui # Run with UI
```

### Test Coverage
Minimum coverage requirements:
- **Branches**: 80%
- **Functions**: 80%  
- **Lines**: 80%
- **Statements**: 80%

## 🚀 Deployment

### Pre-Deployment Checklist

Before deploying to production, run the production readiness verification:

```bash
# Verify production readiness
npm run verify:production

# Check bundle sizes
npm run bundle:check

# Full pre-deployment check
npm run pre-deploy
```

### Automated Deployment
The application automatically deploys via GitHub Actions:
- **Staging**: `develop` branch → staging environment
- **Production**: `main` branch → production environment

### Manual Deployment

#### Netlify
```bash
# Build for production
npm run build

# Verify production readiness
npm run verify:production

# Deploy to Netlify (requires CLI)
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Build for production
npm run build

# Deploy to Vercel (requires CLI)
vercel --prod
```

### Environment Variables Setup

**Required for Production:**
- `VITE_APP_ENVIRONMENT=production`
- `VITE_BACKEND_MODE` (local or supabase)
- `VITE_SUPABASE_URL` (if using Supabase)
- `VITE_SUPABASE_ANON_KEY` (if using Supabase)

**Highly Recommended:**
- `VITE_SENTRY_DSN` (for error tracking)
- `VITE_ENABLE_ERROR_TRACKING=true`
- `VITE_ENABLE_ANALYTICS=true` (if using analytics)
- `VITE_GOOGLE_ANALYTICS_ID` (if using GA)

See `ENV_VARIABLES.md` for complete environment variable documentation.

### Post-Deployment Verification

After deployment, verify:
- [ ] Security headers are applied (check `public/_headers`)
- [ ] Error tracking is working (check Sentry dashboard)
- [ ] Analytics integration (if enabled)
- [ ] All critical user flows work
- [ ] Performance metrics are acceptable

### Environment-Specific Builds
- **Development**: Full debugging, no optimizations
- **Staging**: Production build with debug features
- **Production**: Fully optimized, minified, monitored

## 🔒 Security

### Security Features
- **Content Security Policy**: Strict CSP headers
- **HTTPS Enforcement**: All traffic encrypted
- **XSS Protection**: Multiple layers of XSS prevention
- **CSRF Protection**: Token-based CSRF protection
- **Secure Authentication**: JWT with automatic refresh

### Security Scanning
```bash
npm run security:check  # Audit dependencies
npm audit fix          # Fix security issues
```

## 📊 Monitoring & Analytics

### Error Tracking
- **Sentry Integration**: Real-time error monitoring
- **Custom Error Boundaries**: Graceful error handling
- **Performance Monitoring**: Web Vitals tracking

### Analytics
- **Google Analytics**: User behavior tracking
- **Custom Events**: Business metric tracking
- **Performance Metrics**: Load times and interactions

## 🛠️ Development Guidelines

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Comprehensive rules with Prettier
- **Pre-commit Hooks**: Automated code quality checks
- **Testing**: Required for all new features

### Git Workflow
1. Create feature branch from `develop`
2. Implement changes with tests
3. Create pull request to `develop`
4. Code review and automated checks
5. Merge to `develop` for staging
6. Merge to `main` for production

### Code Style
```bash
npm run lint:fix     # Fix linting issues
npm run format       # Format code
```

## 📚 Documentation

- **[Workflow Reorganization](WORKFLOW_REORGANIZATION.md)**: Complete workflow integration guide
- **[Platform Verification](PLATFORM_VERIFICATION.md)**: Structure and integration verification
- **[Auto-Save & Import/Export](AUTO_SAVE_IMPORT_EXPORT_STATUS.md)**: Data management features
- **[PDF Export](PDF_EXPORT_IMPLEMENTATION.md)**: PDF generation documentation
- **[Production Deployment Guide](PRODUCTION_DEPLOYMENT.md)**: Complete deployment documentation
- **[API Documentation](docs/api.md)**: API integration guide
- **[Component Library](docs/components.md)**: UI component documentation
- **[Testing Guide](docs/testing.md)**: Testing best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure CI/CD passes

## 📄 License

Copyright © 2025 ERMITS LLC. All rights reserved.

## 🆘 Support

- **Documentation**: [docs.cybersoluce.com](https://docs.cybersoluce.com)
- **Support Email**: support@cybersoluce.com
- **Issues**: [GitHub Issues](https://github.com/cybersoluce/app/issues)

## 🎯 Production Status

**✅ PRODUCTION READY**

- Security: ✅ Enterprise-grade security implementation
- Performance: ✅ Optimized for production workloads  
- Quality: ✅ 100% TypeScript with comprehensive testing
- Monitoring: ✅ Full observability and error tracking
- Deployment: ✅ Automated CI/CD with multiple environments
- Documentation: ✅ Complete deployment and maintenance docs
- Workflow Integration: ✅ Three-phase workflow fully connected
- UI/UX: ✅ Enhanced with loading states, empty states, accessibility

---

**CyberSoluce™** - Orchestrating cybersecurity governance with intelligence and precision.