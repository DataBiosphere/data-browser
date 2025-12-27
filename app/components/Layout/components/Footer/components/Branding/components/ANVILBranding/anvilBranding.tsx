import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import {
  Brands,
  HHSLogo,
  NHGRILogo,
  NIHLogo,
  PortalLogo,
  USAGOVLogo,
} from "./anvilBranding.styles";
import { JSX } from "react";

export interface ANVILBrandingProps {
  portalURL?: string;
}

export const ANVILBranding = ({
  portalURL,
}: ANVILBrandingProps): JSX.Element => {
  return (
    <Brands>
      {portalURL && (
        <PortalLogo
          alt="AnVIL"
          height={30}
          link={portalURL}
          src="/images/anvilPortal.png"
          target={ANCHOR_TARGET.BLANK}
        />
      )}
      <NHGRILogo
        alt="NHGRI"
        height={24}
        link="https://www.genome.gov/"
        src="/images/nhgri.svg"
        target={ANCHOR_TARGET.BLANK}
      />
      <NIHLogo
        alt="NIH"
        height={24}
        link="https://www.nih.gov/"
        src="/images/nih.svg"
        target={ANCHOR_TARGET.BLANK}
      />
      <HHSLogo
        alt="HHS"
        height={32}
        link="https://www.hhs.gov/"
        src="/images/hhs.svg"
        target={ANCHOR_TARGET.BLANK}
      />
      <USAGOVLogo
        alt="USA.GOV"
        height={32}
        link="https://www.usa.gov/"
        src="/images/usagov.png"
        target={ANCHOR_TARGET.BLANK}
      />
    </Brands>
  );
};
