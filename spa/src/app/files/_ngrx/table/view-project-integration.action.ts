/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a link to a project integration is clicked.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { Integration } from "../integration/integration.model";
import { Portal } from "../integration/portal.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GARelatedEntityType } from "../../../shared/analytics/ga-related-entity-type.model";

export class ViewProjectIntegrationAction implements Action, TrackingAction {
    public static ACTION_TYPE = "PROJECT.VIEW_INTEGRATION";
    public readonly type = ViewProjectIntegrationAction.ACTION_TYPE;

    /**
     * @param {Portal} portal
     * @param {Integration} integration
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {string} projectUrl
     */
    constructor(
        public portal: Portal,
        public integration: Integration,
        public projectId: string,
        public projectShortname: string,
        public projectUrl: string
    ) {}

    /**
     * Return the project integration action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, currentQuery }): GAEvent {
        return {
            category: GACategory.PROJECT,
            action: GAAction.VIEW_EXTERNAL_RESOURCE,
            label: this.projectShortname,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_ID]: this.projectId,
                [GADimension.ENTITY_URL]: this.projectUrl,
                [GADimension.RELATED_ENTITY_ID]: `${this.portal.portalName} (${this.portal.organizationName})`, // eg Xena (UCSC)
                [GADimension.RELATED_ENTITY_TYPE]:
                    GARelatedEntityType.INTEGRATION,
                [GADimension.RELATED_ENTITY_URL]: this.integration.portalUrl,
            },
        };
    }
}
