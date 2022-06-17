// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Contacts } from "./contacts";

export default {
  argTypes: {
    contacts: { control: "array" },
  },
  component: Contacts,
  title: "Components/Contacts",
} as ComponentMeta<typeof Contacts>;

const Template: ComponentStory<typeof Contacts> = (args) => (
  <Contacts {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  contacts: [
    {
      email: "gervaise.henry@utsouthwestern.edu",
      institution: "UT Southwestern",
      name: "Gervaise H Henry",
    },
    {
      email: "poppy@utsouthwestern.edu",
      institution: "UT Southwestern",
      name: "Poppy Rose Roberts",
    },
  ],
};
