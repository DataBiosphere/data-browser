import {
  accumulateValue,
  accumulateValues,
  sumValues,
} from "../../common/utils";
import {
  AnVILCatalog,
  AnVILCatalogConsortium,
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "./entities";

/**
 * Returns AnVIL catalog consortia.
 * @param anvilCatalogs - AnVIL catalogs.
 * @returns AnVIL catalog consortia.
 */
export function buildAnVILCatalogConsortia(
  anvilCatalogs: unknown[]
): unknown[] {
  const anvilCatalogConsortiaByConsortium = new Map();
  const workspaces = buildAnVILCatalogWorkspaces(
    anvilCatalogs
  ) as AnVILCatalogWorkspace[];

  // Build the workspaces for the consortium.
  for (const workspace of workspaces) {
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
 * Returns AnVIL catalog studies.
 * @param anvilCatalogs - AnVIL catalogs.
 * @returns AnVIL catalog studies.
 */
export function buildAnVILCatalogStudies(anvilCatalogs: unknown[]): unknown[] {
  const studiesByStudyId = new Map();
  const workspaces = buildAnVILCatalogWorkspaces(
    anvilCatalogs
  ) as AnVILCatalogWorkspace[];

  // Build the studies.
  for (const workspace of workspaces) {
    const { dbGapId } = workspace;
    if (isStudy(dbGapId)) {
      const study = studiesByStudyId.get(dbGapId) || {};
      studiesByStudyId.set(dbGapId, buildAnVILCatalogStudy(workspace, study));
    }
  }

  return [...studiesByStudyId.values()];
}

/**
 * Returns AnVIL catalog workspaces.
 * @param anVILCatalogs - AnVIL catalogs.
 * @returns AnVIL catalog workspaces.
 */
export function buildAnVILCatalogWorkspaces(
  anVILCatalogs: unknown[]
): unknown[] {
  return (anVILCatalogs as AnVILCatalog[]).map((anVILCatalog) => {
    const workspace: AnVILCatalogWorkspace = {
      consentCode: anVILCatalog["library:dataUseRestriction"],
      consortium: anVILCatalog.consortium,
      dataTypes: anVILCatalog["library:datatype"],
      dbGapId: anVILCatalog.phsId,
      diseases: anVILCatalog["library:indication"],
      participantCount: anVILCatalog.participantCount,
      studyDesigns: anVILCatalog["library:studyDesign"],
      workspaceName: anVILCatalog.name,
    };
    return workspace;
  });
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
    anvilCatalogConsortium.dataTypes,
    workspace.dataTypes
  );
  const dbGapId = accumulateValue(
    anvilCatalogConsortium.dbGapId,
    workspace.dbGapId
  ); // dbGapIds - a list of study ids.
  const diseases = accumulateValues(
    anvilCatalogConsortium.diseases,
    workspace.diseases
  );
  const participantCount = sumValues([
    anvilCatalogConsortium.participantCount,
    workspace.participantCount,
  ]);
  const studyDesigns = accumulateValues(
    anvilCatalogConsortium.studyDesigns,
    workspace.studyDesigns
  );
  const workspaceNames = accumulateValue(
    anvilCatalogConsortium.workspaceName, // workspaceNames - a list of workspace names.
    workspace.workspaceName
  );
  return {
    consentCode: consentCodes,
    consortium,
    dataTypes,
    dbGapId,
    diseases,
    participantCount,
    studyDesigns,
    workspaceCount: workspaceNames.length,
    workspaceName: workspaceNames,
  };
}

/**
 * Returns AnVIL catalog study.
 * @param workspace - AnVIL catalog workspace.
 * @param study - AnVIL catalog study.
 * @returns AnVIL catalog study.
 */
function buildAnVILCatalogStudy(
  workspace: AnVILCatalogWorkspace,
  study: AnVILCatalogStudy
): AnVILCatalogStudy {
  const consentCodes = accumulateValue(
    study.consentCode, // consentCodes - a list of consent codes.
    workspace.consentCode
  );
  const consortium = workspace.consortium;
  const dataTypes = accumulateValues(study.dataTypes, workspace.dataTypes);
  const dbGapId = workspace.dbGapId;
  const diseases = accumulateValues(study.diseases, workspace.diseases);
  const participantCount = sumValues([
    study.participantCount,
    workspace.participantCount,
  ]);
  const studyDesigns = accumulateValues(
    study.studyDesigns,
    workspace.studyDesigns
  );
  const workspaceNames = accumulateValue(
    study.workspaceName, // workspaceNames - a list of workspace names.
    workspace.workspaceName
  );
  return {
    consentCode: consentCodes,
    consortium,
    dataTypes,
    dbGapId,
    diseases,
    participantCount,
    studyDesigns,
    workspaceCount: workspaceNames.length,
    workspaceName: workspaceNames,
  };
}

/**
 * Returns true if study has a valid dbGapId.
 * @param dbGapId - study identifier.
 * @returns true if the study has a valid dbGapId.
 */
function isStudy(dbGapId: string): boolean {
  if (!dbGapId) {
    return false;
  }
  return dbGapId.toLowerCase().startsWith("phs");
}
