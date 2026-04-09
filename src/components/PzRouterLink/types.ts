import type { RouteLocationRaw } from "vue-router";

import type { PzLinkProps } from "@/components/PzLink";

export type PzRouterLinkTo = RouteLocationRaw;

export interface PzRouterLinkProps extends Omit<PzLinkProps, "href"> {
  to: PzRouterLinkTo;
  replace?: boolean;
}
