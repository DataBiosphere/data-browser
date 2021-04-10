/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the previous page of results in the table are to be requested and displayed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { TableParams } from "../../table/pagination/table-params.model";

export class TablePreviousPageAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "TABLE.PREVIOUS_PAGE";
    public readonly type = TablePreviousPageAction.ACTION_TYPE;

    /**
     * @param {TableParams} tableParams
     * @param {number} currentPage
     */
    constructor(public tableParams: TableParams, public currentPage: number) {}

    /**
     * Return the pagination action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery, index}): GAEvent {

        return {
            category: GACategory.SEARCH_RESULTS,
            action: GAAction.PREVIOUS_PAGE,
            label: `${this.currentPage}`,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.INDEX]: index
            }
        };
    }
}

