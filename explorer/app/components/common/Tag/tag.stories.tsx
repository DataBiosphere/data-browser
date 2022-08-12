import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Tag } from "./tag";
import { TagWarning } from "./tag.styles";

export default {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: Tag,
  title: "Components/Common/Alert/Tag",
} as ComponentMeta<typeof Tag>;

const WarningTemplate: ComponentStory<typeof Tag> = (args) => (
  <TagWarning {...args}>{args.children}</TagWarning>
);

export const WarningTag = WarningTemplate.bind({});
WarningTag.args = {
  children: "Please note",
};
