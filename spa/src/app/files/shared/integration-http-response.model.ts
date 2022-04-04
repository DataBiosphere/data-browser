/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP integrations response, before it is parsed into FE-friendly format (ie Portal[]).
 */

export interface IntegrationHttpResponse {
    portal_id: string;
    portal_name: string;
    portal_icon: string;
    contact_email: string;
    organization_name: string;
    portal_description: string;
    integrations: [
        {
            integration_id: string;
            integration_type: string;
            entity_type: string;
            title: string;
            entity_ids: string[];
            portal_url: string;
        }
    ];
}
