import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const isStorybook = process.argv.some(arg => arg.includes("storybook"));

export default defineConfig({
  plugins: [
    vue(),
    !isStorybook &&
      dts({
        include: ["src"],
        exclude: ["src/**/*.stories.ts", "src/dev.ts", "src/Playground.vue"],
        insertTypesEntry: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/_variables.scss" as *; @use "@/styles/_mixins.scss" as *;',
      },
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "ProzorroUi",
      formats: ["es", "cjs"],
      fileName: format => (format === "es" ? "prozorro-ui.js" : "prozorro-ui.cjs"),
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
