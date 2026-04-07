import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzGrid.stories.scss";
import { pzGridSpanOptions, pzGridTagOptions } from "./configs";
import PzGrid from "./PzGrid.vue";
import PzGridItem from "./PzGridItem.vue";
import type { PzGridColumnSpan, PzGridProps } from "./types";

type PzGridStoryArgs = PzGridProps & {
  heroSpan: PzGridColumnSpan;
  sidebarSpan: PzGridColumnSpan;
  metricSpan: PzGridColumnSpan;
};

type PzGridSourceProp = [
  name: string,
  value: string | number | boolean | undefined,
  defaultValue?: string | number | boolean | undefined,
];

const defaultGridStoryArgs: PzGridStoryArgs = {
  as: "section",
  container: true,
  grid: true,
  fit: false,
  dense: false,
  fluid: false,
  heroSpan: 4,
  sidebarSpan: 4,
  metricSpan: 2,
};

const gridStoryExampleLayout = {
  hero: { md: 8, xl: 7 },
  sidebar: { md: 4, xl: 5 },
  metric: { md: 4, xl: 3 },
  nested: { span: 4, md: 8, xl: 6 },
  nestedItem: { span: 4, md: 4, xl: 6 },
} as const;

const formatGridProp = (
  name: string,
  value: string | number | boolean | undefined,
  defaultValue?: string | number | boolean,
): string | null => {
  if (typeof value === "undefined") {
    return null;
  }

  if (typeof value === "boolean") {
    if (value === defaultValue) {
      return null;
    }

    return value ? name : `:${name}="false"`;
  }

  if (typeof value === "number") {
    if (value === defaultValue) {
      return null;
    }

    return `:${name}="${value}"`;
  }

  if (value === defaultValue) {
    return null;
  }

  return `${name}="${value}"`;
};

const buildGridItemProps = (props: PzGridSourceProp[]): string =>
  props
    .map(([name, value, defaultValue]) => formatGridProp(name, value, defaultValue))
    .filter((value): value is string => Boolean(value))
    .map(value => `    ${value}`)
    .join("\n");

const buildGridStorySource = (args: PzGridStoryArgs): string => {
  const rootProps = buildGridItemProps([
    ["as", args.as, "div"],
    ["container", args.container, false],
    ["grid", args.grid, true],
    ["fluid", args.fluid, false],
    ["fit", args.fit, false],
    ["dense", args.dense, false],
  ]);

  const heroProps = buildGridItemProps([
    ["span", args.heroSpan],
    ["md", gridStoryExampleLayout.hero.md],
    ["xl", gridStoryExampleLayout.hero.xl],
  ]);

  const sidebarProps = buildGridItemProps([
    ["span", args.sidebarSpan],
    ["md", gridStoryExampleLayout.sidebar.md],
    ["xl", gridStoryExampleLayout.sidebar.xl],
  ]);

  const metricProps = buildGridItemProps([
    ["span", args.metricSpan],
    ["md", gridStoryExampleLayout.metric.md],
    ["xl", gridStoryExampleLayout.metric.xl],
  ]);

  return `<template>
  <PzGrid
${rootProps}
  >
    <PzGridItem
${heroProps}
    >
      <PzText variant="h4-bold">Primary content area</PzText>
      <PzText variant="body-regular">
        PzGrid handles the container and grid contract while PzGridItem controls responsive span mapping.
      </PzText>
    </PzGridItem>

    <PzGridItem
${sidebarProps}
    >
      <PzText variant="h4-semibold">Secondary rail</PzText>
      <PzText variant="body-regular">
        Sidebar content drops below the hero on mobile and returns to a right rail on desktop.
      </PzText>
    </PzGridItem>

    <PzGridItem
${metricProps}
    >
      <PzText variant="body-semibold">Mobile columns</PzText>
    </PzGridItem>

    <PzGridItem
${metricProps}
    >
      <PzText variant="body-semibold">Desktop columns</PzText>
    </PzGridItem>

    <PzGridItem
      :span="${gridStoryExampleLayout.nested.span}"
      :md="${gridStoryExampleLayout.nested.md}"
      :xl="${gridStoryExampleLayout.nested.xl}"
    >
      <PzText variant="h4-semibold">Nested grids use the same components.</PzText>

      <PzGrid>
        <PzGridItem
          :span="${gridStoryExampleLayout.nestedItem.span}"
          :md="${gridStoryExampleLayout.nestedItem.md}"
          :xl="${gridStoryExampleLayout.nestedItem.xl}"
        >
          Nested 1
        </PzGridItem>
        <PzGridItem
          :span="${gridStoryExampleLayout.nestedItem.span}"
          :md="${gridStoryExampleLayout.nestedItem.md}"
          :xl="${gridStoryExampleLayout.nestedItem.xl}"
        >
          Nested 2
        </PzGridItem>
      </PzGrid>
    </PzGridItem>
  </PzGrid>
</template>`;
};

