/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating pagination-related functionality specific to the entity API before version 2.0.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { Pagination } from "./pagination.model";
import { TableParams } from "./table-params.model";

@Injectable()
export class PaginationService {

    /**
     * Return the values pagination request param values to be included in a request to the entity API.
     *
     * @param {TableParams} tableParams
     * @returns { {[key: string]: string}}
     */
    public buildFetchSearchResultsPaginationParams(tableParams: TableParams): {[key: string]: string} {

        const params = {
            size: tableParams.size.toString(10)
        };

        if ( tableParams.sort && tableParams.order ) {
            params["sort"] = tableParams.sort;
            params["order"] = tableParams.order;
        }

        // Check if there is paging - use search_after_uid and not search_after as null is a valid value for
        // search_after
        if ( tableParams.search_after_uid ) {

            params["search_after"] = tableParams.search_after;
            params["search_after_uid"] = tableParams.search_after_uid;
        }

        // Use search_before_uid and not search_before as null is a valid value for search_before
        if ( tableParams.search_before_uid ) {

            params["search_before"] = tableParams.search_before;
            params["search_before_uid"] = tableParams.search_before_uid;
        }

        return params;
    }

    /**
     * Build a set of updates to pagination values to show the next page of the data table.
     *
     * @param {Pagination} pagination
     * @returns {TableParams}
     */
    buildNextPageTableParams(pagination: Pagination): TableParams {

        return {
            order: pagination.order,
            search_after: pagination.search_after,
            search_after_uid: pagination.search_after_uid,
            size: pagination.size,
            sort: pagination.sort
        };
    }

    /**
     * Build a set of updates to pagination values to show the previous page of the data table.
     *
     * @param {Pagination} pagination
     * @returns {TableParams}
     */
    buildPreviousPageTableParams(pagination: Pagination): TableParams {

        return {
            order: pagination.order,
            search_before: pagination.search_before,
            search_before_uid: pagination.search_before_uid,
            size: pagination.size,
            sort: pagination.sort
        };
    }

    /**
     * Returns true if the current page is the first page.
     *
     * @param {Pagination} pagination
     * @returns {boolean}
     */
    isFirstPage(pagination: Pagination): boolean {

        return pagination.search_before_uid === null
    }

    /**
     * Returns true if the current page is the last page.
     *
     * @param {Pagination} pagination
     * @returns {boolean}
     */
    isLastPage(pagination: Pagination): boolean {

        return pagination.search_after_uid === null
    }
}
