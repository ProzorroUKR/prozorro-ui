import { onMounted } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useRouter } from "vue-router";

import { PzText } from "@/components/PzText";

import "./PzBreadcrumb.stories.scss";
import PzBreadcrumb from "./PzBreadcrumb.vue";
import type { PzBreadcrumbProps } from "./types";

type PzBreadcrumbStoryArgs = PzBreadcrumbProps;

const manualItems = [
  { label: "Тендери", to: "/breadcrumbs/tenders" },
  { label: "Транспорт", to: "/breadcrumbs/tenders/transport" },
  { label: "Автомобіль ВАЗ 21703" },
];

const deepItems = [
  { label: "Закупівлі", to: "/breadcrumbs/procedures" },
  { label: "Товари", to: "/breadcrumbs/procedures/products" },
  { label: "Легковий транспорт", to: "/breadcrumbs/procedures/products/cars" },
  { label: "Автомобіль ВАЗ 21703" },
];

const buildSource = (args: PzBreadcrumbStoryArgs): string => {
  if (!args.items?.length) {
    return `<template>\n  <PzBreadcrumb />\n</template>`;
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const items = JSON.stringify(args.items, null, 2);

  return `<template>\n  <PzBreadcrumb :items='${items}' />\n</template>`;
};

const buildSlotSource = (): string => `<template>
  <PzBreadcrumb>
    <template #home="{ data }">
      <strong>{{ data.label }}</strong>
    </template>

    <template #view="{ data, isCurrent }">
      <span :style="{ opacity: isCurrent ? 0.7 : 1 }">{{ data.label }}</span>
    </template>
  </PzBreadcrumb>
</template>`;

const meta = {
  title: "Components/PzBreadcrumb",
  component: PzBreadcrumb,
  parameters: {
    prototype: {
      caption: "Breadcrumb component",
      note: "This version stays close to the old app breadcrumb: the home crumb is rendered first, intermediate crumbs are links, the last crumb is plain text, and route-derived breadcrumbs come from vue-router metadata.",
    },
    docs: {
      description: {
        component:
          "Use `PzBreadcrumb` with no props to derive crumbs from `route.matched` via `route.meta.breadcrumb` or `route.meta.name`. Pass `items` only when you need to override the route-derived trail.",
      },
      source: {
        transform: (_source: string, context: { args?: PzBreadcrumbStoryArgs }) =>
          buildSource((context.args ?? meta.args) as PzBreadcrumbStoryArgs),
      },
    },
  },
  args: {
    items: undefined,
  },
  argTypes: {
    items: {
      control: "object",
      description: "Optional manual breadcrumb override. If omitted, the component reads crumbs from vue-router.",
    },
  },
  render: (args: PzBreadcrumbStoryArgs) => ({
    components: { pzBreadcrumb: PzBreadcrumb, pzText: PzText },
    setup() {
      const router = useRouter();

      onMounted(async () => {
        await router.push("/breadcrumbs/tenders/transport/vaz-21703");
      });

      return {
        args,
        deepItems,
      };
    },
    template: `
      <div class="pz-breadcrumb-story">
        <section class="pz-breadcrumb-story-frame">
          <div class="pz-breadcrumb-story-header">
            <div>
              <span class="pz-breadcrumb-story-eyebrow">Vue Router</span>
              <pz-text variant="h4-bold">Breadcrumb from route metadata</pz-text>
            </div>
            <span class="pz-breadcrumb-story-chip">node 111:2205</span>
          </div>

          <div class="pz-breadcrumb-story-surface">
            <pz-breadcrumb :items="args.items" />
          </div>
        </section>

        <section class="pz-breadcrumb-story-grid">
          <article class="pz-breadcrumb-story-card">
            <div class="pz-breadcrumb-story-copy">
              <pz-text variant="body-semibold">Manual override</pz-text>
              <pz-text variant="small-regular">
                If items is passed, the component renders that list instead of reading vue-router.
              </pz-text>
            </div>

            <div class="pz-breadcrumb-story-card-surface">
              <pz-breadcrumb :items="deepItems" />
            </div>
          </article>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzBreadcrumbStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ManualItems: Story = {
  args: {
    items: manualItems,
  },
};

export const CustomSlots: Story = {
  parameters: {
    docs: {
      source: {
        code: buildSlotSource(),
      },
    },
  },
  render: () => ({
    components: { pzBreadcrumb: PzBreadcrumb, pzText: PzText },
    setup() {
      const router = useRouter();

      onMounted(async () => {
        await router.push("/breadcrumbs/tenders/transport/vaz-21703");
      });

      return {};
    },
    template: `
      <div class="pz-breadcrumb-story">
        <section class="pz-breadcrumb-story-frame">
          <div class="pz-breadcrumb-story-header">
            <div>
              <span class="pz-breadcrumb-story-eyebrow">Slots</span>
              <pz-text variant="h4-bold">Custom home and item content</pz-text>
            </div>
            <span class="pz-breadcrumb-story-chip">home + view</span>
          </div>

          <div class="pz-breadcrumb-story-surface">
            <pz-breadcrumb>
              <template #home="{ data }">
                <span>{{ data.label }}</span>
              </template>

              <template #view="{ data, isCurrent }">
                <span :style="{ opacity: isCurrent ? 0.65 : 1 }">{{ data.label }}</span>
              </template>
            </pz-breadcrumb>
          </div>
        </section>
      </div>
    `,
  }),
};
