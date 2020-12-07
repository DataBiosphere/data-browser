/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying project-related data.
 */

// Core dependencies
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AnalysisProtocolViewedEvent } from "../analysis-protocol-pipeline-linker/analysis-protocol-viewed.event";
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { FileSummary } from "../file-summary/file-summary";
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { DeviceDetectorService } from "ngx-device-detector";
import { ViewAnalysisProtocolAction } from "../_ngrx/analysis-protocol/view-analysis-protocol.action";
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
import { GAIndex } from "../../shared/analytics/ga-index.model";
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
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { ProjectRow } from "./project-row.model";

@Component({
    selector: "hca-table-projects",
    templateUrl: "./hca-table-projects.component.html",
    styleUrls: ["./hca-table-projects.component.scss"]
})
export class HCATableProjectsComponent implements OnInit {

    // Template variables
    public catalog$: Observable<Catalog>;
    public data$: Observable<any[]>;
    public dataLoaded$: Observable<boolean>;
    public defaultSortOrder = {
        sort: "projectTitle",
        order: "asc"
    };
    public displayedColumns = [
        "projectTitle", "getData", "genusSpecies", "sampleEntityType", "organ", "selectedCellType", "libraryConstructionApproach", "nucleicAcidSource", "pairedEnd",
        "workflow", "disease", "developmentStage", "donorCount", "totalCells"
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
    public projectsMatrixUrls$ = new BehaviorSubject<Map<string, ProjectMatrixUrls>>(new Map());

    // Locals
    private ngDestroy$ = new Subject();

    // Inputs
    @Input() selectedProjectIds: string[];
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild(MatTable, {read: ElementRef}) matTableElementRef: ElementRef;
    @ViewChild(MatSort) matSort: MatSort;

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {DeviceDetectorService} deviceService
     * @param {ChangeDetectorRef} cdref
     * @param {ElementRef} elementRef
     * @param {Router} router
     */
    constructor(private configService: ConfigService,
                private store: Store<AppState>,
                private deviceService: DeviceDetectorService,
                private cdref: ChangeDetectorRef,
                private elementRef: ElementRef,
                private router: Router) {
    }

    /**
     * Return the set of query params required when generating the link to a project detail page. Currently, "catalog"
     * is the only query string parameter required for displaying a project detail page (that is, filters are dropped).
     *
     * @param {Catalog} catalog
     * @returns {{[key: string]: string}}
     */
    public getProjectQueryParams(catalog: Catalog): { [key: string]: string } {

        return {
            filter: null, // With the merge query param handling, we want to drop the filter param  
            catalog: catalog ? catalog : null // Don't include a catalog param if catalog is not specified 
        };
    }

    /**
     * v2 only - returns true if the specified project has at least one contributed or DCP-generated matrix.
     * 
     * @param {ProjectRow} project
     * @returns {boolean}
     */
    public isAnyMatrixAvailable(project: ProjectRow) {

        return project.matrices.length || project.contributorMatrices.length;
    }

    /**
     * v1 only - returns true if there is at least one matrix expression available for the specified project.
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
     * Returns true if environment is v2 - used to switch out matrix download functionality in template.
     * 
     * @returns {boolean}
     */
    public isV2(): boolean {
        
        return this.configService.isV2();
    }

    /**
     * Return the list of columns to be displayed. Remove download columns if the user's device is hand-held. Remove
     * columns only visible in v2 environments.
     *
     * @returns {string[]}
     */
    public listColumns(): string[] {

        return this.displayedColumns.filter(columnName => {

            if ( columnName === "getData" &&
                (this.deviceService.isMobile() || this.deviceService.isTablet()) ) {
                return false;
            }

            if ( !this.configService.isV2() &&
                (columnName === FileFacetName.DEVELOMENT_STAGE || columnName === FileFacetName.NUCLEIC_ACID_SOURCE) ) {
                return false;
            }

            return true;
        });
    }

    /**
     * Display the prepared manifest downloads modal.
     *
     * @param {string} projectId
     */
    public onProjectDownloadManifestClicked(projectId: string) {

        const redirectUrl = `/${EntityName.PROJECTS}/${projectId}/m/project-metadata`;
        this.router.navigateByUrl(redirectUrl);
    }

    /**
     * Display the prepared matrix downloads modal.
     *
     * @param {string} projectId
     */
    public onProjectDownloadMatrixClicked(projectId: string) {

        const redirectUrl = `/${EntityName.PROJECTS}/${projectId}/m/expression-matrices`;
        this.router.navigateByUrl(redirectUrl);
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

        this.store.dispatch(new SelectProjectIdAction(projectId, projectName, !selected, GASource.SEARCH_RESULTS));
    }

    /**
     * Sort the table given the sort param and the order.
     *
     * @param {Pagination} pm
     * @param {Sort} sort
     */
    public sortTable(pm: Pagination, sort: Sort) {

        // Determine the environment - required for overriding certain sort keys in v2.
        const v2 = this.configService.isV2();

        // Get column sort key, when sort key is specified by table config.
        const tableConfigColumnSortKey = getColumnSortKey(v2, sort.active);

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
            new FetchSortedTableDataRequestAction(tableParamsModel, GAIndex.PROJECTS, GASource.SEARCH_RESULTS);
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
            new EntitiesDataSource<ProjectRowMapper>(v2, this.store.pipe(select(selectTableData)), ProjectRowMapper);

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

        // For v1 environments, determine which matrix formats, if any, are available for download for the current set
        // of projects. For v2 environments, matrix information is available on values returned from Azul.
        if ( !v2 ) {

            this.data$.pipe(
                filter(data => !!data.length),
                takeUntil(this.ngDestroy$)
            ).subscribe((data) => {

                data.forEach((row) =>
                    this.store.dispatch(new FetchProjectMatrixUrlsRequestAction(row.entryId)));
            });

            // Grab the project matrix URLs, if any, for the current set of projects
            this.store
                .pipe(
                    select(selectProjectMatrixUrlsByProjectId),
                    takeUntil(this.ngDestroy$)
                )
                .subscribe(projectMatrixUrlsByProjectId => this.projectsMatrixUrls$.next(projectMatrixUrlsByProjectId));
        }

        this.dataLoaded$ = this.data$.pipe(
            filter(data => !!data.length),
            map(() => true)
        );

        this.catalog$ = this.store.pipe(select(selectCatalog));
    }
}
