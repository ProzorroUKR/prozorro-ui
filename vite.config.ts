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
        tsconfigPath: "./tsconfig.build.json",
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
        api: "modern-compiler",
        additionalData: '@use "@/styles/abstract/_mixins.scss" as *;\n@use "@/styles/abstract/_typography.scss" as *;',
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
