import {
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "../../app/apis/catalog/anvil-catalog/common/entities";
import {
  accumulateObject,
  accumulateValue,
  accumulateValues,
  sumValues,
} from "../../app/apis/catalog/common/utils";
import { DbGapStudy, getStudy } from "../common/dbGaP";

export async function buildAnVILCatalogStudies(
  anVILCatalogWorkspaces: AnVILCatalogWorkspace[]
): Promise<Map<string, AnVILCatalogStudy>> {
  // Build the studies.
  const studiesByStudyId = new Map();
  for (const workspace of anVILCatalogWorkspaces) {
    const { dbGapId } = workspace;
    if (hasStudy(dbGapId)) {
      const anvilCatalogStudy = studiesByStudyId.get(dbGapId) || {};
      const dbGapStudy = await getStudy(workspace.dbGapId);
      studiesByStudyId.set(
        dbGapId,
        buildAnVILCatalogStudy(workspace, dbGapStudy, anvilCatalogStudy)
      );
    }
  }
  return studiesByStudyId;
}

/**
 * Returns AnVIL catalog study.
 * @param workspace - AnVIL catalog workspace.
 * @param dbGapStudy - the study as read from dbGaP
 * @param study - AnVIL catalog study.
 * @returns AnVIL catalog study.
 */
export function buildAnVILCatalogStudy(
  workspace: AnVILCatalogWorkspace,
  dbGapStudy: DbGapStudy | null,
  study: AnVILCatalogStudy
): AnVILCatalogStudy {
  const consentCodes = accumulateValue(
    study.consentCode, // consentCodes - a list of consent codes.
    workspace.consentCode
  );
  const consortium = workspace.consortium;
  const dataTypes = accumulateValues(study.dataType, workspace.dataType);
  const dbGapId = workspace.dbGapId;
  const diseases = accumulateValues(study.disease, workspace.disease);
  const participantCount = sumValues([
    study.participantCount,
    workspace.participantCount,
  ]);
  const studyAccession = dbGapStudy?.studyAccession ?? "";
  const studyDesigns = accumulateValues(
    study.studyDesign,
    workspace.studyDesign
  );
  const studyName = workspace.studyName;
  const studyDescription = dbGapStudy?.description ?? "";
  const workspaceNames = accumulateValue(
    study.workspaceName, // workspaceNames - a list of workspace names.
    workspace.workspaceName
  );
  const workspaces = accumulateObject<AnVILCatalogWorkspace>(
    study.workspaces,
    workspace,
    "workspaceName"
  );
  return {
    consentCode: consentCodes,
    consortium,
    dataType: dataTypes,
    dbGapId,
    disease: diseases,
    participantCount,
    studyAccession,
    studyDescription,
    studyDesign: studyDesigns,
    studyName,
    workspaceCount: workspaceNames.length,
    workspaceName: workspaceNames,
    workspaces,
  };
}

/**
 * Returns true if study has a valid dbGapId.
 * @param dbGapId - study identifier.
 * @returns true if the study has a valid dbGapId.
 */
export function hasStudy(dbGapId: string): boolean {
  if (!dbGapId) {
    return false;
  }
  return dbGapId.toLowerCase().startsWith("phs");
}
