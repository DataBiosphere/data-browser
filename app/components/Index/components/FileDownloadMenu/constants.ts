import { MenuProps } from "@mui/material";

export const COPIED_DURATION_MS = 1000;

export const LABEL = {
  COPIED: "DRS URI copied",
  COPY_DRS_URI: "Copy DRS URI",
  COPY_DRS_URI_DESCRIPTION:
    "Link for Terra and other tools that read DRS links.",
  DOWNLOAD: "Download file",
  DOWNLOADING: "Downloading",
  DOWNLOAD_AVAILABLE:
    "Open-access file, freely downloadable from AWS Open Data with no data transfer fees.",
  DOWNLOAD_UNAVAILABLE:
    "Direct file downloads are currently only available for open-access files.",
  FILE_ACTIONS: "File actions for",
};

export const MENU_PROPS: Partial<MenuProps> = {
  anchorOrigin: { horizontal: "left", vertical: "bottom" },
  transformOrigin: { horizontal: "left", vertical: "top" },
};
