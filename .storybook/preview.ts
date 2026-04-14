import { setup, type Preview } from "@storybook/vue3-vite";
import { createMemoryHistory, createRouter } from "vue-router";

import "@/styles/main.scss";
import "./preview.scss";

const storybookRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: { template: "<div />" },
    },
    {
      path: "/breadcrumbs",
      component: { template: "<RouterView />" },
      children: [
        {
          path: "tenders",
          component: { template: "<RouterView />" },
          meta: { breadcrumb: "Тендери" },
          children: [
            {
              path: "transport",
              component: { template: "<RouterView />" },
              meta: { breadcrumb: "Транспорт" },
              children: [
                {
                  path: "vaz-21703",
                  component: { template: "<div />" },
                  meta: { breadcrumb: "Автомобіль ВАЗ 21703" },
                },
              ],
            },
          ],
        },
        {
          path: "modules",
          component: { template: "<div />" },
          meta: { name: "Публічні модулі" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: { template: "<div />" },
    },
  ],
});

void storybookRouter.push("/");

setup(app => {
  app.use(storybookRouter);
});

interface PrototypeParameters {
  caption?: string;
  note?: string;
}

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        order: [
          "Foundation",
          ["Typography", "Colors", "Spacing", "Grid"],
          "Components",
          [
            "PzText",
            "PzIcon",
            "PzImage",
            "PzTag",
            "PzStatus",
            "PzLink",
            "PzBreadcrumb",
            "PzNav",
            "PzTabs",
            "PzRouterLink",
            "PzGrid",
          ],
        ],
      },
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (story, context) => {
      const storyComponent = story();
      const prototype = (context.parameters.prototype ?? {}) as PrototypeParameters;

      return {
        components: { storyComponent },
        setup() {
          return {
            context,
            prototype,
          };
        },
        template: `
          <div class="sb-prototype">
            <div class="sb-prototype-chrome">
              <div class="sb-prototype-traffic" aria-hidden="true">
                <span class="sb-prototype-traffic-dot sb-prototype-traffic-dot-red"></span>
                <span class="sb-prototype-traffic-dot sb-prototype-traffic-dot-amber"></span>
                <span class="sb-prototype-traffic-dot sb-prototype-traffic-dot-green"></span>
              </div>

              <div class="sb-prototype-meta">
                <span class="sb-prototype-eyebrow">Figma prototype</span>
                <strong class="sb-prototype-title">{{ prototype.caption || context.title }}</strong>
                <span class="sb-prototype-path">{{ context.title }} / {{ context.name }}</span>
              </div>
            </div>

            <div class="sb-prototype-board">
              <aside class="sb-prototype-rail">
                <div class="sb-prototype-rail-block">
                  <span class="sb-prototype-label">Context</span>
                  <p class="sb-prototype-copy">
                    {{ prototype.note || "Storybook canvas styled as a design review frame for faster visual validation." }}
                  </p>
                </div>

                <div class="sb-prototype-rail-block">
                  <span class="sb-prototype-label">Surface</span>
                  <p class="sb-prototype-copy">Desktop review canvas with design-system chrome and neutral lighting.</p>
                </div>
              </aside>

              <section class="sb-prototype-surface">
                <story-component />
              </section>
            </div>
          </div>
        `,
      };
    },
  ],
};

export default preview;
