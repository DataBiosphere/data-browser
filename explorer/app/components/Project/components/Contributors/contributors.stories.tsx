import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Contributors } from "./contributors";

export default {
  component: Contributors,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof Contributors>;

const Template: ComponentStory<typeof Contributors> = (args) => (
  <Contributors {...args} />
);

export const ProjectContributors = Template.bind({});
ProjectContributors.args = {
  contributors: [
    {
      citation: 1,
      name: "Rose R Reginold",
      role: undefined,
    },
    {
      citation: 1,
      name: "Frank D Dirk",
      role: "Project Coordinator",
    },
    {
      citation: 2,
      name: "Marcelo Freire",
      role: "Principal Investigator",
    },
    {
      citation: 3,
      name: "Nathan Lawlor",
      role: "Computational Scientist",
    },
  ],
};
