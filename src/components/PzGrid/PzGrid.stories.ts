import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzGrid.stories.scss";
import PzGrid from "./PzGrid.vue";
import PzGridItem from "./PzGridItem.vue";
import type { PzGridColumnSpan, PzGridProps } from "./types";

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const spanOptions = [1, 2, 3, 4, 5, 6, 8, 12, "full"] satisfies PzGridColumnSpan[];

type PzGridStoryArgs = PzGridProps & {
  heroSpan: PzGridColumnSpan;
  sidebarSpan: PzGridColumnSpan;
  metricSpan: PzGridColumnSpan;
};

const meta = {
  title: "Layout/PzGrid",
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
    },
  },
  args: {
    as: "section",
    container: true,
    grid: true,
    fit: false,
    dense: false,
    fluid: false,
    heroSpan: 4,
    sidebarSpan: 4,
    metricSpan: 2,
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "main"],
    },
    container: { control: "boolean" },
    grid: { control: "boolean" },
    fluid: { control: "boolean" },
    fit: { control: "boolean" },
    dense: { control: "boolean" },
    heroSpan: { control: "select", options: spanOptions },
    sidebarSpan: { control: "select", options: spanOptions },
    metricSpan: { control: "select", options: spanOptions },
  },
  render: (args: PzGridStoryArgs) => ({
    components: { pzGrid: PzGrid, pzGridItem: PzGridItem, pzText: PzText },
    setup() {
      return { args };
    },
    template: `
      <div class="pz-grid-story">
        <pz-grid class="pz-grid-story-board">
          <div class="pz-grid-story-header">
            <span class="pz-grid-story-kicker">Component API</span>
            <pz-text variant="h3-bold">Grid composition without manual utility strings</pz-text>
            <pz-text variant="body-regular">
              The wrapper components still use the shared CSS grid contract under the hood, but expose layout decisions as typed props.
            </pz-text>
          </div>
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
            :md="8"
            :xl="7"
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
            :md="4"
            :xl="5"
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
            :md="4"
            :xl="3"
            class="pz-grid-story-card"
            data-tone="success"
          >
            <span class="pz-grid-story-metric">4</span>
            <pz-text variant="body-semibold">Mobile columns</pz-text>
          </pz-grid-item>

          <pz-grid-item
            :span="args.metricSpan"
            :md="4"
            :xl="3"
            class="pz-grid-story-card"
          >
            <span class="pz-grid-story-metric">12</span>
            <pz-text variant="body-semibold">Desktop columns</pz-text>
          </pz-grid-item>

          <pz-grid-item
            :span="4"
            :md="8"
            :xl="6"
            class="pz-grid-story-card"
          >
            <span class="pz-grid-story-chip">Nested</span>
            <pz-text variant="h4-semibold">Nested grids use the same components.</pz-text>

            <pz-grid class="pz-grid-story-nested">
              <pz-grid-item :span="4" :md="4" :xl="6" class="pz-grid-story-nested-card">Nested 1</pz-grid-item>
              <pz-grid-item :span="4" :md="4" :xl="6" class="pz-grid-story-nested-card">Nested 2</pz-grid-item>
            </pz-grid>
          </pz-grid-item>
        </pz-grid>
      </div>
    `,
  }),
} satisfies Meta<PzGridStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FitLayout: Story = {
  args: {
    container: true,
    fit: true,
    heroSpan: 4,
    sidebarSpan: 4,
    metricSpan: 4,
  },
};
