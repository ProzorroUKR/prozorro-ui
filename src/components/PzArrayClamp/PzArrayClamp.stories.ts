import { ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzArrayClamp.stories.scss";
import PzArrayClamp from "./PzArrayClamp.vue";
import type { PzArrayClampProps } from "./types";

type PzArrayClampStoryArgs = PzArrayClampProps & {
  title?: string;
};

const tenderCodes = ['251035-П29"', '"7519 АК1"', '"236-1701082"', '"236-1702091"', '"236-1115030"'];

const supplierNames = [
  'ТОВ "Центральна ремонтна база"',
  'ТОВ "Укрспецлогістика"',
  'ДП "Технічний сервіс №17"',
  'ТОВ "Промавтодеталь"',
];

const buildSource = (args: PzArrayClampStoryArgs): string => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const list = JSON.stringify(args.list, null, 2);
  const attributes = [
    `:list='${list}'`,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    args.count !== 3 ? `:count="${args.count}"` : null,
    args.expanded ? ':expanded="true"' : null,
    args.expandLabel !== "Показати більше" ? `expand-label="${args.expandLabel}"` : null,
    args.collapseLabel !== "Показати менше" ? `collapse-label="${args.collapseLabel}"` : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return `<template>\n  <PzArrayClamp ${attributes} />\n</template>`;
};

const buildSlotSource = (): string => `<template>
  <PzArrayClamp :list="items" :count="2">
    <template #default="{ item, index }">
      <span>{{ index + 1 }}. {{ item }}</span>
    </template>

    <template #toggle="{ toggle, expanded, hiddenCount }">
      <button type="button" class="custom-toggle" @click="toggle">
        {{ expanded ? "Згорнути" : \`Ще \${hiddenCount} позиції\` }}
      </button>
    </template>
  </PzArrayClamp>
</template>`;

const meta = {
  title: "Components/PzArrayClamp",
  component: PzArrayClamp,
  parameters: {
    prototype: {
      caption: "Array clamp component",
      note: "Compact vertical list for short repeated values. It stays close to the old array clamp prototype, but uses design-system text and link tokens plus controlled expand state.",
    },
    docs: {
      description: {
        component:
          "Use `PzArrayClamp` to show a short list of repeated values with a link-like reveal action. Item text defaults to the `body-regular` style, and the component supports item and toggle slots for customization.",
      },
      source: {
        transform: (_source: string, context: { args?: PzArrayClampStoryArgs }) =>
          buildSource((context.args ?? meta.args) as PzArrayClampStoryArgs),
      },
    },
  },
  args: {
    list: tenderCodes,
    count: 3,
    expanded: false,
    expandLabel: "Показати більше",
    collapseLabel: "Показати менше",
    btnClass: "",
    title: "Compact values inside a table cell",
  },
  argTypes: {
    list: {
      control: "object",
      description: "Items rendered by the clamp.",
    },
    count: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Number of items visible before the list is expanded.",
    },
    expanded: {
      control: "boolean",
      description: "Controlled expanded state.",
    },
    expandLabel: {
      control: "text",
      description: "Default label shown while collapsed.",
    },
    collapseLabel: {
      control: "text",
      description: "Default label shown while expanded.",
    },
    btnClass: {
      control: "text",
      description: "Additional class names for the default toggle button.",
    },
    title: {
      control: "text",
      description: "Story-only heading.",
      table: { category: "Story" },
    },
  },
  render: (args: PzArrayClampStoryArgs) => ({
    components: { pzArrayClamp: PzArrayClamp, pzText: PzText },
    setup() {
      const expanded = ref(Boolean(args.expanded));

      watch(
        () => args.expanded,
        value => {
          expanded.value = Boolean(value);
        },
      );

      return {
        args,
        expanded,
        supplierNames,
        tenderCodes,
      };
    },
    template: `
      <div class="pz-array-clamp-story">
        <section class="pz-array-clamp-story-hero">
          <div class="pz-array-clamp-story-copy">
            <span class="pz-array-clamp-story-eyebrow">Body Regular by default</span>
            <pz-text variant="h4-bold">{{ args.title }}</pz-text>
            <pz-text variant="body-regular">
              Designed for compact cells where repeated values should stay readable before expanding into the full list.
            </pz-text>
          </div>

          <div class="pz-array-clamp-story-preview">
            <span class="pz-array-clamp-story-label">Cell preview</span><pz-array-clamp
              :list="args.list"
              :count="args.count"
              :expanded="expanded"
              :expand-label="args.expandLabel"
              :collapse-label="args.collapseLabel"
              :btn-class="args.btnClass"
              @update:expanded="expanded = $event"
            />
          </div>
        </section>

        <section class="pz-array-clamp-story-grid">
          <article class="pz-array-clamp-story-card">
            <span class="pz-array-clamp-story-label">Tender codes</span>
            <pz-array-clamp :list="tenderCodes" :count="3" />
          </article>

          <article class="pz-array-clamp-story-card">
            <span class="pz-array-clamp-story-label">Suppliers</span>
            <pz-array-clamp :list="supplierNames" :count="2" />
          </article>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzArrayClampStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TwoVisibleItems: Story = {
  args: {
    list: supplierNames,
    count: 2,
    title: "Two visible suppliers",
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
    components: { pzArrayClamp: PzArrayClamp, pzText: PzText },
    setup() {
      const expanded = ref(false);
      const items = ['"236-1701082"', '"236-1702091"', '"236-1115030"', '"236-1302024"'];

      return {
        expanded,
        items,
      };
    },
    template: `
      <div class="pz-array-clamp-story">
        <section class="pz-array-clamp-story-hero">
          <div class="pz-array-clamp-story-copy">
            <span class="pz-array-clamp-story-eyebrow">Slots</span>
            <pz-text variant="h4-bold">Custom item and toggle rendering</pz-text>
          </div>

          <div class="pz-array-clamp-story-preview">
            <div class="pz-array-clamp-story-cell">
              <pz-array-clamp
                :list="items"
                :count="2"
                :expanded="expanded"
                @update:expanded="expanded = $event"
              >
                <template #default="{ item, index }">
                  <span>{{ index + 1 }}. {{ item }}</span>
                </template>

                <template #toggle="{ toggle, expanded: isExpanded, hiddenCount }">
                  <button
                    type="button"
                    class="pz-array-clamp-story-custom-toggle"
                    @click="toggle"
                  >
                    {{ isExpanded ? "Згорнути" : "Ще " + hiddenCount + " позиції" }}
                  </button>
                </template>
              </pz-array-clamp>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};
