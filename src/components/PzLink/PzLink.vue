<template>
  <a
    :href="props.href"
    :target="props.target"
    :rel="resolvedRel"
    :aria-disabled="props.disabled || undefined"
    :tabindex="props.disabled ? -1 : undefined"
    class="pz-link"
    :class="linkClasses"
    @click="onClick"
  >
    <span
      v-if="$slots.prefix"
      class="pz-link-prefix"
    >
      <slot name="prefix" />
    </span>

    <span
      v-if="$slots.default"
      class="pz-link-content"
    >
      <slot />
    </span>

    <span
      v-if="$slots.suffix"
      class="pz-link-suffix"
    >
      <slot name="suffix" />
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

import { PZ_LINK_EXTERNAL_REL } from "./constants";
import type { PzLinkProps } from "./types";

const slots = useSlots();
defineOptions({ name: "PzLink" });
const props = withDefaults(defineProps<PzLinkProps>(), {
  variant: "primary",
  target: "_self",
  rel: undefined,
  disabled: false,
  inline: true,
  bold: false,
  italic: false,
  lineThrough: false,
});

const hasContent = computed(() => Boolean(slots.default));

const resolvedRel = computed(() =>
  props.rel ? props.rel : props.target === "_blank" ? PZ_LINK_EXTERNAL_REL : undefined,
);

const linkClasses = computed(() => [
  `pz-link--${props.variant}`,
  {
    "pz-link--inline": props.inline,
    "pz-link--block": !props.inline,
    "pz-link--disabled": props.disabled,
    "pz-link--bold": props.bold,
    "pz-link--italic": props.italic,
    "pz-link--line-through": props.lineThrough,
    "pz-link--icon-only": props.variant === "icon" && !hasContent.value,
  },
]);

const onClick = (event: MouseEvent): void => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<style scoped lang="scss">
.pz-link {
  --pz-link-color: var(--pz-color-text-link);
  --pz-link-hover-color: var(--pz-color-text-link-hover);
  --pz-link-background: transparent;
  --pz-link-hover-background: transparent;
  --pz-link-border-color: transparent;
  --pz-link-hover-border-color: transparent;
  --pz-link-disabled-border-color: transparent;
  --pz-link-content-decoration: none;
  --pz-link-hover-decoration: underline;
  --pz-link-radius: var(--pz-space-4);
  --pz-link-gap: var(--pz-space-8);
  --pz-link-padding-inline: 0;
  --pz-link-padding-block: 0;
  --pz-link-icon-size: var(--pz-font-size-16);
  --pz-link-font-style: normal;

  align-items: center;
  gap: var(--pz-link-gap);
  width: fit-content;
  padding: var(--pz-link-padding-block) var(--pz-link-padding-inline);
  border: 1px solid var(--pz-link-border-color);
  border-radius: var(--pz-link-radius);
  background: var(--pz-link-background);
  color: var(--pz-link-color);
  cursor: pointer;
  text-decoration: none;
  overflow-wrap: break-word;
  font-style: var(--pz-link-font-style);
  hyphens: auto;
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;

  @include typography-body-regular;

  &--inline {
    display: inline-flex;
  }

  &--block {
    display: flex;
  }

  &--bold {
    font-weight: 600;
  }

  &--italic {
    --pz-link-font-style: italic;
  }

  &--line-through .pz-link-content {
    text-decoration: line-through;
  }

  &--primary {
    --pz-link-color: var(--pz-color-text-link);
    --pz-link-hover-color: var(--pz-color-text-link-hover);
  }

  &--neutral {
    --pz-link-color: var(--pz-color-text-primary);
    --pz-link-hover-color: var(--pz-color-text-link-hover);
  }

  &--gray {
    --pz-link-color: var(--pz-color-grey-60);
    --pz-link-hover-color: var(--pz-color-text-link-hover);
  }

  &--button {
    --pz-link-color: var(--pz-color-button-primary);
    --pz-link-hover-color: var(--pz-color-white);
    --pz-link-background: transparent;
    --pz-link-hover-background: var(--pz-color-button-primary-hover);
    --pz-link-border-color: var(--pz-color-button-primary);
    --pz-link-hover-border-color: var(--pz-color-button-primary-hover);
    --pz-link-disabled-border-color: color-mix(in srgb, var(--pz-color-button-disabled) 60%, transparent);
    --pz-link-hover-decoration: none;
    --pz-link-radius: var(--pz-space-4);
    --pz-link-padding-inline: var(--pz-space-8);
    --pz-link-padding-block: var(--pz-space-4);
  }

  &--icon {
    --pz-link-color: var(--pz-color-icon-primary);
    --pz-link-hover-color: var(--pz-color-icon-hover);
    --pz-link-hover-decoration: none;
    --pz-link-icon-size: var(--pz-font-size-20);
  }

  &--icon-only {
    --pz-link-padding-inline: var(--pz-space-4);
    --pz-link-padding-block: var(--pz-space-4);
  }

  &--disabled {
    --pz-link-color: var(--pz-color-text-link-disabled);
    --pz-link-hover-color: var(--pz-color-text-link-disabled);
    --pz-link-border-color: var(--pz-link-disabled-border-color);

    cursor: default;
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    color: var(--pz-link-hover-color);
    border-color: var(--pz-link-hover-border-color);
    background: var(--pz-link-hover-background);
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--pz-link-hover-color) 18%, transparent);
  }
}

.pz-link-prefix,
.pz-link-suffix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pz-link-content {
  min-width: 0;
  text-decoration: var(--pz-link-content-decoration);
}

.pz-link-prefix:empty,
.pz-link-suffix:empty,
.pz-link-content:empty {
  display: none;
}

.pz-link:hover .pz-link-content,
.pz-link:focus-visible .pz-link-content {
  text-decoration: var(--pz-link-hover-decoration);
}

.pz-link-prefix :deep(.pz-icon),
.pz-link-suffix :deep(.pz-icon) {
  --pz-icon-size: var(--pz-link-icon-size);
  --pz-icon-color: currentcolor;
}
</style>
