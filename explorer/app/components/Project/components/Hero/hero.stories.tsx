import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { STATUS } from "../../../common/StatusBadge/statusBadge";
import { Hero } from "./hero";

export default {
  argTypes: {
    status: { control: "select", options: Array.from(Object.keys(STATUS)) },
    title: { control: "text" },
  },
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Hero",
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const ProjectHero = Template.bind({});
ProjectHero.args = {
  breadcrumbs: undefined, // TODO project breadcrumbs https://github.com/clevercanary/data-browser/issues/68
  status: STATUS.NEW,
  title:
    "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
};
