import { NODE_SKIP_BG_COLOR_VALUES } from "./constants";
import type { PzDomBackgroundColor } from "./types";

/**
 * Utility class for common DOM operations.
 */
export class PzDomHandler {
  /**
   * Copies a string to the system clipboard.
   *
   * @param str - The string to copy.
   */
  static async copyToClipboard(str: string): Promise<void> {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(str);
        return;
      } catch {
        // Fallback for older browsers or restricted environments
      }
    }

    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  /**
   * Recursively finds the nearest parent with an opaque background color.
   *
   * @param el - The starting HTMLElement.
   * @returns The background color string (e.g., "rgb(255, 255, 255)").
   */
  static getParentNearestBackground(el?: HTMLElement): PzDomBackgroundColor {
    if (!el || typeof window === "undefined") {
      return "#fff";
    }

    const bgColor = window.getComputedStyle(el).backgroundColor;

    if (NODE_SKIP_BG_COLOR_VALUES.includes(bgColor)) {
      return PzDomHandler.getParentNearestBackground(el.parentElement as HTMLElement | undefined);
    }

    return bgColor;
  }
}
