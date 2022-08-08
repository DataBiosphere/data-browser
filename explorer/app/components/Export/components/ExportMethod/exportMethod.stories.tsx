// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { ExportMethod } from "./exportMethod";

export default {
  argTypes: {
    buttonLabel: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    route: { control: "text" },
    title: { control: "text" },
  },
  component: ExportMethod,
  parameters: {
    layout: "centered",
  },
  title: "Export/ExportMethod",
} as ComponentMeta<typeof ExportMethod>;

const Template: ComponentStory<typeof ExportMethod> = (args) => (
  <ExportMethod {...args} />
);

export const DefaultExportMethod = Template.bind({});
DefaultExportMethod.args = {
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  disabled: false,
  route: "/request-curl-command",
  title: "Download Study Data and Metadata (Curl Command)",
};

export const ExportMethodDisabled = Template.bind({});
ExportMethodDisabled.args = {
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  disabled: true,
  route: "/request-curl-command",
  title: "Download Study Data and Metadata (Curl Command)",
};
