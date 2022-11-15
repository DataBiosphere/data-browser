import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "./button";
import { ButtonPrimary, ButtonSecondary } from "./button.styles";
import { NavLinkDropdownButton } from "./components/NavLinkDropdownButton/navLinkDropdownButton";

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

const NavDropdownButtonTemplate: ComponentStory<
  typeof NavLinkDropdownButton
> = (args) => <NavLinkDropdownButton {...args} />;

export const SecondaryButton = SecondaryTemplate.bind({});
SecondaryButton.args = {
  children: "Secondary Button",
};

export const PrimaryButton = PrimaryTemplate.bind({});
PrimaryButton.args = {
  children: "Primary Button",
};

export const NavDropdownButton = NavDropdownButtonTemplate.bind({});
NavDropdownButton.args = {
  children: "More",
};
