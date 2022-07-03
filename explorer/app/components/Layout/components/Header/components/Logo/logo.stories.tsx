// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Logo } from "./logo";

// Images
import logoAnvil from "images/logoAnvil.png";
import logoHca from "images/logoHca.png";
import logoLungmap from "images/logoLungmap.png";

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
  title: "Components/Logo",
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Anvil = Template.bind({});
Anvil.args = {
  logo: {
    alt: "NHGRI Analysis Visualization and Informatics Lab-space",
    height: 40,
    link: "/",
    src: logoAnvil,
  },
};

export const HCA = Template.bind({});
HCA.args = {
  logo: {
    alt: "HCA",
    height: 40,
    link: "/explore/projects",
    src: logoHca,
  },
};

export const LungMap = Template.bind({});
LungMap.args = {
  logo: {
    alt: "LungMap",
    height: 40,
    link: "/explore/projects",
    src: logoLungmap,
  },
};
