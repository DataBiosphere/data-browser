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

export interface SamplesEntity {
  id: string;
  organ: string;
  sampleEntityType: string;
}

export interface SamplesEntityResponse {
  samples: SamplesEntity[];
}
