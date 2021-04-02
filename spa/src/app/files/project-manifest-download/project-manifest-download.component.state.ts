/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project manifest download component.
 */

// App dependencies
import { FileLocation } from "../file-location/file-location.model";

export interface ProjectManifestDownloadComponentState {
    
    fileLocation?: FileLocation;
}
