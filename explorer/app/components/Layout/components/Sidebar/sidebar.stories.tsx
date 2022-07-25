// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { Label as SidebarLabel } from "./components/SidebarLabel/sidebarLabel.stories";
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
  title: "Layout/Sidebar",
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args}>{args.children}</Sidebar>
);

export const PermanentSidebar = Template.bind({});
PermanentSidebar.args = {
  Label: <SidebarLabel label={"Filter"} />,
  children: <div />,
};

export const TemporarySidebarClosed = Template.bind({});
TemporarySidebarClosed.args = {
  Label: <SidebarLabel label={"Filter"} />,
  children: <div />,
  drawerOpen: false,
};

export const TemporarySidebarOpen = Template.bind({});
TemporarySidebarOpen.args = {
  Label: <SidebarLabel label={"Filter"} />,
  children: <div />,
  drawerOpen: true,
};
