import { COLOR_MIXES } from "@databiosphere/findable-ui/lib/styles/common/constants/colorMixes";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

// The focus and disabled rule comes before the hover rule so a keyboard-focused button still brightens on hover.
export const StyledButton = styled(Button)`
  background-color: transparent;
  border: none;
  box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_32};
  color: ${PALETTE.COMMON_WHITE};

  &.Mui-focusVisible,
  &:disabled {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_32};
    color: ${PALETTE.COMMON_WHITE};
  }

  &:hover,
  &:active {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_64};
  }
`;
