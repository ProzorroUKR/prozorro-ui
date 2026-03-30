# prozorro-ui

Vue 3 UI component library scaffold built with Vite library mode, TypeScript, SCSS, and Storybook 8.

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - build the library bundle and declaration files
- `npm run build:types` - generate declaration files with `vue-tsc`
- `npm run format` - format the repository with Prettier
- `npm run format:check` - verify Prettier formatting
- `npm run lint` - run ESLint and Stylelint
- `npm run lint:eslint` - lint TypeScript and Vue files
- `npm run lint:styles` - lint SCSS files and Vue style blocks
- `npm run prepare` - install Husky git hooks
- `npm run storybook` - start Storybook
- `npm run build-storybook` - build the static Storybook site into `dist/app`
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
import { PzButton } from "prozorro-ui";
```
