/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project detail component.
 */

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { Project } from "../shared/project.model";

export interface ProjectDetailComponentState {

    catalog?: Catalog;
    externalResourcesExist?: boolean;
    loaded: boolean;
    project?: Project;
    projectInRelease?: boolean;
    projectSelected?: boolean;
}
