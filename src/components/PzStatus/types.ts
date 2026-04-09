export type PzStatusVariant =
  | "inactive"
  | "hidden"
  | "active"
  | "monitoring"
  | "disabled"
  | "progress"
  | "auction-progress"
  | "auction-waiting"
  | "auction-success";

export type PzStatusTag = "span" | "div" | "li";

export interface PzStatusProps {
  variant?: PzStatusVariant;
  as?: PzStatusTag;
}
