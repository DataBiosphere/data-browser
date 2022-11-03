import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CustomIcon } from "app/components/common/CustomIcon/customIcon";
import React from "react";
import { NavLinkMenu } from "./navLinkMenu";

export default {
  argTypes: {
    menuItems: { control: "array" },
    menuLabel: { control: "text" },
  },
  component: NavLinkMenu,
  title: "Components/Navigation/NavLinkMenu",
} as ComponentMeta<typeof NavLinkMenu>;

const Template: ComponentStory<typeof NavLinkMenu> = (args) => (
  <NavLinkMenu {...args} />
);

export const MoreMenu = Template.bind({});
MoreMenu.args = {
  menuItems: [
    {
      label: "News",
      url: "/news",
    },
    {
      label: "Events",
      url: "/events",
    },
    {
      label: "Team",
      url: "/team",
    },
    {
      label: "FAQ",
      url: "/faq",
    },
  ],
  menuLabel: "More",
};

export const FollowUsMenu = Template.bind({});
FollowUsMenu.args = {
  menuItems: [
    {
      icon: (
        <CustomIcon fontSize="small" color="inkLight" iconName="discourse" />
      ),
      label: "Discourse",
      url: "https://help.anvilproject.org/",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="twitter" />,
      label: "Twitter",
      url: "https://twitter.com/useAnVIL",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="slack" />,
      label: "Slack",
      url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="youtube" />,
      label: "YouTube",
      url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
    },
    {
      icon: <CustomIcon fontSize="small" color="inkLight" iconName="github" />,
      label: "GitHub",
      url: "https://github.com/anvilproject",
    },
  ],
  menuLabel: "Follow Us",
};
