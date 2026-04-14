import { ref, computed } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import { PzValidatorXSS } from "./PzValidatorXSS";
import "./PzValidatorXSS.stories.scss";

interface PzValidatorXSSStoryArgs {
  testInput: string;
}

const buildSource = (args: PzValidatorXSSStoryArgs): string => `<script setup lang="ts">
import { PzValidatorXSS } from "@prozorro/prozorro-ui";

const input = "${args.testInput}";
const sanitizedInput = PzValidatorXSS.validString(input);

const queryParams = {
  search: "<script>alert('XSS')</script>Tender",
  filters: ["<b>Active</b>", "<i>Cancelled</i>"]
};
const sanitizedQuery = PzValidatorXSS.validQuery(queryParams);
</script>

<template>
  <div>
    <p>Sanitized string: {{ sanitizedInput }}</p>
    <pre>Sanitized query: {{ JSON.stringify(sanitizedQuery, null, 2) }}</pre>
  </div>
</template>`;

const methodDocs = [
  {
    name: "validString",
    signature: "PzValidatorXSS.validString(str: string | number): string",
    description: "Removes HTML tags from a string and trims whitespace. Handles numbers by converting them to strings.",
    params: "`str`: Input value to sanitize.",
    example: 'PzValidatorXSS.validString("<p>Hello world</p>") // "Hello world"',
  },
  {
    name: "validQuery",
    signature: "PzValidatorXSS.validQuery(query: PzValidatorXSSQuery): PzValidatorXSSQuery",
    description: "Deep sanitization for an object (e.g. router query). Recursively cleans arrays and string values.",
    params: "`query`: Object with string or string array values.",
    example: "PzValidatorXSS.validQuery({ q: '<u>search</u>', ids: ['<i>1</i>', '2'] })",
  },
];

const meta: Meta<PzValidatorXSSStoryArgs> = {
  title: "Utilities/PzValidatorXSS",
  component: PzValidatorXSS as any,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Utility class for sanitizing inputs and preventing XSS by removing HTML tags from strings and query objects.",
      },
    },
  },
  argTypes: {
    testInput: {
      control: "text",
      description: "Live test input with HTML tags.",
    },
  },
};

export default meta;

export const Documentation: StoryObj<PzValidatorXSSStoryArgs> = {
  args: {
    testInput: "<b>Hello</b> <script>alert('XSS')</script> <i>World!</i>",
  },
  render: args => ({
    components: { pzText: PzText },
    setup() {
      const input = ref(args.testInput);
      const sanitized = computed(() => PzValidatorXSS.validString(input.value));

      const queryInput = {
        keyword: "<b>Prozorro</b>",
        tags: ["<i>Active</i>", "<u>Closed</u>"],
        page: "1",
      };
      const sanitizedQuery = PzValidatorXSS.validQuery(queryInput);

      return { input, sanitized, queryInput, sanitizedQuery, methodDocs };
    },
    template: `
      <div class="pz-validator-xss-story">
        <header class="pz-validator-xss-story__header">
          <pzText weight="bold" size="large" tag="h1" class="pz-validator-xss-story__title">PzValidatorXSS Utility</pzText>
          <pzText color="secondary">
            Provides robust sanitization to prevent XSS attacks by stripping all HTML tags from user inputs,
            API responses, or URL parameters within the Prozorro UI ecosystem.
          </pzText>
        </header>

        <section class="pz-validator-xss-story__section">
          <pzText weight="bold" size="medium" tag="h2" class="pz-validator-xss-story__title">Methods Reference</pzText>
          <div class="pz-validator-xss-story__methods">
            <article v-for="method in methodDocs" :key="method.name" class="pz-validator-xss-story__method-card">
              <code class="pz-validator-xss-story__method-signature">{{ method.signature }}</code>
              <pzText size="small" style="display: block; margin-bottom: 12px;">{{ method.description }}</pzText>
              <pzText size="small" color="secondary" style="display: block; margin-bottom: 8px;">
                <strong>Parameter:</strong> {{ method.params }}
              </pzText>
              <pre class="pz-validator-xss-story__code-block pz-validator-xss-story__code-block--light">{{ method.example }}</pre>
            </article>
          </div>
        </section>

        <section class="pz-validator-xss-story__section">
          <pzText weight="bold" size="medium" tag="h2" class="pz-validator-xss-story__title">Live Playground</pzText>
          <div class="pz-validator-xss-story__playground">
            <div>
              <pzText weight="bold" size="small" style="display: block; margin-bottom: 12px;">Try HTML Input:</pzText>
              <textarea v-model="input" class="pz-validator-xss-story__input-area" placeholder="Enter text with <b>tags</b>..."></textarea>
            </div>
            <div>
              <pzText weight="bold" size="small" style="display: block; margin-bottom: 12px;">Sanitized Output:</pzText>
              <div class="pz-validator-xss-story__output-box">
                <pzText>{{ sanitized }}</pzText>
              </div>
            </div>
          </div>
        </section>

        <section class="pz-validator-xss-story__section">
          <pzText weight="bold" size="medium" tag="h2" class="pz-validator-xss-story__title">Deep Object Sanitization (validQuery)</pzText>
          <div class="pz-validator-xss-story__playground">
            <div>
              <pzText weight="bold" size="small" style="display: block; margin-bottom: 12px;">Original Object:</pzText>
              <pre class="pz-validator-xss-story__code-block">{{ JSON.stringify(queryInput, null, 2) }}</pre>
            </div>
            <div>
              <pzText weight="bold" size="small" style="display: block; margin-bottom: 12px;">Sanitized Result:</pzText>
              <pre class="pz-validator-xss-story__code-block" style="color: #55efc4;">{{ JSON.stringify(sanitizedQuery, null, 2) }}</pre>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: buildSource({ testInput: "<b>Hello</b> <script>alert('XSS')</script> <i>World!</i>" }),
      },
    },
  },
};
