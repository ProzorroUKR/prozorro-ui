export type PzGridTag = "div" | "section" | "article" | "main" | "aside" | "header" | "footer" | "nav" | "ul" | "ol";

export type PzGridColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";

export type PzGridColumnStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface PzGridProps {
  as?: PzGridTag;
  container?: boolean;
  fluid?: boolean;
  grid?: boolean;
  fit?: boolean;
  dense?: boolean;
}

export interface PzGridItemProps {
  as?: PzGridTag;
  span?: PzGridColumnSpan;
  sm?: PzGridColumnSpan;
  md?: PzGridColumnSpan;
  lg?: PzGridColumnSpan;
  xl?: PzGridColumnSpan;
  xxl?: PzGridColumnSpan;
  start?: PzGridColumnStart;
  startSm?: PzGridColumnStart;
  startMd?: PzGridColumnStart;
  startLg?: PzGridColumnStart;
  startXl?: PzGridColumnStart;
  startXxl?: PzGridColumnStart;
}
