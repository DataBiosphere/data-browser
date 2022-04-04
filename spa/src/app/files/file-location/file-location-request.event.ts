/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted from file location-related components to notify parent components that a file location has been
 * requested by a user. This event is used as an output type for file location download and file location copy to
 * clipboard components.
 */

// App dependencies
import { FileLocationTrigger } from "./file-location-trigger.model";

export class FileLocationRequestEvent {
    /**
     * @param {string} fileUrl
     * @param fileName
     * @param {FileLocationTrigger} trigger
     */
    constructor(
        public readonly fileUrl: string,
        public readonly fileName,
        public trigger: FileLocationTrigger
    ) {}
}
