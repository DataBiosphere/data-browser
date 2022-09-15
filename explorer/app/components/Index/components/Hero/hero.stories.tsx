import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  AnvilSummaries,
  HCASummaries,
  LungmapSummaries,
} from "./components/Summaries/summaries.stories";
import { Hero } from "./hero";

export default {
  argTypes: {
    Summaries: { table: { disable: true } },
    title: { table: { disable: true } },
  },
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Hero/ExploreView",
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const AnvilHero = Template.bind({});
AnvilHero.args = {
  Summaries: <AnvilSummaries {...AnvilSummaries.args} />,
  title: "Anvil Data Explorer",
};

export const HCAHero = Template.bind({});
HCAHero.args = {
  Summaries: <HCASummaries {...HCASummaries.args} />,
  title: "Explore Data: DCP 2.0 Data View",
};

export const LungmapHero = Template.bind({});
LungmapHero.args = {
  Summaries: <LungmapSummaries {...LungmapSummaries.args} />,
  title: "Explore Data",
};
