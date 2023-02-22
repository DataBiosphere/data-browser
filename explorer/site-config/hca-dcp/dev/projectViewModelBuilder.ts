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
import { PROJECTS_URL } from "./config";

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

/**
 * Build props for AnalysisPortals from the given projects response.
 * @param project - Response model return from projects API.
 * @returns model to be used as props for the AnalysisPortals component.
 */
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
