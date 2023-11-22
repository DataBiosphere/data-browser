import { HEADER_NAVIGATION_LABEL } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/constants";
import { SocialMedia } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/entities";
import * as C from "../../../app/components/index";

export const socialMedia: SocialMedia = {
  label: HEADER_NAVIGATION_LABEL.SOCIALS,
  socials: [
    {
      Icon: C.DiscourseIcon,
      label: "Discourse",
      url: "https://help.anvilproject.org/",
    },
    {
      Icon: C.XIcon,
      label: "X",
      url: "https://twitter.com/useAnVIL",
    },
    {
      Icon: C.YouTubeIcon,
      label: "YouTube",
      url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
    },
    {
      Icon: C.GitHubIcon,
      label: "GitHub",
      url: "https://github.com/anvilproject",
    },
    {
      Icon: C.SlackIcon,
      label: "Slack",
      url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
    },
  ],
};
