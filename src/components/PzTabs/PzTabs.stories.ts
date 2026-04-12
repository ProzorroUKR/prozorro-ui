import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PzText } from "@/components/PzText";

import "./PzTabs.stories.scss";
import { pzTabsSkinOptions } from "./configs";
import PzTab from "./PzTab.vue";
import PzTabs from "./PzTabs.vue";
import type { PzTabsProps } from "./types";

type PzTabsStoryArgs = PzTabsProps & {
  currentEditionLabel: string;
  historyLabel: string;
};

const buildTabsAttributes = (args: Pick<PzTabsStoryArgs, "skin" | "maxWidth">): string =>
  [args.skin ? `skin="${args.skin}"` : null, args.maxWidth ? `max-width="${args.maxWidth}"` : null]
    .filter((value): value is string => Boolean(value))
    .join(" ");

const buildTabsStorySource = (args: PzTabsStoryArgs): string => {
  const attributes = buildTabsAttributes(args);

  return `<template>\n  <PzTabs ${attributes}>\n    <PzTab name="${args.currentEditionLabel}" selected>\n      Current content\n    </PzTab>\n    <PzTab name="${args.historyLabel}">\n      History content\n    </PzTab>\n  </PzTabs>\n</template>`;
};

const buildThreeTabsStorySource = (): string => `<template>
  <PzTabs skin="light" max-width="720px">
    <PzTab name="Огляд" selected>
      Summary content
    </PzTab>
    <PzTab name="Документи">
      Documents content
    </PzTab>
    <PzTab name="Питання">
      Questions content
    </PzTab>
  </PzTabs>
</template>`;

const buildDefaultSkinStorySource = (): string => `<template>
  <PzTabs>
    <PzTab name="Активні" selected>
      Active procedures
    </PzTab>
    <PzTab name="Архів">
      Archive procedures
    </PzTab>
  </PzTabs>
</template>`;

const buildNarrowStorySource = (): string => `<template>
  <PzTabs skin="light" max-width="360px">
    <PzTab name="Файли" selected>
      Files content
    </PzTab>
    <PzTab name="Історія">
      History content
    </PzTab>
    <PzTab name="Нотатки">
      Notes content
    </PzTab>
  </PzTabs>
</template>`;

const buildExamplesStorySource = (): string => {
  const attributes = [buildThreeTabsStorySource(), buildDefaultSkinStorySource(), buildNarrowStorySource()].join(
    "\n\n",
  );

  return `<template>\n${attributes}\n</template>`;
};

