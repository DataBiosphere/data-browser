import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LabelValue } from "./LabelValue";

export default {
  title: "Components/LabelValue",
  component: LabelValue,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
  },
} as ComponentMeta<typeof LabelValue>;

const Template: ComponentStory<typeof LabelValue> = (args) => (
  <LabelValue {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Sample Type",
  value: "Specimens",
};
