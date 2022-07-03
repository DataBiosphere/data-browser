import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavLinks } from "./navLinks";

export default {
  argTypes: {
    links: { control: "object" },
  },
  component: NavLinks,
  title: "Components/NavLinks",
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
