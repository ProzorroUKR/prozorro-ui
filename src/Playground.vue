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
