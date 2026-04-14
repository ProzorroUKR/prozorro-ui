export type PzModalSize = "compact" | "regular" | "wide" | "fullscreen";

export interface PzModalProps {
  id?: string;
  isOpen: boolean;
  title?: string;
  size?: PzModalSize;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
}
