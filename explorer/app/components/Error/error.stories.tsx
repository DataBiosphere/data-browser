import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Error as ErrorComponent } from "./error";

export default {
  component: ErrorComponent,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Communication",
} as ComponentMeta<typeof ErrorComponent>;

const Template: ComponentStory<typeof ErrorComponent> = (args) => (
  <ErrorComponent {...args} />
);

export const ClientSideError = Template.bind({});
ClientSideError.args = {};
