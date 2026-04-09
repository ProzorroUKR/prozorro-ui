import type { PzStatusTag, PzStatusVariant } from "./types";

export const pzStatusVariantOptions = [
  "inactive",
  "hidden",
  "active",
  "monitoring",
  "disabled",
  "progress",
  "auction-progress",
  "auction-waiting",
  "auction-success",
] satisfies PzStatusVariant[];

export const pzStatusTagOptions = ["span", "div", "li"] satisfies PzStatusTag[];
