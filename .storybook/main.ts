import { fileURLToPath, URL } from "node:url";

import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("../src", import.meta.url)),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "@/styles/abstract/_mixins.scss" as *;',
          },
        },
      },
    });
  },
};

export default config;
