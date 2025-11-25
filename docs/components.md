# Component Documentation

CyberSoluce™ uses a comprehensive component library built with React, TypeScript, and Tailwind CSS to ensure consistency, accessibility, and maintainability across the platform.

## Design System Overview

### Design Principles

**1. Accessibility First**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support

**2. Consistency**
- Unified color system
- Consistent spacing (8px grid)
- Typography hierarchy
- Interaction patterns

**3. Responsiveness**
- Mobile-first design approach
- Flexible grid system
- Adaptive layouts
- Touch-friendly interfaces

### Color System

```typescript
// Brand Colors
const colors = {
  primary: {
    50: '#EBF5FF',
    500: '#005B96',  // Command Blue
    600: '#004A7A',
    900: '#002B45'
  },
  secondary: {
    50: '#ECFEFF', 
    400: '#33A1DE',  // Action Cyan
    500: '#06B6D4',
    900: '#164E63'
  },
  success: {
    50: '#ECFDF5',
    500: '#10B981',
    600: '#059669'
  },
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    600: '#D97706'
  },
  danger: {
    50: '#FEF2F2',
    500: '#EF4444',
    600: '#DC2626'
  }
};
```

## Core UI Components

### Button Component

**Location**: `src/components/ui/button.tsx`

```typescript
interface ButtonProps {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
}
```

**Usage Examples**:
```jsx
// Primary action button
<Button variant="default" size="lg">
  Start Assessment
</Button>

// Secondary action
<Button variant="outline">
  Cancel
</Button>

// Loading state
<Button loading>
  Processing...
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

**Accessibility Features**:
- Focus ring indicators
- Disabled state handling
- Loading state announcement
- Keyboard navigation support

### Input Components

#### Text Input
**Location**: `src/components/ui/input.tsx`

```jsx
<Input
  label="Organization Name"
  placeholder="Enter your organization"
  error={errors.organization}
  helperText="This will appear on reports"
  required
/>
```

#### Select Dropdown
**Location**: `src/components/ui/select.tsx`

```jsx
<Select
  label="Framework"
  options={[
    { value: 'nist-csf', label: 'NIST CSF 2.0' },
    { value: 'iso-27001', label: 'ISO 27001' }
  ]}
  placeholder="Choose framework"
/>
```

#### Textarea
**Location**: `src/components/ui/textarea.tsx`

```jsx
<Textarea
  label="Description"
  rows={4}
  placeholder="Enter detailed description..."
  maxLength={500}
/>
```

### Data Display Components

#### Status Badge
**Location**: `src/components/ui/StatusBadge.tsx`

```jsx
<StatusBadge 
  status="success" 
  label="Completed"
  size="md"
  animated={true}
/>
```

**Status Types**:
- `success` - Green badge for completed/approved items
- `warning` - Yellow badge for attention needed
- `error` - Red badge for failed/critical items
- `info` - Blue badge for informational status
- `pending` - Gray badge for in-progress items

#### Progress Bar
**Location**: `src/components/ui/progress.tsx`

```jsx
<Progress 
  value={75} 
  max={100}
  showLabel={true}
  color="success"
  size="lg"
/>
```

#### Enhanced Table
**Location**: `src/components/tables/EnhancedTable.tsx`

```jsx
<EnhancedTable
  data={assessments}
  columns={[
    { key: 'name', header: 'Assessment Name', sortable: true },
    { key: 'score', header: 'Score', formatter: 'percentage' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge status={value} /> }
  ]}
  searchable={true}
  exportable={true}
  pagination={true}
  pageSize={20}
/>
```

### Layout Components

#### Modal Dialog
**Location**: `src/components/ui/modal.tsx`

```jsx
<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Create Assessment"
  size="lg"
  closeOnOverlayClick={false}
>
  <AssessmentForm onSubmit={handleSubmit} />
</Modal>
```

**Modal Sizes**:
- `sm`: 384px max width
- `md`: 512px max width  
- `lg`: 768px max width
- `xl`: 1024px max width
- `full`: 1280px max width

#### Card Container
**Location**: `src/components/ui/card.tsx`

```jsx
<Card className="p-6">
  <CardHeader>
    <h3>Assessment Results</h3>
  </CardHeader>
  <CardBody>
    <p>Your security score: 85%</p>
  </CardBody>
</Card>
```

### Navigation Components

#### Tabs
**Location**: `src/components/ui/tabs.tsx`

```jsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <OverviewComponent />
  </TabsContent>
</Tabs>
```

## Specialized Components

### Assessment Components

#### Assessment Wizard
**Location**: `src/components/assessment/AssessmentWizard.tsx`

**Features**:
- Multi-step form navigation
- Progress tracking
- Validation at each step
- Save and resume functionality

```jsx
<AssessmentWizard
  onComplete={(config) => createAssessment(config)}
  userTier="professional"
  freeAssessmentsUsed={usedAssessments}
/>
```

#### Assessment Results
**Location**: `src/components/assessment/AssessmentResults.tsx`

```jsx
<AssessmentResults
  data={{
    overallScore: 85,
    sectionScores: scores,
    frameworkName: "NIST CSF 2.0"
  }}
  onExport={exportToPDF}
/>
```

### Intelligence Components

#### Intelligence Feed
**Location**: `src/components/intelligence/IntelligenceEngine.tsx`

**Features**:
- Real-time insight streaming
- Confidence scoring
- Actionable recommendations
- Cross-product correlations

### Chart Components

#### Enhanced Chart
**Location**: `src/components/charts/EnhancedChart.tsx`

```jsx
<EnhancedChart
  type="line"
  title="Risk Trends"
  data={chartData}
  height={350}
  loading={false}
