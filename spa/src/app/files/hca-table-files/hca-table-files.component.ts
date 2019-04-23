/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying file-related data.
 */

// Core dependencies
import { DataSource } from "@angular/cdk/collections";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit } from "@angular/core";
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

@Component({
    selector: "hca-table-files",
    templateUrl: "./hca-table-files.component.html",
    styleUrls: ["./hca-table-files.component.scss"]
})
export class HCATableFilesComponent implements OnInit, AfterViewInit {

    // Template variables
    data$: Observable<any[]>;
    displayedColumns = [
        "fileName", "fileFormat", "fileSize", "projectTitle", "specimenId", "organ", "organPart", "selectedCellType",
        "libraryConstructionApproach", "genusSpecies", "organismAge", "biologicalSex", "disease", "totalCells"
    ];
    domainCountsByColumnName$: Observable<Map<string, number>>;
    domainCountVisibleForColumns = [
        "biologicalSex",
        "disease",
        "fileFormat",
        "genusSpecies",
        "libraryConstructionApproach",
        "organ"
    ];
    loading$: Observable<boolean>;
    tableElementDataSource: TableElementDataSource;
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
     * Returns ageUnit, truncated at first character
     * @param ageUnit
     * @returns {string}
     */
    public getAgeUnit(ageUnit: string): string {

        if ( ageUnit ) {
            return ageUnit.charAt(0);
        }
    }

    /**
     * Returns class download and class truncate (if table data is not spaced).
     * @param {string} tableData
     * @returns {{[p: string]: boolean}}
     */
    public getFileDownloadClass(tableData: string): { [className: string]: boolean } {

        if ( tableData.indexOf(" ") == -1 ) {
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
     * Returns false (tooltip not to be disabled) if the width of the parent container is smaller than the element of interest.
     * If false, an ellipsis has been applied to the text and a tooltip will show the element's content.
     * @param el
     * @returns {boolean}
     */
    public isTooltipDisabled(el) {

        return !( el.parentElement.getBoundingClientRect().width < el.getBoundingClientRect().width );
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
 * Elements in Material Design table that displays HCA-specific file related data.
 */
export interface Element {
    fileFormat: string;
    fileName: string;
    fileSize: number;
    organ: string;
    organPart: string;
    libraryConstructionApproach: string;
    genusSpecies: string;
    organismAge: string;
    ageUnit: string;
    biologicalSex: string;
    disease: string; // TODO check not array
    pairedEnd: string;
    projectTitle: string;
    selectedCellType: string;
    totalCells: number;
    url: string;
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

        this.element$ = tableData$.pipe(
            map((rows: any[]) => {

                return rows.map((row: any) => {

                    let file = row.files[0] || {};
                    let cellSuspensions = this.rollUpMetadata(row.cellSuspensions);
                    let protocols = this.rollUpMetadata(row.protocols);
                    let specimens = this.rollUpMetadata(row.specimens);
                    let projectTitle = this.rollUpMetadata(row.projects);

                    return {
                        ageUnit: specimens.organismAgeUnit,
                        biologicalSex: this.getUnspecifiedIfNullValue(specimens.biologicalSex),
                        disease: this.getUnspecifiedIfNullValue(specimens.disease),
                        fileFormat: file.format,
                        fileName: file.name,
                        fileSize: this.getUnspecifiedIfNullValue(file.size),
                        genusSpecies: this.getUnspecifiedIfNullValue(specimens.genusSpecies),
                        libraryConstructionApproach: this.getUnspecifiedIfNullValue(protocols.libraryConstructionApproach),
                        organ: this.getUnspecifiedIfNullValue(specimens.organ),
                        organismAge: this.getUnspecifiedIfNullValue(specimens.organismAge),
                        organPart: this.getUnspecifiedIfNullValue(specimens.organPart),
                        pairedEnd: this.getPairedEnd(protocols.pairedEnd),
                        projectTitle: this.getUnspecifiedIfNullValue(projectTitle.projectTitle),
                        selectedCellType: this.getUnspecifiedIfNullValue(cellSuspensions.selectedCellType),
                        specimenId: this.getSelfOrFirst(specimens.id),
                        totalCells: this.getUnspecifiedIfNullValue(cellSuspensions.totalCells),
                        url: file.url
                    };
                });
            })
        );
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
     * Returns "Paired End", "Single End" or "Unspecified" for pairedEnd value.
     * @param {string} pairedEnd
     * @returns {string}
     */
    public getPairedEnd(pairedEnd: string): string {

        if ( !pairedEnd ) {
            return "Unspecified";
        }
        if ( pairedEnd === "true" ) {
            return "Paired End";
        }
        else if ( pairedEnd === "false" ) {
            return "Single End";
        }
    }

    public getSelfOrFirst(value) {

        if ( !value ) {

            return "";
        }
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
