import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./header";
import HcaLogo from "../../../images/hca-logo.png";
import AnvilLogo from "../../../images/anvil-logo.png";
import LungMapLogo from "../../../images/lungmap-logo.png";
import { ELEMENT_ALIGNMENT } from "../../common/entities";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    authenticationEnabled: { control: "boolean" },
    searchEnabled: { control: "boolean" },
    logo: { control: "object" },
    navAlignment: {
      control: "select",
      options: [ELEMENT_ALIGNMENT.LEFT, ELEMENT_ALIGNMENT.CENTER],
    },
    navLinks: { control: "array" },
    slogan: { control: "text" },
    socialLinks: { control: "array" },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Anvil = Template.bind({});
Anvil.args = {
  authenticationEnabled: false,
  searchEnabled: true,
  logo: {
    alt: "NHGRI Analysis Visualization and Informatics Lab-space",
    height: 40,
    link: "/",
    src: AnvilLogo,
  },
  navAlignment: ELEMENT_ALIGNMENT.CENTER,
  navLinks: {
    links: [
      {
        label: "Overview",
        url: "https://anvilproject.org/overview",
      },
      {
        label: "Learn",
        url: "https://anvilproject.org/learn",
      },
      {
        label: "Datasets",
        url: "https://anvilproject.org/data",
      },
      {
        label: "News",
        url: "https://anvilproject.org/news",
      },
      {
        label: "Events",
        url: "https://anvilproject.org/events",
      },
      {
        label: "Team",
        url: "https://anvilproject.org/team",
      },
      {
        label: "FAQ",
        url: "https://anvilproject.org/faq",
      },
      {
        label: "Help",
        url: "https://anvilproject.org/help",
      },
    ],
  },
  slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
  socialLinks: {
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/useAnVIL",
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
      },
      {
        type: "discourse",
        url: "https://help.anvilproject.org/",
      },
      {
        type: "github",
        url: "https://github.com/anvilproject",
      },
    ],
  },
};

export const HCA = Template.bind({});
HCA.args = {
  authenticationEnabled: true,
  searchEnabled: true,
  logo: {
    alt: "Anvil",
    height: 40,
    link: "/explore/projects",
    src: HcaLogo,
  },
  navAlignment: ELEMENT_ALIGNMENT.LEFT,
  navLinks: {
    links: [
      {
        label: "Explore",
        url: "https://data.humancellatlas.org/explore/projects",
      },
      {
        label: "Guides",
        url: "https://data.humancellatlas.org/guides",
      },
      {
        label: "Metadata",
        url: "https://data.humancellatlas.org/metadata",
      },
      {
        label: "Pipelines",
        url: "https://data.humancellatlas.org/pipelines",
      },
      {
        label: "Analysis Tools",
        url: "https://data.humancellatlas.org/analyze",
      },
      {
        label: "Contribute",
        url: "https://data.humancellatlas.org/contribute",
      },
      {
        label: "APIs",
        url: "https://data.humancellatlas.org/apis",
      },
      {
        label: "Updates",
        url: "https://data.humancellatlas.org/dcp-updates",
      },
    ],
  },
  slogan: undefined,
  socialLinks: {
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/humancellatlas",
      },
      {
        type: "github",
        url: "https://github.com/HumanCellAtlas",
      },
      {
        type: "slack",
        url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
      },
    ],
  },
};
export const LungMap = Template.bind({});
LungMap.args = {
  authenticationEnabled: false,
  searchEnabled: true,
  logo: {
    alt: "LungMap",
    height: 40,
    link: "/",
    src: LungMapLogo,
  },
  navAlignment: ELEMENT_ALIGNMENT.LEFT,
  navLinks: {
    links: [
      {
        label: "Explore",
        url: "https://data-browser.lungmap.net/explore/projects",
      },
      {
        label: "Metadata",
        url: "https://data-browser.lungmap.net/metadata",
      },
      {
        label: "APIs",
        url: "https://data-browser.lungmap.net/apis",
      },
    ],
  },
  slogan: undefined,
  socialLinks: {
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/lungmapnet",
      },
    ],
  },
};
