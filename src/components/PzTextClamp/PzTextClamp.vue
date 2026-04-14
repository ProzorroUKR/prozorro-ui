<template>
  <TextClamp
    :text="props.text"
    :max-lines="props.maxContentLines"
    :ellipsis="props.clampPostfix"
    :expanded="props.expanded"
    :auto-resize="props.autoResize"
    class="pz-text-clamp"
    @update:expanded="onExpandedChange"
    @clamp-change="onClampChange"
  >
    <template #after="{ toggle, expanded, clamped }">
      <slot
        name="toggle"
        :toggle="toggle"
        :expanded="expanded"
        :clamped="clamped"
      >
        <button
          v-if="clamped || expanded"
          type="button"
          class="pz-text-clamp__toggle"
          :class="props.btnClass"
          :aria-expanded="expanded"
          @click.stop="toggle"
        >
          {{ expanded ? props.collapseLabel : props.expandLabel }}
        </button>
      </slot>
    </template>
  </TextClamp>
</template>

<script setup lang="ts">
import TextClamp from "vue3-text-clamp";

import type { PzTextClampProps } from "./types";
import { DEFAULT_CLAMP_POSTFIX, MAX_CONTENT_LINES } from "./constants";

defineOptions({ name: "PzTextClamp" });

const props = withDefaults(defineProps<PzTextClampProps>(), {
  maxContentLines: MAX_CONTENT_LINES,
  clampPostfix: DEFAULT_CLAMP_POSTFIX,
  btnClass: "",
  autoResize: true,
  expanded: false,
  expandLabel: "Show more",
  collapseLabel: "Collapse",
});

const emit = defineEmits<{
  (event: "update:expanded", value: boolean): void;
  (event: "clamp-change", value: boolean): void;
}>();

const onExpandedChange = (value: boolean): void => {
  emit("update:expanded", value);
};

const onClampChange = (value: boolean): void => {
  emit("clamp-change", value);
};
</script>

<style scoped lang="scss">
.pz-text-clamp {
  color: var(--pz-color-text-primary);
  overflow-wrap: anywhere;

  @include typography-body-regular;

  &__toggle {
    padding: 0;
    margin-inline-start: var(--pz-space-4);
    border: 0;
    background: transparent;
    color: var(--pz-color-text-link);
    cursor: pointer;
    outline: none;
    transition: color 160ms ease;

    &:hover,
    &:focus-visible {
      color: var(--pz-color-text-link-hover);
    }
  }
}
</style>
