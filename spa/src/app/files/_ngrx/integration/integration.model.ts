/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of an integration return from Azul, that provides visualizations of HCA data. Note this specific to the Azul
 * integrations response, and is separate from the project matrix-specific analysis portal model.
 */

// App dependencies
import { IntegrationType } from "./integration-type.model";
import { EntityType } from "../../shared/entity-type.model";

export interface Integration {
    entityIds: string[];
    entityType: EntityType;
    integrationId: string;
    integrationType: IntegrationType;
    portalUrl: string;
    title: string;
}
