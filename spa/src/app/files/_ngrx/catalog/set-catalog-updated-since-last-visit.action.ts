/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered on init of app indicating if there has been an update in the default catalog since the user's last
 * visit.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class SetCatalogUpdatedSinceLastVisitAction implements Action {
    public static ACTION_TYPE = "CATALOG.SET_CATALOG_STATUS";
    public readonly type = SetCatalogUpdatedSinceLastVisitAction.ACTION_TYPE;

    /**
     * @param updatedSinceLastVisit - True if the default catalog has been updated since the user's last visit.
     */
    public constructor(public readonly updatedSinceLastVisit) {}
}
