// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Citation } from "./citation";

export default {
  argTypes: {
    citationPath: { control: "text" },
  },
  component: Citation,
  title: "Project/Detail",
} as ComponentMeta<typeof Citation>;

const Template: ComponentStory<typeof Citation> = (args) => (
  <Citation {...args} />
);

export const ProjectCitation = Template.bind({});
ProjectCitation.args = {
  citationPath: "explore/projects/60ea42e1-af49-42f5-8164-d641fdb696bc",
};
