import { SocialMedia } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import * as C from "../../../../app/components/index";

export const SOCIALS = {
  DISCOURSE: {
    label: "Discourse",
    url: "https://help.anvilproject.org",
  },
  GITHUB: {
    label: "GitHub",
    url: "https://github.com/anvilproject",
  },
  SLACK: {
    label: "Slack",
    url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
  },
  X: {
    label: "X",
    url: "https://twitter.com/useAnVIL",
  },
  YOUTUBE: {
    label: "YouTube",
    url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
  },
};

export const socialMedia: SocialMedia = {
  socials: [
    {
      ...SOCIALS.DISCOURSE,
      Icon: C.DiscourseIcon,
    },
    {
      ...SOCIALS.X,
      Icon: C.XIcon,
    },
    {
      ...SOCIALS.YOUTUBE,
      Icon: C.YouTubeIcon,
    },
    {
      ...SOCIALS.GITHUB,
      Icon: C.GitHubIcon,
    },
    {
      ...SOCIALS.SLACK,
      Icon: C.SlackIcon,
    },
  ],
};
