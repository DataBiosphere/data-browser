import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import { isNRESConsentGroup } from "../../../../../../../../viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { Props } from "./types";

/**
 * Returns section title and description for downloading cohort files and metadata.
 * @param props - Component props.
 * @param props.viewContext - View context.
 * @returns Download section title and description.
 */
export const DownloadSection = ({ viewContext }: Props): JSX.Element => {
  const isNRES = isNRESConsentGroup(viewContext);
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
          <div>
            First, download the open-access data files in the current selection
            using a <code>curl</code> command. Then download a TSV manifest
            containing metadata for all data files in the current selection,
            including managed-access files. The manifest contains metadata only
            and does not include file data. Open-access data files are hosted
            through AWS Open Data, with storage and data transfer costs covered
            by the AWS Open Data Sponsorship Program.
          </div>
        ) : (
          <div>
            Download a TSV manifest containing metadata for all selected files.
            The manifest contains metadata only and does not include file data.
          </div>
        )}
      </Typography>
    </Stack>
  );
};
