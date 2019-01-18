/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Table component for displaying specimen related data.
 */

// Core dependencies
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Sort } from "@angular/material";
import { Store } from "@ngrx/store";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectPagination, selectTableData } from "../_ngrx/file.selectors";
import { FetchPagedOrSortedTableDataRequestAction } from "../_ngrx/table/table.actions";
import { PaginationModel } from "../table/pagination.model";
import { TableParamsModel } from "../table/table-params.model";

@Component({
    selector: "hca-table",
    templateUrl: "./hca-table.component.html",
    styleUrls: ["./hca-table.component.scss"]
})
export class HCATableComponent implements OnInit, AfterViewInit {

    // Template variables
    displayedColumns = [
        "specimenId", "projectTitle", "organ", "organPart", "libraryConstructionApproach", "genusSpecies", "organismAge", "biologicalSex", "disease", "fileType", "fileCount", "totalCells"
    ];
    tableElementDataSource: TableElementDataSource;
    tooltipShowDelay = 150;
    pagination$: Observable<PaginationModel>;

    // Locals
    private ngDestroy$ = new Subject();
    private snapped: boolean;

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
     * Returns age and ageUnit.
     * @param age
     * @param ageUnit
     * @returns {string}
     */
    public getAge(age: string, ageUnit: string): string {

        let ageUnitTruncated = this.getAgeUnit(ageUnit);

        if ( age && age !== "Unspecified" ) {

            return age + " " + ageUnitTruncated;
        }

        return "Unspecified";
    }

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
     * Returns first character of age unit.
     * @param ageUnit
     * @returns {string}
     */
    public getAgeUnit(ageUnit: string): string {

        if ( ageUnit ) {
            return ageUnit.charAt(0);
        }
    }

    /**
     * Returns false if the text is longer than its container.
     * If false, an ellipsis has been applied to the text.
     * @param el
     * @returns {boolean}
     */
    public isDisabled(el) {

        return !( el.scrollWidth > el.clientWidth );
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
        const scrolls$ = Observable.fromEvent(this.window, "scroll");
        const wheels$ = Observable.fromEvent(this.window, "wheel");

        scrolls$.merge(wheels$)
            .takeUntil(this.ngDestroy$)
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
        this.tableElementDataSource = new TableElementDataSource(this.store.select(selectTableData));

        // Get an observable of the pagination model
        this.pagination$ = this.store.select(selectPagination);
    }
}

/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Elements in Material Design table that displays HCA-specific file related data.
 */
export interface Element {
    ageUnit: string;
    biologicalSex: string;
    disease: string; // TODO check not array
    fileCount: number;
    genusSpecies: string;
    libraryConstructionApproach: string;
    organ: string;
    organismAge: string;
    organPart: string;
    projectTitle: string;
    totalCells: number;
}

/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data source backing Material Design table that displays file related data.
 */
class TableElementDataSource extends DataSource<any> {

    element$: Observable<Element[]>;

    constructor(tableData$: Observable<any[]>) {

        super();

        this.element$ = tableData$.map((rows: any[]) => {

            return rows.map((row: any) => {

                let cellSuspensions = this.rollUpMetadata(row.cellSuspensions);
                let fileTypeSummaries = row.fileTypeSummaries;
                let processes = this.rollUpMetadata(row.processes);
                let specimens = this.rollUpMetadata(row.specimens);
                let projectTitle = this.rollUpMetadata(row.projects);

                /* File counts for file formats - excludes fastq.gz, bam, matrix */
                let fileCounts = fileTypeSummaries.reduce((acc, fileTypeSummary) => {

                    if ( (fileTypeSummary.fileType !== "bam") && (fileTypeSummary.fileType !== "matrix") && (fileTypeSummary.fileType !== "fastq.gz") ) {

                        acc.otherFileCount = acc.otherFileCount + fileTypeSummary.count;
                    }
                    return acc;

                }, {otherFileCount: 0});

                return {
                    ageUnit: specimens.organismAgeUnit,
                    biologicalSex: this.getUnspecifiedIfNullValue(specimens.biologicalSex),
                    disease: this.getUnspecifiedIfNullValue(specimens.disease),
                    fileCount: this.getUnspecifiedIfNullValue(fileCounts.totalCount),
                    genusSpecies: this.getUnspecifiedIfNullValue(specimens.genusSpecies),
                    libraryConstructionApproach: this.getUnspecifiedIfNullValue(processes.libraryConstructionApproach),
                    matrixCount: this.getFileCount("matrix", fileTypeSummaries),
                    organ: this.getUnspecifiedIfNullValue(specimens.organ),
                    organismAge: this.getUnspecifiedIfNullValue(specimens.organismAge),
                    organPart: this.getUnspecifiedIfNullValue(specimens.organPart),
                    otherFileCount: fileCounts.otherFileCount,
                    processedCount: this.getFileCount("bam", fileTypeSummaries),
                    projectTitle: this.getUnspecifiedIfNullValue(projectTitle.projectTitle),
                    specimenId: this.getSelfOrFirst(specimens.id),
                    totalCells: this.getUnspecifiedIfNullValue(cellSuspensions.totalCells),
                    rawCount: this.getFileCount("fastq.gz", fileTypeSummaries)
                };
            });
        });
    }

    // Each bundle contains multiple biomaterials which are in a hierarchy
    // leading back to the root biomaterial. Biomarerials are in an array.
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
                        value = value.join(",");
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
                            cellValues = acc[key] ? acc[key].split(",") : [];
                        }
                        catch (error) {
                            console.log(key);
                            console.log(value);
                            console.log(acc[key]);
                            return;
                        }


                        if ( cellValues.length ) {
                            if ( !cellValues.some(cellValue => cellValue === value) ) {
                                // apend the value to the existing key
                                acc[key] = acc[key] + ", " + value;
                            }
                        }
                        else {
                            // if no existing key or the vaues are the same just set the value.
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

    public getSelfOrFirst(value) {
        const vals = value.split(",");
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
