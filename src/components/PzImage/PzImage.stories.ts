import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzImage.stories.scss";
import { pzImageDecodingOptions, pzImageFitOptions, pzImageLoadingOptions } from "./configs";
import PzImage from "./PzImage.vue";
import type { PzImageProps } from "./types";

type PzImageStoryArgs = PzImageProps;

const buildImageStorySource = (args: PzImageStoryArgs): string => {
  const attributes = [
    `src="${args.src}"`,
    `alt="${args.alt}"`,
    args.fit !== "contain" ? `fit="${args.fit}"` : null,
    args.loading ? `loading="${args.loading}"` : null,
    args.decoding !== "async" ? `decoding="${args.decoding}"` : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return `<template>\n  <PzImage ${attributes} />\n</template>`;
};

const meta = {
  title: "Components/PzImage",
  component: PzImage,
  parameters: {
    prototype: {
      caption: "Image component",
      note: "Minimal image primitive with basic responsive defaults and CSS custom properties for easy visual overrides.",
    },
    docs: {
      description: {
        component:
          "Use `PzImage` when you want a predictable image primitive with responsive defaults. Styling remains easy to customize through inherited classes, inline styles, and the `--pz-image-*` custom properties.",
      },
      source: {
        transform: (_source: string, context: { args?: PzImageStoryArgs }) =>
          buildImageStorySource((context.args ?? meta.args) as PzImageStoryArgs),
      },
    },
  },
  args: {
    src: "/prozorro_logo.png",
    alt: "Prozorro logotype",
    fit: "contain",
    loading: "lazy",
    decoding: "async",
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL.",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image.",
    },
    fit: {
      control: "select",
      options: pzImageFitOptions,
      description: "Object-fit behavior for framed image layouts.",
    },
    loading: {
      control: "inline-radio",
      options: pzImageLoadingOptions,
      description: "Native browser loading hint.",
    },
    decoding: {
      control: "inline-radio",
      options: pzImageDecodingOptions,
      description: "Native image decoding mode.",
    },
  },
  render: (args: PzImageStoryArgs) => ({
    components: { pzImage: PzImage, pzText: PzText },
    setup() {
      return { args };
    },
    template: `
      <div class="pz-image-story">
        <section class="pz-image-story-hero">
          <div class="pz-image-story-header">
            <div>
              <span class="pz-image-story-eyebrow">Component API</span>
              <pz-text variant="h4-bold">Responsive image primitive</pz-text>
            </div>
            <span class="pz-image-story-chip">{{ args.fit }}</span>
          </div>

          <div class="pz-image-story-surface">
            <pz-image
              :src="args.src"
              :alt="args.alt"
              :fit="args.fit"
              :loading="args.loading"
              :decoding="args.decoding"
            />
          </div>
        </section>

        <section class="pz-image-story-grid">
          <article>
            <span class="pz-image-story-eyebrow">Default flow</span>
            <pz-text variant="body-regular">
              The component keeps the image responsive with width 100% and height auto.
            </pz-text>
            <div class="pz-image-story-surface">
              <pz-image
                :src="args.src"
                :alt="args.alt"
                loading="eager"
              />
            </div>
            <p class="pz-image-story-code">.pz-image { width: 100%; height: auto; }</p>
          </article>

          <article>
            <span class="pz-image-story-eyebrow">Framed crop</span>
            <pz-text variant="body-regular">
              When a parent sets height, the fit prop maps directly to object-fit.
            </pz-text>
            <div class="pz-image-story-crop-frame">
              <pz-image
                :src="args.src"
                :alt="args.alt"
                :fit="args.fit"
              />
            </div>
            <p class="pz-image-story-code">.pz-image { --pz-image-radius; --pz-image-background; --pz-image-shadow; }</p>
          </article>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzImageStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
