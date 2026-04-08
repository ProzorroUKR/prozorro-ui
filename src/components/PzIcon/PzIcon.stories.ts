import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzIcon.stories.scss";
import { pzIconSizeOptions, pzIconVariantOptions } from "./configs";
import PzIcon from "./PzIcon.vue";
import type { PzIconProps } from "./types";

type PzIconStoryArgs = PzIconProps;

interface PzIconReferenceItem {
  name: string;
  label: string;
  tone: "primary" | "success" | "alert";
}

const iconReferenceItems: PzIconReferenceItem[] = [
  { name: "info", label: "Informational state", tone: "primary" },
  { name: "check_circle", label: "Successful outcome", tone: "success" },
  { name: "warning", label: "Attention required", tone: "alert" },
];

const buildIconStorySource = (args: PzIconStoryArgs): string => {
  const attributes = [
    `name="${args.name}"`,
    args.variant !== "outlined" ? `variant="${args.variant}"` : null,
    args.size !== "16" ? `size="${args.size}"` : null,
    args.label ? `label="${args.label}"` : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return `<template>\n  <PzIcon ${attributes} />\n</template>`;
};

const meta = {
  title: "Components/PzIcon",
  component: PzIcon,
  parameters: {
    prototype: {
      caption: "Icon component",
      note: "Material icon ligatures wrapped in a small Vue API with token-backed sizing and easy CSS overrides.",
    },
    docs: {
      description: {
        component:
          "Use `PzIcon` for Material icons in design-system UI. The component keeps the API small, inherits custom classes and styles, and exposes CSS custom properties for size and color overrides. Find available icon names in the [Material Icons catalog](https://fonts.google.com/icons).",
      },
      source: {
        transform: (_source: string, context: { args?: PzIconStoryArgs }) =>
          buildIconStorySource((context.args ?? meta.args) as PzIconStoryArgs),
      },
    },
  },
  args: {
    name: "account_balance",
    variant: "outlined",
    size: "24",
    label: "Procurement entity",
  },
  argTypes: {
    name: {
      control: "text",
      description: "Material icon ligature name.",
    },
    variant: {
      control: "inline-radio",
      options: pzIconVariantOptions,
      description: "Material icon font family variant.",
    },
    size: {
      control: "select",
      options: pzIconSizeOptions,
      description: "Token-backed font size for the icon.",
    },
    label: {
      control: "text",
      description: "Accessible label. Leave empty for decorative icons.",
    },
  },
  render: (args: PzIconStoryArgs) => ({
    components: { pzIcon: PzIcon, pzText: PzText },
    setup() {
      return { args, iconReferenceItems };
    },
    template: `
      <div class="pz-icon-story">
        <section class="pz-icon-story-preview">
          <div class="pz-icon-story-header">
            <div>
              <span class="pz-icon-story-eyebrow">Component API</span>
              <pz-text variant="h4-bold">Token-backed Material icons</pz-text>
            </div>
            <span class="pz-icon-story-chip">{{ args.name }}</span>
          </div>

          <div class="pz-icon-story-preview-stage">
            <pz-icon
              :name="args.name"
              :variant="args.variant"
              :size="args.size"
              :label="args.label"
            />
          </div>
        </section>

        <section class="pz-icon-story-gallery">
          <div class="pz-icon-story-header">
            <div>
              <span class="pz-icon-story-eyebrow">Styling hooks</span>
              <pz-text variant="h4-bold">Class overrides still work cleanly</pz-text>
              <pz-text variant="body-regular">
                Browse icon names in
                <a
                  class="pz-text-link"
                  href="https://fonts.google.com/icons"
                  target="_blank"
                  rel="noreferrer"
                >
                  Material Icons catalog
                </a>.
              </pz-text>
            </div>
          </div>

          <div class="pz-icon-story-grid">
            <article
              v-for="item in iconReferenceItems"
              :key="item.name"
              class="pz-icon-story-card"
              :data-tone="item.tone"
            >
              <div class="pz-icon-story-card-preview">
                <pz-icon
                  :name="item.name"
                  size="24"
                  :label="item.label"
                />
                <pz-text variant="body-semibold">{{ item.label }}</pz-text>
              </div>
              <p class="pz-icon-story-code">.pz-icon { --pz-icon-color: token; --pz-icon-size: token; }</p>
            </article>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzIconStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
