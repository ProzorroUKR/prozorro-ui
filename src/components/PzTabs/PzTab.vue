<template>
  <div
    v-show="isActive"
    class="pz-tab"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, ref, watch } from "vue";

import { PzTabsProvideKey } from "./constants";
import type { PzTabsState, PzTabsTabProps } from "./types";

defineOptions({ name: "PzTab" });
const props = withDefaults(defineProps<PzTabsTabProps>(), {
  name: "Tab",
  selected: false,
  id: undefined,
});

const instance = getCurrentInstance();
const isActive = ref(false);
const removeTab = inject<((tab: PzTabsTabProps) => void) | undefined>(PzTabsProvideKey.REMOVE_TAB, undefined);
const tabsState = inject<PzTabsState | undefined>(PzTabsProvideKey.TABS_STATE, undefined);
const initTab = inject<((tab: PzTabsTabProps) => void) | undefined>(PzTabsProvideKey.INIT_TAB, undefined);

const tabData = {
  get id(): string {
    return props.id ?? `pz-tab-${instance?.uid ?? props.name}`;
  },
  get name(): string {
    return props.name;
  },
};

watch(
  () => tabsState?.activeTab,
  name => {
    isActive.value = props.name === name;
  },
);

onBeforeMount(() => {
  initTab?.(tabData);
  isActive.value = props.selected;
});

onBeforeUnmount(() => removeTab?.(tabData));
</script>

<style scoped lang="scss">
.pz-tab {
  width: 100%;
}
</style>
