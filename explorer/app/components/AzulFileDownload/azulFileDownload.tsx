// Core dependencies
import React, { useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";

// App dependencies
import { IconButton } from "../common/IconButton/iconButton";
import { useRequestFileLocation } from "app/hooks/useRequestFileLocation";

interface AzulFileDownloadProps {
  url: string;
}

export const AzulFileDownload = ({
  url,
}: AzulFileDownloadProps): JSX.Element => {
  const { data, isLoading, run } = useRequestFileLocation(url);

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
    }
  }, [data, isLoading]);

  const handleClick = async (): Promise<void> => {
    run();
  };

  return <IconButton Icon={DownloadIcon} onClick={handleClick} />;
};
