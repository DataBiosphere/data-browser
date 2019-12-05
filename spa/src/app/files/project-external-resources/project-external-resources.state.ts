/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project external resources component.
 */

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";

export interface ProjectExternalResourcesState {

    integrations: Portal[];
    integratedWithTertiaryPortals: boolean;
}
