import { DownloadIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { LoadingIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LoadingIcon/loadingIcon";
import { IconButton } from "@databiosphere/findable-ui/lib/components/common/IconButton/iconButton";
import { useDownload } from "@databiosphere/findable-ui/lib/components/Index/components/AzulFileDownload/hooks/UseDownload/hook";
import { ICON_BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/iconButton";
import { Box, ListItemText, MenuItem } from "@mui/material";
import copy from "copy-to-clipboard";
import { JSX, useEffect, useRef, useState } from "react";
import { LIST_ITEM_TEXT_PROPS } from "../../../common/DropdownMenu/constants";
import { StyledDropdownMenu } from "../../../common/DropdownMenu/dropdownMenu.styles";
import { COPIED_DURATION_MS, LABEL, MENU_PROPS } from "./constants";

export interface FileDownloadMenuProps {
  drsUri: string;
  entityName: string;
  relatedEntityId: string;
  relatedEntityName: string;
  url?: string;
}

export const FileDownloadMenu = ({
  drsUri,
  entityName,
  relatedEntityId,
  relatedEntityName,
  url,
}: FileDownloadMenuProps): JSX.Element => {
  const { downloadRef, isRequestPending, onDownload } = useDownload({
    entityName,
    relatedEntityId,
    relatedEntityName,
    url,
  });
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => (): void => clearTimeout(timeoutRef.current), []);

  return (
    <>
      <StyledDropdownMenu
        {...MENU_PROPS}
        button={({ open: _open, ...props }): JSX.Element => (
          <IconButton
            {...props}
            aria-busy={isRequestPending || undefined}
            aria-label={`${isRequestPending ? LABEL.DOWNLOADING : LABEL.FILE_ACTIONS} ${entityName}`}
            color={ICON_BUTTON_PROPS.COLOR.PRIMARY}
            Icon={isRequestPending ? LoadingIcon : DownloadIcon}
            size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
          />
        )}
      >
        {({ closeMenu }): JSX.Element[] => [
          <MenuItem
            disabled={!url}
            key="download"
            onClick={(): void => {
              closeMenu();
              onDownload();
            }}
          >
            <ListItemText
              {...LIST_ITEM_TEXT_PROPS}
              primary={LABEL.DOWNLOAD}
              secondary={
                url ? LABEL.DOWNLOAD_AVAILABLE : LABEL.DOWNLOAD_UNAVAILABLE
              }
            />
          </MenuItem>,
          <MenuItem
            key="copy-drs-uri"
            onClick={(): void => {
              copy(drsUri);
              setIsCopied(true);
              clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => {
                closeMenu();
                setIsCopied(false);
              }, COPIED_DURATION_MS);
            }}
          >
            <ListItemText
              {...LIST_ITEM_TEXT_PROPS}
              primary={isCopied ? LABEL.COPIED : LABEL.COPY_DRS_URI}
              secondary={LABEL.COPY_DRS_URI_DESCRIPTION}
            />
          </MenuItem>,
        ]}
      </StyledDropdownMenu>
      <Box component="a" download ref={downloadRef} sx={{ display: "none" }} />
    </>
  );
};
