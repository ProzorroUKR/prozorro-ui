import { onBeforeUnmount, ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzScrollTo.stories.scss";
import { pzScrollBehaviorOptions } from "./configs";
import { PzScrollTo } from "./PzScrollTo";
import type { PzScrollBehavior } from "./types";

interface PzScrollToStoryArgs {
  behavior: PzScrollBehavior;
  offsetTop: number;
}

const PZ_SCROLL_TO_STORY_DEFAULT_OFFSET_TOP = 24;
const PZ_SCROLL_TO_STORY_SECTION_MIN_HEIGHT = "100vh";

const buildSource = (args: PzScrollToStoryArgs): string => {
  const options = [
    args.behavior !== "smooth" ? `behavior: "${args.behavior}"` : null,
    args.offsetTop !== PZ_SCROLL_TO_STORY_DEFAULT_OFFSET_TOP ? `offsetTop: ${args.offsetTop}` : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(", ");

  const optionsBlock = options ? `, { ${options} }` : "";

  return `<script setup lang="ts">
import { PzScrollTo } from "@prozorro/prozorro-ui";

const scrollToTenderDocuments = (): void => {
  PzScrollTo.moveById("documents"${optionsBlock});
};
</script>

<template>
  <button type="button" @click="scrollToTenderDocuments">Scroll to documents</button>
</template>`;
};

const sections = [
  {
    id: "overview",
    label: "Overview",
    copy: "Short context for the procurement scenario and the current workflow state.",
  },
  {
    id: "criteria",
    label: "Criteria",
    copy: "Eligibility and qualification requirements for suppliers and attached evidence.",
  },
  {
    id: "documents",
    label: "Documents",
    copy: "Attached files, visual previews, and supporting procurement materials for review.",
  },
];

const methodDocs = [
  {
    name: "moveById",
    signature: "PzScrollTo.moveById(id, options?)",
    description: "Scrolls to an element found by id and optionally highlights it after scrolling.",
    params: "`id: string`, `options?: number | PzScrollToOptions`",
    example: 'PzScrollTo.moveById("documents", { offsetTop: 24, behavior: "smooth" });',
  },
  {
    name: "moveByQuerySelector",
    signature: "PzScrollTo.moveByQuerySelector(selector, options?)",
    description: "Scrolls to the first element matching a CSS selector and can highlight it.",
    params: "`selector: string`, `options?: number | PzScrollToOptions`",
    example: 'PzScrollTo.moveByQuerySelector("#documents .item", 32);',
  },
  {
    name: "moveTo",
    signature: "PzScrollTo.moveTo(targetTop, options?)",
    description: "Scrolls to an absolute Y position in the page.",
    params: "`targetTop: number`, `options?: number | PzScrollToOptions`",
    example: 'PzScrollTo.moveTo(640, { behavior: "auto" });',
  },
  {
    name: "moveToTop",
    signature: "PzScrollTo.moveToTop(options?)",
    description: "Scrolls the page back to the top.",
    params: "`options?: PzScrollToOptions`",
    example: 'PzScrollTo.moveToTop({ behavior: "smooth" });',
  },
  {
    name: "moveToElement",
    signature: "PzScrollTo.moveToElement(element, options?)",
    description: "Scrolls directly to a passed HTMLElement instance.",
    params: "`element: HTMLElement`, `options?: number | PzScrollToOptions`",
    example: "PzScrollTo.moveToElement(sectionRef.value, { offsetTop: 16 });",
  },
  {
    name: "move",
    signature: "PzScrollTo.move(target, options?)",
    description: "Universal method that accepts a number, selector, or HTMLElement target.",
    params: "`target: number | string | HTMLElement`, `options?: number | PzScrollToOptions`",
    example: 'PzScrollTo.move("#documents", { highlightClassName: "pz-scroll-to-highlight" });',
  },
];

const typeDocs: Array<{
  name: string;
  signature: string;
  description: string;
  example: string;
}> = [
  {
    name: "PzScrollBehavior",
    signature: 'type PzScrollBehavior = "auto" | "instant" | "smooth"',
    description: "Defines the scroll behavior passed to `window.scrollTo`.",
    example: 'const behavior: PzScrollBehavior = "smooth";',
  },
  {
    name: "PzScrollToTarget",
    signature: "type PzScrollToTarget = number | string | HTMLElement",
    description: "Universal target type accepted by `move(...)`: absolute Y position, CSS selector, or HTMLElement.",
    example: 'PzScrollTo.move("#documents");',
  },
  {
    name: "PzScrollToOptions",
    signature: "interface PzScrollToOptions",
    description:
      "`offsetTop` shifts the final position, `behavior` controls animation, `highlightClassName` adds a CSS class to the target, and `highlightDuration` removes it after a timeout.",
    example:
      'const options: PzScrollToOptions = { \n offsetTop: 24, \n behavior: "smooth", \n highlightClassName: "pz-scroll-to-highlight", \n highlightDuration: 2000 \n};',
  },
];

const meta = {
  title: "Utilities/PzScrollTo",
  parameters: {
    prototype: {
      caption: "Scroll utility",
      note: "Direct utility for anchor-like programmatic scrolling. It keeps the old moveById/moveTo/moveByQuerySelector API, but adds typed options and a reusable highlight hook for target sections.",
    },
    docs: {
      description: {
        component:
          "Use `PzScrollTo` from the library root for programmatic scrolling to document sections, anchored blocks, or absolute positions. Available methods: `moveById(id, options?)`, `moveByQuerySelector(selector, options?)`, `moveTo(targetTop, options?)`, `moveToTop(options?)`, `moveToElement(element, options?)`, and `move(target, options?)`. `options` supports `offsetTop`, `behavior`, `highlightClassName`, and `highlightDuration`.",
      },
      source: {
        transform: (_source: string, context: { args?: PzScrollToStoryArgs }) =>
          buildSource((context.args ?? meta.args) as PzScrollToStoryArgs),
      },
    },
  },
  args: {
    behavior: "smooth",
    offsetTop: PZ_SCROLL_TO_STORY_DEFAULT_OFFSET_TOP,
  },
  argTypes: {
    behavior: {
      control: "inline-radio",
      options: pzScrollBehaviorOptions,
      description: "Scroll behavior passed to window.scrollTo.",
    },
    offsetTop: {
      control: { type: "number", min: 0, max: 120, step: 4 },
      description: "Top offset subtracted from the target position.",
    },
  },
  render: (args: PzScrollToStoryArgs) => ({
    components: { pzText: PzText },
    setup() {
      const currentBehavior = ref(args.behavior);
      const currentOffsetTop = ref(args.offsetTop);

      watch(
        () => args.behavior,
        value => {
          currentBehavior.value = value;
        },
      );

      watch(
        () => args.offsetTop,
        value => {
          currentOffsetTop.value = value;
        },
      );

      const scrollToSection = (id: string): void => {
        PzScrollTo.moveById(id, {
          behavior: currentBehavior.value,
          offsetTop: currentOffsetTop.value,
        });
      };

      const scrollToTop = (): void => {
        PzScrollTo.moveToTop({
          behavior: currentBehavior.value,
        });
      };

      onBeforeUnmount(() => {
        document.querySelectorAll(".pz-scroll-to-highlight").forEach(node => {
          node.classList.remove("pz-scroll-to-highlight");
        });
      });

      return {
        methodDocs,
        sections,
        scrollToSection,
        scrollToTop,
        typeDocs,
      };
    },
    template: `
      <div class="pz-scroll-to-story">
        <section class="pz-scroll-to-story-toolbar">
          <div class="pz-scroll-to-story-copy">
            <span class="pz-scroll-to-story-eyebrow">Programmatic navigation</span>
            <pz-text variant="h4-bold">Jump to anchored sections</pz-text>
            <pz-text variant="body-regular">
              Useful for long procurement pages, filter summaries, and document-heavy surfaces where links need controlled offsets.
            </pz-text>
          </div>

          <div class="pz-scroll-to-story-actions">
            <button type="button" class="pz-scroll-to-story-button" @click="scrollToSection('overview')">Overview</button>
            <button type="button" class="pz-scroll-to-story-button" @click="scrollToSection('criteria')">Criteria</button>
            <button type="button" class="pz-scroll-to-story-button" @click="scrollToSection('documents')">Documents</button>
            <button type="button" class="pz-scroll-to-story-button pz-scroll-to-story-button--ghost" @click="scrollToTop">Back to top</button>
          </div>
        </section>

        <section class="pz-scroll-to-story-methods">
          <article
            v-for="method in methodDocs"
            :key="method.name"
            class="pz-scroll-to-story-method-card"
          >
            <div class="pz-scroll-to-story-method-header">
              <span class="pz-scroll-to-story-kicker">{{ method.name }}</span>
              <pz-text variant="body-semibold">{{ method.signature }}</pz-text>
            </div>
            <pz-text variant="body-regular">{{ method.description }}</pz-text>
            <pz-text variant="small-regular">Params: {{ method.params }}</pz-text>
            <pre class="pz-scroll-to-story-code"><code>{{ method.example }}</code></pre>
          </article>
        </section>

        <section class="pz-scroll-to-story-types">
          <article
            v-for="typeItem in typeDocs"
            :key="typeItem.name"
            class="pz-scroll-to-story-type-card"
          >
            <div class="pz-scroll-to-story-method-header">
              <span class="pz-scroll-to-story-kicker">{{ typeItem.name }}</span>
              <pz-text variant="body-semibold">{{ typeItem.signature }}</pz-text>
            </div>
            <pz-text variant="body-regular">{{ typeItem.description }}</pz-text>
            <pre class="pz-scroll-to-story-code"><code>{{ typeItem.example }}</code></pre>
          </article>
        </section>

        <section class="pz-scroll-to-story-stack">
          <article
            v-for="section in sections"
            :id="section.id"
            :key="section.id"
            class="pz-scroll-to-story-section"
            :style="{ minHeight: '${PZ_SCROLL_TO_STORY_SECTION_MIN_HEIGHT}' }"
          >
            <span class="pz-scroll-to-story-kicker">{{ section.id }}</span>
            <pz-text variant="h4-bold">{{ section.label }}</pz-text>
            <pz-text variant="body-regular">{{ section.copy }}</pz-text>
            <div class="pz-scroll-to-story-paper"></div>
          </article>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzScrollToStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
