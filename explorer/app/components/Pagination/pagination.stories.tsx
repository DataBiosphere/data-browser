import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Pagination } from "./pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    currentPage: { control: "number" },
    totalPage: { control: "number" },
    canNextPage: { control: "boolean" },
    canPreviousPage: { control: "boolean" },
    onNextPage: { action: "nextPage" },
    onPreviousPage: { action: "previousPage" },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  currentPage: 1,
  totalPage: 10,
};
