export type PzIconName = string;

export type PzIconVariant = "filled" | "outlined";

export type PzIconSize = "12" | "16" | "18" | "20" | "24" | "32" | "44";

export interface PzIconProps {
  name: PzIconName;
  variant?: PzIconVariant;
  size?: PzIconSize;
  label?: string;
}
