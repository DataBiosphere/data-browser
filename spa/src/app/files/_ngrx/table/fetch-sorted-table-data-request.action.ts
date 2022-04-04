/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when sort order has been changed on data table.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAIndex } from "../../../shared/analytics/ga-index.model";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { TableParams } from "../../table/pagination/table-params.model";

export class FetchSortedTableDataRequestAction
    implements Action, TrackingAction
{
    public static ACTION_TYPE = "TABLE.SORTED_DATA_REQUEST";
    public readonly type = FetchSortedTableDataRequestAction.ACTION_TYPE;

    /**
     * @param {TableParams} tableParams
     * @param {GAIndex} index
     * @param {GASource} source
     */
    constructor(
        public tableParams: TableParams,
        public index: GAIndex,
        public source: GASource
    ) {}

    /**
     * Return the cleared age range action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, currentQuery }): GAEvent {
        return {
            category: GACategory.SEARCH_RESULTS,
            action: GAAction.SORT,
            label: this.tableParams.sort,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.DIRECTION]: this.tableParams.order,
                [GADimension.INDEX]: this.index,
                [GADimension.SOURCE]: this.source,
            },
        };
    }
}
