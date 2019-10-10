/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of index response.
 */

// App dependencies
import { IndexRequestStatus } from "./index-request-status.model";

export interface IndexResponse {

    ok: boolean;
    indexing: boolean;
    status: IndexRequestStatus;
}
