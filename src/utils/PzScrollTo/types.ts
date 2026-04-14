export type PzScrollBehavior = "auto" | "instant" | "smooth";

export type PzScrollToTarget = number | string | HTMLElement;

export interface PzScrollToOptions {
  offsetTop?: number;
  behavior?: PzScrollBehavior;
  highlightClassName?: string;
  highlightDuration?: number;
}
