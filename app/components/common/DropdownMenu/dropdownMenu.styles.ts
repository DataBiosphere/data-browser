import { DropdownMenu } from "@databiosphere/findable-ui/lib/components/common/DropdownMenu/dropdownMenu";
import styled from "@emotion/styled";

export const StyledDropdownMenu = styled(DropdownMenu)`
  .MuiPaper-menu {
    max-width: 324px;

    .MuiListItemText-root {
      display: grid;
      gap: 4px;
      white-space: normal;
    }
  }
`;
