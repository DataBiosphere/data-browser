import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from "./Logo";
import HcaLogo from "../../../images/hca-logo.png";

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
  url: HcaLogo,
  alt: "NHGRI Analysis Visualization and Informatics Lab-space",
};

export const WithoutSlogan = Template.bind({});
WithoutSlogan.args = {
  ...WithSlogan.args,
  slogan: undefined,
};
