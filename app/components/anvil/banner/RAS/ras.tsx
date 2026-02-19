import { Banner } from "@databiosphere/findable-ui/lib/components/common/Banner/banner";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@mui/material";
import { JSX } from "react";

export const RAS = (): JSX.Element => {
  return (
    <Banner>
      <div>
        As part of new federal government security policies, Terra is required
        to integrate with the NIH Researcher Authentication Service (RAS) for
        identity proofing and enhanced security. In order to link your NIH
        authorization to Terra, users of eRA Commons must transition to the use
        of{" "}
        <Link
          href="https://login.gov"
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          target={ANCHOR_TARGET.BLANK}
        >
          Login.gov
        </Link>{" "}
        or ID.me credentials to access AnVIL controlled-access data in Terra.
        See{" "}
        <Link
          href="https://support.terra.bio/hc/en-us/articles/32634034451099-RAS-Integration-for-AnVIL-Data"
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          target={ANCHOR_TARGET.BLANK}
        >
          here
        </Link>{" "}
        for more details and instructions.
      </div>
    </Banner>
  );
};
