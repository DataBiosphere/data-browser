import { AnVILCatalogWorkspace } from "../../app/apis/catalog/anvil-catalog/common/entities";
import { DbGapStudy, getStudy } from "../common/dbGaP";

export interface AnVILCatalog {
  bucketName: string;
  bucketSize: number;
  COL: string;
  consentLongName: string;
  consentTitle: string;
  consortium: string;
  discoveryCount: number;
  diseaseText: string;
  DS: string;
  familyCount: number;
  GRU: string;
  GSO: string;
  HMB: string;
  IRB: string;
  "library:datatype": string[];
  "library:dataUseRestriction": string;
  "library:indication": string[];
  "library:studyDesign": string[];
  MDS: string;
  name: string;
  NPU: string;
  NRES: string;
  participantCount: number;
  phsId: string;
  PUB: string;
  requestorPays: boolean;
  sampleCount: number;
  status: string;
  subjectCount: number;
}

/**
 * Returns AnVIL catalog workspaces.
 * @param anVILCatalog - from tsv
 * @param dbGapStudy - from dbGap
 * @returns AnVIL catalog workspaces.
 */
export function buildAnVILCatalogWorkspace(
  anVILCatalog: AnVILCatalog,
  dbGapStudy: DbGapStudy | null
): AnVILCatalogWorkspace {
  const workspace: AnVILCatalogWorkspace = {
    consentCode: anVILCatalog["library:dataUseRestriction"],
    consortium: anVILCatalog.consortium,
    dataType: anVILCatalog["library:datatype"],
    dbGapId: anVILCatalog.phsId,
    disease: anVILCatalog["library:indication"],
    participantCount: anVILCatalog.participantCount,
    studyAccession: dbGapStudy?.studyAccession ?? "",
    studyDesign: anVILCatalog["library:studyDesign"],
    studyName: dbGapStudy?.title ?? "",
    workspaceName: anVILCatalog.name,
  };
  return workspace;
}

export async function buildAnVILCatalogWorkspaces(
  tsvWorkspaces: AnVILCatalog[]
): Promise<AnVILCatalogWorkspace[]> {
  const anVILCatalogWorkspaces: AnVILCatalogWorkspace[] = [];

  // build workspaces
  for (const tsvWorkspace of tsvWorkspaces as AnVILCatalog[]) {
    const study = await getStudy(tsvWorkspace.phsId);
    const anVILCatalogWorkspace = buildAnVILCatalogWorkspace(
      tsvWorkspace,
      study
    );
    anVILCatalogWorkspaces.push(anVILCatalogWorkspace);
    console.log(
      anVILCatalogWorkspace.workspaceName,
      anVILCatalogWorkspace.studyName
    );
  }
  return anVILCatalogWorkspaces;
}
