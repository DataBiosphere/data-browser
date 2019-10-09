/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a tertiary portal, that HCA Data Browser can redirect its users to.
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
