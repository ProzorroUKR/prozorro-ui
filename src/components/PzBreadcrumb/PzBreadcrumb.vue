<template>
  <nav
    class="pz-breadcrumb"
    aria-label="Breadcrumb"
  >
    <ul class="pz-breadcrumb__list">
      <li class="pz-breadcrumb__item">
        <RouterLink
          :to="HOME_BREADCRUMB.to"
          class="pz-breadcrumb__link"
        >
          <slot
            name="home"
            :data="HOME_BREADCRUMB"
            :index="-1"
            :is-current="false"
          >
            {{ HOME_BREADCRUMB.label }}
          </slot>
        </RouterLink>
      </li>

      <li
        v-for="(crumb, index) in breadcrumbList"
        :key="`${crumb.label}-${index}`"
        class="pz-breadcrumb__item"
      >
        <span
          v-if="isLastItem(index) || !crumb.to"
          class="pz-breadcrumb__link pz-breadcrumb__link--current"
          aria-current="page"
        >
          <slot
            name="view"
            :data="crumb"
            :is-current="isLastItem(index) || !crumb.to"
            :index="index"
          >
            {{ crumb.label }}
          </slot>
        </span>

        <RouterLink
          v-else
          :to="crumb.to"
          class="pz-breadcrumb__link"
        >
          <slot
            name="view"
            :data="crumb"
            :is-current="false"
            :index="index"
          >
            {{ crumb.label }}
          </slot>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute, type RouteLocationMatched, type RouteLocationRaw } from "vue-router";

import { HOME_BREADCRUMB } from "@/components/PzBreadcrumb/constants";

import type { PzBreadcrumbItem, PzBreadcrumbProps } from "./types";

defineOptions({ name: "PzBreadcrumb" });

interface PzRouteMetaBreadcrumb {
  breadcrumb?: string;
  name?: string;
}

const route = useRoute();
const props = defineProps<PzBreadcrumbProps>();

const formatRoutePath = (target: RouteLocationRaw | undefined): RouteLocationRaw | undefined => {
  if (typeof target !== "string") {
    return target;
  }

  return target
    .split("/")
    .map(pathPart => {
      if (!pathPart.startsWith(":")) {
        return pathPart;
      }

      const paramValue = route.params[pathPart.slice(1)];

      return Array.isArray(paramValue) ? paramValue.join("/") : (paramValue ?? pathPart);
    })
    .join("/");
};

const routeBreadcrumbs = computed<PzBreadcrumbItem[]>(() => {
  const items: PzBreadcrumbItem[] = [];

  route.matched.forEach((routeItem: RouteLocationMatched) => {
    const meta = routeItem.meta as PzRouteMetaBreadcrumb;
    const label = String(meta.breadcrumb ?? meta.name ?? routeItem.name ?? "").trim();

    if (!label || routeItem.path === "/") {
      return;
    }

    items.push({
      label,
      to: formatRoutePath(routeItem.path),
    });
  });

  return items;
});

const breadcrumbList = computed<PzBreadcrumbItem[]>(() => {
  if (props.items?.length) {
    return props.items.map(item => ({
      ...item,
      to: formatRoutePath(item.to),
    }));
  }

  return routeBreadcrumbs.value;
});

const isLastItem = (index: number): boolean => index === breadcrumbList.value.length - 1;
</script>

<style scoped lang="scss">
.pz-breadcrumb {
  --pz-breadcrumb-link-color: var(--pz-color-text-primary);
  --pz-breadcrumb-current-color: var(--pz-color-text-secondary);
  --pz-breadcrumb-separator-color: var(--pz-color-grey-60);

  width: 100%;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: inline-flex;
    align-items: center;

    &:not(:first-child)::before {
      content: "›";
      margin: 0 10px;
      color: var(--pz-breadcrumb-separator-color);
      font-size: var(--pz-font-size-14);
      line-height: 1;
    }
  }

  &__link {
    color: var(--pz-breadcrumb-link-color);
    text-decoration: none;
    transition: color 0.16s ease;

    @include typography-small-regular;

    &:hover {
      color: var(--pz-color-text-link-hover);
    }

    &--current {
      color: var(--pz-breadcrumb-current-color);
      pointer-events: none;
    }
  }
}
</style>
