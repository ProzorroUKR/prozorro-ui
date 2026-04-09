import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzIcon } from "@/components/PzIcon";
import { PzText } from "@/components/PzText";

import "./PzLink.stories.scss";
import { pzLinkTargetOptions, pzLinkVariantOptions } from "./configs";
import PzLink from "./PzLink.vue";
import type { PzLinkProps, PzLinkVariant } from "./types";

type PzLinkStoryArgs = PzLinkProps & {
  label?: string;
  showPrefix?: boolean;
  showSuffix?: boolean;
};

interface PzLinkReferenceItem {
  variant: PzLinkVariant;
  label: string;
  prefix?: string;
  suffix?: string;
}

const linkReferenceItems: PzLinkReferenceItem[] = [
  { variant: "primary", label: "Primary text link", suffix: "open_in_new" },
  { variant: "neutral", label: "Neutral navigation link" },
  { variant: "gray", label: "Gray meta link" },
  { variant: "button", label: "Button-like action", prefix: "description" },
  { variant: "icon", label: "Icon-led action", prefix: "launch" },
];

const buildLinkStorySource = (args: PzLinkStoryArgs): string => {
  const attributes = [
    `href="${args.href}"`,
    args.variant !== "primary" ? `variant="${args.variant}"` : null,
    args.target !== "_self" ? `target="${args.target}"` : null,
    args.disabled ? ':disabled="true"' : null,
    args.inline === false ? ':inline="false"' : null,
    args.bold ? ':bold="true"' : null,
    args.italic ? ':italic="true"' : null,
    args.lineThrough ? ':line-through="true"' : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  const slotLines = [
    args.showPrefix ? '    <template #prefix>\n      <PzIcon name="open_in_new" size="16" />\n    </template>' : null,
    `    ${args.label}`,
    args.showSuffix ? '    <template #suffix>\n      <PzIcon name="arrow_forward" size="16" />\n    </template>' : null,
  ].filter((value): value is string => Boolean(value));

  return `<template>\n  <PzLink ${attributes}>\n${slotLines.join("\n")}\n  </PzLink>\n</template>`;
};

const meta = {
  title: "Components/PzLink",
  component: PzLink,
  parameters: {
    prototype: {
      caption: "Link component",
      note: "Figma node access was blocked in this environment, so this single public link primitive is inferred from the shared link, button, and icon tokens plus the legacy link variants you provided.",
    },
    docs: {
      description: {
        component:
          "Use `PzLink` as the single public link primitive. It stays anchor-based, supports variant-driven visual treatments, and prefers slot composition for prefix or suffix icons instead of router-specific behavior.",
      },
      source: {
        transform: (_source: string, context: { args?: PzLinkStoryArgs }) =>
          buildLinkStorySource((context.args ?? meta.args) as PzLinkStoryArgs),
      },
    },
  },
  args: {
    href: "https://prozorro.gov.ua",
    variant: "primary",
    target: "_blank",
    disabled: false,
    inline: true,
    bold: false,
    italic: false,
    lineThrough: false,
    label: "Open procurement details",
    showPrefix: true,
    showSuffix: true,
  },
  argTypes: {
    href: {
      control: "text",
      description: "Anchor href value.",
    },
    variant: {
      control: "inline-radio",
      options: pzLinkVariantOptions,
      description: "Visual link treatment.",
    },
    target: {
      control: "select",
      options: pzLinkTargetOptions,
      description: "Anchor target attribute.",
    },
    disabled: {
      control: "boolean",
      description: "Prevents navigation and applies disabled styling.",
    },
    inline: {
      control: "boolean",
      description: "Renders inline-flex or block flex layout.",
    },
    bold: {
      control: "boolean",
      description: "Applies stronger text weight.",
    },
    italic: {
      control: "boolean",
      description: "Applies italic text style.",
    },
    lineThrough: {
      control: "boolean",
      description: "Adds line-through decoration to the content.",
    },
    label: {
      control: "text",
      description: "Slot content preview text.",
      table: { category: "Slots" },
    },
    showPrefix: {
      control: "boolean",
      description: "Shows a prefix icon slot in the preview.",
      table: { category: "Slots" },
    },
    showSuffix: {
      control: "boolean",
      description: "Shows a suffix icon slot in the preview.",
      table: { category: "Slots" },
    },
  },
  render: (args: PzLinkStoryArgs) => ({
    components: { pzLink: PzLink, pzIcon: PzIcon, pzText: PzText },
    setup() {
      return { args, linkReferenceItems };
    },
    template: `
      <div class="pz-link-story">
        <section class="pz-link-story-board">
          <div class="pz-link-story-header">
            <div>
              <span class="pz-link-story-eyebrow">Component API</span>
              <pz-text variant="h4-bold">One public link primitive</pz-text>
            </div>
            <span class="pz-link-story-chip">{{ args.variant }}</span>
          </div>

          <div class="pz-link-story-preview">
            <pz-link
              :href="args.href"
              :variant="args.variant"
              :target="args.target"
              :disabled="args.disabled"
              :inline="args.inline"
              :bold="args.bold"
              :italic="args.italic"
              :line-through="args.lineThrough"
            >
              <template v-if="args.showPrefix" #prefix>
                <pz-icon
                  name="open_in_new"
                  size="16"
                  label="Link prefix icon"
                />
              </template>

              {{ args.label }}

              <template v-if="args.showSuffix" #suffix>
                <pz-icon
                  name="arrow_forward"
                  size="16"
                  label="Link suffix icon"
                />
              </template>
            </pz-link>
          </div>
        </section>

        <section class="pz-link-story-gallery">
          <div class="pz-link-story-header">
            <div>
              <span class="pz-link-story-eyebrow">Variants</span>
              <pz-text variant="h4-bold">Text, button, and icon link treatments</pz-text>
            </div>
          </div>

          <div class="pz-link-story-grid">
            <article
              v-for="item in linkReferenceItems"
              :key="item.variant"
              class="pz-link-story-card"
            >
              <div class="pz-link-story-row">
                <pz-link
                  href="https://prozorro.gov.ua"
                  :variant="item.variant"
                  target="_blank"
                >
                  <template v-if="item.prefix" #prefix>
                    <pz-icon
                      :name="item.prefix"
                      size="16"
                      :label="item.label + ' prefix icon'"
                    />
                  </template>

                  {{ item.label }}

                  <template v-if="item.suffix" #suffix>
                    <pz-icon
                      :name="item.suffix"
                      size="16"
                      :label="item.label + ' suffix icon'"
                    />
                  </template>
                </pz-link>
              </div>
              <p class="pz-link-story-code">
                .pz-link { --pz-link-color; --pz-link-hover-color; --pz-link-border-color; }
              </p>
            </article>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzLinkStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
