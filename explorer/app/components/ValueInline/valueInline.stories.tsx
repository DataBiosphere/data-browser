import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ValueInline } from "./valueInline";

export default {
  component: ValueInline,
  title: "Components/SectionContent/Content/KeyValuePairs",
} as ComponentMeta<typeof ValueInline>;

const Template: ComponentStory<typeof ValueInline> = (args) => (
  <ValueInline {...args} />
);

export const ValueInlineKeyValuePairs = Template.bind({});
ValueInlineKeyValuePairs.args = {
  label: "Samples",
  value: "610,561",
};
