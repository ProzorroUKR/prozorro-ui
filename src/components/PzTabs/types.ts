export type PzTabsSkin = "" | "light";

export interface PzTabsTabProps {
  name?: string;
  selected?: boolean;
  id?: string;
}

export interface PzTabsProps {
  skin?: PzTabsSkin;
  maxWidth?: string;
}

export interface PzTabsState {
  activeTab: string;
  tabs: PzTabsTabProps[];
}
