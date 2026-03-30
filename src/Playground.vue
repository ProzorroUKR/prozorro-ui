<template>
  <main class="playground">
    <div class="playground__card">
      <p class="playground__eyebrow">prozorro-ui</p>
      <h1 class="playground__title">Component library playground</h1>
      <p class="playground__description">Local preview for the reference button component.</p>

      <div class="playground__controls">
        <PzButton
          :label="`Variant: ${variant}`"
          :variant="variant"
          @click="cycleVariant"
        />
        <PzButton
          :label="disabled ? 'Enable button' : 'Disable button'"
          variant="secondary"
          @click="disabled = !disabled"
        />
      </div>

      <PzButton
        class="playground__demo"
        label="Preview button"
        :variant="variant"
        :disabled="disabled"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { PzButton } from "./index";
import type { ButtonVariant } from "./components/Button";

const variant = ref<ButtonVariant>("primary");
const disabled = ref(false);

function cycleVariant(): void {
  const variants: ButtonVariant[] = ["primary", "secondary", "danger"];
  const currentIndex = variants.indexOf(variant.value);
  variant.value = variants[(currentIndex + 1) % variants.length];
}
</script>

<style scoped lang="scss">
.playground {
  display: grid;
  min-height: 100vh;
  padding: $spacing-6;
  place-items: center;
  background:
    radial-gradient(circle at top, rgba($color-secondary, 0.24), transparent 32%),
    linear-gradient(180deg, #f7f9fc 0%, #edf2f7 100%);

  &__card {
    width: min(100%, 36rem);
    padding: $spacing-6;
    border: 1px solid $color-border;
    border-radius: calc($border-radius-base * 1.5);
    background-color: rgba($color-background, 0.94);
    box-shadow: 0 1rem 2.5rem rgb(24 33 47 / 12%);
  }

  &__eyebrow {
    margin: 0 0 $spacing-2;
    color: $color-primary;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__title {
    margin: 0 0 $spacing-3;
    color: $color-text;
    font-size: 2rem;
    line-height: 1.1;
  }

  &__description {
    margin: 0 0 $spacing-5;
    color: rgba($color-text, 0.78);
    line-height: 1.5;
  }

  &__controls {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-3;
    margin-bottom: $spacing-5;
  }

  &__demo {
    min-width: 12rem;
  }
}
</style>
