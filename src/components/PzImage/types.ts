export type PzImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";

export type PzImageLoading = "eager" | "lazy";

export type PzImageDecoding = "auto" | "async" | "sync";

export interface PzImageProps {
  src: string;
  alt: string;
  fit?: PzImageFit;
  loading?: PzImageLoading;
  decoding?: PzImageDecoding;
}
