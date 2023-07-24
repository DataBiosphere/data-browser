import { DownloadCurlCommandForm } from "@clevercanary/data-explorer-ui/lib/components/Export/components/DownloadCurlCommand/components/DownloadCurlCommandForm/downloadCurlCommandForm";
import { DownloadCurlCommand } from "@clevercanary/data-explorer-ui/lib/components/Export/components/DownloadCurlCommand/downloadCurlCommand";
import { FILE_MANIFEST_ACTION } from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/entities";
import { ExportMethodView } from "@clevercanary/data-explorer-ui/lib/views/ExportMethodView/exportMethodView";
import React from "react";
import * as MDX from "../../app/content/hca-dcp";
import { FORM_FACETS } from "../../site-config/hca-dcp/dev/export/constants";

const TITLE = 'Download Selected Data Using "curl"';

/**
 * Download curl command page.
 * @returns download curl command view component.
 */
const GetCurlCommandPage = (): JSX.Element => {
  return (
    <ExportMethodView
      ExportMethod={
        <DownloadCurlCommand
          DownloadCurlForm={DownloadCurlCommandForm}
          DownloadCurlStart={MDX.DownloadEntityCurlCommandStart}
          DownloadCurlSuccess={MDX.DownloadEntityCurlCommandSuccess}
          fileManifestAction={FILE_MANIFEST_ACTION.BULK_DOWNLOAD}
          formFacets={FORM_FACETS}
        />
      }
      title={TITLE}
    />
  );
};

export default GetCurlCommandPage;
