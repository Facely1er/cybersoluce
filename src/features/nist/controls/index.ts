// Controls Management Feature Exports
export { ControlsManagementView } from './components/ControlsManagementView';

// Control types
export interface Control {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}