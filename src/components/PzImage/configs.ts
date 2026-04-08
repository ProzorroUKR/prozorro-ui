import type { PzImageDecoding, PzImageFit, PzImageLoading } from "./types";

export const pzImageFitOptions = ["contain", "cover", "fill", "none", "scale-down"] satisfies PzImageFit[];

export const pzImageLoadingOptions = ["eager", "lazy"] satisfies PzImageLoading[];

export const pzImageDecodingOptions = ["auto", "async", "sync"] satisfies PzImageDecoding[];
