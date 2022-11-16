import { ComponentMeta, ComponentStory } from "@storybook/react";
import logoAnvil from "images/logoAnvil.png";
import logoHca from "images/logoHca.png";
import logoLungmap from "images/logoLungmap.png";
import React from "react";
import { Logo } from "./logo";

export default {
  argTypes: {
    logo: {
      alt: { control: "text" },
      height: { control: "number" },
      link: { control: "text" },
      src: { control: "text" },
      width: { control: "number" },
    },
  },
  component: Logo,
  title: "Components/Common/Image/Logo",
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const AnvilLogo = Template.bind({});
AnvilLogo.args = {
  logo: {
    alt: "NHGRI Analysis Visualization and Informatics Lab-space",
    height: 40,
    link: "/",
    src: logoAnvil,
  },
};

export const HCALogo = Template.bind({});
HCALogo.args = {
  logo: {
    alt: "HCA",
    height: 40,
    link: "/explore/projects",
    src: logoHca,
  },
};

export const LungMapLogo = Template.bind({});
LungMapLogo.args = {
  logo: {
    alt: "LungMap",
    height: 40,
    link: "/explore/projects",
    src: logoLungmap,
  },
};