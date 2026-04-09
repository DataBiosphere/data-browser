import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import { isDatasetNRESConsentGroup } from "app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import type { JSX } from "react";
import type { Props } from "./types";

/**
 * Returns section title and description for downloading dataset files and metadata.
 * @param props - Component props.
 * @param props.dataset - Dataset response.
 * @returns Download section title and description.
 */
export const DownloadSection = ({ dataset }: Props): JSX.Element => {
  const isNRES = isDatasetNRESConsentGroup(dataset);
  return (
    <Stack gap={1}>
      <Typography
        component="h2"
        variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
      >
        Download
      </Typography>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>
        {isNRES ? (
          <span>
            To download data from this dataset, first download the open-access
            data files using the <code>curl</code> command option. Then download
            the TSV metadata manifest for the dataset. Open-access data files
            are hosted through AWS Open Data, with storage and data transfer
            costs covered by the AWS Open Data Sponsorship Program.
          </span>
        ) : (
          <span>
            Download a TSV manifest with metadata for all files in the
            managed-access dataset. No file data is included.
          </span>
        )}
      </Typography>
    </Stack>
  );
};
