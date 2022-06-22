// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { Layout } from "./Layout";

export default {
  argTypes: {
    mainColumn: { control: "object" },
    sideColumn: { control: "object" },
    top: { control: "object" },
  },
  component: Layout,
  title: "Components/Layout",
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  mainColumn: (
    <div
      key={1}
      style={{ width: 500, height: 500, backgroundColor: "red" }}
    ></div>
  ),
  sideColumn: (
    <div
      key={2}
      style={{ width: 500, height: 500, backgroundColor: "blue" }}
    ></div>
  ),
  top: (
    <div
      key={3}
      style={{ width: 500, height: 500, backgroundColor: "yellow" }}
    ></div>
  ),
};
