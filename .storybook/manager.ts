import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import "./titleAddon";

addons.setConfig({
  panelPosition: "right",
  selectedPanel: "addon-controls",
  theme: create({
    base: "light",
    brandTitle: "Prozorro UI",
    brandImage: "/prozorro_logo.png",
    brandTarget: "_self",
  }),
});

addons.register("prozorro-ui/default-layout", api => {
  api.setOptions({
    panelPosition: "right",
    selectedPanel: "addon-controls",
  });
});
