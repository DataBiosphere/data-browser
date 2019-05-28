/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying file-related data.
 */

// Core dependencies
import { DataSource } from "@angular/cdk/collections";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatSortHeader, Sort } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { fromEvent, Observable, merge, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/file.selectors";
import { FetchPagedOrSortedTableDataRequestAction } from "../_ngrx/table/table.actions";
import { FileSummary } from "../file-summary/file-summary";
import { PaginationModel } from "../table/pagination.model";
import {
    getAge,
    getColumnClass,
    getColumnDescription,
    getColumnDisplayName,
    getColumnStyle,
    getHeaderClass,
    getRowClass,
    getSelfOrFirst,
    getUnspecifiedIfNullValue,
    isTooltipDisabled,
    rollUpMetadata
} from "../table/table-methods";
import { TableParamsModel } from "../table/table-params.model";

@Component({
    selector: "hca-table-files",
    templateUrl: "./hca-table-files.component.html",
    styleUrls: ["./hca-table-files.component.scss"]
})
export class HCATableFilesComponent implements OnInit, AfterViewInit {

    // Template variables
    data$: Observable<any[]>;
    defaultSortOrder = {
        sort: "fileName",
        order: "asc"
    };
    displayedColumns = [
        "fileName", "fileFormat", "fileSize", "projectTitle", "specimenId", "sampleEntityType", "organ", "organPart", "selectedCellType",
        "libraryConstructionApproach", "pairedEnd", "genusSpecies", "organismAge", "biologicalSex", "disease", "totalCells"
    ];
    domainCountsByColumnName$: Observable<Map<string, number>>;
    getAge = getAge;
    getColumnClass = getColumnClass;
    getColumnDescription = getColumnDescription;
    getColumnDisplayName = getColumnDisplayName;
    getColumnStyle = getColumnStyle;
    getHeaderClass = getHeaderClass;
    getRowClass = getRowClass;
    isTooltipDisabled = isTooltipDisabled;
    loading$: Observable<boolean>;
    selectFileSummary$: Observable<FileSummary>;
    tableElementDataSource: TableElementDataSource;
    pagination$: Observable<PaginationModel>;

    // Locals
    private ngDestroy$ = new Subject();
    private snapped: boolean;

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

        // Get the summary counts - used by columns with SUMMARY_COUNT countType
        this.selectFileSummary$ = this.store.pipe(select(selectFileSummary));
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
    fileFormat: string;
    fileName: string;
    fileSize: number;
    genusSpecies: string;
    libraryConstructionApproach: string;
    organ: string;
    organismAge: string;
    organPart: string;
    pairedEnd: string;
    projectTitle: string;
    sampleEntityType: string;
    selectedCellType: string;
    specimenId: string;
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
                    let cellSuspensions = rollUpMetadata(row.cellSuspensions);
                    let protocols = rollUpMetadata(row.protocols);
                    let samples = rollUpMetadata(row.samples);
                    let specimens = rollUpMetadata(row.specimens);
                    let donorOrganisms = rollUpMetadata(row.donorOrganisms);
                    let projectTitle = rollUpMetadata(row.projects);

                    return {
                        ageUnit: donorOrganisms.organismAgeUnit,
                        biologicalSex: getUnspecifiedIfNullValue(donorOrganisms.biologicalSex),
                        disease: getUnspecifiedIfNullValue(samples.disease),
                        fileFormat: file.format,
                        fileName: file.name,
                        fileSize: getUnspecifiedIfNullValue(file.size),
                        genusSpecies: getUnspecifiedIfNullValue(donorOrganisms.genusSpecies),
                        libraryConstructionApproach: getUnspecifiedIfNullValue(protocols.libraryConstructionApproach),
                        organ: getUnspecifiedIfNullValue(samples.organ),
                        organismAge: getUnspecifiedIfNullValue(donorOrganisms.organismAge),
                        organPart: getUnspecifiedIfNullValue(samples.organPart),
                        pairedEnd: getUnspecifiedIfNullValue(protocols.pairedEnd),
                        projectTitle: getUnspecifiedIfNullValue(projectTitle.projectTitle),
                        sampleEntityType: getUnspecifiedIfNullValue(samples.sampleEntityType),
                        selectedCellType: getUnspecifiedIfNullValue(cellSuspensions.selectedCellType),
                        specimenId: getSelfOrFirst(specimens.id),
                        totalCells: getUnspecifiedIfNullValue(cellSuspensions.totalCells),
                        url: file.url
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
