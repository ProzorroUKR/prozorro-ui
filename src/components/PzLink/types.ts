export type PzLinkVariant = "primary" | "neutral" | "gray" | "button" | "icon";

export type PzLinkTarget = "_self" | "_blank" | "_parent" | "_top";

export interface PzLinkProps {
  href: string;
  variant?: PzLinkVariant;
  target?: PzLinkTarget;
  rel?: string;
  disabled?: boolean;
  inline?: boolean;
  bold?: boolean;
  italic?: boolean;
  lineThrough?: boolean;
}
