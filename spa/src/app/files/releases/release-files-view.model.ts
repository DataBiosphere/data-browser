/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model of a release files; set of files grouped by file type. Used when displaying the set of release files in the release file modal. 
 */

// App dependencies
import { ReleaseFile } from "./release-file.model";

export interface ReleaseFilesView {

    type: string;
    files: ReleaseFile[];
}

