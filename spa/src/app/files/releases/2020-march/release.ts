/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of data release.
 */

// App dependencies
import { ReleaseProject } from "./release-project";

export interface Release {

    name: string;
    projects: ReleaseProject[];
}
