import { HEADER_NAVIGATION_LABEL } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/constants";
import { SocialMedia } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/entities";
import * as C from "../../../app/components/index";

export const socialMedia: SocialMedia = {
  label: HEADER_NAVIGATION_LABEL.SOCIALS,
  socials: [
    {
      Icon: C.YouTubeIcon,
      label: "YouTube",
      url: "https://www.youtube.com/channel/UCJvPdDZOxJvOwObfnZ8X3gA",
    },
    {
      Icon: C.GitHubIcon,
      label: "GitHub",
      url: "https://github.com/NIH-NCPI/",
    },
    {
      Icon: C.SlackIcon,
      label: "Slack",
      url: "https://nihcloudplatforms.slack.com/",
    },
  ],
};
