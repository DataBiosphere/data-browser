import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SOCIAL } from "app/components/common/Socials/socials";
import logoAnvil from "images/logoAnvil.png";
import logoHca from "images/logoHca.png";
import logoLungmap from "images/logoLungmap.png";
import React from "react";
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";
import { Header } from "./header";

export default {
  argTypes: {
    header: {
      authenticationEnabled: { control: "boolean" },
      logo: { control: "object" },
      navAlignment: {
        control: "select",
        options: [ELEMENT_ALIGNMENT.LEFT, ELEMENT_ALIGNMENT.CENTER],
      },
      navLinks: { control: "array" },
      searchEnabled: { control: "boolean" },
      slogan: { control: "text" },
      socials: { control: "array" },
    },
  },
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Header",
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const AnvilHeader = Template.bind({});
AnvilHeader.args = {
  header: {
    authenticationEnabled: false,
    logo: {
      alt: "NHGRI Analysis Visualization and Informatics Lab-space",
      height: 40,
      link: "/",
      src: logoAnvil,
    },
    navAlignment: ELEMENT_ALIGNMENT.CENTER,
    navLinks: [
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
        label: "More",
        menuItems: [
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
        url: "",
      },
    ],
    searchEnabled: true,
    slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
    socials: [
      {
        ...SOCIAL.TWITTER,
        url: "https://twitter.com/useAnVIL",
      },
      {
        ...SOCIAL.YOUTUBE,
        url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
      },
      {
        ...SOCIAL.DISCOURSE,
        url: "https://help.anvilproject.org/",
      },
      {
        ...SOCIAL.GITHUB,
        url: "https://github.com/anvilproject",
      },
    ],
  },
};

export const HCAHeader = Template.bind({});
HCAHeader.args = {
  header: {
    authenticationEnabled: true,
    logo: {
      alt: "Anvil",
      height: 32,
      link: "/explore/projects",
      src: logoHca,
    },
    navAlignment: ELEMENT_ALIGNMENT.LEFT,
    navLinks: [
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
    searchEnabled: true,
    slogan: undefined,
    socials: [
      {
        ...SOCIAL.TWITTER,
        url: "https://twitter.com/humancellatlas",
      },
      {
        ...SOCIAL.GITHUB,
        url: "https://github.com/HumanCellAtlas",
      },
      {
        ...SOCIAL.SLACK,
        url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
      },
    ],
  },
};

export const LungMapHeader = Template.bind({});
LungMapHeader.args = {
  header: {
    authenticationEnabled: false,
    logo: {
      alt: "LungMap",
      height: 32,
      link: "/",
      src: logoLungmap,
    },
    navAlignment: ELEMENT_ALIGNMENT.LEFT,
    navLinks: [
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
    searchEnabled: true,
    slogan: undefined,
    socials: [
      {
        ...SOCIAL.TWITTER,
        url: "https://twitter.com/lungmapnet",
      },
    ],
  },
};
