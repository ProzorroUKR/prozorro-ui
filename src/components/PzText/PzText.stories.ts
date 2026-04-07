import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./PzText.stories.scss";
import { pzTextTagOptions, pzTextVariantOptions } from "./configs";
import PzText from "./PzText.vue";
import type { PzTextProps } from "./types";

type PzTextStoryArgs = PzTextProps & {
  content?: string;
};

const formatVariantLabel = (variant: string): string =>
  variant
    .split("-")
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const meta = {
  title: "Components/PzText",
  component: PzText,
  parameters: {
    prototype: {
      caption: "Text component",
      note: "Component-level playground for semantic tag overrides and text variant rendering.",
    },
    docs: {
      description: {
        component:
          "Vue text primitive for rendering the shared typography variants. Use `Foundation/Typography` for the full type-scale reference and `Components/PzText` for the component API.",
      },
      source: {
        transform: (_source: string, context: { args?: PzTextStoryArgs }) => {
          const args = (context.args ?? {}) as PzTextStoryArgs;
          const attributes = [
            args.variant ? `variant="${args.variant}"` : null,
            args.as ? `as="${args.as}"` : null,
            args.content ? `content="${args.content}"` : null,
          ]
            .filter(Boolean)
            .join(" ");

          return `<template>\n  <PzText ${attributes} />\n</template>`;
        },
      },
    },
  },
  args: {
    variant: "body-regular",
    content: "Every procurement notice should stay readable across dense interfaces and long-form content.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: pzTextVariantOptions,
      description: "Text style variant from the Design System.",
    },
    as: {
      control: "select",
      options: pzTextTagOptions,
      description: "HTML tag to render. Defaults to a semantic tag based on variant.",
    },
    content: {
      control: "text",
      description: "Text content.",
      table: { category: "Slots" },
    },
  },
  render: (args: PzTextStoryArgs) => ({
    components: { pzText: PzText },
    setup() {
      const currentLabel = formatVariantLabel(args.variant);

      return { args, currentLabel };
    },
    template: `
      <section class="pz-text-demo">
        <div class="pz-text-demo-header">
          <div>
            <span class="pz-text-demo-eyebrow">Live preview</span>
            <h2 class="pz-text-demo-title">{{ currentLabel }}</h2>
          </div>
          <span class="pz-text-demo-spec">{{ args.variant }}</span>
        </div>

        <div class="pz-text-demo-surface">
          <pz-text :variant="args.variant" :as="args.as">{{ args.content }}</pz-text>
        </div>
      </section>
    `,
  }),
} satisfies Meta<PzTextStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

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
