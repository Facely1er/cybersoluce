import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './components/modals/ModalProvider';
import { NotificationProvider } from './components/notifications/NotificationSystem';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import PrivateRoute from './components/PrivateRoute';
import { useGovernanceStore } from './stores/governanceStore';
import { AssetInventoryProvider } from './features/assets/contexts/AssetInventoryContext';

// Keep HomePage with regular import for initial loading
import HomePage from './pages/HomePage';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
// Asset Extensions
const RansomwarePage = lazy(() => import('./pages/RansomwarePage'));
const SupplyChainPage = lazy(() => import('./pages/SupplyChainPage'));
const PrivacyProtectionPage = lazy(() => import('./pages/PrivacyProtectionPage'));

// Assessment (consolidated)
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));

// Public pages
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const Platform = lazy(() => import('./pages/Platform'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const ExperienceItPage = lazy(() => import('./pages/ExperienceItPage'));
const DemoCredentialsPage = lazy(() => import('./pages/DemoCredentialsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const PartnerPage = lazy(() => import('./pages/PartnerPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CompliancePage = lazy(() => import('./pages/CompliancePage'));
const ImplementationPage = lazy(() => import('./pages/ImplementationPage'));

// Lazy load all other pages
const FrameworkMapper = lazy(() => import('./pages/FrameworkMapper'));
const MaturityTracker = lazy(() => import('./pages/MaturityTracker'));
const ComplianceOrchestrator = lazy(() => import('./pages/ComplianceOrchestrator'));
const AuditPackager = lazy(() => import('./pages/AuditPackager'));
const BudgetSimulator = lazy(() => import('./pages/BudgetSimulator'));
const ExecutiveReporting = lazy(() => import('./pages/ExecutiveReporting'));
const IntelligenceEngine = lazy(() => import('./components/intelligence/IntelligenceEngine'));

// Orchestration pages
const TaskManagement = lazy(() => import('./pages/TaskManagement'));
const TimelineManagement = lazy(() => import('./pages/TimelineManagement'));
const EvidenceVault = lazy(() => import('./pages/EvidenceVault'));
const NotificationCenter = lazy(() => import('./pages/NotificationCenter'));

// Core pages
const UnifiedWorkflowPage = lazy(() => import('./pages/UnifiedWorkflowPage'));
const AssetInventoryPage = lazy(() => import('./pages/AssetInventoryPage'));

function App() {
  const { loadErmitsFrameworks } = useGovernanceStore();

  useEffect(() => {
    loadErmitsFrameworks();
  }, [loadErmitsFrameworks]);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <NotificationProvider>
            <AuthProvider>
              <AssetInventoryProvider>
                <ModalProvider>
                  <BrowserRouter>
                    <Layout>
                      <Suspense fallback={<LoadingSpinner size="lg" text="Loading application..." className="min-h-screen" />}>
                        <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/security" element={<SecurityPage />} />
                      <Route path="/platform" element={<Platform />} />
                      <Route path="/demo" element={<DemoPage />} />
                      <Route path="/experience" element={<ExperienceItPage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route path="/careers" element={<CareersPage />} />
                      <Route path="/partners" element={<PartnerPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/compliance" element={<CompliancePage />} />
                      <Route path="/implementation" element={<ImplementationPage />} />
                      <Route path="/resources" element={<ResourcesPage />} />
                      <Route path="/docs" element={<DocumentationPage />} />
                      <Route path="/docs/:docId" element={<DocumentationPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      
                      {/* Asset Extensions - Domain pages */}
                      <Route path="/domains/threat-intelligence" element={<RansomwarePage />} />
                      <Route path="/domains/supply-chain-risk" element={<SupplyChainPage />} />
                      <Route path="/domains/compliance-management" element={<PrivacyProtectionPage />} />
                      
                      {/* Asset Inventory - Core Foundation */}
                      <Route path="/assets" element={<AssetInventoryPage />} />
                      
                      {/* Auth routes */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/demo-credentials" element={<DemoCredentialsPage />} />
                      
                      {/* Dashboard and governance routes */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/workflow" element={<UnifiedWorkflowPage />} />
                      <Route path="/framework-mapper" element={<FrameworkMapper />} />
                      <Route path="/maturity-tracker" element={<MaturityTracker />} />
                      <Route path="/compliance-orchestrator" element={<ComplianceOrchestrator />} />
                      <Route path="/audit-packager" element={<AuditPackager />} />
                      <Route path="/budget-simulator" element={<BudgetSimulator />} />
                      <Route path="/executive-reporting" element={<ExecutiveReporting />} />
                     <Route path="/intelligence" element={<IntelligenceEngine />} />
                      
                      {/* Orchestration routes */}
                      <Route path="/orchestration/tasks" element={<TaskManagement />} />
                      <Route path="/orchestration/timelines" element={<TimelineManagement />} />
                      <Route path="/orchestration/evidence" element={<EvidenceVault />} />
                      <Route path="/orchestration/notifications" element={<NotificationCenter />} />
                      
                      {/* Assessment routes - Consolidated */}
                      <Route path="/assessments" element={<AssessmentPage />} />
                      <Route path="/assessments/:frameworkId" element={<AssessmentPage />} />
                      
                      {/* Fallback route */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                </BrowserRouter>
              </ModalProvider>
              </AssetInventoryProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;