/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of health response.
 */

// App dependencies
import { HealthRequestStatus } from "./health-request-status.model";

export interface HealthResponse {

    indexing: boolean;
    status: HealthRequestStatus;
}
