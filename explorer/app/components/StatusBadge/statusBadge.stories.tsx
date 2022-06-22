// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { STATUS, StatusBadge } from "./statusBadge";

export default {
  argTypes: {
    status: { control: "select", options: Array.from(Object.keys(STATUS)) },
  },
  component: StatusBadge,
  title: "Components/StatusBadge",
} as ComponentMeta<typeof StatusBadge>;

const Template: ComponentStory<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  status: STATUS.NEW,
};
