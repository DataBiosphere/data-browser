import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ToggleButtonGroup } from "./toggleButtonGroup";

export default {
  argTypes: {
    toggleButtons: { table: { disable: true } },
  },
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/ButtonGroup",
} as ComponentMeta<typeof ToggleButtonGroup>;

const PrimaryTemplate: ComponentStory<typeof ToggleButtonGroup> = (args) => (
  <ToggleButtonGroup {...args} />
);

export const PrimaryToggleButtonGroup = PrimaryTemplate.bind({});
PrimaryToggleButtonGroup.args = {
  toggleButtons: [
    {
      label: "Exact Match (243)",
      onToggle: (): void => {
        // onToggle function
      },
      value: "exact-match",
    },
    {
      label: "Related (33)",
      onToggle: (): void => {
        // onToggle function
      },
      value: "related-match",
    },
  ],
};