const meta = {
  title: "Components/PzGrid",
  component: PzGrid,
  parameters: {
    prototype: {
      caption: "Grid component",
      note: "Vue wrapper over the shared grid utility contract for container, grid, and responsive item spans.",
    },
    docs: {
      description: {
        component:
          "Use `PzGrid` and `PzGridItem` when you want component-level layout composition instead of writing the emitted CSS utility classes directly.",
      },
      source: {
        transform: (_source: string, context: { args?: PzGridStoryArgs }) =>
          buildGridStorySource((context.args ?? defaultGridStoryArgs) as PzGridStoryArgs),
      },
    },
  },
  args: defaultGridStoryArgs,
  argTypes: {
    as: {
      control: "select",
      options: pzGridTagOptions,
    },
    container: { control: "boolean" },
    grid: { control: "boolean" },
    fluid: { control: "boolean" },
    fit: { control: "boolean" },
    dense: { control: "boolean" },
    heroSpan: { control: "select", options: pzGridSpanOptions },
    sidebarSpan: { control: "select", options: pzGridSpanOptions },
    metricSpan: { control: "select", options: pzGridSpanOptions },
  },
  render: (args: PzGridStoryArgs) => ({
    components: { pzGrid: PzGrid, pzGridItem: PzGridItem, pzText: PzText },
    setup() {
      return { args, gridStoryExampleLayout };
    },
    template: `
      <div class="pz-grid-story">
        <pz-grid class="pz-grid-story-board">
          <pz-grid-item
            span="full"
            class="pz-grid-story-header"
          >
            <span class="pz-grid-story-kicker">Component API</span>
            <pz-text variant="h3-bold">Grid composition without manual utility strings</pz-text>
            <pz-text variant="body-regular">
              The wrapper components still use the shared CSS grid contract under the hood, but expose layout decisions as typed props.
            </pz-text>
          </pz-grid-item>
        </pz-grid>

        <pz-grid
          :as="args.as"
          :container="args.container"
          :grid="args.grid"
          :fluid="args.fluid"
          :fit="args.fit"
          :dense="args.dense"
          class="pz-grid-story-example"
        >
          <pz-grid-item
            :span="args.heroSpan"
            :md="gridStoryExampleLayout.hero.md"
            :xl="gridStoryExampleLayout.hero.xl"
            class="pz-grid-story-card"
            data-tone="accent"
          >
            <span class="pz-grid-story-chip">Hero</span>
            <pz-text variant="h4-bold">Primary content area</pz-text>
            <pz-text variant="body-regular">
              PzGrid handles the container and grid contract while PzGridItem controls responsive span mapping.
            </pz-text>
          </pz-grid-item>

          <pz-grid-item
            :span="args.sidebarSpan"
            :md="gridStoryExampleLayout.sidebar.md"
            :xl="gridStoryExampleLayout.sidebar.xl"
            class="pz-grid-story-card"
          >
            <span class="pz-grid-story-chip">Sidebar</span>
            <pz-text variant="h4-semibold">Secondary rail</pz-text>
            <pz-text variant="body-regular">
              Sidebar content drops below the hero on mobile and returns to a right rail on desktop.
            </pz-text>
          </pz-grid-item>

          <pz-grid-item
            :span="args.metricSpan"
            :md="gridStoryExampleLayout.metric.md"
            :xl="gridStoryExampleLayout.metric.xl"
            class="pz-grid-story-card"
            data-tone="success"
          >
            <span class="pz-grid-story-metric">4</span>
            <pz-text variant="body-semibold">Mobile columns</pz-text>
          </pz-grid-item>

          <pz-grid-item
            :span="args.metricSpan"
            :md="gridStoryExampleLayout.metric.md"
            :xl="gridStoryExampleLayout.metric.xl"
            class="pz-grid-story-card"
          >
            <span class="pz-grid-story-metric">12</span>
            <pz-text variant="body-semibold">Desktop columns</pz-text>
          </pz-grid-item>

          <pz-grid-item
            :span="gridStoryExampleLayout.nested.span"
            :md="gridStoryExampleLayout.nested.md"
            :xl="gridStoryExampleLayout.nested.xl"
            class="pz-grid-story-card"
          >
            <span class="pz-grid-story-chip">Nested</span>
            <pz-text variant="h4-semibold">Nested grids use the same components.</pz-text>

            <pz-grid class="pz-grid-story-nested">
              <pz-grid-item
                :span="gridStoryExampleLayout.nestedItem.span"
                :md="gridStoryExampleLayout.nestedItem.md"
                :xl="gridStoryExampleLayout.nestedItem.xl"
                class="pz-grid-story-nested-card"
              >
                Nested 1
              </pz-grid-item>
              <pz-grid-item
                :span="gridStoryExampleLayout.nestedItem.span"
                :md="gridStoryExampleLayout.nestedItem.md"
                :xl="gridStoryExampleLayout.nestedItem.xl"
                class="pz-grid-story-nested-card"
              >
                Nested 2
              </pz-grid-item>
            </pz-grid>
          </pz-grid-item>
        </pz-grid>
      </div>
    `,
  }),
} satisfies Meta<PzGridStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ComponentApi: Story = {
  name: "Component API",
};

export const FitLayout: Story = {
  name: "Auto Fit",
  args: {
    container: true,
    fit: true,
    heroSpan: 4,
    sidebarSpan: 4,
    metricSpan: 4,
  },
};
