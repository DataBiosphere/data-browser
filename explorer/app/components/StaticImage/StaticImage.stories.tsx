import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StaticImage } from "./StaticImage";
import HcaLogo from "../../../images/hca-logo.png";

export default {
  title: "Components/StaticImage",
  component: StaticImage,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
  },
} as ComponentMeta<typeof StaticImage>;

const Template: ComponentStory<typeof StaticImage> = (args) => (
  <StaticImage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  src: HcaLogo,
  alt: "NHGRI Analysis Visualization and Informatics Lab-space",
};
