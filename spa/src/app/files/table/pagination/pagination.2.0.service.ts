/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating pagination-related functionality specific to the entity API version 2.0. 
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { Pagination20 } from "./pagination.2.0.model";
import { PaginationService } from "./pagination.service";
import { TableParams20 } from "./table-params.2.0.model";

@Injectable()
export class PaginationService20 extends PaginationService {

    /**
     * Return the values pagination request param values to be included in a request to the entity API.
     *
     * @param {TableParams} tableParams
     * @returns { {[key: string]: string}}
     */
    public buildFetchSearchResultsPaginationParams(tableParams: TableParams20): {[key: string]: string} {

        const params = super.buildFetchSearchResultsPaginationParams(tableParams);

        // Check if there is paging
        if ( tableParams.next) {

            params["next"] = tableParams.next;
        }

        if ( tableParams.previous ) {

            params["previous"] = tableParams.previous;
        }

        return params;
    }

    /**
     * Build a set of updates to pagination values to show the next page of the data table.
     *
     * @param {Pagination} pagination
     * @returns {TableParams}
     */
    buildNextPageTableParams(pagination: Pagination20): TableParams20 {

        return {
            next: pagination.next,
            order: pagination.order,
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
    buildPreviousPageTableParams(pagination: Pagination20): TableParams20 {

        return {
            order: pagination.order,
            previous: pagination.previous,
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
    isFirstPage(pagination: Pagination20): boolean {

        return pagination.previous === null
    }

    /**
     * Returns true if the current page is the last page.
     *
     * @param {Pagination} pagination
     * @returns {boolean}
     */
    isLastPage(pagination: Pagination20): boolean {

        return pagination.next === null
    }
}
