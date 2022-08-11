import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Search } from "./search";

export default {
  component: Search,
  title: "Components/Common/Button",
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = () => <Search />;

export const SearchButton = Template.bind({});
SearchButton.args = {};
