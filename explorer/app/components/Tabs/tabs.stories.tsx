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
  children: <div>Tab content</div>,
  selectedTab: 0,
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
};