const meta = {
  title: "Components/PzTabs",
  component: PzTabs,
  parameters: {
    prototype: {
      caption: "Tabs component",
      note: "Renamed from the previous app-level tabs to the shared `PzTabs` and `PzTab` components. This version only switches local panel content and keeps the original tab props and behavior.",
    },
    docs: {
      description: {
        component:
          "Use `PzTabs` with `PzTab` children when you need to switch content inside the same view. The API keeps the original `name`, `selected`, `id`, `skin`, and `maxWidth` properties from the legacy tabs.",
      },
      source: {
        transform: (_source: string, context: { args?: PzTabsStoryArgs }) =>
          buildTabsStorySource((context.args ?? meta.args) as PzTabsStoryArgs),
      },
    },
  },
  args: {
    skin: "light",
    maxWidth: "840px",
    currentEditionLabel: "Остання редакція",
    historyLabel: "Історія змін",
  },
  argTypes: {
    skin: {
      control: { type: "inline-radio", labels: { "": "default", light: "light" } },
      options: pzTabsSkinOptions,
      description: "Surface skin for the tabs container.",
    },
    maxWidth: {
      control: "text",
      description: "Optional max-width applied to the navigation and content area.",
    },
  },
  render: (args: PzTabsStoryArgs) => ({
    components: { pzTabs: PzTabs, pzTab: PzTab, pzText: PzText },
    setup() {
      return { args };
    },
    template: `
      <div class="pz-tabs-story">
        <section class="pz-tabs-story-frame">
          <div class="pz-tabs-story-header">
            <div>
              <span class="pz-tabs-story-eyebrow">Content tabs</span>
              <pz-text variant="h4-bold">Switch panel content inside the same view</pz-text>
            </div>
            <span class="pz-tabs-story-chip">{{ args.skin || 'default' }}</span>
          </div>

          <pz-tabs
            :skin="args.skin"
            :max-width="args.maxWidth"
          >
            <pz-tab
              :name="args.currentEditionLabel"
              selected
            >
              <div class="pz-tabs-story-panel">
                <div class="pz-tabs-story-panel-head">
                  <div class="pz-tabs-story-meta">
                    <span class="pz-tabs-story-tag">Тарас Шевченко</span>
                    <pz-text variant="small-regular">Поезія про вечір і родинний лад</pz-text>
                    <span class="pz-tabs-story-bullet"></span>
                    <pz-text variant="small-regular">Фрагмент</pz-text>
                  </div>
                </div>

                <div class="pz-tabs-story-poem">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Садок вишневий коло хати,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Хрущі над вишнями гудуть,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Плугатарі з плугами йдуть,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Співають ідучи дівчата,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">А матері вечерять ждуть.</pz-text>
                  </div>

                  <pz-text variant="small-regular" class="pz-tabs-story-note">
                    Спокійна, світла сцена добре підходить для першої вкладки й показує, як довгий текст живе всередині компонента tabs.
                  </pz-text>
                </div>
              </div>
            </pz-tab>

            <pz-tab :name="args.historyLabel">
              <div class="pz-tabs-story-panel">
                <div class="pz-tabs-story-panel-head">
                  <pz-text variant="h4-semibold">Реве та стогне Дніпр широкий</pz-text>
                  <div class="pz-tabs-story-meta">
                    <span class="pz-tabs-story-tag">Тарас Шевченко</span>
                    <pz-text variant="small-regular">Напружений пейзаж</pz-text>
                    <span class="pz-tabs-story-bullet"></span>
                    <pz-text variant="small-regular">Фрагмент</pz-text>
                  </div>
                </div>

                <div class="pz-tabs-story-poem">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Реве та стогне Дніпр широкий,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Сердитий вітер завива,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Додолу верби гне високі,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Горами хвилю підійма.</pz-text>
                  </div>

                  <pz-text variant="small-regular" class="pz-tabs-story-note">
                    Друга вкладка контрастує настроєм і показує, як історія або альтернативний текст може виглядати в тій самій структурі.
                  </pz-text>
                </div>
              </div>
            </pz-tab>
          </pz-tabs>
        </section>

        <section class="pz-tabs-story-gallery">
          <div class="pz-tabs-story-header">
            <div>
              <span class="pz-tabs-story-eyebrow">Examples</span>
              <pz-text variant="h4-bold">Common tab layouts for product screens</pz-text>
            </div>
            <span class="pz-tabs-story-chip">3 patterns</span>
          </div>

          <div class="pz-tabs-story-grid">
            <article class="pz-tabs-story-card">
              <div class="pz-tabs-story-example-copy">
                <pz-text variant="body-semibold">Three tabs</pz-text>
                <pz-text variant="small-regular">
                  One container with three moods: quiet evening, storm, and testament.
                </pz-text>
              </div>

              <div class="pz-tabs-story-example-surface">
                <pz-tabs
                  skin="light"
                  max-width="720px"
                >
                  <pz-tab
                    name="Огляд"
                    selected
                  >
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Зацвіла в долині</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Червона калина,</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Ніби засміялась</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Дівчина-дитина.</pz-text>
                      </div>
                    </div>
                  </pz-tab>

                  <pz-tab name="Документи">
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Тече вода з-під явора</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Яром на долину.</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Пишається над водою</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Червона калина.</pz-text>
                      </div>
                    </div>
                  </pz-tab>

                  <pz-tab name="Питання">
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Як умру, то поховайте</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Мене на могилі,</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Серед степу широкого,</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">На Вкраїні милій.</pz-text>
                      </div>
                    </div>
                  </pz-tab>
                </pz-tabs>
              </div>
            </article>

            <article class="pz-tabs-story-card">
              <div class="pz-tabs-story-example-copy">
                <pz-text variant="body-semibold">Default skin</pz-text>
                <pz-text variant="small-regular">
                  Same tabs, but the preview keeps the default gray component skin while the content becomes a warm manuscript block.
                </pz-text>
              </div>

              <div class="pz-tabs-story-example-surface">
                <pz-tabs>
                  <pz-tab
                    name="Активні"
                    selected
                  >
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Мені тринадцятий минало.</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Я пас ягнята за селом.</pz-text>
                      </div>
                    </div>
                  </pz-tab>

                  <pz-tab name="Архів">
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Неначе сонце засіяло,</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Неначе все на світі стало</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Моє... лани, гаї, сади!</pz-text>
                      </div>
                    </div>
                  </pz-tab>
                </pz-tabs>
              </div>
            </article>

            <article class="pz-tabs-story-card">
              <div class="pz-tabs-story-example-copy">
                <pz-text variant="body-semibold">Constrained width</pz-text>
                <pz-text variant="small-regular">
                  Narrow example for compact blocks where tab labels may need horizontal scrolling.
                </pz-text>
              </div>

              <div class="pz-tabs-story-example-surface">
                <div class="pz-tabs-story-card-surface pz-tabs-story-narrow">
                <pz-tabs
                  skin="light"
                  max-width="360px"
                >
                  <pz-tab
                    name="Файли"
                    selected
                  >
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Думи мої, думи мої,</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Лихо мені з вами!</pz-text>
                      </div>
                    </div>
                  </pz-tab>

                  <pz-tab name="Історія">
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Нащо стали на папері</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Сумними рядами?..</pz-text>
                      </div>
                    </div>
                  </pz-tab>

                  <pz-tab name="Нотатки">
                    <div class="pz-tabs-story-panel">
                      <div class="pz-tabs-story-stanza">
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Чом вас вітер не розвіяв</pz-text>
                        <pz-text variant="body-regular" class="pz-tabs-story-poem-line">В степу, як пилину?</pz-text>
                      </div>
                    </div>
                  </pz-tab>
                </pz-tabs>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    `,
  }),
} satisfies Meta<PzTabsStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ThreeTabs: Story = {
  parameters: {
    docs: {
      source: {
        code: buildThreeTabsStorySource(),
      },
    },
  },
  render: () => ({
    components: { pzTabs: PzTabs, pzTab: PzTab, pzText: PzText },
    template: `
      <div class="pz-tabs-story">
        <section class="pz-tabs-story-frame">
          <div class="pz-tabs-story-header">
            <div>
              <span class="pz-tabs-story-eyebrow">Example</span>
              <pz-text variant="h4-bold">Three tabs layout</pz-text>
            </div>
            <span class="pz-tabs-story-chip">Light</span>
          </div>

          <div class="pz-tabs-story-card-surface">
            <pz-tabs
              skin="light"
              max-width="720px"
            >
              <pz-tab
                name="Огляд"
                selected
              >
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Садок вишневий коло хати,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Хрущі над вишнями гудуть.</pz-text>
                  </div>
                </div>
              </pz-tab>

              <pz-tab name="Документи">
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Реве та стогне Дніпр широкий,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Сердитий вітер завива.</pz-text>
                  </div>
                </div>
              </pz-tab>

              <pz-tab name="Питання">
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Як умру, то поховайте</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Мене на могилі.</pz-text>
                  </div>
                </div>
              </pz-tab>
            </pz-tabs>
          </div>
        </section>
      </div>
    `,
  }),
};

