// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Policy } from "../../../DataReleasePolicy/dataReleasePolicy.stories";
import { SectionContent } from "./sectionContent";

export default {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
      gap: { control: "number" },
    },
  },
  component: SectionContent,
  title: "ProjectOverview/02BuildingBlocks/SectionContent",
} as ComponentMeta<typeof SectionContent>;

const Template: ComponentStory<typeof SectionContent> = (args) => (
  <SectionContent {...args}>{args.children}</SectionContent>
);

export const DataReleasePolicy = Template.bind({});
DataReleasePolicy.args = {
  children: <Policy />,
  gap: 0,
};
