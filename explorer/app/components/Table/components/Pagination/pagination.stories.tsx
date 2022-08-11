import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Pagination } from "./pagination";

export default {
  argTypes: {
    canNextPage: { control: "boolean" },
    canPreviousPage: { control: "boolean" },
    currentPage: { control: "number" },
    onNextPage: { action: "nextPage" },
    onPreviousPage: { action: "previousPage" },
    totalPage: { control: "number" },
  },
  component: Pagination,
  title: "Components/Table",
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const TablePagination = Template.bind({});
TablePagination.args = {
  currentPage: 1,
  totalPage: 25,
};
