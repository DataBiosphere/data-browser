import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ExportToTerraReady } from "./exportToTerraReady";

export default {
  argTypes: {
    terraUrl: { control: "text" },
  },
  component: ExportToTerraReady,
  title: "Components/Section/Export/ExportToTerra",
} as ComponentMeta<typeof ExportToTerraReady>;

const Template: ComponentStory<typeof ExportToTerraReady> = (args) => (
  <ExportToTerraReady {...args} />
);

export const ExportReady = Template.bind({});
ExportReady.args = {
  terraUrl: "/",
};
