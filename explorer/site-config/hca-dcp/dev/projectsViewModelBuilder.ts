// Core dependencies
import React from "react";

// App dependencies
import * as C from "../../../app/components";
import { METADATA_KEY } from "../../../app/components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../app/components/Index/common/indexTransformer";
import { getProjectMetadataSpecies } from "../../../app/components/Index/common/projectsTransformer";
import { ProjectsResponse } from "../../../app/models/responses";

/**
 * Build props for project index species NTagCell component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project index species NTagCell.
 */
export const buildSpecies = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.SPECIES),
    values: getProjectMetadataSpecies(projectsResponse),
  };
};
