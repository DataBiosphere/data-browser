/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project expression matrices component.
 */

// App dependencies
import { FileLocation } from "../file-location/file-location.model";
import { Project } from "../shared/project.model";

export interface ProjectMatricesComponentState {

    loaded: boolean;
    project?: Project;
    projectMatrixFileLocationsByFileUrl?:  Map<string, FileLocation>;
}
