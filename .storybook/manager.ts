import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import "./titleAddon";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Prozorro UI",
    brandImage: "/prozorro_logo.png",
    brandTarget: "_self",
  }),
});
