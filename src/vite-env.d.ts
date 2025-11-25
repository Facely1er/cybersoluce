/// <reference types="vite/client" />

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  export const Shield: FC<IconProps>;
  export const CheckCircle: FC<IconProps>;
  export const Brain: FC<IconProps>;
  export const Clock: FC<IconProps>;
  export const Eye: FC<IconProps>;
  export const GitBranch: FC<IconProps>;
  export const Target: FC<IconProps>;
  export const DollarSign: FC<IconProps>;
  export const Users: FC<IconProps>;
  export const FileText: FC<IconProps>;
  export const BarChart3: FC<IconProps>;
  export const CheckSquare: FC<IconProps>;
  export const Box: FC<IconProps>;
  export const Lock: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const ArrowLeft: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const Globe: FC<IconProps>;
  export const AlignJustify: FC<IconProps>;
  export const Menu: FC<IconProps>;
  export const X: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const Package: FC<IconProps>;
  export const Home: FC<IconProps>;
  export const Calendar: FC<IconProps>;
  export const Database: FC<IconProps>;
  export const Bell: FC<IconProps>;
  export const BookOpen: FC<IconProps>;
  export const Presentation: FC<IconProps>;
  export const Calculator: FC<IconProps>;
  export const UserCircle: FC<IconProps>;
  export const FolderOpen: FC<IconProps>;
}
