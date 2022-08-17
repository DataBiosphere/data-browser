import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ExportToTerra } from "./exportToTerra";

export default {
  argTypes: {
    params: { control: { disable: true } },
    url: { control: "text" },
  },
  component: ExportToTerra,
  title: "Components/Section/Export/ExportToTerra",
} as ComponentMeta<typeof ExportToTerra>;

const Template: ComponentStory<typeof ExportToTerra> = (args) => (
  <ExportToTerra {...args} />
);

export const NotStartedExportToTerra = Template.bind({});
NotStartedExportToTerra.args = {
  params: new URLSearchParams({
    format: "terra.pfb",
  }),
  url: "https://service.dev.singlecell.gi.ucsc.edu/fetch/manifest/files",
};
