// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { FilterLabel } from "./filterLabel";

export default {
  argTypes: {
    count: { control: "number" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  component: FilterLabel,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  title: "Filter/FilterLabel",
} as ComponentMeta<typeof FilterLabel>;

const Template: ComponentStory<typeof FilterLabel> = (args) => (
  <FilterLabel {...args} />
);

export const DefaultFilterLabel = Template.bind({});
DefaultFilterLabel.args = {
  count: 123,
  disabled: false,
  label: "Label",
};

export const FilterLabelGender = Template.bind({});
FilterLabelGender.args = {
  count: 3,
  disabled: false,
  label: "Gender",
};
