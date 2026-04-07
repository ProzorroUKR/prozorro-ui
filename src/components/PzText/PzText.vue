<template>
  <component
    :is="tag"
    class="pz-text"
    :class="`pz-text--${variant}`"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { PzTextProps, PzTextTag, PzTextVariant } from "./types";

defineOptions({
  name: "PzText",
});

const defaultTagMap: Record<PzTextVariant, PzTextTag> = {
  "h1-bold": "h1",
  "h1-regular": "h1",
  "h2-bold": "h2",
  "h3-bold": "h3",
  "h3-regular": "h3",
  "h4-regular": "h4",
  "h4-semibold": "h4",
  "h4-bold": "h4",
  subtitle: "p",
  "body-regular": "p",
  "body-semibold": "p",
  "body-bold": "p",
  capitalized: "span",
  hint: "span",
  "line-through": "span",
  "small-regular": "span",
  "small-semibold": "span",
  "small-bold": "span",
  link: "a",
  document: "p",
};

const props = withDefaults(defineProps<PzTextProps>(), {
  as: undefined,
});

const tag = computed<PzTextTag>(() => props.as ?? defaultTagMap[props.variant] ?? "span");
</script>

<style scoped lang="scss">
.pz-text {
  margin: 0;
  padding: 0;

  &--h1-bold {
    @include typography-h1-bold;

    @include max-media-devices("sm") {
      @include typography-h1-bold-mobile;
    }
  }

  &--h1-regular {
    @include typography-h1-regular;

    @include max-media-devices("sm") {
      @include typography-h1-regular-mobile;
    }
  }

  &--h2-bold {
    @include typography-h2-bold;

    @include max-media-devices("sm") {
      @include typography-h2-bold-mobile;
    }
  }

  &--h3-bold {
    @include typography-h3-bold;

    @include max-media-devices("sm") {
      @include typography-h3-bold-mobile;
    }
  }

  &--h3-regular {
    @include typography-h3-regular;

    @include max-media-devices("sm") {
      @include typography-h3-regular-mobile;
    }
  }

  &--h4-regular {
    @include typography-h4-regular;

    @include max-media-devices("sm") {
      @include typography-h4-regular-mobile;
    }
  }

  &--h4-semibold {
    @include typography-h4-semibold;

    @include max-media-devices("sm") {
      @include typography-h4-semibold-mobile;
    }
  }

  &--h4-bold {
    @include typography-h4-bold;

    @include max-media-devices("sm") {
      @include typography-h4-bold-mobile;
    }
  }

  &--subtitle {
    @include typography-subtitle;
  }

  &--body-regular {
    @include typography-body-regular;
  }

  &--body-semibold {
    @include typography-body-semibold;
  }

  &--body-bold {
    @include typography-body-bold;
  }

  &--capitalized {
    @include typography-capitalized;
  }

  &--hint {
    @include typography-hint;
  }

  &--line-through {
    @include typography-line-through;
  }

  &--small-regular {
    @include typography-small-regular;
  }

  &--small-semibold {
    @include typography-small-semibold;
  }

  &--small-bold {
    @include typography-small-bold;
  }

  &--link {
    @include typography-link;
  }

  &--document {
    @include typography-document;
  }
}
</style>
