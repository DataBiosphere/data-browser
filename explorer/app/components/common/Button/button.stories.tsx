// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { Button } from "./button";

// Styles
import { ButtonPrimary, ButtonSecondary } from "./button.styles";

export default {
  argTypes: {
    children: { control: "text" },
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/Button",
} as ComponentMeta<typeof Button>;

const PrimaryTemplate: ComponentStory<typeof Button> = (args) => (
  <ButtonPrimary {...args} />
);

const SecondaryTemplate: ComponentStory<typeof Button> = (args) => (
  <ButtonSecondary {...args} />
);

export const SecondaryButton = SecondaryTemplate.bind({});
SecondaryButton.args = {
  children: "Secondary Button",
};

export const PrimaryButton = PrimaryTemplate.bind({});
PrimaryButton.args = {
  children: "Primary Button",
};
