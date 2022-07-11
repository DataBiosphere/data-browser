import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckboxMenu } from "./checkboxMenu";

export default {
  argTypes: {
    label: { control: "text" },
    onItemSelectionChange: { action: "onItemSelectionChange" },
    options: { control: "array" },
    selected: { control: "array" },
  },
  component: CheckboxMenu,
  title: "Components/CheckboxMenu",
} as ComponentMeta<typeof CheckboxMenu>;

const Template: ComponentStory<typeof CheckboxMenu> = (args) => (
  <CheckboxMenu {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Options",
  options: [
    { id: "item_1", label: "Item 1" },
    { id: "item_2", label: "Item 2" },
  ],
  selected: [],
};

export const WithSelectedItems = Template.bind({});
WithSelectedItems.args = {
  label: "Options",
  options: [
    { id: "item_1", label: "Item 1" },
    { id: "item_2", label: "Item 2" },
  ],
  selected: ["item_1"],
};

export const WithReadOnlyItems = Template.bind({});
WithReadOnlyItems.args = {
  label: "Options",
  options: [
    { id: "item_1", label: "Item 1" },
    { id: "item_2", label: "Item 2" },
    { id: "item_3", label: "Item 3" },
  ],
  readOnly: ["item_1", "item_2"],
  selected: ["item_1"],
};
