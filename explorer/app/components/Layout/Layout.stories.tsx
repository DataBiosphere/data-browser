import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Layout } from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
  argTypes: {
    mainColumn: { control: "object" },
    sideColumn: { control: "object" },
  },
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
};
