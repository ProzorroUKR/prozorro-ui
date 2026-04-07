import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./Grid.stories.scss";
import { PzText } from "@/components/PzText";

interface GridBreakpointSpec {
  title: string;
  range: string;
  viewport: string;
  columns: number;
  gutter: string;
  margin: string;
  frame: string;
  className: string;
}

interface GridApiRow {
  name: string;
  type: string;
  description: string;
}

const breakpointSpecs: GridBreakpointSpec[] = [
  {
    title: "Mobile",
    range: "< 768px",
    viewport: "375px frame",
    columns: 4,
    gutter: "16px",
    margin: "16px",
    frame: "100%",
    className: "grid-foundation-demo-mobile",
  },
  {
    title: "Tablet",
    range: ">= 768px",
    viewport: "768px frame",
    columns: 8,
    gutter: "24px",
    margin: "32px",
    frame: "768px",
    className: "grid-foundation-demo-tablet",
  },
  {
    title: "Desktop",
    range: ">= 1200px",
    viewport: "1440px frame",
    columns: 12,
    gutter: "24px",
    margin: "80px",
    frame: "1440px",
    className: "grid-foundation-demo-desktop",
  },
];

const utilityRows: GridApiRow[] = [
  {
    name: ".pz-container",
    type: "Layout",
    description: "Centered frame with responsive horizontal margins and a max width derived from grid tokens.",
  },
  {
    name: ".pz-container-fluid",
    type: "Layout",
    description: "Full-width container that keeps responsive side padding.",
  },
  {
    name: ".pz-grid",
    type: "Layout",
    description: "Responsive column grid using the active token set for columns and gutter.",
  },
  {
    name: ".pz-grid-fit",
    type: "Variant",
    description: "Auto-fit layout for equal cards when fixed column spans are not needed.",
  },
  {
    name: ".pz-col-1 ... .pz-col-12",
    type: "Span",
    description: "Column span utilities for the current layout context.",
  },
  {
    name: ".pz-col-md-* / .pz-col-xl-*",
    type: "Responsive span",
    description: "Breakpoint overrides for tablet and desktop layout changes.",
  },
  {
    name: ".pz-start-*",
    type: "Start",
    description: "Column start utilities for offset and alignment control.",
  },
];

const mixinRows: GridApiRow[] = [
  {
    name: "@include pz-container",
    type: "Mixin",
    description: "Applies the container width and side padding contract inside component styles.",
  },
  {
    name: "@include pz-grid",
    type: "Mixin",
    description: "Creates a grid that follows the active token-driven column and gap system.",
  },
  {
    name: "@include pz-grid-span($span)",
    type: "Mixin",
    description: "Applies a specific column span without reaching for utility classes.",
  },
];

