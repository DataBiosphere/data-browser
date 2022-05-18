import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavLinks } from "./NavLinks";

export default {
  title: "Components/NavLinks",
  component: NavLinks,
  argTypes: {
    links: { control: "object" },
  },
} as ComponentMeta<typeof NavLinks>;

const Template: ComponentStory<typeof NavLinks> = (args) => (
  <NavLinks {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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
};
