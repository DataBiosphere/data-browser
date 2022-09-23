import * as C from "app/components";
import {
  getProjectBreadcrumbs,
  getProjectCollaboratingOrganizations,
  getProjectContacts,
  getProjectContributors,
  getProjectDataCurators,
  getProjectDescription,
  getProjectDetails,
  getProjectPath,
  getProjectPublications,
  getProjectStatus,
  getProjectSupplementaryLinks,
  getProjectTitle,
} from "app/components/Project/common/projectTransformer";
import { ProjectsResponse } from "app/models/responses";
import { ENTRIES } from "app/project-edits";
import React from "react";
import { METADATA_KEY } from "../../../app/components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../app/components/Index/common/indexTransformer";
import { PROJECTS_URL } from "./config";

const formatter = Intl.NumberFormat("en", { notation: "compact" });
/**
 * Build props for Citation component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the Citation component.
 */
export const buildCitation = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Citation> => {
  return {
    projectPath: getProjectPath(projectsResponse),
  };
};

/**
 * Build props for CollaboratingOrganizations component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the CollaboratingOrganizations component.
 */
export const buildCollaboratingOrganizations = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.CollaboratingOrganizations> => {
  return {
    collaboratingOrganizations:
      getProjectCollaboratingOrganizations(projectsResponse),
  };
};

/**
 * Build props for Contacts component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the Contacts component.
 */
export const buildContacts = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Contacts> => {
  return {
    contacts: getProjectContacts(projectsResponse),
  };
};

/**
 * Build props for Contributors component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the Contributors component.
 */
export const buildContributors = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Contributors> => {
  return {
    contributors: getProjectContributors(projectsResponse),
  };
};

/**
 * Build props for DataCurators component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the DataCurators component.
 */
export const buildDataCurators = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.DataCurators> => {
  return {
    dataCurators: getProjectDataCurators(projectsResponse),
  };
};

/**
 * Build props for Description component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the Description component.
 */
export const buildDescription = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Description> => {
  return {
    projectDescription: getProjectDescription(projectsResponse) || "None",
  };
};

/**
 * Build props for Details component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the Details component.
 */
export const buildDetails = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Details> => {
  return {
    keyValuePairs: getProjectDetails(projectsResponse),
    title: "Project Details",
  };
};

/**
 * Build props for Hero component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildHero = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  const firstCrumb = { path: PROJECTS_URL, text: "Explore" };
  return {
    breadcrumbs: getProjectBreadcrumbs(firstCrumb, projectsResponse),
    status: getProjectStatus(projectsResponse), // TODO status https://github.com/clevercanary/data-browser/issues/135
    title: getProjectTitle(projectsResponse),
  };
};

/**
 * Build props for Publications component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the Publications component.
 */
export const buildPublications = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Publications> => {
  return {
    publications: getProjectPublications(projectsResponse),
  };
};

/**
 * Build props for SupplementaryLinks component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the SupplementaryLinks component.
 */
export const buildSupplementaryLinks = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.SupplementaryLinks> => {
  return {
    supplementaryLinks: getProjectSupplementaryLinks(projectsResponse),
  };
};

export const projectsToFileCounts = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.FileCounts> => {
  if (!project) {
    return { files: [] };
  }

  return {
    files: project.fileTypeSummaries.map((file) => ({
      count: file.count,
      name: file.format,
    })),
  };
};

export const projectsToAnalysisPortals = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.IconList> => {
  if (!project.entryId) {
    return { icons: [] };
  }

  const entry = ENTRIES.find((entry) => entry.entryId === project.entryId);
  if (!entry?.analysisPortals) {
    return { icons: [] };
  }

  return {
    icons: entry.analysisPortals.map((entry) => ({
      icon: {
        alt: entry.label ?? "",
        path: entry.icon,
      },
      label: entry.label,
    })),
  };
};

export const projectsToProjectTitleColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Links> => {
  return {
    links: [
      {
        label: project.projects[0].projectTitle,
        url: `/projects/${project.projects[0].projectId}`,
      },
    ],
  };
};

/* eslint-disable sonarjs/no-duplicate-string -- ignoring duplicate strings here */
export const projectsToCellCountColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Text> => {
  if (!project.cellSuspensions?.[0]) {
    return {
      children: "",
    };
  }
  // TODO review estimated cell count query.
  return {
    children: `${formatter.format(project.cellSuspensions[0].totalCells)}`,
    customColor: "ink",
    variant: "text-body-400",
  };
};

/**
 * Build props for the Development stage Text component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the development stage table column.
 */
export const buildDevStage = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  if (!projectsResponse.donorOrganisms) {
    return {
      label: getPluralizedMetadataLabel(METADATA_KEY.DEVELOPMENT_STAGE),
      values: [],
    };
  }
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DEVELOPMENT_STAGE),
    values: projectsResponse.donorOrganisms.flatMap(
      (organism) => organism.developmentStage
    ),
  };
};

export const projectsToLibraryConstructionApproachColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  if (!project.protocols?.[0].libraryConstructionApproach) {
    return {
      label: getPluralizedMetadataLabel(
        METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
      ),
      values: [],
    };
  }

  return {
    label: getPluralizedMetadataLabel(
      METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
    ),
    values: project.protocols[0]?.libraryConstructionApproach,
  };
};

export const projectsToAnatomicalEntityColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  if (!project.samples?.[0]?.organ) {
    return {
      label: getPluralizedMetadataLabel(METADATA_KEY.ANATOMICAL_ENTITY),
      values: [],
    };
  }
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ANATOMICAL_ENTITY),
    values: project.samples[0].organ,
  };
};

export const projectsToDiseaseDonorColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  if (!project?.donorOrganisms[0]?.disease) {
    return {
      label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_DONOR),
      values: [],
    };
  }

  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_DONOR),
    values: project?.donorOrganisms[0]?.disease,
  };
};
/* eslint-enable sonarjs/no-duplicate-string -- watching for duplicate strings here */
