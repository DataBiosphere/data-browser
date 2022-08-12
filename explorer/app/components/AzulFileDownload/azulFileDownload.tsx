import { Box } from "@mui/material";
import { useRequestFileLocation } from "app/hooks/useRequestFileLocation";
import React, { useEffect, useRef, useState } from "react";
import { API_FILE_LOCATION_FETCH } from "../../apis/azul/anvil/common/constants";
import { DownloadIcon } from "../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { LoadingIcon } from "../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { IconButtonPrimary } from "../common/IconButton/iconButton.styles";

interface AzulFileDownloadProps {
  url?: string; // Original "file fetch URL" as returned from Azul endpoint.
}

export const AzulFileDownload = ({
  url,
}: AzulFileDownloadProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  // Used to prevent the download button from being clicked twice
  const [isDownloading, setIsDownloading] = useState(false);
  // Correct the file fetch URL as per the Azul spec.
  const azulFetchUrl = buildFetchFileUrl(url);
  const { data, isLoading, isSuccess, run } =
    useRequestFileLocation(azulFetchUrl);
  const fileLocation = data?.location;

  // Initiates file download when file location request is successful.
  useEffect(() => {
    if (isSuccess && fileLocation && downloadRef.current) {
      const downloadEl = downloadRef.current;
      downloadEl.href = fileLocation;
      downloadEl.click();
      setIsDownloading(false);
    }
  }, [fileLocation, isLoading, isSuccess]);

  /**
   * Initiate file location request.
   */
  const onFileLocationRequested = async (): Promise<void> => {
    // Prevent duplicate downloads
    setIsDownloading(true);
    run();
  };

  return (
    <>
      <IconButtonPrimary
        disabled={!url || isDownloading}
        Icon={isLoading ? LoadingIcon : DownloadIcon}
        onClick={onFileLocationRequested}
        size="medium"
      />
      <Box component="a" download ref={downloadRef} sx={{ display: "none" }} />
    </>
  );
};

/**
 * Prepend "/fetch" to the path of the specified file URL, if not already included. See #1596.
 * @param fileUrl - Original file URL as returned from Azul.
 * @returns Complete and correct URL to use when requesting file location from Azul or undefined if no fileUrl is passed.
 */
function buildFetchFileUrl(fileUrl?: string): string | undefined {
  if (!fileUrl) {
    return undefined;
  }

  const url = new URL(fileUrl);
  const path = url.pathname;
  if (!path.includes(API_FILE_LOCATION_FETCH)) {
    url.pathname = `${API_FILE_LOCATION_FETCH}${path}`;
  }

  return url.toString();
}
