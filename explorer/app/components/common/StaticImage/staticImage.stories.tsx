import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StaticImage } from "./staticImage";
import HcaLogo from "../../../../images/hca-logo.png";

export default {
  title: "Components/StaticImage",
  component: StaticImage,
  argTypes: {
    alt: { control: "text" },
    height: { control: "number" },
    src: { control: "text" },
    width: { control: "number" },
  },
} as ComponentMeta<typeof StaticImage>;

const Template: ComponentStory<typeof StaticImage> = (args) => (
  <StaticImage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  alt: "NHGRI Analysis Visualization and Informatics Lab-space",
  height: 40,
  src: HcaLogo,
};
