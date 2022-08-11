import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileCounts } from "./FileCounts";

export default {
  component: FileCounts,
  files: { control: "array" },
  title: "Components/SectionContent/Content/KeyValuePairs",
} as ComponentMeta<typeof FileCounts>;

const Template: ComponentStory<typeof FileCounts> = (args) => (
  <FileCounts {...args} />
);

export const FileCountsKeyValuePairs = Template.bind({});
FileCountsKeyValuePairs.args = {
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
