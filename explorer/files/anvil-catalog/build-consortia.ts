import {
  AnVILCatalogConsortium,
  AnVILCatalogWorkspace,
} from "../../app/apis/catalog/anvil-catalog/common/entities";
import {
  accumulateValue,
  accumulateValues,
  sumValues,
} from "../../app/apis/catalog/common/utils";

/**
 * Returns AnVIL catalog consortia.
 * @param anVILCatalogWorkspaces - the workspaces read from the TSV report.
 * @returns AnVIL catalog consortia.
 */
export function buildAnVILCatalogConsortia(
  anVILCatalogWorkspaces: AnVILCatalogWorkspace[]
): unknown[] {
  const anvilCatalogConsortiaByConsortium = new Map();

  // Build the workspaces for the consortium.
  for (const workspace of anVILCatalogWorkspaces) {
    const { consortium } = workspace;
    const anvilCatalogConsortium =
      anvilCatalogConsortiaByConsortium.get(consortium) || {};
    anvilCatalogConsortiaByConsortium.set(
      consortium,
      buildAnVILCatalogConsortium(workspace, anvilCatalogConsortium)
    );
  }

  return [...anvilCatalogConsortiaByConsortium.values()];
}

/**
 * Returns AnVIL catalog consortium.
 * @param workspace - AnVIL catalog workspace.
 * @param anvilCatalogConsortium - AnVIL catalog consortium.
 * @returns AnVIL catalog consortium.
 */
function buildAnVILCatalogConsortium(
  workspace: AnVILCatalogWorkspace,
  anvilCatalogConsortium: AnVILCatalogConsortium
): AnVILCatalogConsortium {
  const consentCodes = accumulateValue(
    anvilCatalogConsortium.consentCode, // consentCodes - a list of consent codes.
    workspace.consentCode
  );
  const consortium = workspace.consortium;
  const dataTypes = accumulateValues(
    anvilCatalogConsortium.dataType,
    workspace.dataType
  );
  const dbGapId = accumulateValue(
    anvilCatalogConsortium.dbGapId,
    workspace.dbGapId
  ); // dbGapIds - a list of study ids.
  const diseases = accumulateValues(
    anvilCatalogConsortium.disease,
    workspace.disease
  );
  const participantCount = sumValues([
    anvilCatalogConsortium.participantCount,
    workspace.participantCount,
  ]);
  const studyDesigns = accumulateValues(
    anvilCatalogConsortium.studyDesign,
    workspace.studyDesign
  );
  const studyNames = accumulateValue(
    anvilCatalogConsortium.studyName,
    workspace.studyName
  );
  const workspaceNames = accumulateValue(
    anvilCatalogConsortium.workspaceName, // workspaceNames - a list of workspace names.
    workspace.workspaceName
  );
  return {
    consentCode: consentCodes,
    consortium,
    dataType: dataTypes,
    dbGapId,
    disease: diseases,
    participantCount,
    studyDesign: studyDesigns,
    studyName: studyNames,
    workspaceCount: workspaceNames.length,
    workspaceName: workspaceNames,
  };
}
