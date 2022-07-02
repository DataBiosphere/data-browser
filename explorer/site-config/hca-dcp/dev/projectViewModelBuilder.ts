// Core dependencies
import React from "react";

// App dependencies
import * as C from "app/components";
import {
  getProjectCollaboratingOrganizations,
  getProjectContacts,
  getProjectContributors,
  getProjectDataCurators,
  getProjectDescription,
  getProjectDetails,
  getProjectPath,
  getProjectPublications,
  getProjectSupplementaryLinks,
} from "app/components/Project/common/projectTransformer";
import { STATUS } from "app/components/StatusBadge/statusBadge";
import { ProjectsResponse } from "app/models/responses";
import { ENTRIES } from "app/project-edits";
import { concatStrings } from "app/utils/string";

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

export const projectsToProjStatus = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.StatusBadge> => {
  if (!project) {
    return { status: STATUS.NONE };
  }

  return { status: STATUS.NONE };
};

export const projectsToProjTitle = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.ProjectTitle> => {
  if (!project) {
    return { projectTitle: "" };
  }

  return {
    projectTitle: project?.projects[0].projectTitle,
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
        url: `/explore/projects/${project.projects[0].projectId}`,
      },
    ],
  };
};

/* eslint-disable sonarjs/no-duplicate-string -- ignoring duplicate strings here */
export const projectsToSpeciesColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Text> => {
  if (!project.donorOrganisms) {
    return {
      children: "",
    };
  }
  return {
    children: concatStrings(
      project.donorOrganisms.flatMap((orgnanism) => orgnanism.genusSpecies)
    ),
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const projectsToCellCountColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Text> => {
  if (!project.cellSuspensions?.[0]) {
    return {
      children: "",
    };
  }
  return {
    children: `${formatter.format(project.cellSuspensions[0].totalCells)}`,
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const projectsToLibConstApproachColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Text> => {
  if (!project.protocols?.[0].libraryConstructionApproach) {
    return {
      children: "",
    };
  }

  return {
    children: concatStrings(project.protocols[0].libraryConstructionApproach),
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const projectsToAnatomicalEntityColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Text> => {
  if (!project.samples?.[0]?.organ) {
    return {
      children: "",
    };
  }
  return {
    children: concatStrings(project.samples[0].organ),
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const projectsToDiseaseDonorColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Text> => {
  if (!project.donorOrganisms?.[0]) {
    return {
      children: "",
    };
  }

  return {
    children: concatStrings(project.donorOrganisms[0].disease),
    customColor: "ink",
    variant: "text-body-400",
  };
};
/* eslint-enable sonarjs/no-duplicate-string -- watching for duplicate strings here */
