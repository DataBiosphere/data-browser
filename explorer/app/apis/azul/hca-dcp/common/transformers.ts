import { concatStrings } from "../../../../utils/string";
import { humanFileSize } from "../../../../utils/fileSize";
import { FilesResponse } from "./responses";
import { SamplesResponse } from "./entities";

//FilesResponse

export const filesGetFileName = (file: FilesResponse): string =>
  file.files[0].name ?? "";

export const filesGetFileFormat = (file: FilesResponse): string =>
  file.files[0].format ?? "";

export const filesGetFileUrl = (file: FilesResponse): string =>
  file.files[0].url ?? "";

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

export const samplesGetLibConsApproach = (sample: SamplesResponse): string =>
  concatStrings(sample?.protocols[0]?.libraryConstructionApproach ?? []) ?? "";

export const samplesGetAnatomicalEntity = (sample: SamplesResponse): string =>
  concatStrings(sample?.samples[0]?.organ ?? []) ?? "";

export const samplesGetDiseaseDonor = (sample: SamplesResponse): string =>
  concatStrings(sample?.donorOrganisms[0]?.disease ?? []) ?? "";

export const samplesGetCellCount = (sample: SamplesResponse): number =>
  sample?.projects[0]?.estimatedCellCount ?? 0;
