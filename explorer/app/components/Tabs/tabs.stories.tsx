import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./tabs";

export default {
  argTypes: {
    onTabChange: { action: "onTabChange" },
  },
  component: Tabs,
  title: "Components/Tabs",
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  selectedTab: 0,
  tabs: ["First tab", "Second tab", "Third tab"],
};