/>
```

**Supported Chart Types**:
- Line charts for trends
- Bar charts for comparisons
- Doughnut charts for distributions
- Radar charts for maturity models

## Form Handling

### Form Hook
**Location**: `src/hooks/useForm.ts`

```jsx
const {
  values,
  errors,
  handleSubmit,
  setValue
} = useForm({
  initialValues: { name: '', email: '' },
  validationSchema: {
    name: { required: true },
    email: { 
      required: true,
      validate: (value) => validateEmail(value) ? null : 'Invalid email'
    }
  },
  onSubmit: async (data) => {
    await submitForm(data);
  }
});
```

### Form Field Component
**Location**: `src/components/forms/FormField.tsx`

```jsx
<FormField
  name="organizationSize"
  type="select"
  label="Organization Size"
  value={values.organizationSize}
  onChange={(value) => setValue('organizationSize', value)}
  options={organizationSizeOptions}
  error={errors.organizationSize}
  required
/>
```

## Notification System

### Notification Provider
**Location**: `src/components/notifications/NotificationSystem.tsx`

```jsx
const { notify } = useNotify();

// Success notification
notify.success('Assessment completed successfully');

// Error with action
notify.error('Upload failed', 'Check file format and try again', {
  action: {
    label: 'Retry',
    onClick: () => retryUpload()
  }
});
```

**Notification Types**:
- Success (green) - Completion confirmations
- Error (red) - Failure alerts with actions
- Warning (yellow) - Important notices
- Info (blue) - General information

## Accessibility Features

### Keyboard Navigation

**Focus Management**:
```typescript
// Focus trap for modals
const useFocusTrap = (isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;
    
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);
};
```

### Screen Reader Support

**ARIA Labels and Descriptions**:
```jsx
<button
  aria-label="Start new ransomware assessment"
  aria-describedby="ransomware-help-text"
  onClick={startAssessment}
>
  Start Assessment
</button>
<div id="ransomware-help-text" className="sr-only">
  This will begin a comprehensive ransomware readiness evaluation
</div>
```

### Color and Contrast

**High Contrast Mode**:
```css
.high-contrast {
  --primary-color: #000000;
  --background-color: #FFFFFF;
  --text-color: #000000;
  --border-color: #000000;
}

.high-contrast button {
  border: 2px solid #000000;
  background: #FFFFFF;
  color: #000000;
}
```

## Performance Optimization

### Code Splitting

**Route-Based Splitting**:
```typescript
// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Assessment = lazy(() => import('./pages/Assessment'));

// Component-based splitting
const HeavyChart = lazy(() => import('./components/charts/HeavyChart'));
```

### Bundle Optimization

**Vite Configuration**:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          charts: ['recharts', 'chart.js']
        }
      }
    }
  }
});
```

## Testing Strategy

### Component Testing

**Unit Tests with Jest and React Testing Library**:
```typescript
describe('Button Component', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="outline">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
  });
  
  it('handles loading state correctly', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
```

### Integration Testing

**API Integration Tests**:
```typescript
describe('Assessment API Integration', () => {
  it('creates assessment with valid configuration', async () => {
    const config = {
      name: 'Test Assessment',
      domain: 'ransomware',
      frameworks: ['nist-csf-2']
    };
    
    const result = await createAssessment(config);
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});
```

### End-to-End Testing

**Playwright Tests**:
```typescript
test('complete assessment workflow', async ({ page }) => {
  await page.goto('/assessment');
  await page.click('[data-testid="start-assessment"]');
  await page.selectOption('[name="domain"]', 'ransomware');
  await page.click('[data-testid="create-assessment"]');
  
  await expect(page.locator('.assessment-progress')).toBeVisible();
});
```

## Component Standards

### Naming Conventions

**Component Files**:
- PascalCase for component names
- Descriptive, action-oriented names
- Grouped by functionality

**Props Interface**:
```typescript
interface ComponentNameProps {
  // Required props first
  title: string;
  onSubmit: (data: FormData) => void;
  
  // Optional props with defaults
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  
  // Complex props last
  children?: React.ReactNode;
}
```

### Error Boundaries

**Component-Level Error Handling**:
```typescript
const ComponentWithErrorBoundary: React.FC = () => (
  <ErrorBoundary
    fallback={<ErrorFallback />}
    onError={(error, errorInfo) => {
      console.error('Component error:', error);
      reportError(error, errorInfo);
    }}
  >
    <MyComponent />
  </ErrorBoundary>
);
```

## Best Practices

### Performance Guidelines

1. **Memoization**: Use `React.memo` for expensive components
2. **Lazy Loading**: Implement lazy loading for heavy components
3. **Virtual Scrolling**: Use for large data sets
4. **Image Optimization**: Use appropriate formats and sizes

### Security Guidelines

1. **Input Sanitization**: Sanitize all user inputs
2. **XSS Prevention**: Use proper escaping in templates
3. **CSRF Protection**: Include tokens in forms
4. **Content Security Policy**: Implement strict CSP headers

### Maintenance Guidelines

1. **Documentation**: Document all props and usage examples
2. **Deprecation**: Follow deprecation lifecycle for changes
3. **Testing**: Maintain test coverage above 80%
4. **Versioning**: Use semantic versioning for component library

This component library ensures CyberSoluce™ maintains consistency, accessibility, and performance across all user interfaces while supporting rapid development and easy maintenance.