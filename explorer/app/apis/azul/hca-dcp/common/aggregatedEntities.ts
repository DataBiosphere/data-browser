export interface AggregatedProject {
  estimatedCellCount?: number;
  projectTitle: string[];
}

export interface AggregatedProjectResponse {
  projects: AggregatedProject[];
}
