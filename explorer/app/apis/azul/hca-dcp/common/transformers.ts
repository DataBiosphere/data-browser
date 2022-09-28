import { MetadataValue } from "../../../../components/Index/common/entities";
import { ProjectsResponse } from "../../../../models/responses";
import { humanFileSize } from "../../../../utils/fileSize";
import { concatStrings } from "../../../../utils/string";
import { LABEL } from "../../common/entities";
import {
  processAggregatedOrArrayValue,
  processEntityValue,
  processNumberEntityValue,
} from "../../common/utils";
import { FilesResponse, SamplesResponse } from "./responses";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

// TODO(Dave or Fran) review data tolerance of nulls.
export const filesGetFileName = (file: FilesResponse): string =>
  file.files[0].name ?? "";

export const filesGetFileFormat = (file: FilesResponse): string =>
  file.files[0].format ?? "";

export const filesGetFileUrl = (file: FilesResponse): string | undefined =>
  file.files[0].url;

export const filesGetProjTitle = (file: FilesResponse): string =>
  concatStrings(file.projects[0].projectTitle) ?? "";

export const filesGetFileSize = (file: FilesResponse): string =>
  humanFileSize(file.files[0].size) ?? "";

export const filesGetContentDesc = (file: FilesResponse): string =>
  concatStrings(file.files[0].contentDescription) ?? "";

export const filesGetCellCount = (file: FilesResponse): number =>
  file.projects[0].estimatedCellCount ?? 0;

// SamplesResponse

export const samplesGetSampleId = (sample: SamplesResponse): string =>
  concatStrings(sample?.samples[0]?.id ?? []) ?? "";

export const samplesGetProjTitle = (sample: SamplesResponse): string =>
  concatStrings(sample?.projects[0]?.projectTitle ?? []) ?? "";

export const samplesGetSpecies = (sample: SamplesResponse): string[] =>
  sample?.donorOrganisms?.flatMap((organism) => organism.genusSpecies) ?? "";

export const samplesGetSampleType = (sample: SamplesResponse): string =>
  concatStrings(sample?.samples[0]?.sampleEntityType ?? []) ?? "";

export const samplesGetLibraryConstructionApproach = (
  sample: SamplesResponse
): string[] => sample?.protocols[0]?.libraryConstructionApproach ?? [];

export const samplesGetAnatomicalEntity = (sample: SamplesResponse): string[] =>
  [sample?.samples[0]?.organ] ?? [];

export const samplesGetDiseaseDonor = (sample: SamplesResponse): string[] =>
  sample?.donorOrganisms[0]?.disease ?? [];

export const samplesGetCellCount = (sample: SamplesResponse): number =>
  sample?.projects[0]?.estimatedCellCount ?? 0;

/** Returns the project title
 * @param projectsResponse - Response model from projects API
 * @returns String containing the project title
 */
export function getProjectsTitleName(
  projectsResponse: ProjectsResponse
): string {
  return processEntityValue(projectsResponse.projects, "projectTitle");
}

/** Returns the project url
 * @param projectsResponse - Response model from projects API
 * @returns String containing the project url
 */
export function getProjectsTitleUrl(
  projectsResponse: ProjectsResponse
): string {
  return `/projects/${processEntityValue(
    projectsResponse.projects,
    "projectId"
  )}`;
}

/**
 * Maps the metadata species from the projects API.
 * @param projectsResponse - Response model return from projects API.
 * @returns project species.
 */
export function getProjectMetadataSpecies(
  projectsResponse?: ProjectsResponse
): MetadataValue[] {
  return processAggregatedOrArrayValue(
    projectsResponse?.donorOrganisms ?? [],
    "genusSpecies"
  );
}

/** Returns the formatted cell count
 * @param projectsResponse - Response model from projects API
 * @returns String containing the formatted cell count
 */
export function getProjectsCellCountColumn(
  projectsResponse: ProjectsResponse
): string {
  return `${formatter.format(
    processNumberEntityValue(
      projectsResponse.cellSuspensions ?? [],
      "totalCells"
    )
  )}`;
}

/**
 * Returns an array of development stages
 * @param projectsResponse - Response model from projects API
 * @returns List of metadata values for the development stage cell
 */
export function getProjectsDevelopmentStage(
  projectsResponse: ProjectsResponse
): MetadataValue[] {
  return processAggregatedOrArrayValue(
    projectsResponse.donorOrganisms,
    "developmentStage"
  );
}

/**
 * Returns an array for the library construction approach column
 * @param projectsResponse - Response model from projects API
 * @returns List of metadata values for the library construction approach cell
 */
export function getProjectsLibraryConstructionApproachColumn(
  projectsResponse: ProjectsResponse
): MetadataValue[] {
  //TODO: Refactor to use utils functions, currently having typing issues
  if (!projectsResponse.protocols[0].libraryConstructionApproach) {
    return [LABEL.UNSPECIFIED];
  } else {
    return projectsResponse.protocols[0]?.libraryConstructionApproach;
  }
}

/**
 * Returns an array for the anatomical entity column
 * @param projectsResponse - Response model from projects API
 * @returns List of metadata values for the anatomical entity approach cell
 */
export function getProjectsAnatomicalEntityColumn(
  projectsResponse: ProjectsResponse
): MetadataValue[] {
  return processAggregatedOrArrayValue(projectsResponse.samples, "organ");
}

/**
 * Returns an array for the disease (donor) column
 * @param projectsResponse - Response model from projects API
 * @returns List of metadata values for the disease (donor) cell
 */
export function getProjectsDiseaseDonor(
  projectsResponse: ProjectsResponse
): MetadataValue[] {
  return processAggregatedOrArrayValue(
    projectsResponse?.donorOrganisms,
    "disease"
  );
}
