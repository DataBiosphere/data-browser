// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { SocialLinks } from "./socialLinks";

export default {
  argTypes: {
    links: { control: "object" },
  },
  component: SocialLinks,
  title: "Components/SocialLinks",
} as ComponentMeta<typeof SocialLinks>;

const GITHUB_URL = "https://github.com";

const Template: ComponentStory<typeof SocialLinks> = (args) => (
  <SocialLinks {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  links: [
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
