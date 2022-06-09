import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileCounts } from "./FileCounts";

export default {
  title: "Components/FileCounts",
  component: FileCounts,
  files: { control: "array" },
} as ComponentMeta<typeof FileCounts>;

const Template: ComponentStory<typeof FileCounts> = (args) => (
  <FileCounts {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  files: [
    {
      name: "RData.gz",
      count: 1,
    },
    {
      name: "csv",
      count: 1,
    },
    {
      name: "h5ad",
      count: 3,
    },
    {
      name: "txt",
      count: 1,
    },
  ],
};
