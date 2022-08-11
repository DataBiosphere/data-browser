import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Contacts } from "./contacts";

export default {
  argTypes: {
    contacts: { control: "array" },
  },
  component: Contacts,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof Contacts>;

const Template: ComponentStory<typeof Contacts> = (args) => (
  <Contacts {...args} />
);

export const ProjectContacts = Template.bind({});
ProjectContacts.args = {
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
