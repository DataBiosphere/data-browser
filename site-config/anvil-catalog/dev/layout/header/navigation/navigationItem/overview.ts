import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { VISIBLE } from "../../../../../../common/constants";

const OVERVIEW_URL = "{portalUrl}{overview}";

export const OVERVIEW: NavLinkItem = {
  label: "Overview",
  menuItems: [
    {
      label: "What is AnVIL?",
      url: OVERVIEW_URL,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "Platform and Data Security",
      url: `${OVERVIEW_URL}/security`,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "Supported by NHGRI",
      url: `${OVERVIEW_URL}/project-sponsor`,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "Publications",
      url: `${OVERVIEW_URL}/publications`,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "Citing AnVIL",
      url: `${OVERVIEW_URL}/cite-anvil`,
      visible: VISIBLE.MD_DOWN,
    },
  ],
  url: OVERVIEW_URL,
};
