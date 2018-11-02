/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Table component for displaying file-related data.
 */
// Core dependencies
import { DataSource } from "@angular/cdk/collections";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Sort } from "@angular/material";
import { Store } from "@ngrx/store";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectPagination, selectTableData } from "../_ngrx/file.selectors";
import {
    FetchPagedOrSortedTableDataRequestAction, TableNextPageAction,
    TablePreviousPageAction
} from "../_ngrx/table/table.actions";
import { PaginationModel } from "../table/pagination.model";
import { TableParamsModel } from "../table/table-params.model";

@Component({
    selector: "hca-table-files",
    templateUrl: "./hca-table-files.component.html",
    styleUrls: ["./hca-table-files.component.scss"]
})
export class HCATableFilesComponent implements OnInit {

    displayedColumns = [
        "fileName", "fileFormat", "fileSize", "specimenId", "organ", "organPart", "libraryConstructionApproach", "genusSpecies", "organismAge", "biologicalSex", "disease", "totalCells"
    ];
    tableElementDataSource: TableElementDataSource;
    tooltipShowDelay = 150;
    pagination$: Observable<PaginationModel>;

    /**
     * @param {Store<AppState>} store
     * @param {ChangeDetectorRef} cdref
     */
    constructor(private store: Store<AppState>, private cdref: ChangeDetectorRef) {
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
     * Returns class truncate if file name is not spaced.
     * Always returns class hca-tooltip and narrow.
     * @param name
     * @returns {any}
     */
    public getTooltipClass(name) {

        if ( name.indexOf(" ") == -1 ) {
            return "hca-tooltip narrow truncate";
        }
        return "hca-tooltip narrow";
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
     * Called when table next page selected.
     *
     * @param {PaginationModel} pm
     */
    public nextPageSelected(pm: PaginationModel) {

        if ( !this.hasNext(pm) ) {
            return;
        }

        let tableParamsModel = {

            search_after: pm.search_after,
            search_after_uid: pm.search_after_uid,
            size: pm.size,
            sort: pm.sort,
            order: pm.order
        };

        this.store.dispatch(new TableNextPageAction(tableParamsModel));
    }

    /**
     * Called when table previous page selected.
     */
    public previousPageSelected(pm: PaginationModel) {


        if ( !this.hasPrevious(pm) ) {
            return;
        }

        let tableParamsModel = {

            search_before: pm.search_before,
            search_before_uid: pm.search_after_uid,
            size: pm.size,
            sort: pm.sort,
            order: pm.order
        };

        this.store.dispatch(new TablePreviousPageAction(tableParamsModel));
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
     * Check if there is a next page.
     *
     * @param {PaginationModel} pm
     * @returns {boolean}
     */
    public hasNext(pm: PaginationModel): boolean {
        // return (pm.from + pm.count) < pm.total;
        return pm.search_after !== null;
    }

    /**
     * Check if there is a previous page.
     *
     * @param {PaginationModel} pm
     * @returns {boolean}
     */
    public hasPrevious(pm: PaginationModel): boolean {
        // return (pm.from > 1);
        return pm.search_before !== null;
    }

    /**
     * Return the total number of pages.
     *
     * @param {PaginationModel} pm
     * @returns {number}
     */
    getPageCount(pm: PaginationModel) {
        return Math.ceil(pm.total / pm.size);
    }

    getPages(pm: PaginationModel): number[] {

        let pages = [];
        let pageCount = this.getPageCount(pm);

        for ( let i = 1; i <= pageCount; i++ ) {
            pages.push(i);
        }

        return pages;
    }

    /**
     * Sets the number of rows per page.
     *
     * @param {PaginationModel} pm
     * @returns {number} pageSize
     */
    public setPageSize(pm: PaginationModel, pageSize: number) {

        let tableParamsModel: TableParamsModel = {
            size: pageSize,
            sort: pm.sort,
            order: pm.order
        };

        this.store.dispatch(new FetchPagedOrSortedTableDataRequestAction(tableParamsModel));
    }

    /**
     * Lifecycle hooks
     */

    /**
     *  Set up table data source and pagination
     */
    ngOnInit() {

        // Initialize the new data source with an observable of the table data.
        this.tableElementDataSource = new TableElementDataSource(this.store.select(selectTableData));

        // Get an observable of the pagination model
        this.pagination$ = this.store.select(selectPagination);
    }

    ngAfterContentChecked() {

        this.cdref.detectChanges();
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

                let file = row.files[0] || {};
                let cellSuspensions = this.rollUpMetadata(row.cellSuspensions);
                let processes = this.rollUpMetadata(row.processes);
                let specimens = this.rollUpMetadata(row.specimens);

                return {
                    fileFormat: file.format,
                    fileName: file.name,
                    fileSize: this.getUnspecifiedIfNullValue(file.size),
                    specimenId: this.getSelfOrFirst(specimens.id),
                    organ: this.getUnspecifiedIfNullValue(specimens.organ),
                    organPart: this.getUnspecifiedIfNullValue(specimens.organPart),
                    libraryConstructionApproach: this.getUnspecifiedIfNullValue(processes.libraryConstructionApproach),
                    genusSpecies: this.getUnspecifiedIfNullValue(specimens.genusSpecies),
                    organismAge: this.getUnspecifiedIfNullValue(specimens.organismAge),
                    ageUnit: specimens.organismAgeUnit,
                    biologicalSex: this.getUnspecifiedIfNullValue(specimens.biologicalSex),
                    disease: this.getUnspecifiedIfNullValue(specimens.disease),
                    totalCells: this.getUnspecifiedIfNullValue(cellSuspensions.totalCells),
                    url: file.url
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
