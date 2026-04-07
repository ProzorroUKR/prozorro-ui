import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./Spacing.stories.scss";
import { PzText } from "@/components/PzText";

interface SpacingTokenRow {
  token: string;
  value: string;
  variable: string;
  utility: string;
  note: string;
}

interface SpacingUtilityGroup {
  title: string;
  note: string;
  items: Array<{
    name: string;
    description: string;
  }>;
}

const spacingTokens: SpacingTokenRow[] = [
  {
    token: "4",
    value: "4px",
    variable: "--pz-space-4",
    utility: "pz-m-4 / pz-p-4",
    note: "Gap between a title and its supporting text.",
  },
  {
    token: "8",
    value: "8px",
    variable: "--pz-space-8",
    utility: "pz-m-8 / pz-p-8",
    note: "Gap between dependent text rows.",
  },
  {
    token: "16",
    value: "16px",
    variable: "--pz-space-16",
    utility: "pz-m-16 / pz-p-16",
    note: "Spacing for title blocks, table content, and link groups.",
  },
  {
    token: "20",
    value: "20px",
    variable: "--pz-space-20",
    utility: "pz-m-20 / pz-p-20",
    note: "Gap between equal elements.",
  },
  {
    token: "24",
    value: "24px",
    variable: "--pz-space-24",
    utility: "pz-m-24 / pz-p-24",
    note: "Spacing for docs, dividers, and tab padding.",
  },
  {
    token: "32",
    value: "32px",
    variable: "--pz-space-32",
    utility: "pz-m-32 / pz-p-32",
    note: "Inset from content to nested background edges.",
  },
  {
    token: "40",
    value: "40px",
    variable: "--pz-space-40",
    utility: "pz-m-40 / pz-p-40",
    note: "Large inset inside nested content areas.",
  },
  {
    token: "44",
    value: "44px",
    variable: "--pz-space-44",
    utility: "pz-m-44 / pz-p-44",
    note: "Gap between a header and content in cabinet layouts.",
  },
  {
    token: "60",
    value: "60px",
    variable: "--pz-space-60",
    utility: "pz-m-60 / pz-p-60",
    note: "Gap between equal large blocks.",
  },
];

const utilityGroups: SpacingUtilityGroup[] = [
  {
    title: "Margin utilities",
    note: "Outer spacing",
    items: [
      { name: ".pz-m-*", description: "Margin on all sides." },
      { name: ".pz-mt-* / .pz-mr-* / .pz-mb-* / .pz-ml-*", description: "Single-side margin utilities." },
      { name: ".pz-mx-* / .pz-my-*", description: "Inline and block axis margin utilities." },
      { name: ".pz-m-auto / .pz-mx-auto / .pz-my-auto", description: "Auto alignment helpers." },
    ],
  },
  {
    title: "Padding utilities",
    note: "Inner spacing",
    items: [
      { name: ".pz-p-*", description: "Padding on all sides." },
      { name: ".pz-pt-* / .pz-pr-* / .pz-pb-* / .pz-pl-*", description: "Single-side padding utilities." },
      { name: ".pz-px-* / .pz-py-*", description: "Inline and block axis padding utilities." },
    ],
  },
];

