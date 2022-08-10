// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import {
  DefaultPrimaryButton,
  DefaultSecondaryButton,
} from "../common/Button/button.stories";
import { NoResults } from "./noResults";

export default {
  argTypes: {
    actions: { control: { disabled: true } },
    description: { control: "text" },
    title: { control: "text" },
  },
  component: NoResults,
  title: "Components/Common/NoResults",
} as ComponentMeta<typeof NoResults>;

const Template: ComponentStory<typeof NoResults> = (args) => (
  <NoResults {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actions: (
    <>
      <DefaultPrimaryButton>Remove last filter</DefaultPrimaryButton>
      <DefaultSecondaryButton>Clear all filters</DefaultSecondaryButton>
    </>
  ),
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  title: "No Results found",
};
