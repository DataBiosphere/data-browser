import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ValueBlock } from "./ValueBlock";

export default {
  argTypes: {
    items: { control: "array" },
  },
  component: ValueBlock,
  title: "Components/SectionContent/Content/KeyValuePairs",
} as ComponentMeta<typeof ValueBlock>;

const Template: ComponentStory<typeof ValueBlock> = (args) => (
  <ValueBlock {...args} />
);

export const ValueBlockKeyValuePairs = Template.bind({});
ValueBlockKeyValuePairs.args = {
  items: [
    {
      label: "Cohorts",
      value: "2",
    },
    {
      label: "Samples",
      value: "5,445",
    },
    {
      label: "Participants",
      value: "5,445",
    },
    {
      label: "Size",
      value: "107.54 TB",
    },
  ],
};
