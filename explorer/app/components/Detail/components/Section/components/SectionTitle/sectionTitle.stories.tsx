import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SectionTitle as Title } from "./sectionTitle";

export default {
  argTypes: {
    title: { control: "text" },
  },
  component: Title,
  title: "Components/SectionContent/Title",
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const SectionTitle = Template.bind({});
SectionTitle.args = {
  title: "Analysis Portals",
};
