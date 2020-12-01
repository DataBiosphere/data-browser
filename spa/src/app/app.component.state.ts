/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing top level app component.
 */

// App dependencies
import { Catalog } from "./files/catalog/catalog.model";
import { SystemStatus } from "./system/_ngrx/system-status.model";

export interface AppComponentState {

    catalog?: Catalog;
    systemStatus?: SystemStatus;
}