export const DefaultSkin: Story = {
  parameters: {
    docs: {
      source: {
        code: buildDefaultSkinStorySource(),
      },
    },
  },
  render: () => ({
    components: { pzTabs: PzTabs, pzTab: PzTab, pzText: PzText },
    template: `
      <div class="pz-tabs-story">
        <section class="pz-tabs-story-frame">
          <div class="pz-tabs-story-header">
            <div>
              <span class="pz-tabs-story-eyebrow">Example</span>
              <pz-text variant="h4-bold">Default skin surface</pz-text>
            </div>
            <span class="pz-tabs-story-chip">Default</span>
          </div>

          <div class="pz-tabs-story-card-surface">
            <pz-tabs>
              <pz-tab
                name="Активні"
                selected
              >
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Мені тринадцятий минало,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Я пас ягнята за селом.</pz-text>
                  </div>
                </div>
              </pz-tab>

              <pz-tab name="Архів">
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Неначе сонце засіяло,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Неначе все на світі стало моє.</pz-text>
                  </div>
                </div>
              </pz-tab>
            </pz-tabs>
          </div>
        </section>
      </div>
    `,
  }),
};

export const ConstrainedWidth: Story = {
  parameters: {
    docs: {
      source: {
        code: buildNarrowStorySource(),
      },
    },
  },
  render: () => ({
    components: { pzTabs: PzTabs, pzTab: PzTab, pzText: PzText },
    template: `
      <div class="pz-tabs-story">
        <section class="pz-tabs-story-frame">
          <div class="pz-tabs-story-header">
            <div>
              <span class="pz-tabs-story-eyebrow">Example</span>
              <pz-text variant="h4-bold">Constrained width tabs</pz-text>
            </div>
            <span class="pz-tabs-story-chip">360px</span>
          </div>

          <div class="pz-tabs-story-card-surface pz-tabs-story-narrow">
            <pz-tabs
              skin="light"
              max-width="360px"
            >
              <pz-tab
                name="Файли"
                selected
              >
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Думи мої, думи мої,</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Лихо мені з вами!</pz-text>
                  </div>
                </div>
              </pz-tab>

              <pz-tab name="Історія">
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Нащо стали на папері</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Сумними рядами?..</pz-text>
                  </div>
                </div>
              </pz-tab>

              <pz-tab name="Нотатки">
                <div class="pz-tabs-story-panel">
                  <div class="pz-tabs-story-stanza">
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">Чом вас вітер не розвіяв</pz-text>
                    <pz-text variant="body-regular" class="pz-tabs-story-poem-line">В степу, як пилину?</pz-text>
                  </div>
                </div>
              </pz-tab>
            </pz-tabs>
          </div>
        </section>
      </div>
    `,
  }),
};

export const Examples: Story = {
  parameters: {
    docs: {
      source: {
        code: buildExamplesStorySource(),
      },
    },
  },
};
