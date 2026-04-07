import type { PzGridColumnSpan, PzGridTag } from "./types";

// Storybook control options intentionally cover the most common layout values.
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const pzGridSpanOptions = [1, 2, 3, 4, 5, 6, 8, 12, "full"] satisfies PzGridColumnSpan[];

export const pzGridTagOptions = [
  "div",
  "section",
  "article",
  "main",
  "aside",
  "header",
  "footer",
  "nav",
  "ul",
  "ol",
] satisfies PzGridTag[];
