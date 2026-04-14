import { ref, onMounted } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import { PzDomHandler } from "./PzDomHandler";
import "./PzDomHandler.stories.scss";

interface PzDomHandlerStoryArgs {
  copyText: string;
}

const PZ_DOM_HANDLER_COPY_FEEDBACK_DURATION = 2000;

const buildSource = (args: PzDomHandlerStoryArgs): string => `<script setup lang="ts">
import { PzDomHandler } from "@prozorro/prozorro-ui";

const handleCopy = async (): Promise<void> => {
  await PzDomHandler.copyToClipboard("${args.copyText}");
};
</script>

<template>
  <button type="button" @click="handleCopy">Copy to clipboard</button>
</template>`;

const methodDocs = [
  {
    name: "copyToClipboard",
    signature: "PzDomHandler.copyToClipboard(str: string): Promise<void>",
    description: "Copies a string to the system clipboard using the modern Clipboard API with a textarea fallback.",
    params: "`str`: The text string to be copied.",
    example: 'await PzDomHandler.copyToClipboard("Tender-ID-2024-001");',
  },
  {
    name: "getParentNearestBackground",
    signature: "PzDomHandler.getParentNearestBackground(el?: HTMLElement): string",
    description: "Recursively finds the nearest parent with a non-transparent background color.",
    params: "`el`: Starting element (optional).",
    example: "const bgColor = PzDomHandler.getParentNearestBackground(elementRef.value);",
  },
];

const meta: Meta<PzDomHandlerStoryArgs> = {
  title: "Utilities/PzDomHandler",
  component: PzDomHandler as any,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Utility class for common DOM operations like clipboard interaction and visual styling discovery.",
      },
    },
  },
  argTypes: {
    copyText: {
      control: "text",
      description: "Text used in the clipboard demo.",
    },
  },
};

export default meta;

export const Documentation: StoryObj<PzDomHandlerStoryArgs> = {
  args: {
    copyText: "CPV-001: Building construction work",
  },
  render: args => ({
    components: { pzText: PzText },
    setup() {
      const textToCopy = ref(args.copyText);
      const isCopied = ref(false);
      const bgSampleRef = ref<HTMLElement | null>(null);
      const detectedBg = ref("");

      const handleCopy = async (): Promise<void> => {
        await PzDomHandler.copyToClipboard(textToCopy.value);
        isCopied.value = true;
        setTimeout(() => {
          isCopied.value = false;
        }, PZ_DOM_HANDLER_COPY_FEEDBACK_DURATION);
      };

      onMounted(() => {
        if (bgSampleRef.value) {
          detectedBg.value = PzDomHandler.getParentNearestBackground(bgSampleRef.value);
        }
      });

      return { textToCopy, isCopied, handleCopy, bgSampleRef, detectedBg, methodDocs };
    },
    template: `
      <div class="pz-dom-handler-story">
        <header class="pz-dom-handler-story__header">
          <pzText weight="bold" size="large" tag="h1" class="pz-dom-handler-story__title">PzDomHandler Utility</pzText>
          <pzText color="secondary">
            A utility class providing essential DOM interaction methods used across the Prozorro UI library.
          </pzText>
        </header>

        <section class="pz-dom-handler-story__section">
          <pzText weight="bold" size="medium" tag="h2" class="pz-dom-handler-story__title">Methods Reference</pzText>
          <div class="pz-dom-handler-story__methods">
            <article v-for="method in methodDocs" :key="method.name" class="pz-dom-handler-story__method-card">
              <code class="pz-dom-handler-story__method-signature">{{ method.signature }}</code>
              <pzText size="small" style="display: block; margin-bottom: 12px;">{{ method.description }}</pzText>
              <pzText size="small" color="secondary" style="display: block; margin-bottom: 8px;">
                <strong>Parameter:</strong> {{ method.params }}
              </pzText>
              <pre class="pz-dom-handler-story__code-block">{{ method.example }}</pre>
            </article>
          </div>
        </section>

        <section class="pz-dom-handler-story__section">
          <pzText weight="bold" size="medium" tag="h2" class="pz-dom-handler-story__title">Copy to Clipboard Demo</pzText>
          <pzText size="small" color="secondary">
            Test the clipboard functionality by entering text below and clicking the copy button.
          </pzText>
          <div class="pz-dom-handler-story__demo-box">
            <div class="pz-dom-handler-story__input-row">
              <input v-model="textToCopy" type="text" class="pz-dom-handler-story__input" />
              <button 
                type="button" 
                class="pz-dom-handler-story__button"
                :class="{ 'pz-dom-handler-story__button--copied': isCopied }"
                @click="handleCopy"
              >
                {{ isCopied ? 'Copied!' : 'Copy Text' }}
              </button>
            </div>
          </div>
        </section>

        <section class="pz-dom-handler-story__section">
          <pzText weight="bold" size="medium" tag="h2" class="pz-dom-handler-story__title">Background Detection Demo</pzText>
          <pzText size="small" color="secondary">
            The helper identifies the nearest opaque background, which is useful for components that need to contrast with their environment.
          </pzText>
          <div class="pz-dom-handler-story__demo-box" style="background: #6c5ce7; border-color: #a29bfe;">
             <div style="background: transparent; padding: 20px;">
                <div ref="bgSampleRef" class="pz-dom-handler-story__bg-sample" style="background: transparent; border: 2px dashed #fff;">
                  Detected Ancestor BG: {{ detectedBg }}
                </div>
             </div>
          </div>
        </section>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: buildSource({ copyText: "CPV-001: Building construction work" }),
      },
    },
  },
};
