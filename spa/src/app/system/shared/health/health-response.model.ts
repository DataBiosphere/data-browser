/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of health response.
 */

// App dependencies
import { HealthRequestStatus } from "./health-request-status.model";

export interface HealthResponse {

    ok: boolean;
    indexing: boolean;
    status: HealthRequestStatus;
}
