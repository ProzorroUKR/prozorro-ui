<template>
  <img
    class="pz-image"
    :src="props.src"
    :alt="props.alt"
    :loading="props.loading"
    :decoding="props.decoding"
    :style="imageStyle"
  />
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

import type { PzImageProps } from "./types";

defineOptions({
  name: "PzImage",
});

const props = withDefaults(defineProps<PzImageProps>(), {
  fit: "contain",
  loading: undefined,
  decoding: "async",
});

const imageStyle = computed(
  (): CSSProperties =>
    ({
      "--pz-image-fit": props.fit,
    }) as CSSProperties,
);
</script>

<style scoped lang="scss">
.pz-image {
  display: inline-block;
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: var(--pz-image-fit, contain);
  border-radius: var(--pz-image-radius, 0);
  background: var(--pz-image-background, transparent);
  box-shadow: var(--pz-image-shadow, none);
  vertical-align: middle;
}
</style>
