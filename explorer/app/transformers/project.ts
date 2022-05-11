import { ProjectResponse, ProjectViewModel } from "../models";

export const detailToView = (list: ProjectResponse): ProjectViewModel => ({
    json: JSON.stringify(list),
    projectName: list.projects[0].projectShortname
})