import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Links } from "./Links";

export default {
  title: "Components/Links",
  component: Links,
  argTypes: {
    links: { control: "array" },
    showCopyButton: { control: "boolean" },
    enumerate: { control: "boolean" },
  },
} as ComponentMeta<typeof Links>;

const Template: ComponentStory<typeof Links> = (args) => <Links {...args} />;

export const NoNumeratedWithoutCopyButton = Template.bind({});
NoNumeratedWithoutCopyButton.args = {
  links: [
    { url: "https://www.google.com", label: "Google" },
    { url: "https://www.facebook.com", label: "Facebook" },
    { url: "https://www.twitter.com", label: "Twitter" },
  ],
};

export const NumeratedWithoutCopyButton = Template.bind({});
NumeratedWithoutCopyButton.args = {
  enumerate: true,
  links: [
    { url: "https://www.google.com", label: "Google" },
    { url: "https://www.facebook.com", label: "Facebook" },
    { url: "https://www.twitter.com", label: "Twitter" },
  ],
};

export const NumeratedWithCopyButton = Template.bind({});
NumeratedWithCopyButton.args = {
  showCopyButton: true,
  enumerate: true,
  links: [
    { url: "https://www.google.com", label: "Google" },
    { url: "https://www.facebook.com", label: "Facebook" },
    { url: "https://www.twitter.com", label: "Twitter" },
  ],
};