const meta = {
  title: "Foundation/Grid",
  parameters: {
    prototype: {
      caption: "Grid system",
      note: "Responsive layout foundation for containers, columns, spans, and offsets.",
    },
    docs: {
      description: {
        component:
          "Grid system reference for `@prozorro/prozorro-ui`. The live Figma embed for node `14:221` was unavailable anonymously, so this implementation aligns the grid with the repository breakpoint model and documents the resulting library contract.",
      },
    },
  },
  render: () => ({
    components: { pzText: PzText },
    setup() {
      return { breakpointSpecs, utilityRows, mixinRows };
    },
    template: `
      <div class="grid-foundation">
        <section class="grid-foundation-board">
          <header class="grid-foundation-hero">
            <div class="grid-foundation-hero-copy">
              <span class="grid-foundation-kicker">Grid system</span>
              <pz-text variant="h2-bold">Responsive frame, columns, and span utilities</pz-text>
              <pz-text variant="body-regular">
                The library now exposes a shared container and column grid so layout decisions are not duplicated inside stories and components.
              </pz-text>
            </div>

            <div class="grid-foundation-hero-note">
              <pz-text variant="small-bold">Implementation note</pz-text>
              <pz-text variant="small-regular">
                Figma node access was blocked in anonymous embed mode, so the published contract follows the repo breakpoint model: mobile, tablet, and desktop token sets.
              </pz-text>
            </div>
          </header>

          <section class="grid-foundation-section">
            <div class="grid-foundation-section-heading">
              <pz-text variant="h4-bold">Breakpoint contract</pz-text>
              <pz-text variant="small-regular">Active token sets used by the library grid utilities.</pz-text>
            </div>

            <div class="grid-foundation-specs">
              <article
                v-for="spec in breakpointSpecs"
                :key="spec.title"
                class="grid-foundation-spec-card"
              >
                <div class="grid-foundation-spec-copy">
                  <span class="grid-foundation-chip">{{ spec.range }}</span>
                  <pz-text variant="h4-semibold">{{ spec.title }}</pz-text>
                </div>

                <dl class="grid-foundation-spec-list">
                  <div>
                    <dt>Viewport</dt>
                    <dd>{{ spec.viewport }}</dd>
                  </div>
                  <div>
                    <dt>Columns</dt>
                    <dd>{{ spec.columns }}</dd>
                  </div>
                  <div>
                    <dt>Gutter</dt>
                    <dd>{{ spec.gutter }}</dd>
                  </div>
                  <div>
                    <dt>Margin</dt>
                    <dd>{{ spec.margin }}</dd>
                  </div>
                  <div>
                    <dt>Frame</dt>
                    <dd>{{ spec.frame }}</dd>
                  </div>
                </dl>
              </article>
            </div>
          </section>

          <section class="grid-foundation-section">
            <div class="grid-foundation-section-heading">
              <pz-text variant="h4-bold">Grid preview</pz-text>
              <pz-text variant="small-regular">Static specimens for each token set.</pz-text>
            </div>

            <div class="grid-foundation-demos">
              <article
                v-for="spec in breakpointSpecs"
                :key="spec.className"
                class="grid-foundation-demo-card"
              >
                <div class="grid-foundation-demo-header">
                  <pz-text variant="body-semibold">{{ spec.title }}</pz-text>
                  <span class="grid-foundation-demo-meta">{{ spec.columns }} columns / {{ spec.gutter }} gap</span>
                </div>

                <div class="grid-foundation-demo-frame" :class="spec.className">
                  <div
                    v-for="column in spec.columns"
                    :key="spec.title + column"
                    class="grid-foundation-demo-column"
                  >
                    <span>{{ column }}</span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section class="grid-foundation-section">
            <div class="grid-foundation-section-heading">
              <pz-text variant="h4-bold">Layout utilities</pz-text>
              <pz-text variant="small-regular">Public CSS classes emitted by the library stylesheet.</pz-text>
            </div>

            <div class="grid-foundation-table">
              <div class="grid-foundation-head">API</div>
              <div class="grid-foundation-head">Kind</div>
              <div class="grid-foundation-head">Description</div>

              <template v-for="row in utilityRows" :key="row.name">
                <div class="grid-foundation-cell grid-foundation-cell-code"><code>{{ row.name }}</code></div>
                <div class="grid-foundation-cell"><pz-text variant="small-bold">{{ row.type }}</pz-text></div>
                <div class="grid-foundation-cell"><pz-text variant="body-regular">{{ row.description }}</pz-text></div>
              </template>
            </div>
          </section>

          <section class="grid-foundation-section">
            <div class="grid-foundation-section-heading">
              <pz-text variant="h4-bold">SCSS mixins</pz-text>
              <pz-text variant="small-regular">Component-level API for authors working inside scoped styles.</pz-text>
            </div>

            <div class="grid-foundation-table">
              <div class="grid-foundation-head">Mixin</div>
              <div class="grid-foundation-head">Kind</div>
              <div class="grid-foundation-head">Description</div>

              <template v-for="row in mixinRows" :key="row.name">
                <div class="grid-foundation-cell grid-foundation-cell-code"><code>{{ row.name }}</code></div>
                <div class="grid-foundation-cell"><pz-text variant="small-bold">{{ row.type }}</pz-text></div>
                <div class="grid-foundation-cell"><pz-text variant="body-regular">{{ row.description }}</pz-text></div>
              </template>
            </div>
          </section>

          <section class="grid-foundation-section">
            <div class="grid-foundation-section-heading">
              <pz-text variant="h4-bold">Usage example</pz-text>
              <pz-text variant="small-regular">Default composition pattern for page and card layouts.</pz-text>
            </div>

            <pre class="grid-foundation-code"><code>&lt;section class="pz-container"&gt;
  &lt;div class="pz-grid"&gt;
    &lt;article class="pz-grid-item pz-col-4 pz-col-md-4 pz-col-xl-3"&gt;...&lt;/article&gt;
    &lt;article class="pz-grid-item pz-col-4 pz-col-md-4 pz-col-xl-6"&gt;...&lt;/article&gt;
    &lt;article class="pz-grid-item pz-col-4 pz-col-md-8 pz-col-xl-3"&gt;...&lt;/article&gt;
  &lt;/div&gt;
&lt;/section&gt;</code></pre>
          </section>
        </section>
      </div>
    `,
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Reference: Story = {
  name: "Reference",
};
