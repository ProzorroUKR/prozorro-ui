# Architecture

## Purpose

`@prozorro/prozorro-ui` is a Vue 3 design-system library. Its job is to provide:

- reusable UI primitives and components
- shared visual tokens and styling rules
- a stable public API for product teams
- Storybook-based design review and usage documentation

This repository should stay focused on design-system concerns. It should not become a host for application-specific business logic, page assembly, or product workflows.

## Core Principles

- Design tokens first. Colors, spacing, typography, breakpoints, and shared interaction patterns belong in the style system before they are copied into components.
- Small public API. Export only what consumers need: components, explicit prop types, and supported style entrypoints.
- Strong semantics. Components should default to accessible and semantic HTML, while still allowing controlled overrides.
- Predictable composition. Prefer simple Vue 3 components that compose cleanly instead of highly stateful abstractions.
- Storybook as contract. Each public component should have stories that explain usage, edge cases, and design intent.
- Backward compatibility matters. Design-system changes affect many consumers; API churn should be deliberate and versioned.

## Current Repository Shape

```text
src/
  components/
    PzText/
      PzText.vue
      PzText.stories.ts
      PzText.stories.scss
      index.ts
      types.ts
  styles/
    abstract/
      _variables.scss
      _mixins.scss
      _typography.scss
    vendors/
      _normalize.scss
      _google-material-icons.scss
    _reset.scss
    main.scss
  index.ts
.storybook/
  main.ts
  preview.ts
  preview.scss
vite.config.ts
package.json
```

## Architectural Layers

### 1. Public Library Layer

The public surface starts in [src/index.ts](/Users/demon/Desktop/projects/prozorro-ui/src/index.ts).

Rules:

- Export only supported components and their `Pz*` types.
- Keep exports flat and predictable.
- Publish style entrypoints intentionally: compiled CSS for drop-in adoption and SCSS for Sass-based consumers.

Current public style entrypoints:

- `@prozorro/prozorro-ui`
- `@prozorro/prozorro-ui/style.css`
- `@prozorro/prozorro-ui/main.scss`

### 2. Component Layer

Each component should live in its own folder under `src/components/<ComponentName>/`.

Recommended shape:

```text
src/components/PzComponent/
  PzComponent.vue
  PzComponent.stories.ts
  PzComponent.stories.scss
  index.ts
  types.ts
```

Rules:

- Component names use the `Pz` prefix.
- Public types also use the `Pz` prefix, for example `PzTextProps`.
- Props should be explicit, typed, and minimal.
- Slots are preferred for flexible content composition.
- Default behavior should be semantic and accessible.
- Internal implementation details should not leak into the public API.

### 3. Style System Layer

The style system is centralized under `src/styles`.

Responsibilities:

- `_variables.scss`: design tokens and CSS custom properties
- `_mixins.scss`: shared responsive and utility mixins
- `_typography.scss`: typography contracts used by components
- `_reset.scss` and vendor styles: global base behavior
- `main.scss`: library-wide style entrypoint

Rules:

- Tokens should be defined once and reused everywhere.
- Prefer semantic token names over one-off numeric values inside components.
- Component styles may consume tokens and mixins, but should not redefine the system.
- Shared patterns should move upward into `abstract/` instead of being duplicated.

## Vue 3 Standards

This library should follow modern Vue 3 patterns:

- use `<script setup lang="ts">`
- type props and emits explicitly
- keep components presentational unless state is part of the primitive
- use computed state for derived values, not duplicated props
- avoid unnecessary watchers and implicit side effects
- prefer slot-based composition over prop explosion

For design-system components, the default expectation is controlled simplicity:

- no hidden async behavior
- no implicit global state
- no direct coupling to app stores, routers, or API clients

## Design System Standards

### Tokens and Variants

Variants should map to design-system concepts, not ad hoc product naming.

Good:

- `h1-bold`
- `body-regular`
- `danger`

Avoid:

