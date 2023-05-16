import React from "react";
import { AccessStatusBadge as Badge } from "./accessStatusBadge.styles";

export interface AccessStatusBadgeProps {
  accessible: boolean;
}

export const AccessStatusBadge = ({
  accessible,
}: AccessStatusBadgeProps): JSX.Element => {
  return (
    <Badge
      accessible={accessible}
      label={accessible ? "Granted" : "Required"}
      variant="status"
    />
  );
};
