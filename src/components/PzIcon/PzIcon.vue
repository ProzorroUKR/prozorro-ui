<template>
  <span
    :class="{ outlined: props.variant === 'outlined' }"
    :style="iconStyle"
    :role="iconRole"
    :aria-hidden="iconAriaHidden"
    :aria-label="props.label"
    class="pz-icon pz-material-icon"
  >
    {{ props.name }}
  </span>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

import type { PzIconProps } from "./types";

defineOptions({
  name: "PzIcon",
});

const props = withDefaults(defineProps<PzIconProps>(), {
  variant: "outlined",
  size: "16",
  label: undefined,
});

const iconStyle = computed(
  (): CSSProperties =>
    ({
      "--pz-icon-size": `var(--pz-font-size-${props.size})`,
    }) as CSSProperties,
);

const iconRole = computed(() => (props.label ? "img" : undefined));

const iconAriaHidden = computed(() => (props.label ? undefined : "true"));
</script>
