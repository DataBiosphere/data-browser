/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating integrations-related functionality.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { EntityType } from "./entity-type.model";
import { HttpService } from "../http/http.service";
import { Portal } from "../_ngrx/integration/portal.model";
import { IntegrationHttpResponse } from "./integration-http-response.model";
import { Integration } from "../_ngrx/integration/integration.model";
import { IntegrationType } from "../_ngrx/integration/integration-type.model";

@Injectable()
export class IntegrationService {
    /**
     * @param {ConfigService} configService
     * @param {HttpService} httpService
     * @param {HttpClient} httpClient
     */
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private httpClient: HttpClient
    ) {}

    /**
     * Request the set of integrations for the specified project.
     *
     * @param {Catalog} catalog
     * @param {string} projectId
     * @returns {Observable<Portal[]>}
     */
    public fetchIntegrationsByProjectId(
        catalog: Catalog,
        projectId: string
    ): Observable<Portal[]> {
        // Disable integrations - see #1415.
        if (true) {
            return of([]);
        }

        const url = this.configService.getIntegrationsUrl();

        const integrationParams = {
            integration_type: IntegrationType.GET,
            entity_type: EntityType.PROJECT,
            entity_ids: [projectId],
        };
        const params = this.httpService.createIndexParams(
            catalog,
            integrationParams
        );
        return this.httpClient.get<Portal[]>(url, { params }).pipe(
            catchError(() => of([])), // Convert error response to []
            map(this.bindIntegrationsByProjectIdResponse.bind(this))
        );
    }

    /**
     * Normalize response to FE-friendly format. Integrations are modeled as an array of portals that contain an array
     * of specific integrations. Each integration lists the projects it is associated with.
     *
     * @param {IntegrationHttpResponse[]} responseIntegrations
     * @returns {Portal[]}
     */
    private bindIntegrationsByProjectIdResponse(
        responseIntegrations: IntegrationHttpResponse[]
    ): Portal[] {
        // Iterate over the set of portals and build up FE model of each
        return responseIntegrations.reduce((accum, responsePortal) => {
            const portal = {
                contactEmail: responsePortal.contact_email,
                organizationName: responsePortal.organization_name,
                portalDescription: responsePortal.portal_description,
                portalIcon: responsePortal.portal_icon,
                portalId: responsePortal.portal_id,
                portalName: responsePortal.portal_name,
            } as Portal;

            // For this portal, iterate over the set of integrations and build up FE model of each and add to portal model.
            const integrations = responsePortal.integrations.reduce(
                (iAccum, responseIntegration) => {
                    const integration = {
                        entityIds: responseIntegration.entity_ids,
                        entityType: EntityType[responseIntegration.entity_type],
                        integrationId: responseIntegration.integration_id,
                        integrationType:
                            IntegrationType[
                                responseIntegration.integration_type
                            ],
                        portalUrl: responseIntegration.portal_url,
                        title: responseIntegration.title,
                    } as Integration;
                    iAccum.push(integration);
                    return iAccum;
                },
                []
            );
            portal.integrations = integrations;

            accum.push(portal);
            return accum;
        }, []);
    }
}
