/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table pagination component.
 */


// Core dependencies
import { Component, Inject, Input, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectPagination } from "../_ngrx/file.selectors";
import { TableNextPageAction } from "../_ngrx/table/table-next-page.action";
import { TablePreviousPageAction } from "../_ngrx/table/table-previous-page.action";
import { Pagination } from "../table/pagination/pagination.model";
import { PaginationService } from "../table/pagination/pagination.service";

@Component({
    selector: "hca-table-pagination",
    templateUrl: "./hca-table-pagination.component.html",
    styleUrls: ["./hca-table-pagination.component.scss"]
})

export class HCATablePaginationComponent implements OnInit {

    // Template variables
    pagination$: Observable<Pagination>;

    // Inputs
    @Input() tableData: any[];

    /**
     * @param {PaginationService} paginationService
     * @param {Store<AppState>} store
     */
    constructor(@Inject("PAGINATION_SERVICE") private paginationService: PaginationService,
                private store: Store<AppState>) {}

    /**
     * Called when table next page selected.
     *
     * @param {Pagination} pagination
     */
    public nextPageSelected(pagination: Pagination) {

        if ( !this.hasNext(pagination) ) {
            return;
        }
        
        const tableParams = this.paginationService.buildNextPageTableParams(pagination);
        this.store.dispatch(new TableNextPageAction(tableParams));
    }

    /**
     * Called when table previous page selected.
     *
     * @param {Pagination} pagination
     */
    public previousPageSelected(pagination: Pagination) {

        if ( !this.hasPrevious(pagination) ) {
            return;
        }
        
        const tableParams = this.paginationService.buildPreviousPageTableParams(pagination);
        this.store.dispatch(new TablePreviousPageAction(tableParams));
    }

    /**
     * Check if there is a next page. Use search_after_uid and not search_after as null is a valid value for
     * search_after.
     *
     * @param {Pagination} pagination
     * @returns {boolean}
     */
    public hasNext(pagination: Pagination): boolean {
        
        return !this.paginationService.isLastPage(pagination);
    }

    /**
     * Check if there is a previous page. Use search_before_uid and not search_before as null is a valid value for
     * search_before.
     *
     * @param {Pagination} pagination
     * @returns {boolean}
     */
    public hasPrevious(pagination: Pagination): boolean {
        
        return!this.paginationService.isFirstPage(pagination);
    }

    /**
     * Return the total number of pages.
     *
     * @param {Pagination} pm
     * @returns {number}
     */
    getPageCount(pm: Pagination) {
        return Math.ceil(pm.total / pm.size);
    }

    getPages(pm: Pagination): number[] {

        let pages = [];
        let pageCount = this.getPageCount(pm);

        for ( let i = 1; i <= pageCount; i++ ) {
            pages.push(i);
        }

        return pages;
    }

    /**
     *  Set up pagination
     */
    ngOnInit() {

        // Get an observable of the pagination model
        this.pagination$ = this.store.pipe(select(selectPagination));
    }
}
