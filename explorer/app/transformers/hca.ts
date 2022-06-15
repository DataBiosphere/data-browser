/**
 * Entity transformers. Used to have a configurable way to transform different response models into a
 * single view model expected by container components.
 */
import {
  ProjectListResponse,
  ProjectResponse,
  FileListResponse,
  SampleListResponse,
} from "../models/responses";
import { ListViewModel } from "../models/viewModels";

/**
 * Function to get the id of the given detail type
 * @param value project detail response
 * @returns project id
 */
export const getProjectId = (value: ProjectResponse) =>
  value.projects[0].projectId;

/**
 * Transforms a list of project items to a viewModel for hca project
 * @see ListContainer
 * @param list API's response type
 * @returns @see ListViewModel
 */
export const projectListToView = (list: ProjectListResponse): ListViewModel => {
  return {
    items: list.hits.map((hit) => ({
      name: hit.projects[0].projectTitle,
      uuid: hit.projects[0].projectId,
    })),
  };
};

/**
 * Transforms a list of file items to a viewModel for hca project
 * @see ListContainer
 * @param list API's response type
 * @returns @see ListViewModel
 */
export const filesListToView = (list: FileListResponse): ListViewModel => {
  return {
    items: list.hits.map((hit) => ({
      name: hit.files?.[0].name ?? "",
      uuid: hit.files?.[0].uuid ?? "",
    })),
  };
};

/**
 * Transforms a list of sample items to a viewModel for hca project
 * @see ListContainer
 * @param list API's response type
 * @returns @see ListViewModel
 */
export const samplesListToView = (list: SampleListResponse): ListViewModel => {
  return {
    items: list.hits.map((hit) => ({
      name: hit.samples?.[0].id ?? "",
      uuid: hit.samples?.[0].id ?? "",
    })),
  };
};
