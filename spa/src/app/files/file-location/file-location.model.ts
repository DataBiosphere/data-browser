/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * File location including current status of file location request.
 */

// App dependencies
import { FileLocationStatus } from "./file-location-status.model";

export interface FileLocation {

    fileUrl?: string;
    retryAfter?: number;
    status: FileLocationStatus
}
