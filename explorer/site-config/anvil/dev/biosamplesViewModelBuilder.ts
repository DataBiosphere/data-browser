// Core dependencies
import React from "react";

// App dependencies
import * as C from "../../../app/components";
import {
  getAnatomicalSite,
  getBiosampleId,
  getBiosampleType,
  getDatasetName,
  getOrganismType,
  getPhenotypicSex,
} from "../../../app/components/Index/common/biosamplesTransformer";
import { METADATA_KEY } from "../../../app/components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../app/components/Index/common/indexTransformer";
import { BiosamplesResponse } from "../../../app/models/responses";

/**
 * Build props for anatomical site Cell component from the given biosamples response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns model to be used as props for the anatomical site cell.
 */
export const buildAnatomicalSite = (
  biosamplesResponse: BiosamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getAnatomicalSite(biosamplesResponse),
  };
};

/**
 * Build props for biosample id Cell component from the given biosamples response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns model to be used as props for the biosample id cell.
 */
export const buildBiosampleId = (
  biosamplesResponse: BiosamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBiosampleId(biosamplesResponse),
  };
};

/**
 * Build props for biosample type Cell component from the given biosamples response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns model to be used as props for the biosample type cell.
 */
export const buildBiosampleType = (
  biosamplesResponse: BiosamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBiosampleType(biosamplesResponse),
  };
};

/**
 * Build props for dataset name NTagCell component from the given biosamples response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns model to be used as props for the dataset name NTagCell.
 */
export const buildDatasetName = (
  biosamplesResponse: BiosamplesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATASET_NAME),
    values: getDatasetName(biosamplesResponse),
  };
};

/**
 * Build props for organism type NTagCell component from the given biosamples response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns model to be used as props for the organism type NTagCell.
 */
export const buildOrganismType = (
  biosamplesResponse: BiosamplesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ORGANISM_TYPE),
    values: getOrganismType(biosamplesResponse),
  };
};

/**
 * Build props for phenotypic sex NTagCell component from the given biosamples response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns model to be used as props for the phenotypic sex NTagCell.
 */
export const buildPhenotypicSex = (
  biosamplesResponse: BiosamplesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.PHENOTYPIC_SEX),
    values: getPhenotypicSex(biosamplesResponse),
  };
};
