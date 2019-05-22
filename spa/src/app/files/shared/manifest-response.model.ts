/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
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
