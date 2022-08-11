export interface AggregatedProject {
  estimatedCellCount?: number;
  projectTitle: string[];
}

export interface AggregatedProjectsResponse {
  projects: AggregatedProject[];
}

export interface AggregatedDonorOrganisms {
  disease: string[];
  genusSpecies: string[];
}

export interface AggregatedDonorOrganismsResponse {
  donorOrganisms: AggregatedDonorOrganisms[];
}

export interface AggregatedProtocols {
  libraryConstructionApproach: string[];
}

export interface AggregatedProtocolsResponse {
  protocols: AggregatedProtocols[];
}
