// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { ProjectTitle as Title } from "./projectTitle";

export default {
  argTypes: {
    projectTitle: { control: "text" },
  },
  component: Title,
  title: "Project/Top",
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const ProjectTitle = Template.bind({});
ProjectTitle.args = {
  projectTitle:
    "A human single cell atlas of the substantia nigra reveals novel cell specific pathways associated with the genetic risk of Parkinson’s disease and neuropsychiatric disorders.",
};
