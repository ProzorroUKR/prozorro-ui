<template>
  <RouterLink
    v-slot="{ href, navigate }"
    custom
    :to="props.to"
    :replace="props.replace"
  >
    <PzLink
      v-bind="attrs"
      :href="href"
      :variant="props.variant"
      :target="props.target"
      :rel="props.rel"
      :disabled="props.disabled"
      :inline="props.inline"
      :bold="props.bold"
      :italic="props.italic"
      :line-through="props.lineThrough"
      @click="onNavigate($event, navigate)"
    >
      <template
        v-if="$slots.prefix"
        #prefix
      >
        <slot name="prefix" />
      </template>

      <slot />

      <template
        v-if="$slots.suffix"
        #suffix
      >
        <slot name="suffix" />
      </template>
    </PzLink>
  </RouterLink>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { RouterLink } from "vue-router";

import { PzLink } from "@/components/PzLink";

import type { PzRouterLinkProps } from "./types";

defineOptions({
  name: "PzRouterLink",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<PzRouterLinkProps>(), {
  variant: "primary",
  target: "_self",
  rel: undefined,
  disabled: false,
  inline: true,
  bold: false,
  italic: false,
  lineThrough: false,
  replace: false,
});

const attrs = useAttrs();

const onNavigate = (event: MouseEvent, navigate: (event?: MouseEvent) => unknown): void => {
  if (props.disabled || props.target !== "_self") {
    return;
  }

  void navigate(event);
};
</script>
