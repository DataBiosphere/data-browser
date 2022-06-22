// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { DataReleasePolicy } from "./components/SectionContent/sectionContent.stories";
import { Section } from "./section";

export default {
  argTypes: {
    collapsable: { control: "boolean" },
    children: {
      table: {
        disable: true,
      },
    },
  },
  component: Section,
  title: "ProjectOverview/03Overview/Section",
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args}>{args.children}</Section>
);

export const SDataReleasePolicy = Template.bind({});
SDataReleasePolicy.args = {
  children: (
    <DataReleasePolicy {...DataReleasePolicy.args}>
      {DataReleasePolicy.args?.children}
    </DataReleasePolicy>
  ),
  collapsable: false,
  title: "Data Release Policy",
};
