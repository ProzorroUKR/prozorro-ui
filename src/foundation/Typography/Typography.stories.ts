import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./Typography.stories.scss";
import { PzText, type PzTextProps, type PzTextVariant } from "@/components/PzText";

interface PzTextVariantReferenceItem {
  variant: PzTextVariant;
  label: string;
  spec: string;
}

interface PzTextVariantReferenceGroup {
  title: string;
  description: string;
  items: PzTextVariantReferenceItem[];
}

type PzTextStoryArgs = PzTextProps & {
  content?: string;
};

const typographyReferenceItems: PzTextVariantReferenceItem[] = [
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

const typographyReferenceGroups: PzTextVariantReferenceGroup[] = [
  {
    title: "Headlines",
    description: "Primary hierarchy for pages, sections and table headers.",
    items: typographyReferenceItems.slice(0, headlineVariantsCount),
  },
  {
    title: "Reading text",
    description: "Core editorial styles for descriptions, summaries and UI copy.",
    items: typographyReferenceItems.slice(headlineVariantsCount, readingVariantsCount),
  },
  {
    title: "Utility styles",
    description: "Compact text styles for metadata, helpers and document references.",
    items: typographyReferenceItems.slice(readingVariantsCount),
  },
];

const meta = {
  title: "Foundation/Typography",
  parameters: {
    prototype: {
      caption: "Typography reference",
      note: "Foundation board for validating hierarchy, weight, and text semantics against the shared design-system scale.",
    },
    docs: {
      description: {
        component:
          "Typography foundation reference. Use this page to review the full type scale and variant grouping; use `Components/PzText` for the component API.",
      },
    },
  },
  args: {
    variant: "body-regular",
    content: "Every procurement notice should stay readable across dense interfaces and long-form content.",
  },
  render: (args: PzTextStoryArgs) => ({
    components: { pzText: PzText },
    setup() {
      return { args, typographyReferenceGroups };
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
          v-for="group in typographyReferenceGroups"
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
} satisfies Meta<PzTextStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Reference: Story = {
  name: "Reference",
};
