// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { ProjectHeader as Header } from "./projectHeader";
import { ProjectTitle } from "../../../ProjectTitle/projectTitle.stories";
import { STATUS } from "../../../StatusBadge/statusBadge";
import { ProjectStatus } from "../../../StatusBadge/statusBadge.stories";

export default {
  argTypes: {
    mainColumn: { control: "object" },
    sideColumn: { control: "object" },
    top: { control: "object" },
  },
  component: Header,
  title: "Project",
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Header {...args}>{args.children}</Header>
);

export const ProjectHeader = Template.bind({});
ProjectHeader.args = {
  children: (
    <>
      <div>
        <ProjectTitle projectTitle={ProjectTitle.args?.projectTitle || ""} />
      </div>
      <div>
        {/* TODO(cc) remove temporary <div> around ProjectStatus when projectHeader is refactored */}
        <ProjectStatus status={ProjectStatus.args?.status || STATUS.UPDATED} />
      </div>
    </>
  ),
};