const meta = {
  title: "Foundation/Spacing",
  parameters: {
    prototype: {
      caption: "Spacing scale",
      note: "Spacing token and utility reference for margin and padding helpers.",
    },
    docs: {
      description: {
        component:
          "Spacing foundation for `@prozorro/prozorro-ui`. The utility module emits `pz-m-*` and `pz-p-*` classes backed by the shared `--pz-space-*` token scale aligned with the visible Figma spacing board.",
      },
    },
  },
  render: () => ({
    components: { pzText: PzText },
    setup() {
      return { spacingTokens, utilityGroups };
    },
    template: `
      <div class="spacing-foundation">
        <section class="spacing-foundation-board">
          <header class="spacing-foundation-hero">
            <div class="spacing-foundation-hero-copy">
              <span class="spacing-foundation-kicker">Spacing module</span>
              <pz-text variant="h2-bold">Margin and padding utilities from a shared token scale</pz-text>
              <pz-text variant="body-regular">
                Use spacing tokens for consistent outer and inner rhythm. Utilities are intended for layout composition and quick Storybook/specimen setup.
              </pz-text>
            </div>

            <div class="spacing-foundation-hero-note">
              <pz-text variant="small-bold">Implementation note</pz-text>
              <pz-text variant="small-regular">
                The public Figma node for spacing could not be read anonymously, so this preview documents the exported library scale exactly as implemented in code.
              </pz-text>
            </div>
          </header>

          <section class="spacing-foundation-section">
            <div class="spacing-foundation-section-heading">
              <pz-text variant="h4-bold">Token scale</pz-text>
              <pz-text variant="small-regular">Base spacing values and their utility aliases.</pz-text>
            </div>

            <div class="spacing-foundation-token-grid">
              <article
                v-for="token in spacingTokens"
                :key="token.variable"
                class="spacing-foundation-token-card"
              >
                <div class="spacing-foundation-token-head">
                  <span class="spacing-foundation-chip">{{ token.value }}</span>
                  <pz-text variant="h4-semibold">Space {{ token.token }}</pz-text>
                </div>

                <div class="spacing-foundation-ruler">
                  <span
                    class="spacing-foundation-ruler-bar"
                    :style="{ width: token.value === '0' ? '2px' : token.value }"
                  ></span>
                </div>

                <div class="spacing-foundation-token-meta">
                  <code>{{ token.variable }}</code>
                  <pz-text variant="small-regular">{{ token.note }}</pz-text>
                  <pz-text variant="small-regular">{{ token.utility }}</pz-text>
                </div>
              </article>
            </div>
          </section>

          <section class="spacing-foundation-section">
            <div class="spacing-foundation-section-heading">
              <pz-text variant="h4-bold">Utility groups</pz-text>
              <pz-text variant="small-regular">Public classes emitted by the SCSS module.</pz-text>
            </div>

            <div class="spacing-foundation-groups">
              <article
                v-for="group in utilityGroups"
                :key="group.title"
                class="spacing-foundation-group-card"
              >
                <div class="spacing-foundation-group-head">
                  <span class="spacing-foundation-chip">{{ group.note }}</span>
                  <pz-text variant="h4-semibold">{{ group.title }}</pz-text>
                </div>

                <div class="spacing-foundation-table">
                  <div class="spacing-foundation-head">Utility</div>
                  <div class="spacing-foundation-head">Description</div>

                  <template v-for="item in group.items" :key="group.title + item.name">
                    <div class="spacing-foundation-cell spacing-foundation-cell-code"><code>{{ item.name }}</code></div>
                    <div class="spacing-foundation-cell"><pz-text variant="body-regular">{{ item.description }}</pz-text></div>
                  </template>
                </div>
              </article>
            </div>
          </section>

          <section class="spacing-foundation-section">
            <div class="spacing-foundation-section-heading">
              <pz-text variant="h4-bold">Live preview</pz-text>
              <pz-text variant="small-regular">Examples using the emitted spacing utility classes directly.</pz-text>
            </div>

            <div class="spacing-foundation-preview">
              <article class="spacing-foundation-preview-card">
                <span class="spacing-foundation-chip">Padding</span>
                <div class="spacing-foundation-preview-surface pz-p-24">
                  <div class="spacing-foundation-preview-fill">
                    <pz-text variant="body-semibold">pz-p-24</pz-text>
                    <pz-text variant="small-regular">24px padding on all sides.</pz-text>
                  </div>
                </div>
              </article>

              <article class="spacing-foundation-preview-card">
                <span class="spacing-foundation-chip">Axis spacing</span>
                <div class="spacing-foundation-preview-stack pz-px-24 pz-py-16">
                  <div class="spacing-foundation-preview-fill">
                    <pz-text variant="body-semibold">pz-px-24 + pz-py-16</pz-text>
                  </div>
                  <div class="spacing-foundation-preview-fill pz-mt-8">
                    <pz-text variant="small-regular">Second item with pz-mt-8</pz-text>
                  </div>
                </div>
              </article>

              <article class="spacing-foundation-preview-card">
                <span class="spacing-foundation-chip">Auto margin</span>
                <div class="spacing-foundation-preview-shell pz-p-16">
                  <div class="spacing-foundation-preview-float pz-m-auto pz-p-16">
                    <pz-text variant="body-semibold">pz-ml-auto</pz-text>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </section>
      </div>
    `,
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
