/**
 * Projects transformers. Used to have a configurable way to transform different response models into a
 * single view model expected by container components.
 */
import {
  ProjectItemViewModel,
  ProjectResponse,
  ProjectViewModel,
  ProjectListResponse,
  ProjectListViewModel,
} from "../models";

/**
 * Transforms a set of different response types (at the moment we only have ProjectResponse) to a viewModel, that will be used by
 * @see ProjectDetailContainer
 * @param value Api's response type
 * @returns @see ProjectViewModel
 */
export const detailToView = (value: ProjectResponse): ProjectViewModel => ({
  json: JSON.stringify(value, null, 2),
  projectName: value.projects[0].projectTitle,
});

/**
 * Transforms a set of different response types (at the moment we only have ProjectListResponse) to a viewModel, that will be used by
 * @see ProjectListContainer
 * @param list API's response type
 * @returns @see ProjectListViewModel
 */
export const listToView = (list: ProjectListResponse): ProjectListViewModel => {
  return {
    items: list.hits.map((hit) => ({
      projectName: hit.projects[0].projectTitle,
      uuid: hit.projects[0].projectId,
    })),
  };
};
