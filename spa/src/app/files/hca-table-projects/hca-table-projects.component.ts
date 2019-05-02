/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying project-related data.
 */

// Core dependencies
import {
    AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit
} from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Sort } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { fromEvent, Observable, merge, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import {
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/file.selectors";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { FetchPagedOrSortedTableDataRequestAction } from "../_ngrx/table/table.actions";
import { PaginationModel } from "../table/pagination.model";
import {
    getColumnDescription,
    getColumnDisplayName,
    getCountDisplay,
    getFileCount,
    getPairedEnd,
    getUnspecifiedIfNullValue,
    isTooltipDisabled,
    rollUpMetadata
} from "../table/table-methods";
import { TableParamsModel } from "../table/table-params.model";

@Component({
    selector: "hca-table-projects",
    templateUrl: "./hca-table-projects.component.html",
    styleUrls: ["./hca-table-projects.component.scss"]
})

export class HCATableProjectsComponent implements OnInit, AfterViewInit {

    // Template variables
    data$: Observable<any[]>;
    displayedColumns = [
        "projectTitle", "sampleEntityType", "organ", "selectedCellType", "libraryConstructionApproach", "genusSpecies", "disease", "fileType",
        "donorCount", "totalCells"
    ];
    domainCountsByColumnName$: Observable<Map<string, number>>;
    domainCountVisibleForColumns = [
        "disease",
        "fileFormat",
        "genusSpecies",
        "libraryConstructionApproach",
        "organ",
        "sampleEntityType",
        "selectedCellType"
    ];
    getColumnDescription = getColumnDescription;
    getColumnDisplayName = getColumnDisplayName;
    isTooltipDisabled = isTooltipDisabled;
    loading$: Observable<boolean>;
    pagination$: Observable<PaginationModel>;
    tableElementDataSource: TableElementDataSource;

    // Locals
    private ngDestroy$ = new Subject();
    private snapped: boolean;

    // Inputs
    @Input() selectedProjectIds: string[];

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
     * Return the set of CSS class names that are currently applicable to the table header row.
     *
     * @returns {[className: string]: boolean}
     */
    public getHeaderClass(): { [className: string]: boolean } {

        return {
            snapped: this.snapped
        };
    }

    /**
     * Return the set of CSS class names that are currently applicable to the first row in the table.
     *
     * @param {number} rowIndex
     * @returns {[className: string]: boolean}
     */
    public getRowClass(rowIndex: number): { [className: string]: boolean } {

        return {
            snapped: (rowIndex === 0) && this.snapped
        };
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

                if ( this.window.pageYOffset >= nativeElement.offsetTop && !this.snapped ) {

                    this.snapped = true;
                }
                else if ( this.window.pageYOffset < nativeElement.offsetTop && this.snapped ) {

                    this.snapped = false;
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
        this.tableElementDataSource = new TableElementDataSource(this.store.pipe(select(selectTableData)));

        // Get an observable of the table data.
        this.data$ = this.store.pipe(select(selectTableData));

        // Get an observable of the loading status of table.
        this.loading$ = this.store.pipe(select(selectTableLoading));

        // Get an observable of the pagination model
        this.pagination$ = this.store.pipe(select(selectPagination));

        // Get the term counts for each facet - we'll use this as a basis for displaying a count of the current set of
        // values for each column
        this.domainCountsByColumnName$ = this.store.pipe(select(selectTermCountsByFacetName));
    }
}

/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Elements in Material Design table that displays HCA-specific project related data.
 */
export interface Element {
    disease: string;
    donorCount: number;
    entryId: string;
    genusSpecies: string;
    libraryConstructionApproach: string;
    organ: string;
    pairedEnd: string;
    projectShortname: string;
    projectTitle: string;
    sampleEntityType: string;
    selectedCellType: string;
    totalCells: number;
}

/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data source backing Material Design table that displays project related data.
 */
class TableElementDataSource extends DataSource<any> {

    element$: Observable<Element[]>;

    constructor(tableData$: Observable<any[]>) {

        super();

        this.element$ = tableData$.pipe(
            map((rows: any[]) => {

                return rows.map((row: any) => {

                    let cellSuspensions = rollUpMetadata(row.cellSuspensions);
                    let donorOrganisms = rollUpMetadata(row.donorOrganisms);
                    let fileTypeSummaries = row.fileTypeSummaries;
                    let projectSummary = row.projectSummary;
                    let projectTitle = rollUpMetadata(row.projects);
                    let protocols = rollUpMetadata(row.protocols);
                    let samples = rollUpMetadata(row.samples);
                    let specimens = rollUpMetadata(row.specimens);

                    // only roll up organType
                    let organs = rollUpMetadata(row.projectSummary.organSummaries.map((s) => {
                        return {organType: s.organType};
                    }));

                    /* File counts for file formats - excludes fastq.gz, fastq, bam, matrix */
                    let fileCounts = fileTypeSummaries.reduce((acc, fileTypeSummary) => {

                        if ( (fileTypeSummary.fileType !== "bam") && (fileTypeSummary.fileType !== "matrix") && (fileTypeSummary.fileType !== "fastq.gz") && (fileTypeSummary.fileType !== "fastq") ) {

                            acc.otherFileCount = acc.otherFileCount + fileTypeSummary.count;
                        }
                        return acc;

                    }, {otherFileCount: 0});

                    /* Fastq and Fastq.gz combined for raw count */
                    let rawCount = (getFileCount("fastq.gz", fileTypeSummaries) + getFileCount("fastq", fileTypeSummaries));

                    return {
                        disease: getUnspecifiedIfNullValue(specimens.disease),
                        donorCount: getUnspecifiedIfNullValue(projectSummary.donorCount),
                        entryId: row.entryId,
                        genusSpecies: getUnspecifiedIfNullValue(donorOrganisms.genusSpecies),
                        libraryConstructionApproach: getUnspecifiedIfNullValue(projectSummary.libraryConstructionApproach),
                        matrixCount: getCountDisplay(getFileCount("matrix", fileTypeSummaries)),
                        organ: getUnspecifiedIfNullValue(organs.organType),
                        otherFileCount: getCountDisplay(fileCounts.otherFileCount),
                        pairedEnd: getPairedEnd(protocols.pairedEnd),
                        processedCount: getCountDisplay(getFileCount("bam", fileTypeSummaries)),
                        projectTitle: getUnspecifiedIfNullValue(projectTitle.projectTitle),
                        projectShortname: getUnspecifiedIfNullValue(projectTitle.projectShortname),
                        rawCount: getCountDisplay(rawCount),
                        sampleEntityType: getUnspecifiedIfNullValue(samples.sampleEntityType),
                        selectedCellType: getUnspecifiedIfNullValue(cellSuspensions.selectedCellType),
                        totalCells: getUnspecifiedIfNullValue(cellSuspensions.totalCells)
                    };
                });
            })
        );
    }

    connect(): Observable<Element[]> {
        return this.element$;
    }

    disconnect() {
    }
}
