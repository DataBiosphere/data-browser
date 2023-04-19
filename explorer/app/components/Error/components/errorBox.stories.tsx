import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ErrorBox } from "./errorBox";

export default {
  component: ErrorBox,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Communication",
} as ComponentMeta<typeof ErrorBox>;

const Template: ComponentStory<typeof ErrorBox> = (args) => (
  <ErrorBox {...args} />
);

export const ClientErrorBox = Template.bind({});
ClientErrorBox.args = {
  message: "Error message",
  title: "Box title",
};
