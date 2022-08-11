/**
 * Model of response returned from /index/files API endpoint.
 */
export interface FilesEntity {
  contentDescription: string[];
  format: string;
  name: string;
  size: number;
  url: string;
  uuid: string;
}

export interface FilesEntityResponse {
  files: FilesEntity[];
}

/**
 * Model of response returned from /index/samples API endpoint.
 */
export interface SamplesResponse {
  donorOrganisms: {
    disease: string[];
    genusSpecies: string[];
  }[];
  projects: {
    estimatedCellCount?: number;
    projectTitle: string[];
  }[];
  protocols: {
    libraryConstructionApproach: string[];
  }[];
  samples: {
    id: string;
    organ: string;
    sampleEntityType: string;
  }[];
}
