export type PzTagVariant = "grey" | "blue" | "green" | "red" | "grey-light";

export type PzTagTag = "span" | "div" | "li";

export interface PzTagProps {
  variant?: PzTagVariant;
  as?: PzTagTag;
}
