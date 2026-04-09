<template>
  <component
    :is="props.as"
    class="pz-status"
    :class="statusClasses"
  >
    <span class="pz-status__label">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { PzStatusProps } from "./types";
import { pzStatusGradientVariants } from "./constants";

defineOptions({ name: "PzStatus" });

const props = withDefaults(defineProps<PzStatusProps>(), {
  variant: "progress",
  as: "span",
});

const statusClasses = computed(() => [
  `pz-status--${props.variant}`,
  {
    "pz-status--gradient": pzStatusGradientVariants.includes(props.variant),
  },
]);
</script>

<style scoped lang="scss">
.pz-status {
  --pz-status-background: var(--pz-color-status-progress);

  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  max-width: 100%;
  padding: 2px 8px;
  border-radius: 3px;
  background: var(--pz-status-background);
  color: var(--pz-color-white);
  box-sizing: border-box;
  vertical-align: middle;
  width: fit-content;

  @include typography-body-regular;

  &--inactive {
    --pz-status-background: var(--pz-color-status-inactive);
  }

  &--hidden {
    --pz-status-background: var(--pz-color-status-hidden);
  }

  &--active {
    --pz-status-background: var(--pz-color-status-active);
  }

  &--monitoring {
    --pz-status-background: var(--pz-color-status-monitoring);
  }

  &--disabled {
    --pz-status-background: var(--pz-color-status-disabled);
  }

  &--progress {
    --pz-status-background: var(--pz-color-status-progress);
  }

  &--auction-progress {
    --pz-status-background: var(--pz-gradient-status-auction-progress);
  }

  &--auction-waiting {
    --pz-status-background: var(--pz-gradient-status-auction-waiting);
  }

  &--auction-success {
    --pz-status-background: var(--pz-gradient-status-auction-success);
  }

  &--gradient {
    --pz-status-color: var(--pz-color-white);
  }

  &__label {
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>
