import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../../../../../app/components";
import { SOCIALS } from "../../../../socials/socialMedia";

export const SOCIAL: NavLinkItem = {
  label: "Follow Us",
  menuItems: [
    {
      ...SOCIALS.DISCOURSE,
      icon: C.DiscourseIcon({ fontSize: "small" }),
      target: ANCHOR_TARGET.BLANK,
    },
    {
      ...SOCIALS.X,
      icon: C.XIcon({ fontSize: "small" }),
      target: ANCHOR_TARGET.BLANK,
    },
    {
      ...SOCIALS.YOUTUBE,
      icon: C.YouTubeIcon({ fontSize: "small" }),
      target: ANCHOR_TARGET.BLANK,
    },
    {
      ...SOCIALS.GITHUB,
      icon: C.GitHubIcon({ fontSize: "small" }),
      target: ANCHOR_TARGET.BLANK,
    },
    {
      ...SOCIALS.SLACK,
      icon: C.SlackIcon({ fontSize: "small" }),
      target: ANCHOR_TARGET.BLANK,
    },
  ],
  url: "",
  visible: { lg: false, xs: false },
};
