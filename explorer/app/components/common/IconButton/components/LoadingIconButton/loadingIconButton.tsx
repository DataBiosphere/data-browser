/**
 * Mock "loading" icon button - a placeholder element styled like a primary icon button without the use of a button element.
 */

import React from "react";
import { LoadingIcon } from "../../../CustomIcon/components/LoadingIcon/loadingIcon";
import { MockIconButtonPrimary } from "../../iconButton.styles";

export const LoadingIconButton = (): JSX.Element => {
  return (
    <MockIconButtonPrimary>
      <LoadingIcon fontSize="small" />
    </MockIconButtonPrimary>
  );
};
