/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get data layout options component.
 */

// App dependencies
import EntitySpec from "../../shared/entity-spec";

export interface GetDataOptionsComponentState {

    loaded: boolean;
    selectedEntity?: EntitySpec;
}
