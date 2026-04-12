<template>
  <div
    class="pz-tabs"
    :class="tabsSkinClass"
    :style="{ maxWidth }"
  >
    <ul class="pz-tabs__nav">
      <li
        v-for="tab in state.tabs"
        :key="tab.id"
        class="pz-tabs__item"
        :class="{ active: state.activeTab === tab.name }"
        @click="state.activeTab = tab.name || ''"
      >
        {{ tab.name }}
      </li>
    </ul>

    <div class="pz-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive } from "vue";

import { PzTabsProvideKey } from "./constants";
import type { PzTabsProps, PzTabsState, PzTabsTabProps } from "./types";

defineOptions({ name: "PzTabs" });
const state = reactive<PzTabsState>({
  tabs: [],
  activeTab: "",
});

const props = withDefaults(defineProps<PzTabsProps>(), {
  skin: "",
  maxWidth: "",
});

const tabsSkinClass = computed<string>(() => (props.skin ? `pz-tabs--${props.skin}` : ""));

provide(PzTabsProvideKey.TABS_STATE, state);
provide(PzTabsProvideKey.INIT_TAB, (tab: PzTabsTabProps) => state.tabs.push(tab));
provide(PzTabsProvideKey.REMOVE_TAB, (tab: PzTabsTabProps) => {
  state.tabs = state.tabs.filter(innerTab => innerTab.id !== tab.id);
  _updateActiveTab();
});

onMounted(() => _updateActiveTab());

const _updateActiveTab = (): void => {
  const [{ name } = { name: "" }] = state.tabs.filter(({ selected }) => selected);
  state.activeTab = name || state.tabs[0]?.name || "";
};
</script>

<style scoped lang="scss">
@use "@/styles/abstract/mixins" as *;

.pz-tabs {
  --pz-tabs-wrapper-bg:
    linear-gradient(180deg, rgb(249 242 223 / 100%) 0%, rgb(244 234 209 / 100%) 100%),
    radial-gradient(circle at top right, rgb(119 88 44 / 10%), transparent 36%);
  --pz-tabs-bg: var(--pz-color-background-frame);
  --pz-tabs-bg-active-tab: var(--pz-color-background-frame);
  --pz-tabs-color-active-tab: var(--pz-color-text-primary);
  --pz-tabs-item-font-weight: 600;
  --pz-tabs-wrapper-radius: 16px;
  --pz-tabs-inner-radius: 12px;
  --pz-tabs-wrapper-padding: 8px;

  display: grid;
  gap: 0;
  width: 100%;
  padding: var(--pz-tabs-wrapper-padding);
  border-radius: var(--pz-tabs-wrapper-radius);
  background: var(--pz-tabs-wrapper-bg);
  box-shadow:
    inset 0 0 0 1px rgb(91 69 37 / 8%),
    0 10px 24px rgb(53 37 18 / 6%);

  &--light {
    --pz-tabs-bg: var(--pz-color-background-primary);
    --pz-tabs-bg-active-tab: var(--pz-color-background-primary);
  }

  &__nav {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;

    @include max-media-devices("lg") {
      overflow-x: auto;
      scrollbar-color: var(--pz-color-grey-30) var(--pz-tabs-bg-active-tab);
    }
  }

  &__item {
    padding: 12px 24px;
    border-radius: var(--pz-tabs-inner-radius) var(--pz-tabs-inner-radius) 0 0;
    color: var(--pz-color-text-link);
    cursor: pointer;
    font-size: var(--pz-font-size-14);
    font-weight: var(--pz-tabs-item-font-weight);
    transition: all 0.2s;

    @include max-media-devices("lg") {
      display: list-item;
      white-space: nowrap;
    }

    &.active {
      color: var(--pz-tabs-color-active-tab);
      background-color: var(--pz-tabs-bg-active-tab);

      @include max-media-devices("lg") {
        --pz-tabs-item-font-weight: 700;
      }
    }
  }

  &__content {
    width: 100%;
    border-radius: 0 var(--pz-tabs-inner-radius) var(--pz-tabs-inner-radius) var(--pz-tabs-inner-radius);
    background-color: var(--pz-tabs-bg);
  }
}
</style>
