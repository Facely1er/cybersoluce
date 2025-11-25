// Policy Management Feature Exports
export { PolicyManagementView } from './components/PolicyManagementView';

// Policy types
export interface Policy {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}