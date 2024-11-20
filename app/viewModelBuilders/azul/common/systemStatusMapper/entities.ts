/**
 * Model of raw HTTP index response.
 */
export interface IndexHttpResponse {
  progress: {
    unindexed_bundles: number;
    unindexed_documents: number;
  };
  up: boolean;
}
