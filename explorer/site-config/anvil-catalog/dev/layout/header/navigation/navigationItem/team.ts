import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { VISIBLE } from "../../../../../../common/constants";

const TEAM_URL = "{portalUrl}{team}";

export const TEAM: NavLinkItem = {
  label: "Team",
  menuItems: [
    {
      label: "Leadership Team",
      url: TEAM_URL,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "Working Groups",
      url: `${TEAM_URL}/working-groups`,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "Oversight Committee",
      url: `${TEAM_URL}/oversight-committee`,
      visible: VISIBLE.MD_DOWN,
    },
  ],
  url: TEAM_URL,
};
