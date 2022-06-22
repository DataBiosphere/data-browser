// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { ProjectTitle } from "./projectTitle";

export default {
  argTypes: {
    projectTitle: { control: "text" },
  },
  component: ProjectTitle,
  title: "Components/ProjectTitle",
} as ComponentMeta<typeof ProjectTitle>;

const Template: ComponentStory<typeof ProjectTitle> = (args) => (
  <ProjectTitle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  projectTitle:
    "A human single cell atlas of the substantia nigra reveals novel cell specific pathways associated with the genetic risk of Parkinson’s disease and neuropsychiatric disorders.",
};
