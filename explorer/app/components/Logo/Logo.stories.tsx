import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from "./Logo";
import HcaLogo from "../../../images/hca-logo.png";
import AnvilLogo from "../../../images/anvil-logo.png";
import LungMapLogo from "../../../images/lungmap-logo.png";

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

export const Anvil = Template.bind({});
Anvil.args = {
  slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
  url: AnvilLogo,
  alt: "NHGRI Analysis Visualization and Informatics Lab-space",
};

export const HCA = Template.bind({});
HCA.args = {
  ...Anvil.args,
  alt: "HCA",
  url: HcaLogo,
  slogan: undefined,
};

export const LungMap = Template.bind({});
LungMap.args = {
  ...Anvil.args,
  alt: "LungMap",
  url: LungMapLogo,
  slogan: undefined,
};
