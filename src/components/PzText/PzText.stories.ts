import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./PzText.stories.scss";
import PzText from "./PzText.vue";
import type { PzTextProps, PzTextTag, PzTextVariant } from "./types";

const variantOptions = [
  "h1-bold",
  "h1-regular",
  "h2-bold",
  "h3-bold",
  "h3-regular",
  "h4-regular",
  "h4-semibold",
  "h4-bold",
  "subtitle",
  "body-regular",
  "body-semibold",
  "body-bold",
  "capitalized",
  "hint",
  "line-through",
  "small-regular",
  "small-semibold",
  "small-bold",
  "link",
  "document",
] satisfies PzTextVariant[];

const tagOptions = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div", "a", "label"] satisfies PzTextTag[];

const variantSamples: Array<{ variant: PzTextVariant; label: string; spec: string }> = [
  { variant: "h1-bold", label: "Headline Bold 1", spec: "44px / 700 / 1.5" },
  { variant: "h1-regular", label: "Headline Regular 1", spec: "44px / 400 / 1.5" },
  { variant: "h2-bold", label: "Headline Bold 2", spec: "32px / 700 / 1.5" },
  { variant: "h3-bold", label: "Headline Bold 3", spec: "24px / 700 / 1.5" },
  { variant: "h3-regular", label: "Headline Regular 3", spec: "24px / 400 / 1.5" },
  { variant: "h4-regular", label: "Headline Regular 4", spec: "18px / 400 / 1.5" },
  { variant: "h4-semibold", label: "Headline Semibold 4", spec: "18px / 600 / 1.5" },
  { variant: "h4-bold", label: "Headline Bold 4", spec: "18px / 700 / 1.5" },
  { variant: "subtitle", label: "Subtitle", spec: "16px / 600 / 1.5" },
  { variant: "body-regular", label: "Body text regular", spec: "14px / 400 / 1.5" },
  { variant: "body-semibold", label: "Body text semibold", spec: "14px / 600 / 1.5" },
  { variant: "body-bold", label: "Body text bold", spec: "14px / 700 / 1.5" },
  { variant: "capitalized", label: "Capitalized text", spec: "14px / 400 / uppercase" },
  { variant: "hint", label: "Hint text", spec: "14px / 400 / muted" },
  { variant: "line-through", label: "Archived value", spec: "14px / 400 / strike" },
  { variant: "small-regular", label: "Small text regular", spec: "12px / 400 / 1.5" },
  { variant: "small-semibold", label: "Small text semibold", spec: "12px / 600 / 1.5" },
  { variant: "small-bold", label: "Small text bold", spec: "12px / 700 / 1.5" },
  { variant: "link", label: "Review procurement details", spec: "14px / 400 / underline" },
  { variant: "document", label: "Document text", spec: "14px / 400 / default" },
];

const headlineVariantsCount = 8;
const readingVariantsCount = 15;

const variantGroups = [
  {
    title: "Headlines",
    description: "Primary hierarchy for pages, sections and table headers.",
    items: variantSamples.slice(0, headlineVariantsCount),
  },
  {
    title: "Reading text",
    description: "Core editorial styles for descriptions, summaries and UI copy.",
    items: variantSamples.slice(headlineVariantsCount, readingVariantsCount),
  },
  {
    title: "Utility styles",
    description: "Compact text styles for metadata, helpers and document references.",
    items: variantSamples.slice(readingVariantsCount),
  },
];

type TextStoryArgs = PzTextProps & {
  content?: string;
};

