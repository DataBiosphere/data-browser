import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ExportToTerra } from "./exportToTerra";

export default {
  component: ExportToTerra,
  title: "Components/Section/Export/ExportToTerra",
} as ComponentMeta<typeof ExportToTerra>;

const Template: ComponentStory<typeof ExportToTerra> = () => <ExportToTerra />;

export const NotStartedExportToTerra = Template.bind({});
NotStartedExportToTerra.args = {};
