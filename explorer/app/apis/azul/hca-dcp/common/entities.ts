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
