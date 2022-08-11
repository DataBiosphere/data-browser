import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterTag } from "./filterTag";

export default {
  argTypes: {
    label: { control: "text" },
    superseded: { control: "boolean" },
  },
  component: FilterTag,
  title: "Components/Filter/FilterTag",
} as ComponentMeta<typeof FilterTag>;

const Template: ComponentStory<typeof FilterTag> = (args) => (
  <FilterTag {...args} />
);

export const GenderTag = Template.bind({});
GenderTag.args = {
  label: "Male",
  superseded: false,
};

export const GenderTagSuperseded = Template.bind({});
GenderTagSuperseded.args = {
  label: "Male",
  superseded: true,
};
