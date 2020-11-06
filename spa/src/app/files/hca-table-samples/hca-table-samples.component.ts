/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying sample related data.
 */

// Core dependencies
import {
    ChangeDetectorRef,
    Component,
    ElementRef, Input,
    OnDestroy,
    OnInit,
    ViewChild
} from "@angular/core";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";

// App dependencies
import { AnalysisProtocolViewedEvent } from "../analysis-protocol-pipeline-linker/analysis-protocol-viewed.event";
import { AppState } from "../../_ngrx/app.state";
import { ConfigService } from "../../config/config.service";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileSummary } from "../file-summary/file-summary";
import { ViewAnalysisProtocolAction } from "../_ngrx/analysis-protocol/view-analysis-protocol.action";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/file.selectors";
import { FetchSortedTableDataRequestAction } from "../_ngrx/table/fetch-sorted-table-data-request.action";
import { SampleRowMapper } from "./sample-row-mapper";
import { GAIndex } from "../../shared/analytics/ga-index.model";
import { GASource } from "../../shared/analytics/ga-source.model";
import { SearchTerm } from "../search/search-term.model";
import { EntitiesDataSource } from "../table/entities.data-source";
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

@Component({
    selector: "hca-table-samples",
    templateUrl: "./hca-table-samples.component.html",
    styleUrls: ["./hca-table-samples.component.scss"]
})
export class HCATableSamplesComponent implements OnDestroy, OnInit {

    // Template variables
    data$: Observable<any[]>;
    public dataLoaded$: Observable<boolean>;
    public defaultSortOrder = {
        sort: "sampleId",
        order: "asc"
    };
    public displayedColumns = [
        "sampleId", "projectTitle", "genusSpecies", "sampleEntityType", "organ", "organPart", "selectedCellType", 
        "libraryConstructionApproach", "nucleicAcidSource", "pairedEnd", "workflow",
        "organismAge", "biologicalSex", "disease", "totalCells"
    ];
    public domainCountsByColumnName$: Observable<Map<string, number>>;
    public getAge = getAge;
    public getColumnClass = getColumnClass;
    public getColumnDisplayName = getColumnDisplayName;
    public getColumnStyle = getColumnStyle;
    public isElementUnspecified = isElementUnspecified;
    public loading$: Observable<boolean>;
    public selectFileSummary$: Observable<FileSummary>;
    public dataSource: EntitiesDataSource<SampleRowMapper>;
    public pagination$: Observable<Pagination>;

    // Locals
    private ngDestroy$ = new Subject();

    // Inputs
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild(MatSort) matSort: MatSort;
    @ViewChild(MatTable, { read: ElementRef }) matTableElementRef: ElementRef;

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {ChangeDetectorRef} cdref
     * @param {ElementRef} elementRef
     */
    constructor(private configService: ConfigService,
                private store: Store<AppState>,
                private cdref: ChangeDetectorRef,
                private elementRef: ElementRef) {
    }

    /**
     * Return the list of columns to be displayed. Remove columns only visible in v2 environments.
     *
     * @returns {string[]}
     */
    public listColumns(): string[] {

        return this.displayedColumns.filter(columnName => {

            if ( !this.configService.isV2() &&
                (columnName === FileFacetName.DEVELOMENT_STAGE || columnName === FileFacetName.NUCLEIC_ACID_SOURCE) ) {
                return false;
            }

            return true;
        });
    }

    /**
     * Dispatch action to track view of analysis protocol.
     *
     * @param {AnalysisProtocolViewedEvent} event
     */
    public onAnalysisProtocolViewed(event: AnalysisProtocolViewedEvent) {

        const action =
            new ViewAnalysisProtocolAction(event.analysisProtocol, event.url, GASource.SEARCH_RESULTS);
        this.store.dispatch(action);
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

        const action =
            new FetchSortedTableDataRequestAction(tableParamsModel, GAIndex.SAMPLES, GASource.SEARCH_RESULTS);
        this.store.dispatch(action);
    }

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
        const v2 = this.configService.isV2();
        this.dataSource =
            new EntitiesDataSource<SampleRowMapper>(v2, this.store.pipe(select(selectTableData)), SampleRowMapper);

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
