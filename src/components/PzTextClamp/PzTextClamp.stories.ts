import { ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzTextClamp.stories.scss";
import PzTextClamp from "./PzTextClamp.vue";
import type { PzTextClampProps } from "./types";

type PzTextClampStoryArgs = PzTextClampProps & {
  title?: string;
};

const clampStories = [
  {
    kicker: "News teaser",
    title: "Two lines with default toggle",
    text: "The procurement framework for recovery projects should remain readable even when editors add dense context, supporting details, and legal clarifications into a single preview paragraph.",
    maxContentLines: 2,
  },
  {
    kicker: "Tender summary",
    title: "Three lines with longer body copy",
    text: "Prozorro teams often need the first block of text to stay compact inside cards, while still giving visitors a way to reveal the full explanation, deadlines, and rationale without leaving the page context.",
    maxContentLines: 3,
  },
  {
    kicker: "Always expanded",
    title: "Controlled expanded state",
    text: "This example starts opened to show that the wrapper supports v-model style control through update:expanded and still keeps the same text treatment as the collapsed variant.",
    maxContentLines: 2,
    expanded: true,
  },
];

const buildSource = (args: PzTextClampStoryArgs): string => {
  const attributes = [
    `text="${args.text}"`,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    args.maxContentLines !== 3 ? `:max-content-lines="${args.maxContentLines}"` : null,
    args.clampPostfix !== "... " ? `clamp-postfix="${args.clampPostfix}"` : null,
    args.expandLabel !== "Show more" ? `expand-label="${args.expandLabel}"` : null,
    args.collapseLabel !== "Collapse" ? `collapse-label="${args.collapseLabel}"` : null,
    args.expanded ? ':expanded="true"' : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return `<template>\n  <PzTextClamp ${attributes} />\n</template>`;
};

const buildSlotSource = (): string => `<template>
  <PzTextClamp
    text="Long procurement summary that needs a custom action."
    :max-content-lines="2"
  >
    <template #toggle="{ toggle, expanded, clamped }">
      <button
        v-if="clamped || expanded"
        type="button"
        class="custom-toggle"
        @click="toggle"
      >
        {{ expanded ? "Hide details" : "Open full text" }}
      </button>
    </template>
  </PzTextClamp>
</template>`;

const meta = {
  title: "Components/PzTextClamp",
  component: PzTextClamp,
  parameters: {
    prototype: {
      caption: "Text clamp component",
      note: "Built as a thin wrapper over vue3-text-clamp, reusing the old text/max-lines/postfix/button-class contract and replacing app-specific translations with explicit labels and a toggle slot.",
    },
    docs: {
      description: {
        component:
          "Use `PzTextClamp` for compact previews of long copy. It defaults to the `body-regular` text style, exposes the old clamp props, and supports toggle customization through `v-model:expanded` and the `toggle` slot.",
      },
      source: {
        transform: (_source: string, context: { args?: PzTextClampStoryArgs }) =>
          buildSource((context.args ?? meta.args) as PzTextClampStoryArgs),
      },
    },
  },
  args: {
    text: clampStories[1].text,
    maxContentLines: 3,
    clampPostfix: "... ",
    btnClass: "",
    autoResize: true,
    expanded: false,
    expandLabel: "Show more",
    collapseLabel: "Collapse",
    title: "Long-form card description",
  },
  argTypes: {
    text: {
      control: "text",
      description: "Source text rendered by the clamp component.",
    },
    maxContentLines: {
      control: { type: "number", min: 1, max: 8, step: 1 },
      description: "Maximum number of visible lines before the text is clamped.",
    },
    clampPostfix: {
      control: "text",
      description: "String appended to the truncated text.",
    },
    btnClass: {
      control: "text",
      description: "Additional class names applied to the default toggle button.",
    },
    autoResize: {
      control: "boolean",
      description: "Recalculates clamping on layout changes.",
    },
    expanded: {
      control: "boolean",
      description: "Controlled expanded state.",
    },
    expandLabel: {
      control: "text",
      description: "Default label shown while the text is collapsed.",
    },
    collapseLabel: {
      control: "text",
      description: "Default label shown while the text is expanded.",
    },
    title: {
      control: "text",
      description: "Preview heading used in the story only.",
      table: { category: "Story" },
    },
  },
  render: (args: PzTextClampStoryArgs) => ({
    components: { pzText: PzText, pzTextClamp: PzTextClamp },
    setup() {
      const expanded = ref(Boolean(args.expanded));

      watch(
        () => args.expanded,
        value => {
          expanded.value = Boolean(value);
        },
      );

      return {
        args,
        expanded,
        clampStories,
      };
    },
    template: `
      <div class="pz-text-clamp-story">
        <section class="pz-text-clamp-story-hero">
          <div class="pz-text-clamp-story-copy">
            <span class="pz-text-clamp-story-eyebrow">Body Regular by default</span>
            <pz-text variant="h4-bold">{{ args.title }}</pz-text>
            <pz-text variant="body-regular">
              Clamp long editorial or procurement copy without creating new typography rules for each surface.
            </pz-text>
          </div>

          <div class="pz-text-clamp-story-preview">
            <pz-text variant="small-semibold" as="span" class="pz-text-clamp-story-chip">
              {{ expanded ? "expanded" : "collapsed" }}
            </pz-text>

            <pz-text-clamp
              :text="args.text"
              :max-content-lines="args.maxContentLines"
              :clamp-postfix="args.clampPostfix"
              :btn-class="args.btnClass"
              :auto-resize="args.autoResize"
              :expanded="expanded"
              :expand-label="args.expandLabel"
              :collapse-label="args.collapseLabel"
              @update:expanded="expanded = $event"
            />
          </div>
        </section>

        <section class="pz-text-clamp-story-grid">
          <article
            v-for="item in clampStories"
            :key="item.title"
            class="pz-text-clamp-story-card"
          >
            <div class="pz-text-clamp-story-card-header">
              <span class="pz-text-clamp-story-kicker">{{ item.kicker }}</span>
              <pz-text variant="body-semibold">{{ item.title }}</pz-text>
            </div>

            <pz-text-clamp
              :text="item.text"
              :max-content-lines="item.maxContentLines"
              :expanded="item.expanded"
            />
          </article>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzTextClampStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TwoLines: Story = {
  args: {
    text: clampStories[0].text,
    maxContentLines: 2,
    title: "News teaser",
  },
};

export const CustomToggle: Story = {
  parameters: {
    docs: {
      source: {
        code: buildSlotSource(),
      },
    },
  },
  render: () => ({
    components: { pzText: PzText, pzTextClamp: PzTextClamp },
    setup() {
      const text =
        "Publishing teams can replace the default inline action with a branded control while keeping the same clamp behavior and the same underlying library implementation.";

      return { text };
    },
    template: `
      <div class="pz-text-clamp-story">
        <section class="pz-text-clamp-story-hero">
          <div class="pz-text-clamp-story-copy">
            <span class="pz-text-clamp-story-eyebrow">Toggle slot</span>
            <pz-text variant="h4-bold">Custom action content</pz-text>
          </div>

          <div class="pz-text-clamp-story-preview">
            <pz-text-clamp
              :text="text"
              :max-content-lines="2"
            >
              <template #toggle="{ toggle, expanded, clamped }">
                <button
                  v-if="clamped || expanded"
                  type="button"
                  class="pz-text-clamp-story-custom-toggle"
                  @click="toggle"
                >
                  {{ expanded ? "Hide details" : "Open full text" }}
                </button>
              </template>
            </pz-text-clamp>
          </div>
        </section>
      </div>
    `,
  }),
};
