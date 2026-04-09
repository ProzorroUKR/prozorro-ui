import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzIcon } from "@/components/PzIcon";
import { PzText } from "@/components/PzText";

import "./PzTag.stories.scss";
import { pzTagTagOptions, pzTagVariantOptions } from "./configs";
import PzTag from "./PzTag.vue";
import type { PzTagProps, PzTagVariant } from "./types";

type PzTagStoryArgs = PzTagProps & {
  label?: string;
  showPrefix?: boolean;
  showSuffix?: boolean;
};

interface PzTagReferenceItem {
  variant: PzTagVariant;
  label: string;
}

const tagReferenceItems: PzTagReferenceItem[] = [
  { variant: "grey", label: "Neutral" },
  { variant: "grey-light", label: "Neutral light" },
  { variant: "blue", label: "Information" },
  { variant: "green", label: "Verified" },
  { variant: "red", label: "Important" },
];

const buildTagStorySource = (args: PzTagStoryArgs): string => {
  const attributes = [
    args.variant !== "grey" ? `variant="${args.variant}"` : null,
    args.as !== "span" ? `as="${args.as}"` : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  const prefix = args.showPrefix
    ? '\n    <template #prefix>\n      <PzIcon name="sell" size="12" />\n    </template>'
    : "";
  const suffix = args.showSuffix
    ? '\n    <template #suffix>\n      <PzIcon name="close" size="12" />\n    </template>'
    : "";

  return `<template>\n  <PzTag ${attributes}>${prefix}\n    ${args.label}${suffix}\n  </PzTag>\n</template>`;
};

const meta = {
  title: "Components/PzTag",
  component: PzTag,
  parameters: {
    prototype: {
      caption: "Tag component",
      note: "Figma node access was blocked in this environment, so the tag styling is inferred from the existing tag token set and implemented as a compact slot-based pill.",
    },
    docs: {
      description: {
        component:
          "Use `PzTag` for compact semantic labels. Variants map directly to the shared tag tokens, and optional prefix or suffix content should be composed through slots.",
      },
      source: {
        transform: (_source: string, context: { args?: PzTagStoryArgs }) =>
          buildTagStorySource((context.args ?? meta.args) as PzTagStoryArgs),
      },
    },
  },
  args: {
    variant: "blue",
    as: "span",
    label: "Open data",
    showPrefix: true,
    showSuffix: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: pzTagVariantOptions,
      description: "Semantic tag color variant.",
    },
    as: {
      control: "select",
      options: pzTagTagOptions,
      description: "HTML tag used for the wrapper.",
    },
    label: {
      control: "text",
      description: "Slot content preview text.",
      table: { category: "Slots" },
    },
    showPrefix: {
      control: "boolean",
      description: "Shows a composed prefix icon slot in the preview.",
      table: { category: "Slots" },
    },
    showSuffix: {
      control: "boolean",
      description: "Shows a composed suffix icon slot in the preview.",
      table: { category: "Slots" },
    },
  },
  render: (args: PzTagStoryArgs) => ({
    components: { pzTag: PzTag, pzText: PzText, pzIcon: PzIcon },
    setup() {
      return { args, tagReferenceItems };
    },
    template: `
      <div class="pz-tag-story">
        <section class="pz-tag-story-board">
          <div class="pz-tag-story-header">
            <div>
              <span class="pz-tag-story-eyebrow">Component API</span>
              <pz-text variant="h4-bold">Compact token-backed labels</pz-text>
            </div>
            <span class="pz-tag-story-chip">{{ args.variant }}</span>
          </div>

          <div class="pz-tag-story-preview">
            <pz-tag
              :variant="args.variant"
              :as="args.as"
            >
              <template v-if="args.showPrefix" #prefix>
                <pz-icon
                  name="sell"
                  size="12"
                  label="Tag prefix icon"
                />
              </template>

              {{ args.label }}

              <template v-if="args.showSuffix" #suffix>
                <pz-icon
                  name="close"
                  size="12"
                  label="Tag suffix icon"
                />
              </template>
            </pz-tag>
          </div>
        </section>

        <section class="pz-tag-story-gallery">
          <div class="pz-tag-story-header">
            <div>
              <span class="pz-tag-story-eyebrow">Variants</span>
              <pz-text variant="h4-bold">Semantic labels stay easy to restyle</pz-text>
            </div>
          </div>

          <div class="pz-tag-story-grid">
            <article
              v-for="item in tagReferenceItems"
              :key="item.variant"
              class="pz-tag-story-card"
            >
              <div class="pz-tag-story-row">
                <pz-tag :variant="item.variant">{{ item.label }}</pz-tag>
              </div>
              <p class="pz-tag-story-code">.pz-tag { --pz-tag-background; --pz-tag-color; --pz-tag-radius; }</p>
            </article>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzTagStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
