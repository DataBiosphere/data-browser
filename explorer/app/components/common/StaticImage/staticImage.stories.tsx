import { ComponentMeta, ComponentStory } from "@storybook/react";
import logoHca from "images/logoHca.png";
import React from "react";
import { StaticImage } from "./staticImage";

export default {
  argTypes: {
    alt: { control: "text" },
    height: { control: "number" },
    src: { control: "text" },
    width: { control: "number" },
  },
  component: StaticImage,
  title: "Components/Common/Image/StaticImage",
} as ComponentMeta<typeof StaticImage>;

const Template: ComponentStory<typeof StaticImage> = (args) => (
  <StaticImage {...args} />
);

export const HCALogo = Template.bind({});
HCALogo.args = {
  alt: "NHGRI Analysis Visualization and Informatics Lab-space",
  height: 40,
  src: logoHca,
};
