import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Header } from "./Header";
import HcaLogo from "../../../images/hca-logo.png";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    authenticationEnabled: { control: "boolean" },
    searchEnabled: { control: "boolean" },
    logo: { control: "object" },
    navAlignment: { control: "select", options: ["left", "center"] },
    navLinks: { control: "array" },
    socialLinks: { control: "array" },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  authenticationEnabled: true,
  searchEnabled: true,
  logo: {
    slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
    url: HcaLogo,
    alt: "NHGRI Analysis Visualization and Informatics Lab-space",
  },
  navAlignment: "center",
  navLinks: {
    links: [
      {
        label: "Google",
        url: "https://google.com",
      },
      {
        label: "Github",
        url: "https://github.com",
      },
    ],
  },
  socialLinks: {
    links: [
      {
        type: "github",
        url: "https://github.com/BruceRodrigues",
      },
    ],
  },
};
