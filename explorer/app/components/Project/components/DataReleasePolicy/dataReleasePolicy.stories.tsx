// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { DataReleasePolicy } from "./dataReleasePolicy";

export default {
  component: DataReleasePolicy,
  title: "Project/Detail",
} as ComponentMeta<typeof DataReleasePolicy>;

const Template: ComponentStory<typeof DataReleasePolicy> = () => (
  <DataReleasePolicy />
);

export const ProjectDataReleasePolicy = Template.bind({});
