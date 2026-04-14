import { RouteLocationRaw } from "vue-router";

import { PzBreadcrumbItem } from "@/components/PzBreadcrumb/types";

export const HOME_BREADCRUMB = {
  label: "Головна",
  to: "/",
} satisfies PzBreadcrumbItem & { to: RouteLocationRaw };
