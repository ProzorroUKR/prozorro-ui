import type { Meta, StoryObj } from "@storybook/vue3-vite";
import type { CSSProperties } from "vue";

import "./Colors.stories.scss";
import { PzText } from "@/components/PzText";

interface ColorTokenRow {
  token: string;
  value: string;
  variable: string;
  swatch: string;
  isGradient?: boolean;
}

interface ColorTokenSection {
  title: string;
  note: string;
  items: ColorTokenRow[];
}

interface ColorTokenGroup {
  title: string;
  note: string;
  sections: ColorTokenSection[];
}

const solid = (token: string, value: string, variable: string): ColorTokenRow => ({
  token,
  value,
  variable,
  swatch: value,
});

const gradient = (token: string, value: string, variable: string): ColorTokenRow => ({
  token,
  value,
  variable,
  swatch: value,
  isGradient: true,
});

const colorGroups: ColorTokenGroup[] = [
  {
    title: "Colors",
    note: "Raw palette",
    sections: [
      {
        title: "Basic colors",
        note: "Base values",
        items: [
          solid("Blue 10", "#F0F4F5", "--pz-color-blue-10"),
          solid("Blue 30", "#C2D8DE", "--pz-color-blue-30"),
          solid("Blue 50", "#2070D1", "--pz-color-blue-50"),
          solid("Blue 60", "#014DA8", "--pz-color-blue-60"),
          solid("Gradient blue", "#0082FC", "--pz-color-gradient-blue"),
          solid("Green 20", "#E2F7DC", "--pz-color-green-20"),
          solid("Green 30", "#89DB33", "--pz-color-green-30"),
          solid("Green 50", "#599A4F", "--pz-color-green-50"),
          solid("Green 60", "#4C8344", "--pz-color-green-60"),
          solid("Gradient green", "#599A4F", "--pz-color-gradient-green"),
          solid("Orange 50", "#FF831A", "--pz-color-orange-50"),
          solid("Orange 60", "#E86A00", "--pz-color-orange-60"),
          solid("Gradient orange", "#FF831A", "--pz-color-gradient-orange"),
          solid("White 0", "#FFFFFF", "--pz-color-white"),
          solid("Grey 20", "#F5F5F5", "--pz-color-grey-20"),
          solid("Grey 30", "#D6DADE", "--pz-color-grey-30"),
          solid("Grey 40", "#C0C0C0", "--pz-color-grey-40"),
          solid("Grey 60", "#6D6D6D", "--pz-color-grey-60"),
          solid("Black 90", "#242638", "--pz-color-black-90"),
          solid("Red 30", "#F7DCDC", "--pz-color-red-30"),
          solid("Red 40", "#E85D57", "--pz-color-red-40"),
          solid("Red 50", "#FF3800", "--pz-color-red-50"),
          solid("Red 60", "#D70C17", "--pz-color-red-60"),
        ],
      },
    ],
  },
  {
    title: "Gradients",
    note: "Auction spectrum",
    sections: [
      {
        title: "Linear gradients",
        note: "Gradient tokens",
        items: [
          gradient("Gradient blue", "linear-gradient(90deg, #0082FC 0%, #FFFFFF 100%)", "--pz-gradient-blue"),
          gradient("Gradient orange", "linear-gradient(90deg, #FF831A 0%, #FFFFFF 100%)", "--pz-gradient-orange"),
          gradient("Gradient green", "linear-gradient(90deg, #599A4F 0%, #FFFFFF 100%)", "--pz-gradient-green"),
        ],
      },
    ],
  },
  {
    title: "Usage",
    note: "Semantic tokens",
    sections: [
      {
        title: "Buttons",
        note: "Actions",
        items: [
          solid("Button primary", "#2070D1", "--pz-color-button-primary"),
          solid("Button hover", "#014DA8", "--pz-color-button-primary-hover"),
          solid("Button danger primary", "#FF3800", "--pz-color-button-danger"),
          solid("Button danger hover", "#D70C17", "--pz-color-button-danger-hover"),
          solid("Button success light", "#89DB33", "--pz-color-button-success-light"),
          solid("Button success primary", "#599A4F", "--pz-color-button-success"),
          solid("Button success hover", "#4C8344", "--pz-color-button-success-hover"),
          solid("Button alert primary", "#FF831A", "--pz-color-button-alert"),
          solid("Button alert hover", "#E86A00", "--pz-color-button-alert-hover"),
          solid("Button disable", "#C0C0C0", "--pz-color-button-disabled"),
        ],
      },
      {
        title: "Text",
        note: "Reading",
        items: [
          solid("Text black", "#242638", "--pz-color-text-primary"),
          solid("Text grey", "#6D6D6D", "--pz-color-text-secondary"),
          solid("Link primary", "#2070D1", "--pz-color-text-link"),
          solid("Link hover", "#014DA8", "--pz-color-text-link-hover"),
          solid("Link disable", "#C0C0C0", "--pz-color-text-link-disabled"),
        ],
      },
      {
        title: "Status",
        note: "States",
        items: [
          solid("Inactive status", "#FF3800", "--pz-color-status-inactive"),
          solid("Hidden status", "#FF831A", "--pz-color-status-hidden"),
          solid("Active status", "#599A4F", "--pz-color-status-active"),
          solid("Active status monitoring", "#89DB33", "--pz-color-status-monitoring"),
          solid("Disable status", "#C0C0C0", "--pz-color-status-disabled"),
          solid("In progress status", "#2070D1", "--pz-color-status-progress"),
          gradient(
            "Auction: gradient blue",
            "linear-gradient(90deg, #0082FC 0%, #FFFFFF 100%)",
            "--pz-gradient-status-auction-progress",
          ),
          gradient(
            "Auction: gradient orange",
            "linear-gradient(90deg, #FF831A 0%, #FFFFFF 100%)",
            "--pz-gradient-status-auction-waiting",
          ),
          gradient(
            "Auction: gradient green",
            "linear-gradient(90deg, #599A4F 0%, #FFFFFF 100%)",
            "--pz-gradient-status-auction-success",
          ),
        ],
      },
      {
        title: "Background",
        note: "Surfaces",
        items: [
          solid("BG white", "#FFFFFF", "--pz-color-background-primary"),
          solid("BG grey", "#F5F5F5", "--pz-color-background-frame"),
          solid("Hover blue", "#F0F4F5", "--pz-color-background-hover"),
        ],
      },
      {
        title: "Tags",
        note: "Labels",
        items: [
          solid("Tag green", "#E2F7DC", "--pz-color-tag-green"),
          solid("Tag grey", "#D6DADE", "--pz-color-tag-grey"),
          solid("Tag blue", "#C2D8DE", "--pz-color-tag-blue"),
          solid("Tag red", "#F7DCDC", "--pz-color-tag-red"),
        ],
      },
      {
        title: "Stroke",
        note: "Borders",
        items: [
          solid("Stroke red", "#D70C17", "--pz-color-stroke-red"),
          solid("Stroke grey", "#D6DADE", "--pz-color-stroke-grey"),
        ],
      },
      {
        title: "Icons",
        note: "States",
        items: [
          solid("Icon primary", "#2070D1", "--pz-color-icon-primary"),
          solid("Icon hover", "#014DA8", "--pz-color-icon-hover"),
          solid("Icon danger primary", "#FF3800", "--pz-color-icon-danger"),
          solid("Icon danger hover", "#D70C17", "--pz-color-icon-danger-hover"),
          solid("Icon success light", "#89DB33", "--pz-color-icon-success-light"),
          solid("Icon success primary", "#599A4F", "--pz-color-icon-success"),
          solid("Icon success hover", "#4C8344", "--pz-color-icon-success-hover"),
          solid("Icon alert primary", "#FF831A", "--pz-color-icon-alert"),
          solid("Icon alert hover", "#E86A00", "--pz-color-icon-alert-hover"),
          solid("Icon disable", "#C0C0C0", "--pz-color-icon-disabled"),
        ],
      },
      {
        title: "Miscellaneous",
        note: "Extra",
        items: [solid("Auction: red text", "#E85D57", "--pz-color-auction-red-text")],
      },
    ],
  },
];

