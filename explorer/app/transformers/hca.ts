/**
 * Entity transformers. Used to have a configurable way to transform different response models into a
 * single view model expected by container components.
 */
import { ProjectsResponse } from "../models/responses";

/**
 * Function to get the id of the given detail type
 * @param value project detail response
 * @returns project id
 */
export const getProjectId = (value: ProjectsResponse) =>
  value.projects[0].projectId;
