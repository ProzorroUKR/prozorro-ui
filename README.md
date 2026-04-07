# `@prozorro/prozorro-ui`

Vue 3 component library for Prozorro interfaces.

## Install

```bash
npm install @prozorro/prozorro-ui
```

Peer dependency:

```bash
npm install vue
```

## Styles

The package exposes both compiled CSS and the SCSS entrypoint.

Use compiled CSS when you just need the library styles:

```ts
import "@prozorro/prozorro-ui/style.css";
```

Use SCSS when your app compiles Sass and you want the source entry:

```ts
import "@prozorro/prozorro-ui/main.scss";
```

## Usage

```vue
<script setup lang="ts">
import { PzText } from "@prozorro/prozorro-ui";
</script>

<template>
  <PzText variant="h1-bold">Procurement announcement</PzText>
  <PzText
    variant="body-regular"
    as="p"
  >
    Suppliers can review requirements, deadlines, and attached documents.
  </PzText>
</template>
```

Type imports:

```ts
import type { PzTextProps, PzTextTag, PzTextVariant } from "@prozorro/prozorro-ui";
```

## Storybook

```bash
npm run storybook
```

Static build:

```bash
npm run build:storybook
```

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` builds the library bundle and Storybook
- `npm run build:lib` builds the library bundle
- `npm run storybook` starts Storybook
- `npm run build:storybook` builds the static Storybook site into `dist/app`
- `npm run lint` runs ESLint and Stylelint
- `npm run typecheck` runs `vue-tsc --noEmit`
