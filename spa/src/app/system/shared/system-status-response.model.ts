/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of current system status as returned from the backend.
 */

// App dependencies
import { IndexRequestStatus } from "./index/index-request-status.model";

export interface SystemStatusResponse {
    ok: boolean;
    indexing: boolean;
    indexingStatus: IndexRequestStatus;
}
