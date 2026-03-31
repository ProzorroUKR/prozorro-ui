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
  @include focus-ring(var(--blue));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.75em 1.25em;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: var(--size-m);
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
    background-color: var(--blue-100);
    color: var(--blue);

    &:hover:not(:disabled) {
      background-color: var(--blue-200);
    }
  }

  &--disabled {
    opacity: 0.65;
  }
}
</style>
