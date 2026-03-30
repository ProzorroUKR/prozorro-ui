# prozorro-ui

Vue 3 UI component library scaffold built with Vite library mode, TypeScript, SCSS, and Storybook 8.

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - build the library bundle and declaration files
- `npm run build:types` - generate declaration files with `vue-tsc`
- `npm run storybook` - start Storybook
- `npm run build-storybook` - build the static Storybook site
- `npm run typecheck` - run strict type checking

## Structure

```text
src/
  components/
    Button/
  styles/
  index.ts
.storybook/
vite.config.ts
tsconfig.json
```

## Included Example

The library ships with a reference `PzButton` component and a matching Storybook story:

```ts
import { PzButton } from 'prozorro-ui';
```
