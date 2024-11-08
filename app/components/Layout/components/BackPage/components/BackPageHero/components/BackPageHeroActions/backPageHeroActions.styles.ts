import { BackPageHeroActions } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/components/Actions/actions.styles";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const StyledBackPageHeroActions = styled(BackPageHeroActions)`
  display: contents;

  .MuiButton-root,
  .MuiLink-root {
    grid-column: 1 / -1;
  }

  .MuiButton-root {
    padding-bottom: 8px;
    padding-top: 8px;
    width: fit-content;
  }

  ${mediaTabletUp} {
    display: flex;

    .MuiLink-root {
      margin: auto 0;
    }
  }
`;
