import type { RouteLocationRaw } from "vue-router";

export interface PzBreadcrumbItem {
  label: string;
  to?: RouteLocationRaw;
}

export interface PzBreadcrumbProps {
  items?: PzBreadcrumbItem[];
}
