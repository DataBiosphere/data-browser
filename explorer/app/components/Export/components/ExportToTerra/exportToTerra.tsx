import { Loading } from "app/components/Loading/loading";
import {
  EXPORT_TO_TERRA_FORMAT,
  EXPORT_TO_TERRA_URL_PFB_FORMAT,
} from "../../../../apis/azul/common/constants";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { PAPER_PANEL_STYLE } from "../../../common/Paper/paper";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

interface ExportToTerraProps {
  exportTerraUrl: string; // Environment-specific origin used when redirecting user to Terra.
  params: URLSearchParams;
  url: string;
}

export const ExportToTerra = ({
  exportTerraUrl,
  params,
  url,
}: ExportToTerraProps): JSX.Element => {
  const { data, isIdle, isLoading, isSuccess, run } = useRequestFileLocation(
    `${url}?${params.toString()}`
  );
  return (
    <>
      {/* Export is idle or loading */}
      {(isIdle || isLoading) && (
        <div>
          <Loading
            loading={isLoading}
            panelStyle={PAPER_PANEL_STYLE.FLUID}
            text="Your link will be ready shortly..."
          />
          <ExportToTerraNotStarted run={run} />
        </div>
      )}
      {/* Export is successful */}
      {isSuccess && (
        <ExportToTerraReady
          terraUrl={buildExportToTerraUrl(
            exportTerraUrl,
            params,
            data?.location
          )}
        />
      )}
    </>
  );
};

/**
 * Build URL to open Azul-generated location in Terra. Export URL requires encoded location and Terra-specific format
 * if PFB.
 * @param exportToTerraUrl - Environment-specific origin used when generating links to Terra.
 * @param requestParams - Query string params used to generate the location.
 * @param location - The generated location returned from Azul.
 * @returns Complete URL for exporting to Terra.
 */
function buildExportToTerraUrl(
  exportToTerraUrl: string,
  requestParams: URLSearchParams,
  location?: string
): string {
  if (!location) {
    console.error(
      "Error attempting to build export to Terra link. No location given."
    );
    return "";
  }

  const format = requestParams.get("format"); // TODO(cc) constant
  if (!format) {
    console.error(
      "Error attempting to build export to Terra link. No format found."
    );
    return "";
  }

  // Build up request params for export link: format if PFB and the encoded location.
  const paramTokens = [];
  if (format === EXPORT_TO_TERRA_FORMAT.PFB) {
    // Translate Azul PFB format param value to Terra PFB format value. That is, terra.pfb to PFB.
    paramTokens.push(`format=${EXPORT_TO_TERRA_URL_PFB_FORMAT}`);
  }

  const encodedUrl = encodeURIComponent(location);
  paramTokens.push(`url=${encodedUrl}`);
  const urlParams = paramTokens.join("&");

  // Generate complete export URL. TODO(cc) update domain to be configurable.
  return `${exportToTerraUrl}#import-data?${urlParams}`;
}
