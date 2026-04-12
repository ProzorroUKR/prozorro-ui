export interface PzNavItem {
  path: string;
  text: string;
  disabled?: boolean;
  isDefault?: boolean;
}

export interface PzNavProps {
  config: PzNavItem[];
}
