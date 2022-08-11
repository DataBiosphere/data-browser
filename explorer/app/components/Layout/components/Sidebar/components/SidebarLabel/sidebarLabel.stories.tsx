import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SidebarLabel } from "./sidebarLabel";

export default {
  argTypes: {
    label: { control: "text" },
  },
  component: SidebarLabel,
  title: "Components/Label",
} as ComponentMeta<typeof SidebarLabel>;

const Template: ComponentStory<typeof SidebarLabel> = (args) => (
  <SidebarLabel {...args} />
);

export const SidebarFilterLabel = Template.bind({});
SidebarFilterLabel.args = {
  label: "Filter",
};
