import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import {
  Framework,
  Control,
  Category,
  GovernanceItem,
  RiskRegisterItem,
  MaturityDomain,
  ExecutiveMetrics,
  IntelligenceInsight,
  Evidence,
  AuditPackage,
  ControlMapping
} from '../types/cybersoluce';
import { mapErmitsFrameworksToCyberSoluce } from '../integrations/ermitsAuditor/mappers/ermitsFrameworkMapper';
import { mapNistCsfToCyberSoluce } from '../integrations/nistCsf/nistCsfMapper';
import { seedNistCsfControlMappings } from '../integrations/nistCsf/nistCsfMappings';

interface GovernanceState {
  // Framework Management
  frameworks: Framework[];
  categories: Category[];
  controls: Control[];
  selectedFrameworks: string[];
  controlMappings: ControlMapping[];
  
  // Governance Items
  governanceItems: GovernanceItem[];
  riskRegister: RiskRegisterItem[];
  
  // Maturity Tracking
  maturityDomains: MaturityDomain[];
  
  // Executive Metrics
  executiveMetrics: ExecutiveMetrics | null;
  
  // Intelligence
  intelligenceInsights: IntelligenceInsight[];
  
  // Evidence & Audit
  evidence: Evidence[];
  auditPackages: AuditPackage[];
  
  // UI State
  loading: boolean;
  error: string | null;
}

interface GovernanceActions {
  // Framework Actions
  setFrameworks: (frameworks: Framework[]) => void;
  selectFramework: (frameworkId: string) => void;
  deselectFramework: (frameworkId: string) => void;
  updateControl: (controlId: string, updates: Partial<Control>) => void;
  
  // Governance Actions
  addGovernanceItem: (item: Omit<GovernanceItem, 'id' | 'createdDate' | 'lastModified'>) => void;
  updateGovernanceItem: (id: string, updates: Partial<GovernanceItem>) => void;
  deleteGovernanceItem: (id: string) => void;
  
  // Risk Management
  addRiskItem: (risk: Omit<RiskRegisterItem, 'id' | 'lastReview'>) => void;
  updateRiskItem: (id: string, updates: Partial<RiskRegisterItem>) => void;
  deleteRiskItem: (id: string) => void;
  
  // Maturity Management
  updateMaturityDomain: (domainId: string, updates: Partial<MaturityDomain>) => void;
  
  // Intelligence
  addIntelligenceInsight: (insight: Omit<IntelligenceInsight, 'id' | 'timestamp'>) => void;
  acknowledgeInsight: (insightId: string) => void;
  
  // Evidence Management
  addEvidence: (payload: Omit<Evidence, "id" | "addedAt">) => void;
  updateEvidence: (id: string, updates: Partial<Evidence>) => void;
  removeEvidence: (id: string) => void;
  
  // Audit Packages
  createAuditPackage: (payload: Omit<AuditPackage, "id" | "createdAt" | "status">) => void;
  updateAuditPackage: (id: string, updates: Partial<AuditPackage>) => void;
  
  // Control Mappings
  addControlMapping: (mapping: Omit<ControlMapping, "id">) => void;
  getMappingsForControl: (controlId: string) => ControlMapping[];
  
  // Utility Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // NIST CSF v2 Integration
  loadNistCsfFramework: () => void;
  
  // ERMITS-AUDITOR Integration
  loadErmitsFrameworks: () => void;
}

