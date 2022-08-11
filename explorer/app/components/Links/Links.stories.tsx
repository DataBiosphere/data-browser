import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Links } from "./Links";

export default {
  argTypes: {
    enumerate: { control: "boolean" },
    links: { control: "array" },
    showCopyButton: { control: "boolean" },
  },
  component: Links,
  title: "Components/Deprecated/Links",
} as ComponentMeta<typeof Links>;

const Template: ComponentStory<typeof Links> = (args) => <Links {...args} />;

const FACEBOOK_URL = "https://www.facebook.com";
const GOOGLE_URL = "https://www.google.com";
const TWITTER_URL = "https://www.twitter.com";

export const NoNumeratedWithoutCopyButton = Template.bind({});
NoNumeratedWithoutCopyButton.args = {
  links: [
    { label: "Google", url: GOOGLE_URL },
    { label: "Facebook", url: FACEBOOK_URL },
    { label: "Twitter", url: TWITTER_URL },
  ],
};

export const NumeratedWithoutCopyButton = Template.bind({});
NumeratedWithoutCopyButton.args = {
  enumerate: true,
  links: [
    { label: "Google", url: GOOGLE_URL },
    { label: "Facebook", url: FACEBOOK_URL },
    { label: "Twitter", url: TWITTER_URL },
  ],
};

export const NumeratedWithCopyButton = Template.bind({});
NumeratedWithCopyButton.args = {
  enumerate: true,
  links: [
    { label: "Google", url: GOOGLE_URL },
    { label: "Facebook", url: FACEBOOK_URL },
    { label: "Twitter", url: TWITTER_URL },
  ],
  showCopyButton: true,
};
