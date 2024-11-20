import { AnVILCatalogWorkspace } from "../../app/apis/catalog/anvil-catalog/common/entities";
import { DbGapStudy } from "../../app/apis/catalog/common/entities";
import { generateConsentDescriptions } from "../common/consent-codes";
import { getStudy } from "../common/dbGaP";
import { workspaceEdits } from "./constants";

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
export async function buildAnVILCatalogWorkspace(
  anVILCatalog: AnVILCatalog,
  dbGapStudy: DbGapStudy | null
): Promise<AnVILCatalogWorkspace> {
  const consentCode = anVILCatalog["library:dataUseRestriction"];
  const edits = workspaceEdits.find(
    (e) => e.workspaceName === anVILCatalog.name
  );
  const workspace: AnVILCatalogWorkspace = {
    bucketSize: anVILCatalog.bucketSize,
    consentCode,
    consentLongName: {
      [consentCode]: (await generateConsentDescriptions(consentCode))
        .consentLongName,
    },
    consortium: anVILCatalog.consortium,
    dataType: anVILCatalog["library:datatype"],
    dbGapId: anVILCatalog.phsId,
    disease: anVILCatalog["library:indication"],
    participantCount: Math.max(
      anVILCatalog.participantCount,
      anVILCatalog.subjectCount
    ),
    studyAccession: dbGapStudy?.studyAccession ?? "",
    studyDesign: anVILCatalog["library:studyDesign"],
    studyName: dbGapStudy?.title ?? "",
    workspaceName: anVILCatalog.name,
    ...edits,
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
    const anVILCatalogWorkspace = await buildAnVILCatalogWorkspace(
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
