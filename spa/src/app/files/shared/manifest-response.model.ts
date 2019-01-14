/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of download manifest response.
 */

// App dependencies
import { ManifestStatus } from "./manifest-status.model";

export interface ManifestResponse {

    fileUrl?: string;
    retryAfter?: number;
    status: ManifestStatus;
}
