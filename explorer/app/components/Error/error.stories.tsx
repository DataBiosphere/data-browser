import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Error } from "./error";

export default {
  component: Error,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Communication",
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = () => <Error />;

export const ClientSideError = Template.bind({});
ClientSideError.args = {};
