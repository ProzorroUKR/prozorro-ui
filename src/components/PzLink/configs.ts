import type { PzLinkTarget, PzLinkVariant } from "./types";

export const pzLinkVariantOptions = ["primary", "neutral", "gray", "button", "icon"] satisfies PzLinkVariant[];

export const pzLinkTargetOptions = ["_self", "_blank", "_parent", "_top"] satisfies PzLinkTarget[];
