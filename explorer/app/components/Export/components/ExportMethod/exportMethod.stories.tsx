import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
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
  title: "Components/Section/Export/ExportMethod",
} as ComponentMeta<typeof ExportMethod>;

const Template: ComponentStory<typeof ExportMethod> = (args) => (
  <ExportMethod {...args} />
);

export const RequestCurlCommandExportMethod = Template.bind({});
RequestCurlCommandExportMethod.args = {
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  disabled: false,
  route: "/request-curl-command",
  title: "Download Study Data and Metadata (Curl Command)",
};
