/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a downloadable data file of a study, included in a project.
 */

// App dependencies
import { ReleaseFileType } from "./release-file-type.model";

export interface ReleaseFile {

    extension: string;
    type: ReleaseFileType;
    url: string;
}
