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
import { GASource } from "../../../shared/analytics/ga-source.model";
import { TableParams } from "../../table/pagination/table-params.model";

export class FetchSortedTableDataRequestAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "TABLE.SORTED_DATA_REQUEST";
    public readonly type = FetchSortedTableDataRequestAction.ACTION_TYPE;

    /**
     * @param {TableParams} tableParams
     * @param {string} selectedEntity
     * @param {GASource} source
     * @param {string} currentQuery
     */
    constructor(public tableParams: TableParams,
                public selectedEntity: string,
                public source: GASource,
                public currentQuery: string) {}

    /**
     * Return the cleared age range action as a GA event.
     *
     * @returns {GAEvent}
     */
    public asEvent(): GAEvent {

        return {
            category: GACategory.SEARCH_RESULTS,
            action: GAAction.SORT,
            label: this.tableParams.sort,
            dimensions: {
                [GADimension.CURRENT_QUERY]: this.currentQuery,
                [GADimension.DIRECTION]: this.tableParams.order,
                [GADimension.ENTITY_TYPE]: this.selectedEntity,
                [GADimension.SOURCE]: this.source,
            }
        };
    }
}
