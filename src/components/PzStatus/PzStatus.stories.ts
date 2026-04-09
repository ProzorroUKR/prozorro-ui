import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzStatus.stories.scss";
import { pzStatusTagOptions, pzStatusVariantOptions } from "./configs";
import PzStatus from "./PzStatus.vue";
import type { PzStatusProps, PzStatusVariant } from "./types";

type PzStatusStoryArgs = PzStatusProps & {
  label?: string;
};

interface PzStatusReferenceItem {
  id: string;
  variant: PzStatusVariant;
  label: string;
}

const statusReferenceItems: PzStatusReferenceItem[] = [
  { id: "hidden-review", variant: "hidden", label: "Очікує розгляду" },
  { id: "monitoring-accepted", variant: "monitoring", label: "Прийнято до розгляду" },
  { id: "inactive-without-review", variant: "inactive", label: "Залишено без розгляду" },
  { id: "inactive-stopped", variant: "inactive", label: "Розгляд припинено" },
  { id: "inactive-rejected", variant: "inactive", label: "Відмовлено в задоволенні" },
  { id: "active-satisfied", variant: "active", label: "Задоволено" },
  { id: "inactive-withdrawn", variant: "inactive", label: "Відкликано" },
  { id: "inactive-cancelled", variant: "inactive", label: "Скасовано" },
  { id: "active-fixed", variant: "active", label: "Порушення усунуто" },
];

const statusPaletteItems: PzStatusReferenceItem[] = [
  { id: "palette-hidden", variant: "hidden", label: "Текст" },
  { id: "palette-inactive", variant: "inactive", label: "Текст" },
  { id: "palette-active", variant: "active", label: "Текст" },
  { id: "palette-monitoring", variant: "monitoring", label: "Текст" },
  { id: "palette-disabled", variant: "disabled", label: "Текст" },
];

const buildStatusStorySource = (args: PzStatusStoryArgs): string => {
  const attributes = [
    args.variant !== "progress" ? `variant="${args.variant}"` : null,
    args.as !== "span" ? `as="${args.as}"` : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return `<template>\n  <PzStatus ${attributes}>${args.label}</PzStatus>\n</template>`;
};

const meta = {
  title: "Components/PzStatus",
  component: PzStatus,
  parameters: {
    prototype: {
      caption: "Status component",
      note: "Aligned with Figma node 76:1113: compact filled badges with 3px radius, white label text, optional indicator, and multiline support.",
    },
    docs: {
      description: {
        component:
          "Use `PzStatus` for semantic state labels. The component matches the design-system badge treatment from Figma and keeps semantic color variants, including gradient auction states.",
      },
      source: {
        transform: (_source: string, context: { args?: PzStatusStoryArgs }) =>
          buildStatusStorySource((context.args ?? meta.args) as PzStatusStoryArgs),
      },
    },
  },
  args: {
    variant: "progress",
    as: "span",
    label: "Очікує розгляду",
  },
  argTypes: {
    variant: {
      control: "select",
      options: pzStatusVariantOptions,
      description: "Semantic status variant.",
    },
    as: {
      control: "select",
      options: pzStatusTagOptions,
      description: "HTML tag used for the wrapper.",
    },
    label: {
      control: "text",
      description: "Slot content preview text.",
      table: { category: "Slots" },
    },
  },
  render: (args: PzStatusStoryArgs) => ({
    components: { pzStatus: PzStatus, pzText: PzText },
    setup() {
      return { args, statusReferenceItems, statusPaletteItems };
    },
    template: `
      <div class="pz-status-story">
        <section class="pz-status-story-board">
          <div class="pz-status-story-header">
            <div>
              <span class="pz-status-story-eyebrow">Component API</span>
              <pz-text variant="h4-bold">Compact filled status badge</pz-text>
            </div>
            <span class="pz-status-story-chip">{{ args.variant }}</span>
          </div>

          <div class="pz-status-story-preview">
            <pz-status
              :variant="args.variant"
              :as="args.as"
              :show-indicator="args.showIndicator"
            >
              {{ args.label }}
            </pz-status>
          </div>
        </section>

        <section class="pz-status-story-figma">
          <div class="pz-status-story-header">
            <div>
              <span class="pz-status-story-eyebrow">Figma Reference</span>
              <pz-text variant="h4-bold">Examples from the design system node</pz-text>
            </div>
          </div>

          <div class="pz-status-story-reference">
            <div class="pz-status-story-column">
              <pz-status
                v-for="item in statusReferenceItems"
                :key="item.id"
                :variant="item.variant"
              >
                {{ item.label }}
              </pz-status>
            </div>

            <div class="pz-status-story-column pz-status-story-column-palette">
              <pz-status
                v-for="item in statusPaletteItems"
                :key="item.id"
                :variant="item.variant"
              >
                {{ item.label }}
              </pz-status>
            </div>

            <div class="pz-status-story-column">
              <p class="pz-status-story-caption">статус з перенесенням тексту</p>
              <div class="pz-status-story-wrap">
                <pz-status variant="hidden">
                  Очікує розгляду Очікує розгляду Очікує розгляду
                </pz-status>
              </div>
            </div>
          </div>
        </section>

        <section class="pz-status-story-gallery">
          <div class="pz-status-story-header">
            <div>
              <span class="pz-status-story-eyebrow">Variants</span>
              <pz-text variant="h4-bold">Semantic variants, including auction gradients</pz-text>
            </div>
          </div>

          <div class="pz-status-story-grid">
            <article
              v-for="item in [
                { id: 'variant-hidden', variant: 'hidden', label: 'Очікує розгляду' },
                { id: 'variant-inactive', variant: 'inactive', label: 'Залишено без розгляду' },
                { id: 'variant-active', variant: 'active', label: 'Задоволено' },
                { id: 'variant-monitoring', variant: 'monitoring', label: 'Прийнято до розгляду' },
                { id: 'variant-disabled', variant: 'disabled', label: 'Недоступно' },
                { id: 'variant-progress', variant: 'progress', label: 'У процесі' },
                { id: 'variant-auction-progress', variant: 'auction-progress', label: 'Auction in progress' },
                { id: 'variant-auction-waiting', variant: 'auction-waiting', label: 'Auction waiting' },
                { id: 'variant-auction-success', variant: 'auction-success', label: 'Auction successful' },
              ]"
              :key="item.id"
              class="pz-status-story-card"
            >
              <pz-status :variant="item.variant">{{ item.label }}</pz-status>
              <p class="pz-status-story-code">{{ item.variant }}</p>
            </article>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzStatusStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
