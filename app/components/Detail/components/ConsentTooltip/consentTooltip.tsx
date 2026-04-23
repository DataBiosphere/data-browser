import { Tooltip } from "@mui/material";
import { JSX } from "react";

interface ConsentTooltipProps {
  consentCode: string;
  consentLongName?: string;
}

export const ConsentTooltip = ({
  consentCode,
  consentLongName,
}: ConsentTooltipProps): JSX.Element => {
  if (!consentLongName || /^unspecified$|^error/i.test(consentLongName))
    consentLongName = "";
  return (
    <Tooltip arrow={true} placement="top" title={consentLongName}>
      <span>{consentCode}</span>
    </Tooltip>
  );
};
