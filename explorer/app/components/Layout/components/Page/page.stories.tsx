// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { Page } from "./page";
import {
  PermanentSidebar,
  TemporarySidebarClosed,
  TemporarySidebarOpen,
} from "../Sidebar/sidebar.stories";
import { datasetsEntityConfig } from "../../../../../site-config/anvil/dev/index/datasetsEntityConfig";

export default {
  argTypes: {
    children: { control: { disable: true } },
    entity: { control: { disable: true } },
  },
  component: Page,
  title: "Layout/Page",
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => (
  <Page {...args}>{args.children}</Page>
);

export const BasicDesktopPage = Template.bind({});
BasicDesktopPage.args = {
  children: (
    <>
      <PermanentSidebar {...PermanentSidebar.args}>{""}</PermanentSidebar>
      <div />
    </>
  ),
  entity: datasetsEntityConfig,
};

export const BasicTabletPage = Template.bind({});
BasicTabletPage.args = {
  children: (
    <>
      <TemporarySidebarClosed {...TemporarySidebarClosed.args}>
        {""}
      </TemporarySidebarClosed>
      <div />
    </>
  ),
  entity: datasetsEntityConfig,
};

export const BasicTabletPageSidebarOpen = Template.bind({});
BasicTabletPageSidebarOpen.args = {
  children: (
    <>
      <TemporarySidebarOpen {...TemporarySidebarOpen.args}>
        {""}
      </TemporarySidebarOpen>
      <div />
    </>
  ),
  entity: datasetsEntityConfig,
};
