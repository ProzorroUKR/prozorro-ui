import { fileURLToPath, URL } from "node:url";

import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  staticDirs: ["../public"],
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
            api: "modern-compiler",
            additionalData:
              '@use "@/styles/abstract/_mixins.scss" as *;\n@use "@/styles/abstract/_typography.scss" as *;',
          },
        },
      },
    });
  },
};

export default config;
