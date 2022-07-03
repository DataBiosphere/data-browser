// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Socials } from "./socials";

export default {
  argTypes: {
    socials: { control: "object" },
  },
  component: Socials,
  title: "Components/SocialLinks",
} as ComponentMeta<typeof Socials>;

const GITHUB_URL = "https://github.com";

const Template: ComponentStory<typeof Socials> = (args) => (
  <Socials {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  socials: [
    {
      type: "twitter",
      url: GITHUB_URL,
    },
    {
      type: "github",
      url: GITHUB_URL,
    },
    {
      type: "youtube",
      url: GITHUB_URL,
    },
    {
      type: "discourse",
      url: GITHUB_URL,
    },
    {
      type: "slack",
      url: GITHUB_URL,
    },
  ],
};
