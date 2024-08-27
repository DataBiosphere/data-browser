import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { VISIBLE } from "../../../../../../common/constants";

const FAQ_URL = "{portalUrl}{faq}";

export const FAQ: NavLinkItem = {
  label: "FAQ",
  menuItems: [
    {
      label: "Overview",
      url: FAQ_URL,
      visible: VISIBLE.SM_DOWN,
    },
    {
      label: "Data Security, Management, and Access Procedures",
      url: `${FAQ_URL}/data-security`,
      visible: VISIBLE.SM_DOWN,
    },
    {
      label: "Data Submission",
      url: `${FAQ_URL}/data-submission`,
      visible: VISIBLE.SM_DOWN,
    },
    {
      label: "Resources for AnVIL Users",
      url: `${FAQ_URL}/resources-for-anvil-users`,
      visible: VISIBLE.SM_DOWN,
    },
    {
      label: "Using AnVIL",
      url: `${FAQ_URL}/using-anvil`,
      visible: VISIBLE.SM_DOWN,
    },
  ],
  url: FAQ_URL,
};
