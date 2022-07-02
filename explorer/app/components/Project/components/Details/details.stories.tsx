// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { KeyValues } from "../../../common/KeyValuePairs/keyValuePairs";
import { Details } from "./details";

// Template constants
const details: KeyValues = new Map([
  ["Project Label", "HeterogeneityCD4TCells"],
  ["Species", "Homo sapiens"],
  ["Sample Type", "specimens"],
  ["Anatomical Entity", "eye"],
]);

export default {
  argTypes: {
    keyValuePairs: { control: "object" },
  },
  component: Details,
  title: "Project/Detail",
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = (args) => (
  <Details {...args} />
);

export const ProjectDetails = Template.bind({});
ProjectDetails.args = {
  keyValuePairs: details,
};
