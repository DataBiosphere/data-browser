import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ValueBlock } from "./ValueBlock";

export default {
  title: "Components/ValueBlock",
  component: ValueBlock,
  argTypes: {
    items: { control: "array" },
  },
} as ComponentMeta<typeof ValueBlock>;

const Template: ComponentStory<typeof ValueBlock> = (args) => (
  <ValueBlock {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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
