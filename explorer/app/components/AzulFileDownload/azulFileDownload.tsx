// Core dependencies
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

// App dependencies
import { IconButton } from "../common/IconButton/iconButton";

interface AzulFileDownloadProps {
  url: string;
}

export const AzulFileDownload = ({
  url,
}: AzulFileDownloadProps): JSX.Element => {
  const handleClick = (): void => {
    console.log(url);
  };

  return <IconButton Icon={DownloadIcon} onClick={handleClick} />;
};
