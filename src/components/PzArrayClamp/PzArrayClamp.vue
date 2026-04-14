<template>
  <ul class="pz-array-clamp">
    <li
      v-for="(item, index) in visibleList"
      :key="`${String(item)}-${index}`"
      class="pz-array-clamp__item"
    >
      <slot
        :item="item"
        :index="index"
      >
        {{ item }}
      </slot>
    </li>

    <li
      v-if="isToggleVisible"
      class="pz-array-clamp__item"
    >
      <slot
        name="toggle"
        :toggle="toggleExpanded"
        :expanded="isExpanded"
        :hidden-count="hiddenCount"
      >
        <button
          type="button"
          class="pz-array-clamp__toggle"
          :class="props.btnClass"
          @click="toggleExpanded"
        >
          {{ isExpanded ? props.collapseLabel : props.expandLabel }}
        </button>
      </slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { PzArrayClampProps } from "./types";

const DEFAULT_VISIBLE_COUNT = 3;

defineOptions({
  name: "PzArrayClamp",
});

const props = withDefaults(defineProps<PzArrayClampProps>(), {
  count: DEFAULT_VISIBLE_COUNT,
  expanded: false,
  expandLabel: "Показати більше",
  collapseLabel: "Показати менше",
  btnClass: "",
});

const emit = defineEmits<(event: "update:expanded", value: boolean) => void>();

const internalExpanded = ref<boolean>(props.expanded);

watch(
  () => props.expanded,
  value => {
    internalExpanded.value = value;
  },
);

const isExpanded = computed<boolean>(() => internalExpanded.value);

const visibleList = computed<unknown[]>(() => (isExpanded.value ? props.list : props.list.slice(0, props.count)));

const hiddenCount = computed<number>(() => Math.max(props.list.length - props.count, 0));

const isToggleVisible = computed<boolean>(() => hiddenCount.value > 0);

const toggleExpanded = (): void => {
  const nextValue = !isExpanded.value;

  internalExpanded.value = nextValue;
  emit("update:expanded", nextValue);
};
</script>

<style scoped lang="scss">
.pz-array-clamp {
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--pz-color-text-primary);

  @include typography-body-regular;

  &__item {
    margin: 0;
    padding: 0;
  }

  &__toggle {
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--pz-color-text-link);
    cursor: pointer;
    transition: color 160ms ease;

    @include typography-body-regular;

    &:hover,
    &:focus-visible {
      color: var(--pz-color-text-link-hover);
      outline: none;
    }
  }
}
</style>
