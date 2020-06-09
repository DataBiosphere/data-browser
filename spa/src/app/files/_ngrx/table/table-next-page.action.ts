/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the next page of results in the table are to be requested and displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TableParams } from "../../table/pagination/table-params.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { TrackingAction } from "../analytics/tracking.action";

export class TableNextPageAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "TABLE.NEXT_PAGE";
    public readonly type = TableNextPageAction.ACTION_TYPE;

    /**
     * @param {TableParams} tableParams
     * @param {number} currentPage
     */
    constructor(public tableParams: TableParams, public currentPage: number) {}

    /**
     * Return the pagination action as a GA event.
     *
     * @param {string} currentQuery
     * @returns {GAEvent}
     */
    public asEvent(currentQuery: string): GAEvent {

        return {
            category: GACategory.SEARCH_RESULTS,
            action: GAAction.NEXT_PAGE,
            label: `${this.currentPage}`,
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery
            }
        };
    }
}
