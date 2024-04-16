import { Section as DXSection } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const Notice = styled.div`
  margin: 0 auto;
  max-width: 648px;
  padding: 40px 20px;
  width: 100%;
`;

export const Section = styled(DXSection)`
  align-items: center;
  padding: 0;

  ${mediaTabletUp} {
    padding: 0;
  }
`;

export const SectionContent = styled.div`
  text-align: center;

  .MuiTypography-text-heading-xlarge {
    margin-top: -8px;
  }

  .MuiLink-root {
    cursor: pointer;
  }
`;
