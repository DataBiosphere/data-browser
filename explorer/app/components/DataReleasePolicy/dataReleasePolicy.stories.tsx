// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { DataReleasePolicy } from "./dataReleasePolicy";

export default {
  component: DataReleasePolicy,
  title: "ProjectOverview/01Core/DataReleasePolicy",
} as ComponentMeta<typeof DataReleasePolicy>;

const Template: ComponentStory<typeof DataReleasePolicy> = () => (
  <DataReleasePolicy />
);

export const Policy = Template.bind({});
