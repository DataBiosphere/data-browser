import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Contacts } from "./Contacts";

export default {
  title: "Components/Contacts",
  component: Contacts,
  argTypes: {
    contacts: { control: "array" },
  },
} as ComponentMeta<typeof Contacts>;

const Template: ComponentStory<typeof Contacts> = (args) => (
  <Contacts {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  contacts: [
    {
      name: "Gervaise H Henry",
      email: "gervaise.henry@utsouthwestern.edu",
      institution: "UT Southwestern",
    },
  ],
};
