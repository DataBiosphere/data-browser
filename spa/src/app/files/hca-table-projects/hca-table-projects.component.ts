/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying project-related data.
 */

// Core dependencies
import {
    AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild
} from "@angular/core";
import { MatSort, MatSortHeader, Sort } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { fromEvent, Observable, merge, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/file.selectors";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { FetchPagedOrSortedTableDataRequestAction } from "../_ngrx/table/table.actions";
import { FileSummary } from "../file-summary/file-summary";
import { FetchProjectMatrixUrlsRequestAction } from "../_ngrx/matrix/fetch-project-matrix-urls-request.action";
import { ProjectRowMapper } from "./project-row-mapper";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { EntitiesDataSource } from "../table/entities.data-source";
import { PaginationModel } from "../table/pagination.model";
import {
    getColumnClass,
    getColumnDisplayName,
    getColumnStyle,
    getHeaderClass,
    getHeaderRowHeight,
    getRowClass,
    getRowStyle,
    getTableStyle
} from "../table/table-methods";
import { TableParamsModel } from "../table/table-params.model";
import { selectProjectMatrixUrlsByProjectId } from "../_ngrx/matrix/matrix.selectors";

@Component({
    selector: "hca-table-projects",
    templateUrl: "./hca-table-projects.component.html",
    styleUrls: ["./hca-table-projects.component.scss"]
})

export class HCATableProjectsComponent implements OnInit, AfterViewInit {

    // Template variables
    public data$: Observable<any[]>;
    public defaultSortOrder = {
        sort: "projectTitle",
        order: "asc"
    };
    public displayedColumns = [
        "projectTitle", "sampleEntityType", "organ", "selectedCellType", "libraryConstructionApproach", "pairedEnd", "genusSpecies", "disease", "getData",
        "donorCount", "totalCells"
    ];
    public domainCountsByColumnName$: Observable<Map<string, number>>;
    public getColumnClass = getColumnClass;
    public getColumnDisplayName = getColumnDisplayName;
    public getColumnStyle = getColumnStyle;
    public getHeaderClass = getHeaderClass;
    public getHeaderRowHeight = getHeaderRowHeight;
    public getRowClass = getRowClass;
    public getRowStyle = getRowStyle;
    public getTableStyle = getTableStyle;
    public loading$: Observable<boolean>;
    public pagination$: Observable<PaginationModel>;
    public activeRowIndex = null;
    public selectFileSummary$: Observable<FileSummary>;
    public dataSource: EntitiesDataSource<ProjectRowMapper>;
    public projectsMatrixUrls$: Observable<Map<string, ProjectMatrixUrls>>;
    public tableMarginBottom: number;

    // Locals
    private ngDestroy$ = new Subject();
    private snapped: boolean;

    // Inputs
    @Input() selectedProjectIds: string[];

    // View child/ren
    @ViewChild(MatSort) matSort: MatSort;

    /**
     * @param {Store<AppState>} store
     * @param {ChangeDetectorRef} cdref
     * @param {ElementRef} elementRef
     * @param {Window} window
     */
    constructor(private store: Store<AppState>,
                private cdref: ChangeDetectorRef,
                private elementRef: ElementRef,
                @Inject("Window") private window: Window) {
    }

    /**
     * Public API
     */

    /**
     * Returns the matrix expression for the specified project.
     *
     * @param {Map<string, ProjectMatrixUrls>} projectsMatrixUrls
     * @param {string} projectId
     * @returns {ProjectMatrixUrls}
     */
    public getProjectMatrixUrls(projectsMatrixUrls: Map<string, ProjectMatrixUrls>, projectId: string): ProjectMatrixUrls {

        return projectsMatrixUrls.get(projectId);
    }

    /**
     * Returns true if any row is currently active. Currently only possible during prepared matrix download flow.
     * 
     * @returns {boolean}
     */
    public isAnyRowActive(): boolean {

        return this.activeRowIndex !== null;
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
     * Handle the open/close event of project matrix download.
     * Update local variables that will determine mat-row and mat-header-row styles.
     *
     * @param {boolean} opened
     * @param {number} selectedIndex
     */
    public onPreparedMatrixDownloadsOpened(opened: boolean, selectedIndex: number) {

        this.activeRowIndex = opened ? selectedIndex : null;
    }

    /**
     * Provides a calculated table margin, if required, determined by the vertical positioning
     * of <project-prepared-matrix-downloads>.
     *
     * @param event
     */
    public onPreparedMatrixDownloadsPositionBelowTable(event) {
        this.tableMarginBottom = event;
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
     * @param {PaginationModel} pm
     * @param {Sort} sort
     */
    public sortTable(pm: PaginationModel, sort: Sort) {

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

        let tableParamsModel: TableParamsModel = {
            size: pm.size,
            sort: sort.active,
            order: sort.direction
        };

        this.store.dispatch(new FetchPagedOrSortedTableDataRequestAction(tableParamsModel));
    }

    /**
     * Lifecycle hooks
     */

    ngAfterContentChecked() {

        this.cdref.detectChanges();
    }

    /**
     * Update snapped status of table, on scroll of component.
     */
    public ngAfterViewInit() {

        const nativeElement = this.elementRef.nativeElement;
        const scrolls$ = fromEvent(this.window, "scroll");
        const wheels$ = fromEvent(this.window, "wheel");

        merge(scrolls$, wheels$).pipe(
            takeUntil(this.ngDestroy$)
        )
            .subscribe(() => {

                if ( this.window.innerWidth < 1280 || (this.window.pageYOffset < nativeElement.offsetTop && this.snapped) ) {

                    this.snapped = false;
                }
                else if ( this.window.innerWidth >= 1280 && this.window.pageYOffset >= nativeElement.offsetTop && !this.snapped ) {

                    this.snapped = true;
                }
            });
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
    }
}
