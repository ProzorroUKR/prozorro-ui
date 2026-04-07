<template>
  <component
    :is="props.as"
    :class="gridClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { PzGridProps } from "./types";

defineOptions({
  name: "PzGrid",
});

const props = withDefaults(defineProps<PzGridProps>(), {
  as: "div",
  container: false,
  fluid: false,
  grid: true,
  fit: false,
  dense: false,
});

const gridClasses = computed(() => [
  {
    "pz-container": props.container && !props.fluid,
    "pz-container-fluid": props.container && props.fluid,
    "pz-grid": props.grid,
    "pz-grid-fit": props.grid && props.fit,
    "pz-grid-dense": props.grid && props.dense,
  },
]);
</script>
