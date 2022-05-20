import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from "./Logo";

export default {
  title: "Components/Logo",
  component: Logo,
  argTypes: {
    slogan: { control: "text" },
    url: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const WithSlogan = Template.bind({});
WithSlogan.args = {
  slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
  url: "https://www.webhostingsecretrevealed.net/wp-content/uploads/logo-nightwatch-300x300.jpg",
  width: 30,
  height: 30,
  alt: "NHGRI Analysis Visualization and Informatics Lab-space",
};

export const WithoutSlogan = Template.bind({});
WithoutSlogan.args = {
  ...WithSlogan.args,
  slogan: undefined,
};
