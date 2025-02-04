import { DatasetsResponse } from "../../../../../../apis/azul/anvil-cmg/common/responses";
import { takeArrayValueAt } from "../../../../../../viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import {
  processEntityArrayValue,
  processEntityValue,
} from "../../../../../../apis/azul/common/utils";
import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { ListItemTextProps } from "@mui/material";

/**
 * Generates a list of request access menu options based on the provided dataset response.
 * This function extracts identifiers (DUOS ID and dbGaP ID) from the datasets response and returns an array of menu option objects.
 * Each menu option contains a link `href` and title `primary` and description text `secondary`, to be used in Material UI's `MenuItem` and `ListItemText` component.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns menu option objects with `href`, `primary`, and `secondary` properties.
 */
export function getRequestAccessOptions(
  datasetsResponse: DatasetsResponse
): (Pick<ListItemTextProps, "primary" | "secondary"> & { href: string })[] {
  // Get the dbGaP ID and DUOS ID from the datasets response.
  const dbGapId = takeArrayValueAt(
    processEntityArrayValue(
      datasetsResponse.datasets,
      "registered_identifier",
      LABEL.EMPTY
    ),
    0
  );
  const duosId = processEntityValue(
    datasetsResponse.datasets,
    "duos_id",
    LABEL.EMPTY
  );
  const options = [];
  if (duosId) {
    // If a DUOS ID is present, add a menu option for DUOS.
    options.push({
      href: `https://duos.org/dataset/${duosId}`,
      primary: "DUOS",
      secondary:
        "Request access via DUOS, which streamlines data access for NHGRI-sponsored studies, both registered and unregistered in dbGaP.",
    });
  }
  if (dbGapId) {
    // If a dbGaP ID is present, add a menu option for dbGaP.
    options.push({
      href: `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${dbGapId}`,
      primary: "dbGaP",
      secondary:
        "Request access via the dbGaP Authorized Access portal for studies registered in dbGaP, following the standard data access process.",
    });
  }
  return options;
}
