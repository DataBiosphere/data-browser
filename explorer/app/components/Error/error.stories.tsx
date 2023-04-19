import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AxiosError } from "axios";
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
ClientSideError.args = {
  error: new Error("Error"),
};

export const ClientSideAxiosError = Template.bind({});
ClientSideAxiosError.args = {
  error: new AxiosError("Error", "code", undefined, {
    responseUrl: "request url",
  }),
};
