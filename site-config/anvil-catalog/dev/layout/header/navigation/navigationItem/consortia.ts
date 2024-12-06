import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { VISIBLE } from "../../../../../../common/constants";

const CONSORTIA_URL = "{portalUrl}{consortia}";

export const CONSORTIA: NavLinkItem = {
  label: "Consortia",
  menuItems: [
    {
      label: "Overview",
      url: CONSORTIA_URL,
      visible: VISIBLE.MD_DOWN,
    },
    {
      label: "CSER",
      menuItems: [
        {
          label: "About",
          url: `${CONSORTIA_URL}/cser`,
        },
        {
          label: "News",
          url: `${CONSORTIA_URL}/cser/news`,
        },
        {
          label: "Projects",
          url: `${CONSORTIA_URL}/cser/projects`,
        },
        {
          label: "Publications",
          url: `${CONSORTIA_URL}/cser/publications`,
        },
        {
          label: "Resources",
          url: `${CONSORTIA_URL}/cser/resources`,
        },
        {
          label: "Research Materials",
          url: `${CONSORTIA_URL}/cser/research-materials`,
        },
      ],
      url: `${CONSORTIA_URL}/cser`,
      visible: VISIBLE.MD_DOWN,
    },
  ],
  url: CONSORTIA_URL,
};
