import * as C from "../../../../components";

import * as Transformers from "../../../../apis/azul/hca-dcp/common/transformers";
import { FilesResponse } from "../../../../apis/azul/hca-dcp/common/responses";
import { SamplesResponse } from "../../../../apis/azul/hca-dcp/common/entities";

// Files view builders

export const filesBuildFileName = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetFileName(file),
  };
};

export const filesBuildFileDownload = (
  file: FilesResponse
): React.ComponentProps<typeof C.AzulFileDownload> => {
  return {
    url: Transformers.filesGetFileUrl(file),
  };
};

export const filesBuildFileFormat = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetFileFormat(file),
  };
};

export const filesBuildProjTitle = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetProjTitle(file),
  };
};

export const filesBuildFileSize = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetFileSize(file),
  };
};

export const filesBuildContentDesc = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetContentDesc(file),
  };
};

export const filesBuildCellCount = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetCellCount(file),
  };
};

// Samples view builders

export const samplesBuildSampleId = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetSampleId(sample),
  };
};
export const samplesBuildProjTitle = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetProjTitle(sample),
  };
};
export const samplesBuildSpecies = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetSpecies(sample),
  };
};
export const samplesBuildSampleType = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetSampleType(sample),
  };
};
export const samplesBuildLibConsApproach = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetLibConsApproach(sample),
  };
};
export const samplesBuildAnatomicalEntity = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetAnatomicalEntity(sample),
  };
};
export const samplesBuildDiseaseDonor = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetDiseaseDonor(sample),
  };
};
export const samplesBuildCellCount = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetCellCount(sample),
  };
};
