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
import { FetchPagedOrSortedTableDataRequestAction } from "../_ngrx/table/table.actions";
import { PaginationModel } from "../table/pagination.model";
import { TableParamsModel } from "../table/table-params.model";
import { SelectProjectAction } from "../_ngrx/search/select-project.action";

@Component({
    selector: "hca-table-projects",
    templateUrl: "./hca-table-projects.component.html",
    styleUrls: ["./hca-table-projects.component.scss"]
})

export class HCATableProjectsComponent implements OnInit, AfterViewInit {

    // Template variables
    data$: Observable<any[]>;
    displayedColumns = [
        "projectTitle", "organ", "selectedCellType", "libraryConstructionApproach", "genusSpecies", "disease", "fileType",
        "donorCount", "estimatedCellCount"
    ];
    domainCountsByColumnName$: Observable<Map<string, number>>;
    domainCountVisibleForColumns = [
        "disease",
        "fileFormat",
        "genusSpecies",
        "libraryConstructionApproach",
        "organ"
    ];
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

        return this.selectedProjectIds.indexOf(project.projectShortname) >= 0;
    }

    /**
     * Returns false (tooltip will not be disabled) if the width of the parent container is smaller than the element of interest.
     * If false, an ellipsis has been applied to the text and a tooltip will show the element's content.
     * @param el
     * @returns {boolean}
     */
    public isTooltipDisabled(el) {

        return !(el.parentElement.getBoundingClientRect().width < el.getBoundingClientRect().width);
    }

    /**
     * Handle click on project in table - update store with selected project.
     *
     * @param {string} projectId
     * @param {string} projectName
     * @param {boolean} selected
     */
    public onProjectSelected(projectId: string, projectName: string, selected: boolean) {

        this.store.dispatch(new SelectProjectAction(projectName, !selected));
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
    estimatedCellCount: number;
    genusSpecies: string;
    libraryConstructionApproach: string;
    organ: string;
    pairedEnd: string;
    projectShortname: string;
    projectTitle: string;
    selectedCellType: string;
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

                    let cellSuspensions = this.rollUpMetadata(row.cellSuspensions);
                    let fileTypeSummaries = row.fileTypeSummaries;
                    let projectSummary = row.projectSummary;
                    let projectTitle = this.rollUpMetadata(row.projects);
                    let protocols = this.rollUpMetadata(row.protocols);

                    // only roll up organType
                    let organs = this.rollUpMetadata(row.projectSummary.organSummaries.map((s) => {
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
                    let rawCount = (this.getFileCount("fastq.gz", fileTypeSummaries) + this.getFileCount("fastq", fileTypeSummaries));

                    return {
                        disease: this.getUnspecifiedIfNullValue(projectSummary.disease),
                        donorCount: this.getUnspecifiedIfNullValue(projectSummary.donorCount),
                        estimatedCellCount: this.getUnspecifiedIfNullValue(cellSuspensions.totalCells),
                        entryId: row.entryId,
                        genusSpecies: this.getUnspecifiedIfNullValue(projectSummary.genusSpecies),
                        libraryConstructionApproach: this.getUnspecifiedIfNullValue(projectSummary.libraryConstructionApproach),
                        matrixCount: this.getFileCount("matrix", fileTypeSummaries),
                        organ: this.getUnspecifiedIfNullValue(organs.organType),
                        otherFileCount: fileCounts.otherFileCount,
                        pairedEnd: this.getPairedEnd(protocols.pairedEnd),
                        processedCount: this.getFileCount("bam", fileTypeSummaries),
                        projectTitle: this.getUnspecifiedIfNullValue(projectTitle.projectTitle),
                        projectShortname: this.getUnspecifiedIfNullValue(projectTitle.projectShortname),
                        rawCount: rawCount,
                        selectedCellType: this.getUnspecifiedIfNullValue(cellSuspensions.selectedCellType)
                    };
                });
            })
        );
    }

    // Each bundle contains multiple biomaterials which are in a hierarchy
    // leading back to the root biomaterial. Biomaterials are in an array.
    // This rolls up the metadata values to a single object.

    rollUpMetadata(array): any {

        // if the array is empty we have no values.
        if ( !array ) {
            return {};
        }

        // for each element in the array
        const rollup = array.reduce((acc, element) => {

            // get its own keys and their values.
            Object.keys(element).forEach((key) => {
                let value = element[key];

                // skip null values
                if ( value ) {

                    // flatten arrays
                    if ( value instanceof Array ) {
                        value = value.join(", ");
                    }


                    if ( key === "totalCells" ) {

                        if ( acc[key] ) {
                            acc[key] = acc[key] + value;
                        }
                        else {
                            acc[key] = value;
                        }

                    }
                    else {

                        // if the value is different from an existing key...
                        let cellValues;

                        try {
                            cellValues = acc[key] ? acc[key].split(", ") : [];
                        }
                        catch (error) {
                            console.log(key);
                            console.log(value);
                            console.log(acc[key]);
                            return;
                        }


                        if ( cellValues.length ) {
                            if ( !cellValues.some(cellValue => cellValue === value) ) {
                                // append the value to the existing key
                                acc[key] = acc[key] + ", " + value;
                            }
                        }
                        else {
                            // if no existing key or the values are the same just set the value.
                            acc[key] = value;
                        }
                    }
                }
            });

            return acc;

        }, {});

        return rollup;

    }

    /**
     * Returns the count for file type.
     * @param {string} fileTypeName
     * @param {any[]} fileTypeSummaries
     * @returns {number}
     */
    public getFileCount(fileTypeName: string, fileTypeSummaries: any[]): number {

        let fileTypeSummary = fileTypeSummaries.find(fileSummary => fileSummary.fileType === fileTypeName);

        // Returns a count if fileType exists, otherwise returns 0.
        if ( fileTypeSummary ) {

            return fileTypeSummary.count;
        }

        return 0;
    }

    /**
     * Returns "Paired End", "Single End" or "Unspecified" for pairedEnd value.
     * @param {string} pairedEnd
     * @returns {string}
     */
    public getPairedEnd(pairedEnd: string): string {

        if (pairedEnd) {

            return (pairedEnd.split(",").map(p => {

                if ( p === "true" ) {
                    return "Paired End";
                }
                else if ( p === "false" ) {
                    return "Single End";
                }
                return "Unspecified";

            }).join(", "));
        }
        return "Unspecified";
    }

    public getSelfOrFirst(value) {
        const vals = value.split(", ");
        return vals[0];
    }

    /**
     * Returns the value if it is specified, otherwise returns "Unspecified" if value null.
     * @param {any} value
     * @returns {any}
     */
    public getUnspecifiedIfNullValue(value: any): any {

        if ( value ) {

            return value;
        }

        return "Unspecified";
    }

    connect(): Observable<Element[]> {
        return this.element$;
    }

    disconnect() {
    }
}
