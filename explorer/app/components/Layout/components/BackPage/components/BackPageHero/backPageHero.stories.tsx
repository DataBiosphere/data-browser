import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { STATUS } from "../../../../../common/StatusBadge/statusBadge";
import { BackPageHero } from "./backPageHero";

export default {
  argTypes: {
    status: { control: "select", options: Array.from(Object.keys(STATUS)) },
    title: { control: "text" },
  },
  component: BackPageHero,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Hero",
} as ComponentMeta<typeof BackPageHero>;

const Template: ComponentStory<typeof BackPageHero> = (args) => (
  <BackPageHero {...args} />
);

export const ProjectHero = Template.bind({});
ProjectHero.args = {
  breadcrumbs: undefined, // TODO project breadcrumbs https://github.com/clevercanary/data-browser/issues/68
  status: STATUS.NEW,
  title:
    "A Single-Cell Transcriptomic Map of the Human and Mouse Pancreas Reveals Inter- and Intra-cell Population Structure",
};
