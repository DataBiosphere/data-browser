import { Box, ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Link from "next/link";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Text } from "../Text/Text";

interface ItemProps {
  link: { url: string; label: string };
  showCopyButton?: boolean;
  number?: number;
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

  return (
    <Box display="flex">
      <Link href={link.url} passHref>
        <Text
          variant="text-body-400-2lines"
          component="a"
          customColor="primaryAnvil"
        >
          {`${number !== undefined ? `${number}. ` : ""} ${link.label}`}
        </Text>
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
