/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project detail component.
 */

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import EntitySpec from "../shared/entity-spec";
import { Project } from "../shared/project.model";

export interface ProjectDetailComponentState {
    catalog?: Catalog;
    loaded: boolean;
    project?: Project;
    projectSelected?: boolean;
    selectedEntity?: EntitySpec;
}
