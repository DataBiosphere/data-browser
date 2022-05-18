import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProfileComponent } from "./ProfileComponent";

export default {
  title: "Components/ProfileComponent",
  component: ProfileComponent,
} as ComponentMeta<typeof ProfileComponent>;

const Template: ComponentStory<typeof ProfileComponent> = (args) => (
  <ProfileComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
