/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying project-related data.
 */

// Core dependencies
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { FileSummary } from "../file-summary/file-summary";
import { DeviceDetectorService } from "ngx-device-detector";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/file.selectors";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";
import { FetchSortedTableDataRequestAction } from "../_ngrx/table/fetch-sorted-table-data-request.action";
import { ProjectRowMapper } from "./project-row-mapper";
import { SearchTerm } from "../search/search-term.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { GASource } from "../../shared/analytics/ga-source.model";
import { EntityName } from "../shared/entity-name.model";
import { EntitiesDataSource } from "../table/entities.data-source";
import { Pagination } from "../table/pagination/pagination.model";
import {
    getColumnClass,
    getColumnDisplayName,
    getColumnSortKey,
    getColumnStyle,
    isElementUnspecified
} from "../table/table-methods";
import { TableParams } from "../table/pagination/table-params.model";
import { ViewAnalysisProtocolAction } from "../_ngrx/analysis-protocol/view-analysis-protocol.action";
import { AnalysisProtocolViewedEvent } from "../analysis-protocol-pipeline-linker/analysis-protocol-viewed.event";


@Component({
    selector: "hca-table-projects",
    templateUrl: "./hca-table-projects.component.html",
    styleUrls: ["./hca-table-projects.component.scss"]
})

export class HCATableProjectsComponent implements OnInit {

    // Template variables
    public data$: Observable<any[]>;
    public defaultSortOrder = {
        sort: "projectTitle",
        order: "asc"
    };
    public displayedColumns = [
        "projectTitle", "getData", "genusSpecies", "sampleEntityType", "organ", "selectedCellType", "libraryConstructionApproach", "pairedEnd",
        "workflow", "disease", "donorCount", "totalCells"
    ];
    public domainCountsByColumnName$: Observable<Map<string, number>>;
    public getColumnClass = getColumnClass;
    public getColumnDisplayName = getColumnDisplayName;
    public getColumnStyle = getColumnStyle;
    public isElementUnspecified = isElementUnspecified;
    public loading$: Observable<boolean>;
    public pagination$: Observable<Pagination>;
    public selectFileSummary$: Observable<FileSummary>;
    public dataSource: EntitiesDataSource<ProjectRowMapper>;
    public projectsMatrixUrls$: Observable<Map<string, ProjectMatrixUrls>>;

    // Locals
    private ngDestroy$ = new Subject();
    private dataLoaded$: Observable<boolean>;

    // Inputs
    @Input() selectedProjectIds: string[];
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild(MatTable, {read: ElementRef, static: false}) matTableElementRef: ElementRef;
    @ViewChild(MatSort, {static: false}) matSort: MatSort;

    /**
     * @param {Store<AppState>} store
     * @param {DeviceDetectorService} deviceService
     * @param {ChangeDetectorRef} cdref
     * @param {ElementRef} elementRef
     * @param {Router} router
     */
    constructor(private store: Store<AppState>,
                private deviceService: DeviceDetectorService,
                private cdref: ChangeDetectorRef,
                private elementRef: ElementRef,
                private router: Router) {
    }

    /**
     * Returns true if there is at least one matrix expression available for the specified project.
     *
     * @param {Map<string, ProjectMatrixUrls>} projectsMatrixUrls
     * @param {string} projectId
     * @returns {boolean}
     */
    public isAnyProjectMatrixUrlAvailable(projectsMatrixUrls: Map<string, ProjectMatrixUrls>, projectId: string): boolean {

        return projectsMatrixUrls.has(projectId) && projectsMatrixUrls.get(projectId).isAnyProjectMatrixUrlAvailable();
    }

    /**
     * Returns true if project is in the current set of selected search terms.
     *
     * @param {any} project
     * @returns {boolean}
     */
    public isProjectSelected(project: any): boolean {

        return this.selectedProjectIds.indexOf(project.entryId) >= 0;
    }

    /**
     * Return the list of columns to be displayed. Remove download columns if the user's device is hand-held.
     *
     * @returns {string[]}
     */
    public listColumns(): string[] {

        if ( this.deviceService.isMobile() || this.deviceService.isTablet() ) {
            return this.displayedColumns.filter(columnName => columnName !== "getData");
        }
        return this.displayedColumns;
    }

    /**
     * Display the prepared manifest downloads modal.
     *
     * @param {string} projectId
     */
    public onProjectDownloadManifestClicked(projectId: string) {

        const redirectUrl = `/${EntityName.PROJECTS}/${projectId}/m/project-metadata`;
        this.router.navigateByUrl(redirectUrl, {replaceUrl: true});
    }

    /**
     * Display the prepared matrix downloads modal.
     *
     * @param {string} projectId
     */
    public onProjectDownloadMatrixClicked(projectId: string) {

        const redirectUrl = `/${EntityName.PROJECTS}/${projectId}/m/expression-matrices`;
        this.router.navigateByUrl(redirectUrl, {replaceUrl: true});
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
     * Handle click on project in table - update store with selected project.
     *
     * @param {string} projectId
     * @param {string} projectName
     * @param {boolean} selected
     */
    public onProjectSelected(projectId: string, projectName: string, selected: boolean) {

        this.store.dispatch(new SelectProjectIdAction(projectId, projectName, !selected));
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
            new FetchSortedTableDataRequestAction(tableParamsModel, EntityName.PROJECTS, GASource.SEARCH_RESULTS);
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
        this.dataSource =
            new EntitiesDataSource<ProjectRowMapper>(this.store.pipe(select(selectTableData)), ProjectRowMapper);

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

        // Determine which matrix formats, if any, are available for download for the current set of projects
        this.data$.pipe(
            filter(data => !!data.length),
            takeUntil(this.ngDestroy$)
        ).subscribe((data) => {

            data.forEach((row) =>
                this.store.dispatch(new FetchProjectMatrixUrlsRequestAction(row.entryId)));
        });

        // Grab the project matrix URLs, if any, for the current set of projects
        this.projectsMatrixUrls$ = this.store.pipe(
            select(selectProjectMatrixUrlsByProjectId)
        );

        this.dataLoaded$ = this.data$.pipe(
            filter(data => !!data.length),
            map(() => true)
        );
    }
}
