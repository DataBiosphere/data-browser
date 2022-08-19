import React from "react";
import {
  FilesResponse,
  SamplesResponse,
} from "../../../../apis/azul/hca-dcp/common/responses";
import * as Transformers from "../../../../apis/azul/hca-dcp/common/transformers";
import * as C from "../../../../components";

/**
 * Build props for TitledText component for the display of the data release policy section.
 * @returns model to be used as props for the TitledText component.
 */
export const buildDataReleasePolicy = (): React.ComponentProps<
  typeof C.TitledText
> => {
  return {
    text: [
      "Downloaded data is governed by the HCA Data Release Policy and licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). For more information please see our Data Use Agreement.",
    ],
  };
};

/**
 * Build props for ExportMethod component for display of the export to curl command metadata section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportToCurlCommand = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  disabled: false,
  route: "/export",
  title: "Download Study Data and Metadata (Curl Command)",
});

/**
 * Build props for ExportMethod component for display of the export to terra metadata section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportToTerraMetadata = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Analyze in Terra",
  description:
    "Terra is a biomedical research platform to analyze data using workflows, Jupyter Notebooks, RStudio, and Galaxy.",
  disabled: false,
  route: "/export/export-to-terra",
  title: "Export Study Data and Metadata to Terra Workspace",
});

/**
 * Build props for ExportMethod component for display of the export to cavatica metadata section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportToCavaticaMetadata = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Analyze in CAVATICA",
  description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  disabled: false,
  route: "/export",
  title: "Export to CAVATICA",
});

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
