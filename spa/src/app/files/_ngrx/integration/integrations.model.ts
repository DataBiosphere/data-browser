/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of integration-related state, persisted in local store.
 */

// App dependencies
import { Portal } from "./portal.model";

export interface Integrations {
    integrationsByProjectId: Map<string, Portal[]>;
}