const meta = {
  title: "Foundation/Colors",
  parameters: {
    prototype: {
      caption: "Color tokens",
      note: "Figma-style board with raw colors, gradients, and semantic usage tokens.",
    },
    docs: {
      description: {
        component:
          "Color token reference based on the Figma `Color tokens` page. Raw colors, gradients, and semantic variables are grouped separately.",
      },
    },
  },
  render: () => ({
    components: { pzText: PzText },
    setup() {
      const getSwatchStyle = (item: ColorTokenRow): CSSProperties =>
        item.isGradient ? { backgroundImage: item.swatch } : { backgroundColor: item.swatch };

      return { colorGroups, getSwatchStyle };
    },
    template: `
      <div class="colors-specimen">
        <section class="colors-specimen-board">
          <header class="colors-specimen-header">
            <div class="colors-specimen-header-copy">
              <span class="colors-specimen-kicker">Color tokens</span>
              <pz-text variant="h2-bold">Complete palette and semantic mapping</pz-text>
              <pz-text variant="body-regular">
                Minimal reference based on the Figma color token board. Tokens are split into raw colors, gradients, and semantic usage.
              </pz-text>
            </div>
          </header>

          <section
            v-for="group in colorGroups"
            :key="group.title"
            class="colors-specimen-group"
          >
            <div class="colors-specimen-group-title">
              <span class="colors-specimen-group-kicker">{{ group.title }}</span>
              <pz-text variant="small-regular">{{ group.note }}</pz-text>
            </div>

            <section
              v-for="section in group.sections"
              :key="group.title + section.title"
              class="colors-specimen-section"
            >
              <div class="colors-specimen-section-title">
                <pz-text variant="h4-bold">{{ section.title }}</pz-text>
                <pz-text variant="small-regular">{{ section.note }}</pz-text>
              </div>

              <div class="colors-specimen-table">
                <div class="colors-specimen-head">Swatch</div>
                <div class="colors-specimen-head">Token</div>
                <div class="colors-specimen-head">Value</div>
                <div class="colors-specimen-head">Variable</div>

                <template
                  v-for="item in section.items"
                  :key="section.title + item.token"
                >
                  <div class="colors-specimen-cell colors-specimen-cell-swatch">
                    <span
                      class="colors-specimen-swatch"
                      :class="{ 'colors-specimen-swatch-gradient': item.isGradient }"
                      :style="getSwatchStyle(item)"
                    ></span>
                  </div>
                  <div class="colors-specimen-cell">
                    <pz-text variant="body-semibold">{{ item.token }}</pz-text>
                  </div>
                  <div class="colors-specimen-cell colors-specimen-cell-value">
                    <pz-text variant="small-regular">{{ item.value }}</pz-text>
                  </div>
                  <div class="colors-specimen-cell colors-specimen-cell-token">
                    <code>{{ item.variable }}</code>
                  </div>
                </template>
              </div>
            </section>
          </section>
        </section>
      </div>
    `,
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
