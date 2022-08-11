import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { STATUS, StatusBadge as Badge } from "./statusBadge";

export default {
  argTypes: {
    status: { control: "select", options: Array.from(Object.keys(STATUS)) },
  },
  component: Badge,
  title: "Components/Common/Alert",
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const StatusBadge = Template.bind({});
StatusBadge.args = {
  status: STATUS.NEW,
};
