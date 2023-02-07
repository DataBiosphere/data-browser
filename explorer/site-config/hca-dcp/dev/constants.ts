import { SOCIAL, Social } from "../../../app/components/common/Socials/socials";

/**
 * File to hold constants that will be used for the HCA-DCP project.
 */

export const PROJECTS_LABEL = "Projects";

export const socials: Social[] = [
  {
    ...SOCIAL.TWITTER,
    url: "https://twitter.com/humancellatlas",
  },
  {
    ...SOCIAL.GITHUB,
    url: "https://github.com/HumanCellAtlas",
  },
  {
    ...SOCIAL.SLACK,
    url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
  },
];
