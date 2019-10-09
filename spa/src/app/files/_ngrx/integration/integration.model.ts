/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of an integration, that provides visualizations of HCA data.
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
