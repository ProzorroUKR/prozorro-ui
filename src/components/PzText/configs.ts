import type { PzTextTag, PzTextVariant } from "./types";

export const pzTextVariantOptions = [
  "h1-bold",
  "h1-regular",
  "h2-bold",
  "h3-bold",
  "h3-regular",
  "h4-regular",
  "h4-semibold",
  "h4-bold",
  "subtitle",
  "body-regular",
  "body-semibold",
  "body-bold",
  "capitalized",
  "hint",
  "line-through",
  "small-regular",
  "small-semibold",
  "small-bold",
  "link",
  "document",
] satisfies PzTextVariant[];

export const pzTextTagOptions = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "div",
  "a",
  "label",
] satisfies PzTextTag[];
