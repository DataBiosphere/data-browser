import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { Loading } from "./loading";

export default {
  argTypes: {
    className: { control: { disabled: true } },
    loading: { control: "boolean" },
    panelStyle: {
      control: "select",
      options: Array.from(Object.keys(PAPER_PANEL_STYLE)),
    },
    text: { control: "text" },
  },
  component: Loading,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          height: 600,
          width: 600,
        }}
      >
        <Story />
      </div>
    ),
  ],
  title: "Components/Communication/Loading",
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const DownloadLoading = Template.bind({});
DownloadLoading.args = {
  loading: true,
};
