import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../../../../../app/components";
import { VISIBLE } from "../../../../../../common/constants";

export const DATASETS: NavLinkItem = {
  label: "Datasets",
  menuItems: [
    {
      description: "An open-access view of studies, workspaces, and consortia.",
      label: "Catalog",
      menuItems: [
        {
          label: "Consortia",
          url: "{consortia}",
          visible: VISIBLE.NEVER,
        },
        {
          label: "Studies",
          url: "{studies}",
          visible: VISIBLE.NEVER,
        },
        {
          label: "Workspaces",
          url: "{workspaces}",
          visible: VISIBLE.NEVER,
        },
      ],
      url: "{consortia}",
    },
    {
      description:
        "Build, download, and export cross-study cohorts of open and managed access data.",
      label: C.LabelIconMenuItem({
        iconFontSize: "small",
        label: "Explorer",
      }),
      target: ANCHOR_TARGET.BLANK,
      url: "{explorerUrl}{datasets}",
    },
  ],
  url: "",
};
