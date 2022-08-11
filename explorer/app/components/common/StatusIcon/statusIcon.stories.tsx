// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { SearchOffIcon } from "../CustomIcon/components/SearchOffIcon/searchOffIcon";
import { PRIORITY, StatusIcon } from "./statusIcon";

export default {
  argTypes: {
    StatusIcon: { control: { disable: true } },
    priority: { control: "select", options: Array.from(Object.keys(PRIORITY)) },
  },
  component: StatusIcon,
  title: "Components/Common/Alert/StatusIcon",
} as ComponentMeta<typeof StatusIcon>;

const Template: ComponentStory<typeof StatusIcon> = (args) => (
  <StatusIcon {...args} />
);

export const SearchOff = Template.bind({});
SearchOff.args = {
  StatusIcon: SearchOffIcon,
  priority: PRIORITY.LOW,
};