export const useGovernanceStore = create<GovernanceState & GovernanceActions>()(
  devtools(
    persist(
      (set, get) => ({
      // Initial State
      frameworks: [],
      categories: [],
      controls: [],
      selectedFrameworks: [],
      controlMappings: seedNistCsfControlMappings,
      governanceItems: [],
      riskRegister: [],
      maturityDomains: [],
      executiveMetrics: null,
      intelligenceInsights: [],
      evidence: [],
      auditPackages: [],
      loading: false,
      error: null,

      // Framework Actions
      setFrameworks: (frameworks) => set({ frameworks }),
      
      selectFramework: (frameworkId) => 
        set((state) => ({
          selectedFrameworks: [...new Set([...state.selectedFrameworks, frameworkId])]
        })),
        
      deselectFramework: (frameworkId) =>
        set((state) => ({
          selectedFrameworks: state.selectedFrameworks.filter(id => id !== frameworkId)
        })),
        
      updateControl: (controlId, updates) =>
        set((state) => ({
          frameworks: state.frameworks.map(framework => ({
            ...framework,
            controls: framework.controls.map(control =>
              control.id === controlId ? { ...control, ...updates } : control
            )
          }))
        })),

      // Governance Actions
      addGovernanceItem: (item) =>
        set((state) => ({
          governanceItems: [...state.governanceItems, {
            ...item,
            id: `gov-${Date.now()}`,
            createdDate: new Date(),
            lastModified: new Date()
          }]
        })),
        
      updateGovernanceItem: (id, updates) =>
        set((state) => ({
          governanceItems: state.governanceItems.map(item =>
            item.id === id ? { ...item, ...updates, lastModified: new Date() } : item
          )
        })),
        
      deleteGovernanceItem: (id) =>
        set((state) => ({
          governanceItems: state.governanceItems.filter(item => item.id !== id)
        })),

      // Risk Management
      addRiskItem: (risk) =>
        set((state) => ({
          riskRegister: [...state.riskRegister, {
            ...risk,
            id: `risk-${Date.now()}`,
            lastReview: new Date(),
            riskScore: risk.likelihood * risk.impact
          }]
        })),
        
      updateRiskItem: (id, updates) =>
        set((state) => ({
          riskRegister: state.riskRegister.map(risk =>
            risk.id === id ? { 
              ...risk, 
              ...updates,
              riskScore: (updates.likelihood || risk.likelihood) * (updates.impact || risk.impact)
            } : risk
          )
        })),
        
      deleteRiskItem: (id) =>
        set((state) => ({
          riskRegister: state.riskRegister.filter(risk => risk.id !== id)
        })),

      // Maturity Management
      updateMaturityDomain: (domainId, updates) =>
        set((state) => ({
          maturityDomains: state.maturityDomains.map(domain =>
            domain.id === domainId ? { ...domain, ...updates } : domain
          )
        })),

      // Intelligence
      addIntelligenceInsight: (insight) =>
        set((state) => ({
          intelligenceInsights: [...state.intelligenceInsights, {
            ...insight,
            id: `insight-${Date.now()}`,
            timestamp: new Date(),
            acknowledged: false
          }]
        })),
        
      acknowledgeInsight: (insightId) =>
        set((state) => ({
          intelligenceInsights: state.intelligenceInsights.map(insight =>
            insight.id === insightId ? { ...insight, acknowledged: true } : insight
          )
        })),

      // Evidence Management
      addEvidence: (payload) => {
        const newEvidence: Evidence = {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `evidence-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          addedAt: new Date(),
          ...payload,
        };
        set((state) => ({
          evidence: [...state.evidence, newEvidence],
        }));
      },
        
      updateEvidence: (id, updates) =>
        set((state) => ({
          evidence: state.evidence.map((e) =>
            e.id === id ? { ...e, ...updates, lastUpdatedAt: new Date() } : e
          ),
        })),
        
      removeEvidence: (id) =>
        set((state) => ({
          evidence: state.evidence.filter((e) => e.id !== id),
        })),

      // Audit Packages
      createAuditPackage: (payload) => {
        const newPackage: AuditPackage = {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          status: "draft",
          ...payload,
        };
        set((state) => ({
          auditPackages: [...state.auditPackages, newPackage],
        }));
      },
        
      updateAuditPackage: (id, updates) =>
        set((state) => ({
          auditPackages: state.auditPackages.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
        
      // Control Mappings
      addControlMapping: (mapping) => {
        const newMapping: ControlMapping = {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `mapping-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...mapping,
        };
        set((state) => ({
          controlMappings: [...state.controlMappings, newMapping],
        }));
      },
      
      getMappingsForControl: (controlId) => {
        const state = get();
        return state.controlMappings.filter(
          (m) => m.sourceControlId === controlId || m.targetControlId === controlId
        );
      },

      // Utility Actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      
      // NIST CSF v2 Integration
      loadNistCsfFramework: () => {
        try {
          const { framework, categories, controls } = mapNistCsfToCyberSoluce();

          set((state) => {
            const existingFrameworkIds = new Set(state.frameworks.map((f) => f.id));
            const existingCategoryIds = new Set(state.categories.map((c) => c.id));
            const existingControlIds = new Set(state.controls.map((c) => c.id));

            const newFrameworks = existingFrameworkIds.has(framework.id)
              ? state.frameworks
              : [...state.frameworks, framework];

            const newCategories = [
              ...state.categories,
              ...categories.filter((c) => !existingCategoryIds.has(c.id)),
            ];

            const newControls = [
              ...state.controls,
              ...controls.filter((c) => !existingControlIds.has(c.id)),
            ];

            return {
              ...state,
              frameworks: newFrameworks,
              categories: newCategories,
              controls: newControls,
            };
          });
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error?.message ?? "Failed to load NIST CSF v2 framework",
          }));
        }
      },
      
      // ERMITS-AUDITOR Integration
      loadErmitsFrameworks: () => {
        try {
          const mapped = mapErmitsFrameworksToCyberSoluce();

          set((state) => {
            // Avoid duplicating frameworks if function is called twice
            const existingIds = new Set(state.frameworks.map((f) => f.id));
            const deduped = mapped.filter((fw) => !existingIds.has(fw.id));

            return {
              ...state,
              frameworks: [...state.frameworks, ...deduped],
            };
          });
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error?.message ?? "Failed to load ERMITS frameworks",
          }));
        }
      }
    }),
      {
        name: 'governance-store',
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            return JSON.parse(str);
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    ),
    { name: 'governance-store' }
  )
);