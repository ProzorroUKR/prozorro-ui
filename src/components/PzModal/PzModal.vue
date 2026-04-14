<template>
  <Teleport to="body">
    <div
      v-if="props.isOpen"
      class="pz-modal"
      @keydown.esc="onEscapeKeydown"
    >
      <div
        class="pz-modal-overlay"
        @click="onOverlayClick"
      >
        <div
          ref="dialogRef"
          class="pz-modal-dialog"
          :class="dialogClasses"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descriptionId"
          @click.stop
        >
          <header
            v-if="hasHeader"
            class="pz-modal-header"
            :class="{ 'pz-modal-header--between': hasTitleContent }"
          >
            <div
              v-if="hasTitleContent"
              :id="titleId"
              class="pz-modal-title"
            >
              <slot name="header">
                <PzText
                  v-if="props.title"
                  variant="h4-bold"
                  as="h2"
                >
                  {{ props.title }}
                </PzText>
              </slot>
            </div>

            <button
              v-if="props.showCloseButton"
              type="button"
              class="pz-modal-close"
              :aria-label="props.closeLabel"
              @click="emitClose"
            >
              <PzIcon
                name="close"
                size="24"
                label="Close modal"
              />
            </button>
          </header>

          <div
            :id="descriptionId"
            class="pz-modal-body"
          >
            <slot />
          </div>

          <footer
            v-if="$slots.footer"
            class="pz-modal-footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, useSlots, watch, type Slots } from "vue";

import { PzIcon } from "@/components/PzIcon";
import { PzText } from "@/components/PzText";

import { PZ_MODAL_CLOSE_EVENT, PZ_MODAL_DEFAULTS } from "./constants";
import type { PzModalProps } from "./types";

defineOptions({
  name: "PzModal",
});

const slots: Slots = useSlots();
const props = withDefaults(defineProps<PzModalProps>(), PZ_MODAL_DEFAULTS);

const emit = defineEmits<(event: typeof PZ_MODAL_CLOSE_EVENT) => void>();

const titleId = computed(() => `pz-modal-title-${props.id}`);
const descriptionId = computed(() => `pz-modal-description-${props.id}`);
const hasTitleContent = computed<boolean>(() => Boolean(props.title || slots.header));
const hasHeader = computed<boolean>(() => hasTitleContent.value || props.showCloseButton);
const dialogClasses = computed(() => [`pz-modal-dialog--${props.size}`]);

let previousBodyOverflow = "";

const syncBodyScroll = (isOpen: boolean): void => {
  if (typeof document === "undefined") {
    return;
  }

  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return;
  }

  document.body.style.overflow = previousBodyOverflow;
};

const emitClose = (): void => {
  emit(PZ_MODAL_CLOSE_EVENT);
};

const onOverlayClick = (): void => {
  if (!props.closeOnOverlay) {
    return;
  }

  emitClose();
};

const onEscapeKeydown = (): void => {
  if (!props.closeOnEscape) {
    return;
  }

  emitClose();
};

watch(
  () => props.isOpen,
  value => {
    syncBodyScroll(value);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  syncBodyScroll(false);
});
</script>

<style scoped lang="scss">
.pz-modal {
  position: fixed;
  inset: 0;
  z-index: 1100;
}

.pz-modal-overlay {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: clamp(12px, 3vw, 32px);
  background: color-mix(in srgb, var(--pz-color-black-90) 74%, transparent);
  backdrop-filter: blur(4px);
}

.pz-modal-dialog {
  --pz-modal-width: min(720px, calc(100vw - 32px));
  --pz-modal-padding: 8px;
  --pz-modal-radius: 3px;

  width: var(--pz-modal-width);
  max-width: 100%;
  max-height: min(92vh, 980px);
  overflow: auto;
  border: 1px solid color-mix(in srgb, var(--pz-color-grey-40) 48%, transparent);
  border-radius: var(--pz-modal-radius);
  background: var(--pz-color-white);
  box-shadow:
    0 28px 80px color-mix(in srgb, var(--pz-color-black-90) 18%, transparent),
    0 6px 24px color-mix(in srgb, var(--pz-color-black-90) 10%, transparent);

  &--compact {
    --pz-modal-width: min(520px, calc(100vw - 32px));
  }

  &--regular {
    --pz-modal-width: min(720px, calc(100vw - 32px));
  }

  &--wide {
    --pz-modal-width: min(1080px, calc(100vw - 32px));
  }

  &--fullscreen {
    --pz-modal-width: calc(100vw - 24px);

    max-height: calc(100vh - 24px);
  }
}

.pz-modal-header,
.pz-modal-footer {
  position: sticky;
  z-index: 1;
  background: var(--pz-color-white);
}

.pz-modal-header {
  top: 0;
  display: flex;
  align-items: start;
  justify-content: end;
  gap: 16px;
  padding: var(--pz-modal-padding);

  &--between {
    justify-content: space-between;
  }
}

.pz-modal-footer {
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
  padding: var(--pz-modal-padding);
}

.pz-modal-title {
  min-width: 0;
  padding-top: 2px;
}

.pz-modal-body {
  padding: 0 var(--pz-modal-padding) var(--pz-modal-padding);
  color: var(--pz-color-text-primary);
  overflow-wrap: anywhere;

  @include typography-body-regular;
}

.pz-modal-close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--pz-color-text-link);
  cursor: pointer;
  transition:
    color 160ms ease,
    background-color 160ms ease;

  &:hover,
  &:focus-visible {
    color: var(--pz-color-text-link-hover);
    background: color-mix(in srgb, var(--pz-color-blue-50) 8%, transparent);
    outline: none;
  }
}

@media (width <= 640px) {
  .pz-modal-overlay {
    padding: 12px;
  }

  .pz-modal-dialog {
    --pz-modal-width: calc(100vw - 24px);
    --pz-modal-padding: 16px;
  }

  .pz-modal-header {
    gap: 12px;
    padding-bottom: 12px;
  }

  .pz-modal-footer {
    flex-wrap: wrap;
    justify-content: stretch;
  }
}
</style>
