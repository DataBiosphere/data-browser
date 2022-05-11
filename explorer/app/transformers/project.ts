/**
 * Projects transformers. Used to have a configurable way to transform different response models into a 
 * single view model expected by container components.
 */
import { ProjectResponse, ProjectViewModel } from "../models";

/**
 * Transforms a set of different response types (at the moment we only have ProjectResponse) to a viewModel, that will be used by 
 * @see ProjectDetailContainer
 * @param list Api's response type
 * @returns @see ProjectViewModel
 */
export const detailToView = (list: ProjectResponse): ProjectViewModel => ({
    json: JSON.stringify(list),
    projectName: list.projects[0].projectShortname
})