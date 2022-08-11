import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Text } from "./Text";

export default {
  component: Text,
  title: "Components/Deprecated/Text",
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
