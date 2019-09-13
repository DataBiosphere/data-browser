/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get data component.
 */

// App dependencies
import { Config } from "../../config/config.model";
import EntitySpec from "../shared/entity-spec";
import { FileFacet } from "../shared/file-facet.model";

export interface HCAGetDataState {

    fileFacets: FileFacet[];
    matrixSupported: boolean;
    matrixSupportedLoaded: boolean;
    selectedEntity: EntitySpec;
}
