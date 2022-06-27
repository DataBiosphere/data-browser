import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Search } from "./search";

export default {
  component: Search,
  title: "Components/Search",
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = () => <Search />;

export const Primary = Template.bind({});
Primary.args = {};
