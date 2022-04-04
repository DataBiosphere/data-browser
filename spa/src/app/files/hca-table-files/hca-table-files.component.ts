/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying file-related data.
 */

// Core dependencies
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";

// App dependencies
import { AnalysisProtocolViewedEvent } from "../analysis-protocol-pipeline-linker/analysis-protocol-viewed.event";
import { EntitiesDataSource } from "../entities/entities.data-source";
import { FileLocation } from "../file-location/file-location.model";
import { FileRow } from "./file-row.model";
import { FileRowMapper } from "./file-row-mapper";
import { ClearFileFileLocationsAction } from "../_ngrx/file/clear-file-file-locations.action";
import { FileSummary } from "../file-summary/file-summary.model";
import { AppState } from "../../_ngrx/app.state";
import { ViewAnalysisProtocolAction } from "../_ngrx/analysis-protocol/view-analysis-protocol.action";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName,
} from "../_ngrx/files.selectors";
import { FetchSortedTableDataRequestAction } from "../_ngrx/table/fetch-sorted-table-data-request.action";
import { SearchTerm } from "../search/search-term.model";
import { GAIndex } from "../../shared/analytics/ga-index.model";
import { GASource } from "../../shared/analytics/ga-source.model";
import { Pagination } from "../table/pagination/pagination.model";
import {
    getColumnClass,
    getColumnDisplayName,
    getColumnSortKey,
    getColumnStyle,
    isElementUnspecified,
} from "../table/table-methods";
import { TableParams } from "../table/pagination/table-params.model";
import { selectFileFileLocations } from "../_ngrx/file/file.selectors";
import { FetchFileFileLocationRequestAction } from "../_ngrx/file/fetch-file-file-location-request.action";
import { FileFormat } from "../shared/file-format.model";

@Component({
    selector: "hca-table-files",
    templateUrl: "./hca-table-files.component.html",
    styleUrls: ["./hca-table-files.component.scss"],
})
export class HCATableFilesComponent implements OnInit {
    // Template variables
    public data$: Observable<any[]>;
    public defaultSortOrder = {
        sort: "fileName",
        order: "asc",
    };
    public displayedColumns = [
        "fileName",
        "fileFormat",
        "contentDescription",
        "fileSize",
        "fileSource",
        "projectTitle",
        "sampleId",
        "genusSpecies",
        "sampleEntityType",
        "organ",
        "organPart",
        "modelOrgan",
        "selectedCellType",
        "libraryConstructionApproach",
        "nucleicAcidSource",
        "pairedEnd",
        "workflow",
        "organismAge",
        "biologicalSex",
        "disease",
        "donorDisease",
        "developmentStage",
        "totalCells",
    ];
    public domainCountsByColumnName$: Observable<Map<string, number>>;
    public fileFileLocationsByFileUrls$: Observable<Map<string, FileLocation>>;
    public getColumnClass = getColumnClass;
    public getColumnDisplayName = getColumnDisplayName;
    public getColumnStyle = getColumnStyle;
    public isElementUnspecified = isElementUnspecified;
    public loading$: Observable<boolean>;
    public selectFileSummary$: Observable<FileSummary>;
    public dataSource: EntitiesDataSource<FileRowMapper>;
    public pagination$: Observable<Pagination>;
    public dataLoaded$: Observable<boolean>;

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Inputs
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild(MatSort) matSort: MatSort;
    @ViewChild(MatTable, { read: ElementRef }) matTableElementRef: ElementRef;

    /**
     * @param {Store<AppState>} store
     * @param {ChangeDetectorRef} cdref
     * @param {ElementRef} elementRef
     */
    constructor(
        private store: Store<AppState>,
        private cdref: ChangeDetectorRef,
        private elementRef: ElementRef
    ) {}

    /**
     * Returns class download and class truncate (if table data is not spaced).
     * @param {string} tableData
     * @returns {{[p: string]: boolean}}
     */
    public getFileDownloadClass(tableData: string): {
        [className: string]: boolean;
    } {
        if (tableData && tableData.indexOf(" ") == -1) {
            return {
                "file-download": true,
                truncate: true,
            };
        }

        return {
            "file-download": true,
        };
    }

