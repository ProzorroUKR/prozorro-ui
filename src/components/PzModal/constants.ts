import type { PzModalProps } from "./types";

export const PZ_MODAL_CLOSE_EVENT = "close";

export const PZ_MODAL_DEFAULTS = {
  id: "default",
  title: "",
  size: "regular",
  closeOnOverlay: true,
  closeOnEscape: true,
  showCloseButton: true,
  closeLabel: "Close modal",
} satisfies Omit<Required<PzModalProps>, "isOpen">;
