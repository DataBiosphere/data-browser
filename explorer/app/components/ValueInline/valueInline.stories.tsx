import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ValueInline } from "./valueInline";

export default {
  component: ValueInline,
  title: "Components/ValueInline",
} as ComponentMeta<typeof ValueInline>;

const Template: ComponentStory<typeof ValueInline> = (args) => (
  <ValueInline {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Samples",
  value: "610,561",
};
