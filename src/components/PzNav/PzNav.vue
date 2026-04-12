<template>
  <ul class="pz-nav">
    <li
      v-for="(tab, index) in props.config"
      :key="`${tab.path}-${index}`"
      class="pz-nav__item"
      :class="[{ disabled: tab.disabled }, { active: isTabActive(tab) }]"
    >
      <RouterLink
        v-if="!tab.disabled"
        :to="resolvePath(tab.path)"
        class="pz-nav__text"
        :class="{ active: isTabActive(tab) }"
      >
        <slot
          name="view"
          :data="tab"
        >
          {{ tab.text }}
        </slot>
      </RouterLink>

      <span
        v-else
        class="pz-nav__text"
        :class="{ active: isTabActive(tab) }"
      >
        <slot
          name="view"
          :data="tab"
        >
          {{ tab.text }}
        </slot>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import type { PzNavItem, PzNavProps } from "./types";

defineOptions({
  name: "PzNav",
});

const route = useRoute();
const props = defineProps<PzNavProps>();

const normalizePath = (path: string): string => {
  const [cleanPath = ""] = path.split("#");

  if (!cleanPath) {
    return "/";
  }

  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
};

const resolvePath = (path: string): string => {
  if (path.startsWith("#")) {
    return path;
  }

  return normalizePath(path);
};

const isNonActiveTabs = computed(
  () => !props.config.some((item: PzNavItem) => normalizePath(item.path) === route.path),
);

const isTabActive = (tab: PzNavItem): boolean => {
  const isEqualPath = normalizePath(tab.path) === route.path;

  return isEqualPath || (isNonActiveTabs.value && Boolean(tab.isDefault));
};
</script>

<style scoped lang="scss">
@use "@/styles/abstract/mixins" as *;

.pz-nav {
  --pz-nav-background: var(--pz-color-background-frame);
  --pz-nav-active-background: var(--pz-color-background-primary);
  --pz-nav-active-color: var(--pz-color-text-primary);
  --pz-nav-link-color: var(--pz-color-text-link);

  display: flex;
  width: 100%;
  margin: 0;
  padding: var(--pz-space-4);
  list-style: none;
  border-radius: var(--pz-space-16);
  background: var(--pz-nav-background);
  overflow-x: auto;
  scrollbar-color: var(--pz-color-grey-30) var(--pz-nav-active-background);

  &__item {
    position: relative;
    z-index: 1;
    flex: 0 0 auto;
    border-radius: var(--pz-space-12);
    transition: background-color 0.16s ease;

    &:hover {
      color: var(--pz-color-text-link-hover);
    }

    &.active {
      background-color: var(--pz-nav-active-background);
      box-shadow:
        0 1px 2px rgb(36 38 56 / 6%),
        inset 0 0 0 1px rgb(36 38 56 / 4%);
    }

    &.disabled {
      opacity: 0.5;
      user-select: none;
      pointer-events: none;
    }
  }

  &__text {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 12px 24px;
    border: none;
    outline: none;
    background: transparent;
    color: var(--pz-nav-link-color);
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.16s ease;

    @include typography-body-semibold;

    &.active {
      color: var(--pz-nav-active-color);
    }
  }
}
</style>
