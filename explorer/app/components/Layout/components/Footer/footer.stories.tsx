import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SOCIAL } from "app/components/common/Socials/socials";
import logoHhs from "images/logoHhs.svg";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import logoLungmap from "images/logoLungmap.png";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
import React from "react";
import { Footer } from "./footer";

export default {
  argTypes: {
    footer: {
      feedbackForm: { control: "boolean" },
      logos: { control: "array" },
      navLinks: { control: "array" },
      socials: { control: "array" },
    },
  },
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Footer",
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const AnvilFooter = Template.bind({});
AnvilFooter.args = {
  footer: {
    logos: [
      {
        alt: "nhgri",
        height: 24,
        link: "https://www.genome.gov/",
        src: logoNhgri,
      },
      {
        alt: "nih",
        height: 24,
        link: "https://www.nih.gov/",
        src: logoNih,
      },
      {
        alt: "hhs",
        height: 32,
        link: "https://www.hhs.gov/",
        src: logoHhs,
      },
      {
        alt: "hhs",
        height: 32,
        link: "https://www.usa.gov/",
        src: logoUsagov,
      },
    ],
    navLinks: [
      {
        label: "Help",
        url: "https://anvilproject.org/help",
      },
      {
        label: "Privacy",
        url: "https://anvilproject.org/privacy",
      },
    ],
    socials: [
      {
        ...SOCIAL.DISCOURSE,
        url: "https://help.anvilproject.org/",
      },
      {
        ...SOCIAL.TWITTER,
        url: "https://twitter.com/useAnVIL",
      },
      {
        ...SOCIAL.YOUTUBE,
        url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
      },
      {
        ...SOCIAL.GITHUB,
        url: "https://github.com/anvilproject",
      },
    ],
  },
};

export const HCAFooter = Template.bind({});
HCAFooter.args = {
  footer: {
    feedbackForm: false, // TODO feedback form
    logos: [
      {
        alt: "Anvil",
        height: 38,
        link: "/explore/projects",
        src: logoHumanCellAtlas,
      },
    ],
    navLinks: [
      {
        label: "About",
        url: "https://data.humancellatlas.org/about",
      },
      {
        label: "Help",
        url: "https://data.humancellatlas.org/help",
      },
      {
        label: "Privacy",
        url: "https://data.humancellatlas.org/privacy",
      },
      {
        label: "Contact",
        url: "https://data.humancellatlas.org/contact",
      },
    ],
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

export const LungMapFooter = Template.bind({});
LungMapFooter.args = {
  footer: {
    logos: [
      {
        alt: "LungMap",
        height: 32,
        link: "/",
        src: logoLungmap,
      },
    ],
    navLinks: [
      {
        label: "Privacy",
        url: "https://data-browser.lungmap.net/lungmap-privacy",
      },
    ],
    socials: [
      {
        ...SOCIAL.TWITTER,
        url: "https://twitter.com/lungmapnet",
      },
    ],
  },
};
