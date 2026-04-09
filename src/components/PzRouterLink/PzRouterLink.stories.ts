import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { pzLinkTargetOptions, pzLinkVariantOptions } from "@/components/PzLink/configs";
import { PzIcon } from "@/components/PzIcon";
import { PzText } from "@/components/PzText";

import "./PzRouterLink.stories.scss";
import PzRouterLink from "./PzRouterLink.vue";
import type { PzRouterLinkProps } from "./types";

type PzRouterLinkStoryArgs = PzRouterLinkProps & {
  label?: string;
  showPrefix?: boolean;
  showSuffix?: boolean;
};

const buildRouterLinkStorySource = (args: PzRouterLinkStoryArgs): string => {
  const toValue = typeof args.to === "string" ? args.to : JSON.stringify(args.to);
  const attributes = [
    `to="${toValue}"`,
    args.variant !== "primary" ? `variant="${args.variant}"` : null,
    args.target !== "_self" ? `target="${args.target}"` : null,
    args.disabled ? ':disabled="true"' : null,
    args.inline === false ? ':inline="false"' : null,
    args.bold ? ':bold="true"' : null,
    args.italic ? ':italic="true"' : null,
    args.lineThrough ? ':line-through="true"' : null,
    args.replace ? ':replace="true"' : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  const slotLines = [
    args.showPrefix ? '    <template #prefix>\n      <PzIcon name="arrow_back" size="16" />\n    </template>' : null,
    `    ${args.label}`,
    args.showSuffix ? '    <template #suffix>\n      <PzIcon name="arrow_forward" size="16" />\n    </template>' : null,
  ].filter((value): value is string => Boolean(value));

  return `<template>\n  <PzRouterLink ${attributes}>\n${slotLines.join("\n")}\n  </PzRouterLink>\n</template>`;
};

const meta = {
  title: "Components/PzRouterLink",
  component: PzRouterLink,
  parameters: {
    prototype: {
      caption: "Router-aware link component",
      note: "Use `PzRouterLink` for in-app navigation with vue-router while keeping the same visual API as `PzLink`.",
    },
    docs: {
      description: {
        component:
          "Use `PzRouterLink` when navigation should stay inside a Vue Router application without forcing a full page reload. It wraps `PzLink` and forwards the same visual props and slots.",
      },
      source: {
        transform: (_source: string, context: { args?: PzRouterLinkStoryArgs }) =>
          buildRouterLinkStorySource((context.args ?? meta.args) as PzRouterLinkStoryArgs),
      },
    },
  },
  args: {
    to: "/tenders/active",
    variant: "primary",
    target: "_self",
    disabled: false,
    inline: true,
    bold: false,
    italic: false,
    lineThrough: false,
    replace: false,
    label: "Open active tenders",
    showPrefix: false,
    showSuffix: true,
  },
  argTypes: {
    to: {
      control: "text",
      description: "Vue Router target location.",
    },
    variant: {
      control: "inline-radio",
      options: pzLinkVariantOptions,
      description: "Visual link treatment.",
    },
    target: {
      control: "select",
      options: pzLinkTargetOptions,
      description: "Anchor target attribute. `_self` keeps router navigation enabled.",
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
    replace: {
      control: "boolean",
      description: "Uses router replace navigation instead of push.",
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
  render: (args: PzRouterLinkStoryArgs) => ({
    components: { pzRouterLink: PzRouterLink, pzIcon: PzIcon, pzText: PzText },
    setup() {
      const route = useRoute();
      const currentPath = computed(() => route.fullPath);

      return { args, currentPath };
    },
    template: `
      <div class="pz-link-story">
        <section class="pz-link-story-board">
          <div class="pz-link-story-header">
            <div>
              <span class="pz-link-story-eyebrow">Router API</span>
              <pz-text variant="h4-bold">SPA navigation wrapper</pz-text>
            </div>
            <span class="pz-link-story-chip">{{ currentPath }}</span>
          </div>

          <div class="pz-link-story-preview">
            <pz-router-link
              :to="args.to"
              :variant="args.variant"
              :target="args.target"
              :disabled="args.disabled"
              :inline="args.inline"
              :bold="args.bold"
              :italic="args.italic"
              :line-through="args.lineThrough"
              :replace="args.replace"
            >
              <template v-if="args.showPrefix" #prefix>
                <pz-icon
                  name="arrow_back"
                  size="16"
                  label="Router link prefix icon"
                />
              </template>

              {{ args.label }}

              <template v-if="args.showSuffix" #suffix>
                <pz-icon
                  name="arrow_forward"
                  size="16"
                  label="Router link suffix icon"
                />
              </template>
            </pz-router-link>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzRouterLinkStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
