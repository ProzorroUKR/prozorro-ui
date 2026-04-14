import { ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzModal.stories.scss";
import { pzModalSizeOptions } from "./configs";
import PzModal from "./PzModal.vue";
import type { PzModalProps } from "./types";

type PzModalStoryArgs = PzModalProps & {
  buttonLabel?: string;
};

const buildSource = (args: PzModalStoryArgs): string => {
  const attributes = [
    ':is-open="true"',
    args.title ? `title="${args.title}"` : null,
    args.size !== "regular" ? `size="${args.size}"` : null,
    args.closeOnOverlay === false ? ':close-on-overlay="false"' : null,
    args.closeOnEscape === false ? ':close-on-escape="false"' : null,
    args.showCloseButton === false ? ':show-close-button="false"' : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return `<template>\n  <PzModal ${attributes}>\n    <p>Modal content</p>\n  </PzModal>\n</template>`;
};

const buildSlotSource = (): string => `<template>
  <PzModal :is-open="true" size="fullscreen">
    <template #header>
      <h2>інформація про КБВ.pdf</h2>
    </template>

    <template #footer>
      <button type="button">Закрити</button>
    </template>

    <div>Document preview content</div>
  </PzModal>
</template>`;

const meta = {
  title: "Components/PzModal",
  component: PzModal,
  parameters: {
    prototype: {
      caption: "Modal component",
      note: "Based on the old isOpen/close modal, but rebuilt as a design-system dialog with overlay handling, sticky header and footer areas, and size variants for compact flows or document preview surfaces.",
    },
    docs: {
      description: {
        component:
          "Use `PzModal` for dialogs, side-by-side review surfaces, and document preview overlays. The body content defaults to `body-regular`, while header and footer stay slot-driven for flexible composition.",
      },
      source: {
        transform: (_source: string, context: { args?: PzModalStoryArgs }) =>
          buildSource((context.args ?? meta.args) as PzModalStoryArgs),
      },
    },
  },
  args: {
    id: "storybook-modal",
    isOpen: false,
    title: "Документи тендера",
    size: "regular",
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
    closeLabel: "Close modal",
    buttonLabel: "Open modal",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controlled open state.",
    },
    title: {
      control: "text",
      description: "Default title rendered in the header when the header slot is not used.",
    },
    size: {
      control: "inline-radio",
      options: pzModalSizeOptions,
      description: "Dialog width preset.",
    },
    closeOnOverlay: {
      control: "boolean",
      description: "Closes the dialog when the overlay is clicked.",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Closes the dialog on Escape.",
    },
    showCloseButton: {
      control: "boolean",
      description: "Shows the close icon button in the header.",
    },
    closeLabel: {
      control: "text",
      description: "Accessible label for the close button.",
    },
    buttonLabel: {
      control: "text",
      description: "Story-only trigger label.",
      table: { category: "Story" },
    },
  },
  render: (args: PzModalStoryArgs) => ({
    components: { pzModal: PzModal, pzText: PzText },
    setup() {
      const isOpen = ref(Boolean(args.isOpen));

      watch(
        () => args.isOpen,
        value => {
          isOpen.value = Boolean(value);
        },
      );

      const openModal = (): void => {
        isOpen.value = true;
      };

      const closeModal = (): void => {
        isOpen.value = false;
      };

      return {
        args,
        isOpen,
        openModal,
        closeModal,
      };
    },
    template: `
      <div class="pz-modal-story">
        <section class="pz-modal-story-board">
          <div class="pz-modal-story-copy">
            <span class="pz-modal-story-eyebrow">Dialog surface</span>
            <pz-text variant="h4-bold">Default modal shell</pz-text>
            <pz-text variant="body-regular">
              Sticky header, body-regular content area, and footer actions for short confirmation or review flows.
            </pz-text>

            <button type="button" class="pz-modal-story-trigger" @click="openModal">
              {{ args.buttonLabel }}
            </button>
          </div>
        </section>

        <pz-modal
          :id="args.id"
          :is-open="isOpen"
          :title="args.title"
          :size="args.size"
          :close-on-overlay="args.closeOnOverlay"
          :close-on-escape="args.closeOnEscape"
          :show-close-button="args.showCloseButton"
          :close-label="args.closeLabel"
          @close="closeModal"
        >
          <div class="pz-modal-story-content">
            <pz-text variant="body-regular">
              Перегляньте вкладені документи, деталі постачальника та супровідні матеріали без виходу з поточного сценарію закупівлі.
            </pz-text>

            <div class="pz-modal-story-paper">
              <pz-text variant="body-semibold">інформація про КБВ.pdf</pz-text>
              <pz-text variant="body-regular">
                Інформація про кінцевих бенефіціарних власників постачальника товару, виконавця робіт, надавача послуги.
              </pz-text>
            </div>
          </div>

          <template #footer>
            <button type="button" class="pz-modal-story-secondary" @click="closeModal">Скасувати</button>
            <button type="button" class="pz-modal-story-primary" @click="closeModal">Підтвердити</button>
          </template>
        </pz-modal>
      </div>
    `,
  }),
} satisfies Meta<PzModalStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CompactInfo: Story = {
  args: {
    title: "Інформація про документ",
    size: "compact",
    buttonLabel: "Open compact modal",
  },
};

export const WideReview: Story = {
  args: {
    title: "Перегляд документів закупівлі",
    size: "wide",
    buttonLabel: "Open wide modal",
  },
};

export const DocumentPreview: Story = {
  parameters: {
    docs: {
      source: {
        code: buildSlotSource(),
      },
    },
  },
  render: () => ({
    components: { pzModal: PzModal, pzText: PzText },
    setup() {
      const isOpen = ref(false);

      return {
        isOpen,
        openModal: () => {
          isOpen.value = true;
        },
        closeModal: () => {
          isOpen.value = false;
        },
      };
    },
    template: `
      <div class="pz-modal-story">
        <section class="pz-modal-story-board">
          <div class="pz-modal-story-copy">
            <span class="pz-modal-story-eyebrow">Fullscreen review</span>
            <pz-text variant="h4-bold">Document preview surface</pz-text>
            <button type="button" class="pz-modal-story-trigger" @click="openModal">
              Open fullscreen modal
            </button>
          </div>
        </section>

        <pz-modal
          id="storybook-fullscreen-modal"
          :is-open="isOpen"
          size="fullscreen"
          title=""
          @close="closeModal"
        >
          <template #header>
            <div class="pz-modal-story-document-header">
              <pz-text variant="body-semibold">інформація про КБВ ТОВ МЕЙСІС.jpg</pz-text>
              <a href="#" class="pz-modal-story-download" @click.prevent>Завантажити</a>
            </div>
          </template>

          <div class="pz-modal-story-document">
            <div class="pz-modal-story-document-frame">
              <div class="pz-modal-story-document-sheet"></div>
            </div>
          </div>
        </pz-modal>
      </div>
    `,
  }),
};
