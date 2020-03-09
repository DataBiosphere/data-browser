/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model of a file contained in a release. 
 */

// App dependencies
import { ReleaseFileType } from "./release-file-type.model";

export interface ReleaseFileView {

    description: string;
    extension: string;
    type: ReleaseFileType;
    url: string;
}

