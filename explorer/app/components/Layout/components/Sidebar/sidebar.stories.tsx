import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SidebarFilterLabel as SidebarLabel } from "./components/SidebarLabel/sidebarLabel.stories";
import { Sidebar } from "./sidebar";

export default {
  argTypes: {
    Label: { control: { disable: true } },
    children: { control: { disable: true } },
    drawerOpen: { control: { disable: true } },
    onDrawerClose: { control: { disable: true } },
  },
  component: Sidebar,
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
  title: "Components/Layout/Sidebar",
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args}>{args.children}</Sidebar>
);

export const PermanentSidebar = Template.bind({});
PermanentSidebar.args = {
  Label: <SidebarLabel label={"Filter"} />,
  children: <div />,
};

export const TemporaryClosedSidebar = Template.bind({});
TemporaryClosedSidebar.args = {
  Label: <SidebarLabel label={"Filter"} />,
  children: <div />,
  drawerOpen: false,
};

export const TemporaryOpenSidebar = Template.bind({});
TemporaryOpenSidebar.args = {
  Label: <SidebarLabel label={"Filter"} />,
  children: <div />,
  drawerOpen: true,
};
