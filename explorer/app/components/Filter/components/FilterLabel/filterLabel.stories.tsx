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
      <div style={{ width: 312 }}>
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

export const GenderLabel = Template.bind({});
GenderLabel.args = {
  count: 3,
  disabled: false,
  label: "Gender",
};
