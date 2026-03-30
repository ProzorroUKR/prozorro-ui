<template>
  <button
    class="pz-button"
    :class="[`pz-button--${variant}`, { 'pz-button--disabled': disabled }]"
    type="button"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="pz-button__label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "./types";

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent): void {
  emit("click", event);
}
</script>

<style scoped lang="scss">
.pz-button {
  @include focus-ring($color-primary);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-2;
  min-height: 2.75rem;
  padding: $spacing-3 $spacing-5;
  border: 1px solid transparent;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  &--primary {
    background-color: $color-primary;
    color: $color-on-primary;

    &:hover:not(:disabled) {
      background-color: $color-primary-dark;
    }
  }

  &--secondary {
    background-color: $color-secondary;
    color: $color-on-secondary;

    &:hover:not(:disabled) {
      background-color: $color-secondary-dark;
    }
  }

  &--danger {
    background-color: $color-danger;
    color: $color-on-danger;

    &:hover:not(:disabled) {
      background-color: $color-danger-dark;
    }
  }

  &--disabled {
    opacity: 0.65;
  }
}
</style>
