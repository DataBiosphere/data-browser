import ContentCopy from "@mui/icons-material/ContentCopy";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Link as MLink,
  Tooltip,
} from "@mui/material";
import copy from "copy-to-clipboard";
import Link from "next/link";
import React, { useState } from "react";

interface ItemProps {
  link: { label: string; url: string };
  number?: number;
  showCopyButton?: boolean;
}

export const Item = ({
  link,
  number,
  showCopyButton,
}: ItemProps): JSX.Element => {
  const [showTooltip, setshowTooltip] = useState(false);

  const handleCopy = (): void => {
    setshowTooltip(true);
    copy(link.url);
  };

  const handleCloseTooltip = (): void => {
    setshowTooltip(false);
  };

  const numberValue = number !== undefined ? `${number}. ` : "";

  return (
    <Box display="flex">
      <Link href={link.url} passHref>
        <MLink variant="text-body-400-2lines">
          {`${numberValue} ${link.label}`}
        </MLink>
      </Link>
      {showCopyButton && (
        <ClickAwayListener onClickAway={handleCloseTooltip}>
          <Tooltip
            arrow
            placement="top"
            title="Link Copied"
            open={showTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            onClose={handleCloseTooltip}
          >
            <IconButton onClick={handleCopy}>
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      )}
    </Box>
  );
};
