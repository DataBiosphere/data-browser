import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Stack } from "./Stack";

export default {
  title: "Components/Stack",
  component: Stack,
  children: { controle: "object" },
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
