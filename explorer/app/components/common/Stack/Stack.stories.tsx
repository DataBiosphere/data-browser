// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Stack } from "./Stack";

export default {
  argTypes: {
    children: { control: "object" },
    direction: {
      control: "select",
      options: ["column", "row"],
    },
    gap: { control: "number" },
    spacing: { control: "number" },
  },
  component: Stack,
  title: "Components/Stack",
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = (args) => <Stack {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <span>Stack 1</span>
      <span>Stack 2</span>
      <span>Stack 3</span>
      <span>Stack 4</span>
    </>
  ),
};
