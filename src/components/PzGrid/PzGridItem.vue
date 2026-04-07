<template>
  <component
    :is="props.as"
    :class="itemClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { PzGridColumnSpan, PzGridItemProps } from "./types";

defineOptions({
  name: "PzGridItem",
});

const props = withDefaults(defineProps<PzGridItemProps>(), {
  as: "div",
  span: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  xxl: undefined,
  start: undefined,
  startSm: undefined,
  startMd: undefined,
  startLg: undefined,
  startXl: undefined,
  startXxl: undefined,
});

const spanClass = (prefix: string, span?: PzGridColumnSpan): string | null => {
  if (!span) {
    return null;
  }

  return span === "full" ? `pz-col-${prefix}full` : `pz-col-${prefix}${span}`;
};

const startClass = (prefix: string, start?: number): string | null => {
  if (!start) {
    return null;
  }

  return `pz-start-${prefix}${start}`;
};

const itemClasses = computed(() => [
  "pz-grid-item",
  spanClass("", props.span),
  spanClass("sm-", props.sm),
  spanClass("md-", props.md),
  spanClass("lg-", props.lg),
  spanClass("xl-", props.xl),
  spanClass("xxl-", props.xxl),
  startClass("", props.start),
  startClass("sm-", props.startSm),
  startClass("md-", props.startMd),
  startClass("lg-", props.startLg),
  startClass("xl-", props.startXl),
  startClass("xxl-", props.startXxl),
]);
</script>
