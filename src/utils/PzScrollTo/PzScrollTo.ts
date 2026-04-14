import {
  PZ_SCROLL_TO_DEFAULT_BEHAVIOR,
  PZ_SCROLL_TO_DEFAULT_HIGHLIGHT_CLASS_NAME,
  PZ_SCROLL_TO_DEFAULT_HIGHLIGHT_DURATION,
} from "./constants";
import type { PzScrollToOptions, PzScrollToTarget } from "./types";

const normalizeOptions = (optionsOrOffset?: number | PzScrollToOptions): PzScrollToOptions =>
  typeof optionsOrOffset === "number" ? { offsetTop: optionsOrOffset } : (optionsOrOffset ?? {});

const resolveTargetTop = (target: PzScrollToTarget): number | null => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  if (typeof target === "number") {
    return target;
  }

  const element =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target instanceof HTMLElement
        ? target
        : null;

  if (!element) {
    return null;
  }

  return window.scrollY + element.getBoundingClientRect().top;
};

const highlightElement = (element: HTMLElement | null, options: PzScrollToOptions): void => {
  if (!element || typeof window === "undefined") {
    return;
  }

  const highlightClassName = options.highlightClassName ?? PZ_SCROLL_TO_DEFAULT_HIGHLIGHT_CLASS_NAME;
  const highlightDuration = options.highlightDuration ?? PZ_SCROLL_TO_DEFAULT_HIGHLIGHT_DURATION;

  if (!highlightClassName) {
    return;
  }

  element.classList.add(highlightClassName);
  window.setTimeout(() => {
    element.classList.remove(highlightClassName);
  }, highlightDuration);
};

export class PzScrollTo {
  static moveById(id: string, optionsOrOffset?: number | PzScrollToOptions): boolean {
    if (typeof document === "undefined") {
      return false;
    }

    const element = document.getElementById(id);

    if (!element) {
      return false;
    }

    const isMoved = PzScrollTo.moveToElement(element, optionsOrOffset);

    if (isMoved) {
      highlightElement(element, normalizeOptions(optionsOrOffset));
    }

    return isMoved;
  }

  static moveToTop(options?: PzScrollToOptions): boolean {
    return PzScrollTo.moveTo(0, options);
  }

  static moveTo(targetTop: number, optionsOrOffset?: number | PzScrollToOptions): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const options = normalizeOptions(optionsOrOffset);

    window.scrollTo({
      top: Math.max(targetTop - (options.offsetTop ?? 0), 0),
      left: 0,
      behavior: options.behavior ?? PZ_SCROLL_TO_DEFAULT_BEHAVIOR,
    });

    return true;
  }

  static moveByQuerySelector(selector: string, optionsOrOffset?: number | PzScrollToOptions): boolean {
    if (typeof document === "undefined") {
      return false;
    }

    const element = document.querySelector<HTMLElement>(selector);

    if (!element) {
      return false;
    }

    const isMoved = PzScrollTo.moveToElement(element, optionsOrOffset);

    if (isMoved) {
      highlightElement(element, normalizeOptions(optionsOrOffset));
    }

    return isMoved;
  }

  static moveToElement(target: HTMLElement, optionsOrOffset?: number | PzScrollToOptions): boolean {
    const targetTop = resolveTargetTop(target);

    if (targetTop === null) {
      return false;
    }

    return PzScrollTo.moveTo(targetTop, optionsOrOffset);
  }

  static move(target: PzScrollToTarget, optionsOrOffset?: number | PzScrollToOptions): boolean {
    const targetTop = resolveTargetTop(target);

    if (targetTop === null) {
      return false;
    }

    return PzScrollTo.moveTo(targetTop, optionsOrOffset);
  }
}
