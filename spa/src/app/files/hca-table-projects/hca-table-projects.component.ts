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
import { FileSummary } from "../file-summary/file-summary.model";
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
} from "../_ngrx/files.selectors";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { FetchSortedTableDataRequestAction } from "../_ngrx/table/fetch-sorted-table-data-request.action";
import { ProjectRowMapper } from "../projects/project-row-mapper";
import { SearchTerm } from "../search/search-term.model";
import { GASource } from "../../shared/analytics/ga-source.model";
import { EntityName } from "../shared/entity-name.model";
import { GAIndex } from "../../shared/analytics/ga-index.model";
import { EntitiesDataSource } from "../entities/entities.data-source";
import { Pagination } from "../table/pagination/pagination.model";
import {
    getColumnClass,
    getColumnDisplayName,
    getColumnSortKey,
    getColumnStyle,
    isElementUnspecified
} from "../table/table-methods";
import { TableParams } from "../table/pagination/table-params.model";
import { ProjectRow } from "../projects/project-row.model";

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
        "projectTitle", "getData", "genusSpecies", "sampleEntityType", "organ", "organPart", "modelOrgan", "selectedCellType",
        "libraryConstructionApproach", "nucleicAcidSource", "pairedEnd",
        "workflow", "disease", "donorDisease", "developmentStage", "donorCount", "totalCells",
        "submissionDate", "aggregateUpdateDate"
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

    // Locals
    private ngDestroy$ = new Subject();

    // Inputs
    @Input() selectedProjectIds: string[];
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild(MatTable, {read: ElementRef}) matTableElementRef: ElementRef;
    @ViewChild(MatSort) matSort: MatSort;

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
     * Returns true if the specified project has at least one contributed or DCP-generated matrix.
     *
     * @param {ProjectRow} project
     * @returns {boolean}
     */
    public isAnyMatrixAvailable(project: ProjectRow) {

        return project.matrices.length || project.contributorMatrices.length;
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

        return this.displayedColumns.filter(columnName => {

            if ( columnName === "getData" &&
                (this.deviceService.isMobile() || this.deviceService.isTablet()) ) {
                return false;
            }

            return true;
        });
    }

    /**
     * Display the prepared manifest downloads modal.
     *
     * @param {string} projectId
     * @param {Catalog} catalog
     */
    public onProjectDownloadManifestClicked(projectId: string, catalog: Catalog) {

        this.router.navigate([EntityName.PROJECTS, projectId, "m", "project-metadata"], {
            queryParams: {
                catalog
            }
        });
    }

    /**
     * Display the prepared matrix downloads modal.
     *
     * @param {string} projectId
     * @param {Catalog} catalog
     */
    public onProjectDownloadMatrixClicked(projectId: string, catalog: Catalog) {

        this.router.navigate([EntityName.PROJECTS, projectId, "m", "project-matrices"], {
            queryParams: {
                catalog
            }
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

        // Get column sort key, when sort key is specified by table config.
        const tableConfigColumnSortKey = getColumnSortKey(sort.active);

        // Set sort active to column sort key, when column sort key is specified and does not equal the sort active value.
        if ( tableConfigColumnSortKey && tableConfigColumnSortKey !== sort.active ) {

            sort.active = tableConfigColumnSortKey;
        }

        // Force table to be sorted by project title if sort is cleared. Sort is cleared when user clicks on column header
        // to sort asc, then clicks again on the same column header to sort desc, then once more. The third click on the
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

        this.dataLoaded$ = this.data$.pipe(
            filter(data => !!data.length),
            map(() => true)
        );

        this.catalog$ = this.store.pipe(select(selectCatalog));
    }
}
