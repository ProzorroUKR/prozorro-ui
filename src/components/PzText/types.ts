export type PzTextVariant =
  | "h1-bold"
  | "h1-regular"
  | "h2-bold"
  | "h3-bold"
  | "h3-regular"
  | "h4-regular"
  | "h4-semibold"
  | "h4-bold"
  | "subtitle"
  | "body-regular"
  | "body-semibold"
  | "body-bold"
  | "capitalized"
  | "hint"
  | "line-through"
  | "small-regular"
  | "small-semibold"
  | "small-bold"
  | "link"
  | "document";

export type PzTextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "a"
  | "label"
  | "pre"
  | "ul"
  | "ol"
  | "li"
  | "em"
  | "nav"
  | "section"
  | "article"
  | "b"
  | "blockquote";

export interface PzTextProps {
  variant: PzTextVariant;
  as?: PzTextTag;
}
