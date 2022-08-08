import { FilesResponse } from "../../../../apis/azul/hca-dcp/common/entities";
import * as C from "../../../../components";

import {
  filesToCellCount,
  filesToContentDesc,
  filesToFileFormat,
  filesToFileName,
  filesToFileSize,
  filesToProjTitle,
} from "../../../../apis/azul/hca-dcp/common/transformers";

export const buildFileName = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: filesToFileName(file),
  };
};

export const buildFileFormat = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: filesToFileFormat(file),
  };
};

export const buildProjTitle = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: filesToProjTitle(file),
  };
};

export const buildFileSize = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: filesToFileSize(file),
  };
};

export const buildContentDesc = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: filesToContentDesc(file),
  };
};

export const buildCellCount = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: filesToCellCount(file),
  };
};