- `bigText`
- `cardTitleSecondaryV2`
- `blueButtonAlt`

### Semantics and Accessibility

Every component should define:

- its semantic default element
- allowed overrides
- keyboard behavior if interactive
- visible focus treatment
- disabled and error behavior if applicable

Accessibility is part of the component contract, not an optional enhancement.

### API Stability

Before adding a prop, ask:

- Is this a real cross-product need?
- Can this be solved with composition or slots?
- Does it expose implementation details?
- Will consumers depend on this forever?

If the answer is unclear, do not add the prop yet.

## Storybook Standards

Storybook is the primary development and review environment for the library.

Every public component should include:

- at least one interactive playground story
- a complete variant overview when the component has multiple states
- concise prop descriptions
- realistic content, not placeholder lorem ipsum unless necessary

Storybook should support two roles:

- design review
- implementation documentation

This repository already uses a prototype-style Storybook preview shell. That should remain design-system focused and consistent across components.

## Build and Packaging Model

The library is built with Vite in library mode and `vite-plugin-dts`.

Current build expectations:

- ESM and CJS bundles are generated into `dist/`
- declaration files are generated for public TypeScript usage
- `style.css` is emitted as the compiled stylesheet
- Storybook is built separately into `dist/app`

Rules:

- `vue` stays a peer dependency
- library code should be tree-shakeable where practical
- generated output belongs in `dist/`, source code belongs in `src/`
- do not import stories, playground files, or local development helpers into the public bundle

## Development Workflow

When adding or changing a component:

1. Define or update the design-system token usage first.
2. Implement the Vue component with a minimal typed API.
3. Add Storybook stories for primary, edge, and variant states.
4. Export the component and its public `Pz*` types.
5. Verify linting, styling, and build behavior.
6. Update README or architectural docs if the public contract changed.

## Support and Maintenance Practices

To keep the library healthy over time:

- treat Storybook as the visual regression baseline
- prefer incremental component evolution over large rewrites
- deprecate APIs before removing them
- document breaking changes clearly
- keep naming consistent across components, stories, and exports
- review responsive behavior, not only desktop states

## Automated Validation

Some architecture rules are subjective and still require review, but the machine-checkable ones should run automatically.

Current automated entrypoint:

- `npm run lint:architecture`

This validator should fail when:

- a component directory does not use the `Pz` prefix
- a component is missing `Component.vue`, `index.ts`, `types.ts`, or `Component.stories.ts`
- a component does not use `<script setup lang="ts">`
- a component does not declare its Vue component name via `defineOptions`
- exported public types in `types.ts` are not prefixed with the component name
- `src/index.ts` stops importing `./styles/main.scss`
- package style exports drift from the supported library contract

This validator should stay small and deterministic. It is intended to enforce repository conventions, not replace design review.

When the library grows, add:

- automated unit tests for component logic
- visual regression testing for Storybook stories
- changelog and release discipline
- contribution templates for new components

## Recommended Component Checklist

Before merging a new component, confirm:

- the name follows the `Pz` prefix convention
- props and types are prefixed and exported intentionally
- styles use shared tokens and mixins
- Storybook stories exist and are readable
- keyboard and focus behavior are handled if interactive
- mobile and desktop behavior are both considered
- the component does not depend on app-specific services

## Boundaries

This repository should contain:

- primitives
- composable design-system components
- shared styles and tokens
- documentation and Storybook stories

This repository should not contain:

- application pages
- product-specific business rules
- API integration logic
- route-specific state management
- one-off feature styling that is not reusable

## Near-Term Direction

Given the current state of the repository, the next healthy steps are:

- continue building the component library around `Pz*` public APIs
- keep global styles intentional and documented
- strengthen Storybook as the primary review environment
- add tests once the component surface expands beyond the first primitives

This file is the default architectural guideline for future library work. If implementation and this document diverge, the repository should be brought back into alignment deliberately rather than drifting by accident.
