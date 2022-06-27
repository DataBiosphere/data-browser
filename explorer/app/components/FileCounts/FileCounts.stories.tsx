import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileCounts } from "./FileCounts";

export default {
  component: FileCounts,
  files: { control: "array" },
  title: "Components/FileCounts",
} as ComponentMeta<typeof FileCounts>;

const Template: ComponentStory<typeof FileCounts> = (args) => (
  <FileCounts {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  files: [
    {
      count: 1,
      name: "RData.gz",
    },
    {
      count: 1,
      name: "csv",
    },
    {
      count: 3,
      name: "h5ad",
    },
    {
      count: 1,
      name: "txt",
    },
  ],
};
