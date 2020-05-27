/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying file-related data.
 */

// Core dependencies
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";

// App dependencies
import { FileSummary } from "../file-summary/file-summary";
import { AppState } from "../../_ngrx/app.state";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/file.selectors";
import { FetchSortedTableDataRequestAction } from "../_ngrx/table/fetch-sorted-table-data-request.action";
import { Pagination } from "../table/pagination/pagination.model";
import {
    getAge,
    getColumnClass,
    getColumnDisplayName,
    getColumnSortKey,
    getColumnStyle,
    isElementUnspecified
} from "../table/table-methods";
import { TableParams } from "../table/pagination/table-params.model";
import { EntitiesDataSource } from "../table/entities.data-source";
import { FileRowMapper } from "./file-row-mapper";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { EntityName } from "../shared/entity-name.model";
import { GASource } from "../../shared/analytics/ga-source.model";

@Component({
    selector: "hca-table-files",
    templateUrl: "./hca-table-files.component.html",
    styleUrls: ["./hca-table-files.component.scss"]
})
export class HCATableFilesComponent implements OnInit {

    // Template variables
    data$: Observable<any[]>;
    defaultSortOrder = {
        sort: "fileName",
        order: "asc"
    };
    displayedColumns = [
        "fileName", "fileFormat", "fileSize", "projectTitle", "sampleId", "genusSpecies", "sampleEntityType", "organ", "organPart", "selectedCellType",
        "libraryConstructionApproach", "pairedEnd", "workflow", "organismAge", "biologicalSex", "disease", "totalCells"
    ];
    domainCountsByColumnName$: Observable<Map<string, number>>;
    getAge = getAge;
    getColumnClass = getColumnClass;
    getColumnDisplayName = getColumnDisplayName;
    getColumnStyle = getColumnStyle;
    isElementUnspecified = isElementUnspecified;
    loading$: Observable<boolean>;
    selectFileSummary$: Observable<FileSummary>;
    dataSource: EntitiesDataSource<FileRowMapper>;
    pagination$: Observable<Pagination>;

    // Locals
    private ngDestroy$ = new Subject();
    public dataLoaded$: Observable<boolean>;
    
    // Inputs
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild(MatSort, {static: false}) matSort: MatSort;
    @ViewChild(MatTable, {read: ElementRef, static: false}) matTableElementRef: ElementRef;

    /**
     * 
     * @param {Store<AppState>} store
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {ChangeDetectorRef} cdref
     * @param {ElementRef} elementRef
     */
    constructor(private store: Store<AppState>,
                private searchTermHttpService: SearchTermHttpService,
                private cdref: ChangeDetectorRef,
                private elementRef: ElementRef) {
    }

    /**
     * Returns class download and class truncate (if table data is not spaced).
     * @param {string} tableData
     * @returns {{[p: string]: boolean}}
     */
    public getFileDownloadClass(tableData: string): { [className: string]: boolean } {

        if ( tableData && tableData.indexOf(" ") == -1 ) {
            return {
                "file-download": true,
                truncate: true
            };
        }

        return {
            "file-download": true
        };
    }

    /**
     * Sort the table given the sort param and the order.
     *
     * @param {Pagination} pm
     * @param {Sort} sort
     * @param {SelectedSearchTerm[]} selectedSearchTerms
     */
    public sortTable(pm: Pagination, sort: Sort, selectedSearchTerms: SearchTerm[]) {

        // Get column sort key, when sort key is specified by table config.
        const tableConfigColumnSortKey = getColumnSortKey(sort.active);

        // Set sort active to column sort key, when column sort key is specified and does not equal the sort active value.
        if ( tableConfigColumnSortKey && tableConfigColumnSortKey !== sort.active ) {

            sort.active = tableConfigColumnSortKey;
        }

        // Force table to be sorted by project title if sort is cleared. Sort is cleared when user clicks on column header
        // to sort asc, then clicks again on the same columm header to sort desc, then once more. The third click on the
        // same header clears the sort. We want to force the sort to go back to the default sort - project title. We must
        // use this workaround here (_handleClick) due to a defect in programmatically setting the sort order in
        // Material (https://github.com/angular/components/issues/10242).
        if ( !sort.direction ) {
            const defaultSortHeader = this.matSort.sortables.get(this.defaultSortOrder.sort) as MatSortHeader;
            defaultSortHeader._handleClick();
            return;
        }

        let tableParamsModel: TableParams = {
            size: pm.size,
            sort: sort.active,
            order: sort.direction
        };
        
        const query = this.searchTermHttpService.marshallSearchTerms(selectedSearchTerms);
        const action =
            new FetchSortedTableDataRequestAction(tableParamsModel, EntityName.FILES, GASource.SEARCH_RESULTS, query);
        this.store.dispatch(action);
    }

    /**
     * Lifecycle hooks
     */

    ngAfterContentChecked() {

        this.cdref.detectChanges();
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     *  Set up table data source and pagination
     */
    ngOnInit() {

        // Initialize the new data source with an observable of the table data.
        this.dataSource =
            new EntitiesDataSource<FileRowMapper>(this.store.pipe(select(selectTableData)), FileRowMapper);

        // Get an observable of the table data.
        this.data$ = this.store.pipe(select(selectTableData));

        // Get an observable of the loading status of table.
        this.loading$ = this.store.pipe(select(selectTableLoading));

        // Get an observable of the pagination model
        this.pagination$ = this.store.pipe(select(selectPagination));

        // Get the term counts for each facet - we'll use this as a basis for displaying a count of the current set of
        // values for each column
        this.domainCountsByColumnName$ = this.store.pipe(select(selectTermCountsByFacetName));

        // Get the summary counts - used by columns with SUMMARY_COUNT countType
        this.selectFileSummary$ = this.store.pipe(select(selectFileSummary));

        this.dataLoaded$ = this.data$.pipe(
            filter(data => !!data.length),
            map(() => true)
        );
    }
}
