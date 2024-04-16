import { HEADER_NAVIGATION_LABEL } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/constants";
import { SocialMedia } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import * as C from "../../../app/components/index";

export const socialMedia: SocialMedia = {
  label: HEADER_NAVIGATION_LABEL.SOCIALS,
  socials: [
    {
      Icon: C.XIcon,
      label: "X",
      url: "https://twitter.com/lungmapnet",
    },
  ],
};
