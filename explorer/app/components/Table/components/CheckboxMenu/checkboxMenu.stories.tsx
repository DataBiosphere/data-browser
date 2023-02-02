import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CheckboxMenu as Menu } from "./checkboxMenu";

export default {
  argTypes: {
    label: { control: "text" },
    onReset: { control: { disabled: true } },
    options: { control: "array" },
  },
  component: Menu,
  title: "Components/Common/Menu/CheckboxMenu",
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

const onChange = (): void => {
  // onChange function
};

const onReset = (): void => {
  // onReset function
};

export const CheckboxMenu = Template.bind({});
CheckboxMenu.args = {
  label: "Options",
  onReset: onReset,
  options: [
    {
      checked: true,
      disabled: true,
      label: "Item 1",
      onChange,
      value: "item_1",
    },
    {
      checked: false,
      disabled: false,
      label: "Item 2",
      onChange,
      value: "item_2",
    },
    {
      checked: true,
      disabled: false,
      label: "Item 3",
      onChange,
      value: "item_3",
    },
  ],
};
