import { onMounted } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useRouter } from "vue-router";

import { PzText } from "@/components/PzText";

import "./PzNav.stories.scss";
import PzNav from "./PzNav.vue";
import type { PzNavItem, PzNavProps } from "./types";

type PzNavStoryArgs = PzNavProps;

const marketNavItems: PzNavItem[] = [
  { path: "/market/procedures", text: "Закупівлі", isDefault: true },
  { path: "/market/contracts", text: "Договори" },
  { path: "/market/plans", text: "Плани" },
  { path: "/market/selection", text: "Відбори" },
  { path: "/market/products", text: "Товари" },
];

const tenderNavItems: PzNavItem[] = [
  { path: "/tender/details", text: "Деталі закупівлі", isDefault: true },
  { path: "/tender/questions", text: "Питання та вимоги (0)" },
  { path: "/tender/complaints", text: "Скарги (0)" },
  { path: "/tender/monitoring", text: "Моніторинг (0)", disabled: true },
];

const archiveNavItems: PzNavItem[] = [
  { path: "/archive/overview", text: "Overview", isDefault: true },
  { path: "/archive/history", text: "History", disabled: true },
  { path: "/archive/files", text: "Files" },
];

const buildNavStorySource = (args: PzNavStoryArgs): string => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const config = JSON.stringify(args.config, null, 2);
  return `<template>\n  <PzNav :config='${config}' />\n</template>`;
};

const buildSlotStorySource = (): string => `<template>
  <PzNav :config="config">
    <template #view="{ data }">
      <span class="custom-nav-item">
        <span>{{ data.text }}</span>
        <span v-if="data.count" class="custom-nav-badge">{{ data.count }}</span>
      </span>
    </template>
  </PzNav>
</template>`;

const meta = {
  title: "Components/PzNav",
  component: PzNav,
  parameters: {
    prototype: {
      caption: "Navigation component",
      note: "Renamed from the previous app-level URL tabs to the shared `PzNav` component. It keeps the original `config` prop, default-tab logic, disabled states, and the `view` slot for custom item rendering.",
    },
    docs: {
      description: {
        component:
          "Use `PzNav` when a screen needs route-based horizontal navigation. It follows the previous `url-tabs` API with a `config` array and marks the fallback item active when no route matches and `isDefault` is set.",
      },
      source: {
        transform: (_source: string, context: { args?: PzNavStoryArgs }) =>
          buildNavStorySource((context.args ?? meta.args) as PzNavStoryArgs),
      },
    },
  },
  args: {
    config: marketNavItems,
  },
  argTypes: {
    config: {
      control: "object",
      description: "Navigation items with route path, label, disabled state, and optional default fallback.",
    },
  },
  render: (args: PzNavStoryArgs) => ({
    components: { pzNav: PzNav, pzText: PzText },
    setup() {
      const router = useRouter();

      onMounted(async () => {
        await router.push("/market/procedures");
      });

      return {
        args,
        marketNavItems,
        tenderNavItems,
      };
    },
    template: `
      <div class="pz-nav-story">
        <section class="pz-nav-story-frame">
          <div class="pz-nav-story-header">
            <div>
              <span class="pz-nav-story-eyebrow">Main navigation</span>
              <pz-text variant="h4-bold">Section switcher for catalog and procurement pages</pz-text>
            </div>
            <span class="pz-nav-story-chip">route-aware</span>
          </div>

          <div class="pz-nav-story-stack">
            <div class="pz-nav-story-surface">
              <pz-nav :config="args.config" />
            </div>
          </div>
        </section>

        <section class="pz-nav-story-grid">
          <article class="pz-nav-story-card">
            <div class="pz-nav-story-card-copy">
              <pz-text variant="body-semibold">Market categories</pz-text>
              <pz-text variant="small-regular">
                Mirrors the wide navigation from the marketplace landing page.
              </pz-text>
            </div>

            <div class="pz-nav-story-card-surface">
              <pz-nav :config="marketNavItems" />
            </div>
          </article>

          <article class="pz-nav-story-card">
            <div class="pz-nav-story-card-copy">
              <pz-text variant="body-semibold">Tender detail tabs</pz-text>
              <pz-text variant="small-regular">
                Good for process pages where one item is active and another may be disabled.
              </pz-text>
            </div>

            <div class="pz-nav-story-card-surface">
              <div class="pz-nav-story-compact">
                <pz-nav :config="tenderNavItems" />
              </div>
            </div>
          </article>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzNavStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const DefaultFallback: Story = {
  args: {
    config: archiveNavItems,
  },
  render: args => ({
    components: { pzNav: PzNav, pzText: PzText },
    setup() {
      const router = useRouter();

      onMounted(async () => {
        await router.push("/archive/unknown");
      });

      return { args };
    },
    template: `
      <div class="pz-nav-story">
        <section class="pz-nav-story-frame">
          <div class="pz-nav-story-header">
            <div>
              <span class="pz-nav-story-eyebrow">Example</span>
              <pz-text variant="h4-bold">Default fallback item</pz-text>
            </div>
            <span class="pz-nav-story-chip">isDefault</span>
          </div>

          <div class="pz-nav-story-card-surface">
            <pz-nav :config="args.config" />
          </div>
        </section>
      </div>
    `,
  }),
};

export const CustomItemView: Story = {
  parameters: {
    docs: {
      source: {
        code: buildSlotStorySource(),
      },
    },
  },
  render: () => ({
    components: { pzNav: PzNav, pzText: PzText },
    setup() {
      const router = useRouter();

      const config = [
        { path: "/nav/questions", text: "Questions", count: 12, isDefault: true },
        { path: "/nav/complaints", text: "Complaints", count: 2 },
        { path: "/nav/monitoring", text: "Monitoring", count: 0, disabled: true },
      ];

      onMounted(async () => {
        await router.push("/nav/questions");
      });

      return { config };
    },
    template: `
      <div class="pz-nav-story">
        <section class="pz-nav-story-frame">
          <div class="pz-nav-story-header">
            <div>
              <span class="pz-nav-story-eyebrow">Example</span>
              <pz-text variant="h4-bold">Custom item slot</pz-text>
            </div>
            <span class="pz-nav-story-chip">view slot</span>
          </div>

          <div class="pz-nav-story-card-surface">
            <pz-nav :config="config">
              <template #view="{ data }">
                <span class="pz-nav-story-slot">
                  <span>{{ data.text }}</span>
                  <span class="pz-nav-story-badge">{{ data.count }}</span>
                </span>
              </template>
            </pz-nav>
          </div>
        </section>
      </div>
    `,
  }),
};
