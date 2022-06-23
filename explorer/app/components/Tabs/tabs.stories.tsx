import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./tabs";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    onTabChange: { action: "onTabChange" },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    {
      label: "First tab",
    },
    {
      label: "Second tab",
    },
    {
      label: "Third tab",
    },
  ],
  children: <div>Tab content</div>,
  selectedTab: 0,
};
