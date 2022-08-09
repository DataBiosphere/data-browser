/**
 * Model of response returned from /index/files API endpoint.
 */
export interface FilesResponse {
  files: {
    contentDescription: string[];
    format: string;
    name: string;
    size: number;
    url: string;
    uuid: string;
  }[];
  projects: {
    estimatedCellCount?: number;
    projectTitle: string[];
  }[];
}
