/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a tertiary portal return from Azul, that HCA Data Browser can redirect its users to. Note this specific
 * to the Azul integrations response, and is separate from the project matrix-specific analysis portal model.
 */

// App dependencies
import { Integration } from "./integration.model";

export interface Portal {
    contactEmail: string;
    integrations: Integration[];
    organizationName: string;
    portalDescription: string;
    portalIcon: string;
    portalId: string;
    portalName: string;
}
