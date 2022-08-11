import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckboxMenu as Menu } from "./checkboxMenu";

export default {
  argTypes: {
    label: { control: "text" },
    onItemSelectionChange: { action: "onItemSelectionChange" },
    options: { control: "array" },
    selected: { control: "array" },
  },
  component: Menu,
  title: "Components/Common/Menu/CheckboxMenu",
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const CheckboxMenu = Template.bind({});
CheckboxMenu.args = {
  label: "Options",
  options: [
    { id: "item_1", label: "Item 1" },
    { id: "item_2", label: "Item 2" },
  ],
  selected: [],
};

export const CheckboxMenuWithSelectedItems = Template.bind({});
CheckboxMenuWithSelectedItems.args = {
  label: "Options",
  options: [
    { id: "item_1", label: "Item 1" },
    { id: "item_2", label: "Item 2" },
  ],
  selected: ["item_1"],
};

export const CheckboxMenuWithReadOnlyItems = Template.bind({});
CheckboxMenuWithReadOnlyItems.args = {
  label: "Options",
  options: [
    { id: "item_1", label: "Item 1" },
    { id: "item_2", label: "Item 2" },
    { id: "item_3", label: "Item 3" },
  ],
  readOnly: ["item_1", "item_2"],
  selected: ["item_1"],
};
