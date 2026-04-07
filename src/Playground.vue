<template>
  <main class="playground">
    <section class="playground-shell">
      <PzGrid
        as="section"
        container
        :grid="false"
        class="playground-frame"
      >
        <div class="playground-intro">
          <span class="playground-eyebrow">Grid playground</span>
          <PzText variant="h2-bold">Shared layout primitives in a real page fragment</PzText>
          <PzText variant="body-regular">
            This example uses the component API directly: `PzGrid` and `PzGridItem` instead of manual utility classes.
          </PzText>
        </div>

        <PzGrid class="playground-grid">
          <PzGridItem
            as="article"
            :span="4"
            :md="8"
            :xl="7"
            class="playground-panel playground-panel-hero"
          >
            <span class="playground-chip">Hero</span>
            <PzText variant="h3-bold">
              Primary content stretches wider on desktop while preserving a compact mobile stack.
            </PzText>
            <PzText variant="body-regular">
              The card spans the full mobile width, all 8 tablet columns, and 7 of 12 desktop columns.
            </PzText>
          </PzGridItem>

          <PzGridItem
            as="aside"
            :span="4"
            :md="4"
            :xl="5"
            class="playground-panel"
          >
            <span class="playground-chip">Sidebar</span>
            <PzText variant="h4-semibold">Complementary content</PzText>
            <PzText variant="body-regular">
              This block sits below the hero on mobile and moves into the right rail on larger layouts.
            </PzText>
          </PzGridItem>

          <PzGridItem
            as="article"
            :span="2"
            :md="4"
            :xl="3"
            class="playground-panel playground-panel-stat"
          >
            <span class="playground-metric">4</span>
            <PzText variant="body-semibold">Columns on mobile</PzText>
          </PzGridItem>

          <PzGridItem
            as="article"
            :span="2"
            :md="4"
            :xl="3"
            class="playground-panel playground-panel-stat"
          >
            <span class="playground-metric">8</span>
            <PzText variant="body-semibold">Columns on tablet</PzText>
          </PzGridItem>

          <PzGridItem
            as="article"
            :span="4"
            :md="8"
            :xl="6"
            class="playground-panel"
          >
            <span class="playground-chip">Content rail</span>
            <PzText variant="h4-semibold">Nested areas can keep using the same grid contract.</PzText>

            <PzGrid class="playground-nested-grid">
              <PzGridItem
                :span="4"
                :md="4"
                :xl="6"
                class="playground-nested-card"
              >
                Nested 1
              </PzGridItem>
              <PzGridItem
                :span="4"
                :md="4"
                :xl="6"
                class="playground-nested-card"
              >
                Nested 2
              </PzGridItem>
            </PzGrid>
          </PzGridItem>
        </PzGrid>
      </PzGrid>
    </section>
  </main>
</template>

<script setup lang="ts">
import { PzGrid, PzGridItem } from "./components/PzGrid";
import { PzText } from "./components/PzText";
</script>

<style scoped lang="scss">
.playground {
  min-height: 100vh;
  padding-block: 48px;
  background:
    radial-gradient(circle at top right, color-mix(in srgb, var(--pz-color-blue-50) 10%, transparent), transparent 28%),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--pz-color-white) 100%, transparent),
      color-mix(in srgb, var(--pz-color-grey-20) 92%, var(--pz-color-white))
    );
}

.playground-shell {
  display: grid;
}

.playground-frame {
  display: grid;
  gap: 24px;
}

.playground-intro {
  display: grid;
  gap: 12px;
  max-width: 68ch;
}

.playground-eyebrow,
.playground-chip {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--pz-color-blue-10) 92%, var(--pz-color-white));
  color: var(--pz-color-text-link-hover);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.playground-grid,
.playground-nested-grid {
  align-items: stretch;
}

.playground-panel,
.playground-nested-card {
  display: grid;
  gap: 14px;
  padding: 24px;
  min-width: 0;
  border: 1px solid color-mix(in srgb, var(--pz-color-grey-30) 75%, transparent);
  border-radius: 28px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--pz-color-white) 98%, transparent),
    color-mix(in srgb, var(--pz-color-grey-20) 90%, var(--pz-color-white))
  );
  box-shadow:
    0 18px 60px color-mix(in srgb, var(--pz-color-black-90) 7%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--pz-color-white) 98%, transparent);
}

.playground-panel-hero {
  align-content: start;
}

.playground-panel-stat {
  align-content: end;
}

.playground-metric {
  color: var(--pz-color-text-link-hover);
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 700;
  line-height: 1;
}

.playground-nested-grid {
  margin-top: 6px;
}

.playground-nested-card {
  min-height: 112px;
  place-items: center;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--pz-color-blue-10) 94%, var(--pz-color-white)),
    color-mix(in srgb, var(--pz-color-blue-50) 7%, var(--pz-color-white))
  );
  color: var(--pz-color-text-link-hover);
  font-size: 14px;
  font-weight: 700;
}

@media (width <= 640px) {
  .playground {
    padding-block: 28px;
  }

  .playground-panel,
  .playground-nested-card {
    padding: 20px;
    border-radius: 22px;
  }
}
</style>
