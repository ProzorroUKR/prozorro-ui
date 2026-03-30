import type { Meta, StoryObj } from "@storybook/vue3";

import PzButton from "./Button.vue";
import type { ButtonVariant } from "./types";

const meta = {
  title: "Components/Button",
  component: PzButton,
  tags: ["autodocs"],
  args: {
    label: "Button",
    variant: "primary",
    disabled: false,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Visible label rendered inside the button.",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"] satisfies ButtonVariant[],
      description: "Visual style variant.",
    },
    disabled: {
      control: "boolean",
      description: "Disables click interactions.",
    },
    onClick: {
      action: "click",
      description: "Emitted when the button is pressed.",
    },
  },
} satisfies Meta<typeof PzButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Secondary action",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    label: "Delete item",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled action",
  },
};
