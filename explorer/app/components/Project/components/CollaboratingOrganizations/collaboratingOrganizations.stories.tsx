// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { CollaboratingOrganizations } from "./collaboratingOrganizations";

export default {
  argTypes: {
    collaboratingOrganizations: { control: "array" },
  },
  component: CollaboratingOrganizations,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof CollaboratingOrganizations>;

const Template: ComponentStory<typeof CollaboratingOrganizations> = (args) => (
  <CollaboratingOrganizations {...args} />
);

export const ProjectCollaboratingOrganizations = Template.bind({});
ProjectCollaboratingOrganizations.args = {
  collaboratingOrganizations: [
    {
      citation: 1,
      name: "The Jackson Laboratory",
    },
    {
      citation: 2,
      name: "The New York Genome Center",
    },
    {
      citation: 3,
      name: "Weill Cornell Medicine",
    },
  ],
};
