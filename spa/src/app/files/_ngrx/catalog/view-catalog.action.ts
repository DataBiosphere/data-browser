/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user clicks on "view catalog" link in announcement banner.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// Core dependencies
import { Catalog } from "../../catalog/catalog.model";
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class ViewCatalogAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "CATALOG.VIEW_CATALOG";
    public readonly type = ViewCatalogAction.ACTION_TYPE;

    constructor(private catalog: Catalog) {}

    /**
     * Return the catalog view action as a GA event.
     *
     * param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent(): GAEvent {

        return {
            category: GACategory.CATALOG,
            action: GAAction.VIEW_CATALOG,
            label: this.catalog,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.CATALOG,
            }
        };
    }
}
