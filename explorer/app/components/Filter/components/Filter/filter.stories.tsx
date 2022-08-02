// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { Filter } from "./filter";
import { GenderLabel } from "../FilterLabel/filterLabel.stories";

export default {
  argTypes: {
    Target: { control: { disable: true } },
    content: { control: { disable: true } },
    tags: { control: { disable: true } },
  },
  component: Filter,
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
  title: "Filter/Filter",
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const GenderFilter = Template.bind({});
GenderFilter.args = {
  Target: (props): JSX.Element => {
    return (
      <GenderLabel count={3} disabled={false} label={"Gender"} {...props} />
    );
  },
  content: <div style={{ padding: 8, width: 312 }}>Basic Filter Menu</div>, // TODO use FilterMenu storybook #283 https://github.com/clevercanary/data-browser/issues/283
};
