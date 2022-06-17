// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { SectionTitle } from "./sectionTitle";

export default {
  argTypes: {
    title: { control: "text" },
  },
  component: SectionTitle,
  title: "Components/SectionTitle",
} as ComponentMeta<typeof SectionTitle>;

const Template: ComponentStory<typeof SectionTitle> = (args) => (
  <SectionTitle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Analysis Portals",
};