const meta = {
  title: "Foundation/PzText",
  component: PzText,
  parameters: {
    prototype: {
      caption: "Typography review",
      note: "Prototype board for validating hierarchy, weight and semantics against the design-system text scale.",
    },
  },
  args: {
    variant: "body-regular",
    content: "Every procurement notice should stay readable across dense interfaces and long-form content.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
      description: "Text style variant from the Design System.",
    },
    as: {
      control: "select",
      options: tagOptions,
      description: "HTML tag to render. Defaults to a semantic tag based on variant.",
    },
    content: {
      control: "text",
      description: "Text content.",
      table: { category: "Slots" },
    },
  },
  render: (args: TextStoryArgs) => ({
    components: { pzText: PzText },
    setup() {
      const currentSample = variantSamples.find(sample => sample.variant === args.variant) ?? variantSamples[0];

      return { args, currentSample };
    },
    template: `
      <section class="pz-text-demo">
        <div class="pz-text-demo-header">
          <div>
            <span class="pz-text-demo-eyebrow">Live preview</span>
            <h2 class="pz-text-demo-title">{{ currentSample.label }}</h2>
          </div>
          <span class="pz-text-demo-spec">{{ currentSample.spec }}</span>
        </div>

        <div class="pz-text-demo-surface">
          <pz-text :variant="args.variant" :as="args.as">{{ args.content }}</pz-text>
        </div>
      </section>
    `,
  }),
} satisfies Meta<TextStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: {
    prototype: {
      caption: "Typography prototype board",
      note: "Specimen sheet for reviewing the full Prozorro text scale in a single prototype canvas.",
    },
  },
  render: args => ({
    components: { pzText: PzText },
    setup() {
      return { args, variantGroups };
    },
    template: `
      <div class="pz-text-board">
        <section class="pz-text-board-hero">
          <div class="pz-text-board-hero-copy">
            <span class="pz-text-board-eyebrow">Design system / Typography</span>
            <h1 class="pz-text-board-title">Readable hierarchy for procurement interfaces</h1>
            <p class="pz-text-board-description">
              The board below mirrors a Figma-style specimen page: one live editable preview, followed by grouped text tokens with their size and weight metadata.
            </p>
          </div>

          <div class="pz-text-board-hero-preview">
            <span class="pz-text-board-chip">Interactive sample</span>
            <pz-text :variant="args.variant" :as="args.as">{{ args.content }}</pz-text>
          </div>
        </section>

        <section
          v-for="group in variantGroups"
          :key="group.title"
          class="pz-text-board-group"
        >
          <header class="pz-text-board-group-header">
            <div>
              <span class="pz-text-board-group-kicker">{{ group.title }}</span>
              <h2 class="pz-text-board-group-title">{{ group.description }}</h2>
            </div>
          </header>

          <div class="pz-text-board-grid">
            <article
              v-for="sample in group.items"
              :key="sample.variant"
              class="pz-text-board-card"
            >
              <div class="pz-text-board-meta">
                <span class="pz-text-board-variant">{{ sample.variant }}</span>
                <span class="pz-text-board-spec">{{ sample.spec }}</span>
              </div>
              <pz-text :variant="sample.variant">{{ sample.label }}</pz-text>
            </article>
          </div>
        </section>
      </div>
    `,
  }),
};

export const H1Bold: Story = {
  name: "H1 Bold",
  args: { variant: "h1-bold", content: "Headline Bold 1" },
};

export const H1Regular: Story = {
  name: "H1 Regular",
  args: { variant: "h1-regular", content: "Headline Regular 1" },
};

export const H2Bold: Story = {
  name: "H2 Bold",
  args: { variant: "h2-bold", content: "Headline Bold 2" },
};

export const H3Bold: Story = {
  name: "H3 Bold",
  args: { variant: "h3-bold", content: "Headline Bold 3" },
};

export const H3Regular: Story = {
  name: "H3 Regular",
  args: { variant: "h3-regular", content: "Headline Regular 3" },
};

export const H4Regular: Story = {
  name: "H4 Regular",
  args: { variant: "h4-regular", content: "Headline Regular 4" },
};

export const H4Semibold: Story = {
  name: "H4 Semibold",
  args: { variant: "h4-semibold", content: "Headline Semibold 4" },
};

export const H4Bold: Story = {
  name: "H4 Bold",
  args: { variant: "h4-bold", content: "Headline Bold 4" },
};

export const Subtitle: Story = {
  args: { variant: "subtitle", content: "Subtitle" },
};

export const BodyRegular: Story = {
  name: "Body Regular",
  args: { variant: "body-regular", content: "Body text regular" },
};

export const BodySemibold: Story = {
  name: "Body Semibold",
  args: { variant: "body-semibold", content: "Body text semibold" },
};

export const BodyBold: Story = {
  name: "Body Bold",
  args: { variant: "body-bold", content: "Body text bold" },
};

export const Capitalized: Story = {
  args: { variant: "capitalized", content: "Capitalized text" },
};

export const Hint: Story = {
  args: { variant: "hint", content: "Hint text" },
};

export const LineThroughStory: Story = {
  name: "Line Through",
  args: { variant: "line-through", content: "Line through text" },
};

export const SmallRegular: Story = {
  name: "Small Regular",
  args: { variant: "small-regular", content: "Small text regular" },
};

export const SmallSemibold: Story = {
  name: "Small Semibold",
  args: { variant: "small-semibold", content: "Small text semibold" },
};

export const SmallBold: Story = {
  name: "Small Bold",
  args: { variant: "small-bold", content: "Small text bold" },
};

export const LinkStory: Story = {
  name: "Link",
  args: { variant: "link", content: "Link text" },
};

export const Document: Story = {
  args: { variant: "document", content: "Document text" },
};