    /**
     * Return the file location for the specified file, or return a not started status if not yet requested file
     * location has not yet been requested.
     *
     * @param {Map<string, FileLocation>} fileFileLocationsByFileUrl
     * @param {string} fileUrl
     * @returns {FileLocation}
     */
    public getFileLocationByFileUrl(
        fileFileLocationsByFileUrl,
        fileUrl: string
    ): FileLocation {
        return fileFileLocationsByFileUrl.get(fileUrl);
    }

    /**
     * Returns true if file format is not matrix.
     *
     * @param {string} fileFormat
     * @returns {boolean}
     */
    public isFileLocationDownloadEnabled(fileFormat: string): boolean {
        return fileFormat !== FileFormat.MATRIX;
    }

    /**
     * Return the list of columns to be displayed.
     *
     * @returns {string[]}
     */
    public listColumns(): string[] {
        return this.displayedColumns;
    }

    /**
     * Dispatch action to track view of analysis protocol.
     *
     * @param {AnalysisProtocolViewedEvent} event
     */
    public onAnalysisProtocolViewed(event: AnalysisProtocolViewedEvent) {
        const action = new ViewAnalysisProtocolAction(
            event.analysisProtocol,
            event.url,
            GASource.SEARCH_RESULTS
        );
        this.store.dispatch(action);
    }

    /**
     * Initiate request for file location of specified file.
     *
     * @param {FileRow} fileRow
     */
    public onFileLocationRequested(fileRow: FileRow) {
        const { url: fileUrl, fileName, fileFormat } = fileRow;
        const action = new FetchFileFileLocationRequestAction(
            fileUrl,
            fileName,
            fileFormat
        );
        this.store.dispatch(action);
    }

    /**
     * Sort the table given the sort param and the order.
     *
     * @param {Pagination} pm
     * @param {Sort} sort
     */
    public sortTable(pm: Pagination, sort: Sort) {
        // Get column sort key, when sort key is specified by table config.
        const tableConfigColumnSortKey = getColumnSortKey(sort.active);

        // Set sort active to column sort key, when column sort key is specified and does not equal the sort active value.
        if (
            tableConfigColumnSortKey &&
            tableConfigColumnSortKey !== sort.active
        ) {
            sort.active = tableConfigColumnSortKey;
        }

        // Force table to be sorted by project title if sort is cleared. Sort is cleared when user clicks on column header
        // to sort asc, then clicks again on the same columm header to sort desc, then once more. The third click on the
        // same header clears the sort. We want to force the sort to go back to the default sort - project title. We must
        // use this workaround here (_handleClick) due to a defect in programmatically setting the sort order in
        // Material (https://github.com/angular/components/issues/10242).
        if (!sort.direction) {
            const defaultSortHeader = this.matSort.sortables.get(
                this.defaultSortOrder.sort
            ) as MatSortHeader;
            defaultSortHeader._handleClick();
            return;
        }

        let tableParamsModel: TableParams = {
            size: pm.size,
            sort: sort.active,
            order: sort.direction,
        };

        const action = new FetchSortedTableDataRequestAction(
            tableParamsModel,
            GAIndex.FILES,
            GASource.SEARCH_RESULTS
        );
        this.store.dispatch(action);
    }

    public ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    /**
     * Kill subscriptions on destroy of component. Clear file locations.
     */
    public ngOnDestroy() {
        this.store.dispatch(new ClearFileFileLocationsAction());

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     *  Set up table data source and pagination
     */
    ngOnInit() {
        // Initialize the new data source with an observable of the table data.
        this.dataSource = new EntitiesDataSource<FileRowMapper>(
            this.store.pipe(select(selectTableData)),
            FileRowMapper
        );

        // Get an observable of the table data.
        this.data$ = this.store.pipe(select(selectTableData));

        // Get an observable of the loading status of table.
        this.loading$ = this.store.pipe(select(selectTableLoading));

        // Get an observable of the pagination model
        this.pagination$ = this.store.pipe(select(selectPagination));

        // Get the term counts for each facet - we'll use this as a basis for displaying a count of the current set of
        // values for each column
        this.domainCountsByColumnName$ = this.store.pipe(
            select(selectTermCountsByFacetName)
        );

        // Get the summary counts - used by columns with SUMMARY_COUNT countType
        this.selectFileSummary$ = this.store.pipe(select(selectFileSummary));

        // Get the file locations
        this.fileFileLocationsByFileUrls$ = this.store.pipe(
            select(selectFileFileLocations)
        );

        this.dataLoaded$ = this.data$.pipe(
            filter((data) => !!data.length),
            map(() => true)
        );
    }
}
