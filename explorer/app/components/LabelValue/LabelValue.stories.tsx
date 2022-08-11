import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { LabelValue } from "./LabelValue";

export default {
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
  },
  component: LabelValue,
  title: "Components/SectionContent/Content/KeyValuePairs",
} as ComponentMeta<typeof LabelValue>;

const Template: ComponentStory<typeof LabelValue> = (args) => (
  <LabelValue {...args} />
);

export const LabelValueKeyValuePairs = Template.bind({});
LabelValueKeyValuePairs.args = {
  label: "Sample Type",
  value: "Specimens",
};
