<template>
  <component
    :is="props.as"
    class="pz-tag"
    :class="`pz-tag--${props.variant}`"
  >
    <span
      v-if="$slots.prefix"
      class="pz-tag-prefix"
    >
      <slot name="prefix" />
    </span>

    <span class="pz-tag-label">
      <slot />
    </span>

    <span
      v-if="$slots.suffix"
      class="pz-tag-suffix"
    >
      <slot name="suffix" />
    </span>
  </component>
</template>

<script setup lang="ts">
import type { PzTagProps } from "./types";

defineOptions({ name: "PzTag" });
const props = withDefaults(defineProps<PzTagProps>(), {
  variant: "grey",
  as: "span",
});
</script>

<style scoped lang="scss">
.pz-tag {
  --pz-tag-background: var(--pz-color-tag-grey);
  --pz-tag-gap: var(--pz-space-4);

  display: inline-flex;
  align-items: center;
  gap: var(--pz-tag-gap);
  padding: 4px 8px;
  border-radius: 3px 12px 12px 3px;
  background: var(--pz-tag-background);
  color: var(--pz-tag-color);
  vertical-align: middle;

  @include typography-small-semibold;

  &--grey {
    --pz-tag-background: var(--pz-color-tag-grey);
  }

  &--grey-light {
    --pz-tag-background: var(--pz-color-tag-grey-light);
  }

  &--blue {
    --pz-tag-background: var(--pz-color-tag-blue);
  }

  &--green {
    --pz-tag-background: var(--pz-color-tag-green);
  }

  &--red {
    --pz-tag-background: var(--pz-color-tag-red);
  }
}

.pz-tag-prefix,
.pz-tag-suffix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pz-tag-label {
  min-width: 0;
}

.pz-tag-prefix :deep(.pz-icon),
.pz-tag-suffix :deep(.pz-icon) {
  --pz-icon-size: var(--pz-font-size-12);
  --pz-icon-color: currentcolor;
}
</style>
