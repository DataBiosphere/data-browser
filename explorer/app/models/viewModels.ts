//Project
export interface ProjectViewModel {
  json: string;
  projectName: string;
}

export interface ProjectItemViewModel {
  uuid: string;
  projectName: string;
}

export interface ProjectListViewModel {
  items: ProjectItemViewModel[];
}
