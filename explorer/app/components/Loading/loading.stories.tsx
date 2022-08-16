import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { RoundedLoading } from "./loading.styles";

export default {
  argTypes: {
    className: { control: { disabled: true } },
    loading: { control: "boolean" },
    text: { control: "text" },
  },
  component: RoundedLoading,
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
} as ComponentMeta<typeof RoundedLoading>;

const Template: ComponentStory<typeof RoundedLoading> = (args) => (
  <RoundedLoading {...args} />
);

export const DownloadLoading = Template.bind({});
DownloadLoading.args = {
  loading: true,
};
