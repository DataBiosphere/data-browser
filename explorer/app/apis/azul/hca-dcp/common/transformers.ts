import { FilesResponse } from "./entities";
import { concatStrings } from "../../../../utils/string";
import { humanFileSize } from "../../../../utils/fileSize";

export const filesToFileName = (file: FilesResponse): string =>
  file.files[0].name ?? "";

export const filesToFileFormat = (file: FilesResponse): string =>
  file.files[0].format ?? "";

export const filesToProjTitle = (file: FilesResponse): string =>
  concatStrings(file.projects[0].projectTitle) ?? "";

export const filesToFileSize = (file: FilesResponse): string =>
  humanFileSize(file.files[0].size) ?? "";

export const filesToContentDesc = (file: FilesResponse): string =>
  concatStrings(file.files[0].contentDescription) ?? "";

export const filesToCellCount = (file: FilesResponse): number =>
  file.projects[0].estimatedCellCount ?? 0;
