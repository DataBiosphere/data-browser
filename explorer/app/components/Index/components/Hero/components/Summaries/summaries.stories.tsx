// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Summaries } from "./summaries";

export default {
  argTypes: {
    summaries: { control: "array" },
  },
  component: Summaries,
} as ComponentMeta<typeof Summaries>;

const Template: ComponentStory<typeof Summaries> = (args) => (
  <Summaries {...args} />
);

export const AnvilSummaries = Template.bind({});
AnvilSummaries.args = {
  summaries: [
    { count: "1", label: "Species" },
    { count: "1.1k", label: "Donors" },
    { count: "508.5k", label: "Files" },
  ],
};

export const HCASummaries = Template.bind({});
HCASummaries.args = {
  summaries: [
    { count: "8.2M", label: "Estimated Cells" },
    { count: "7.2k", label: "Specimens" },
    { count: "1.0k", label: "Donors" },
    { count: "115.2k", label: "Files" },
  ],
};

export const LungmapSummaries = Template.bind({});
LungmapSummaries.args = {
  summaries: [
    { count: "208.0k", label: "Estimated Cells" },
    { count: "44", label: "Specimens" },
    { count: "42", label: "Donors" },
    { count: "432", label: "Files" },
  ],
};
