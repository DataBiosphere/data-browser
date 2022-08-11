import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { datasetsEntityConfig } from "../../../../../site-config/anvil/dev/index/datasetsEntityConfig";
import {
  PermanentSidebar,
  TemporaryClosedSidebar,
  TemporaryOpenSidebar,
} from "../Sidebar/sidebar.stories";
import { Page } from "./page";

export default {
  argTypes: {
    children: { control: { disable: true } },
    entity: { control: { disable: true } },
  },
  component: Page,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Page",
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => (
  <Page {...args}>{args.children}</Page>
);

export const DesktopPage = Template.bind({});
DesktopPage.args = {
  children: (
    <>
      <PermanentSidebar {...PermanentSidebar.args}>{""}</PermanentSidebar>
      <div />
    </>
  ),
  entity: datasetsEntityConfig,
};

export const TabletPage = Template.bind({});
TabletPage.args = {
  children: (
    <>
      <TemporaryClosedSidebar {...TemporaryClosedSidebar.args}>
        {""}
      </TemporaryClosedSidebar>
      <div />
    </>
  ),
  entity: datasetsEntityConfig,
};

export const TabletWithSidebarOpenPage = Template.bind({});
TabletWithSidebarOpenPage.args = {
  children: (
    <>
      <TemporaryOpenSidebar {...TemporaryOpenSidebar.args}>
        {""}
      </TemporaryOpenSidebar>
      <div />
    </>
  ),
  entity: datasetsEntityConfig,
};
