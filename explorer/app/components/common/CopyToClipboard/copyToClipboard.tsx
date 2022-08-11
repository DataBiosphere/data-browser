import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { IconButton, Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";
import React, { useEffect } from "react";

interface Props {
  copyStr: string;
}

export const CopyToClipboard = ({ copyStr }: Props): JSX.Element => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  /**
   * Copies string to clipboard and sets showTooltip state to true.
   * @param str - String to copy to clipboard.
   */
  const onCopyToClipboard = (str: string): void => {
    copy(str);
    setShowTooltip(true);
  };

  // Timer to auto close the tooltip - the state showTooltip is set to false after a specified time (2 seconds).
  useEffect(() => {
    if (showTooltip) {
      const tooltipTimeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return () => clearTimeout(tooltipTimeout);
    }
  }, [showTooltip]);

  return (
    <Tooltip
      arrow
      disableHoverListener
      open={showTooltip}
      placement="top"
      title={"Link Copied"}
    >
      <IconButton
        onClick={(): void => onCopyToClipboard(copyStr)}
        size="xxsmall"
      >
        <ContentCopyRoundedIcon color="primary" fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
