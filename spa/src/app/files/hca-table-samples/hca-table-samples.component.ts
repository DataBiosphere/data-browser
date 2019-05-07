/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table component for displaying sample related data.
 */

// Core dependencies
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Sort } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { fromEvent, Observable, merge, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { map } from "rxjs/operators";

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
    getColumnDescription,
    getColumnDisplayName,
    getFileTypeCounts,
    getFileCountDisplay,
    getHeaderClass,
    getPairedEnd,
    getRowClass,
    getSelfOrFirst,
    getUnspecifiedIfNullValue,
    isColumnRightAligned,
    isTooltipDisabled,
    rollUpMetadata
} from "../table/table-methods";
import { TableParamsModel } from "../table/table-params.model";

@Component({
    selector: "hca-table-samples",
    templateUrl: "./hca-table-samples.component.html",
    styleUrls: ["./hca-table-samples.component.scss"]
})
export class HCATableSamplesComponent implements OnDestroy, OnInit, AfterViewInit {

    // Template variables
    data$: Observable<any[]>;
    displayedColumns = [
        "sampleId", "projectTitle", "sampleEntityType", "organ", "organPart", "selectedCellType", "libraryConstructionApproach", "genusSpecies",
        "organismAge", "biologicalSex", "disease", "fileType", "totalCells"
    ];
    domainCountsByColumnName$: Observable<Map<string, number>>;
    getAge = getAge;
    getColumnDescription = getColumnDescription;
    getColumnDisplayName = getColumnDisplayName;
    getHeaderClass = getHeaderClass;
    getRowClass = getRowClass;
    isTooltipDisabled = isTooltipDisabled;
    isColumnRightAligned = isColumnRightAligned;
    loading$: Observable<boolean>;
    selectFileSummary$: Observable<FileSummary>;
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

        merge(scrolls$, wheels$)
            .pipe(
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
    genusSpecies: string;
    libraryConstructionApproach: string;
    organ: string;
    organismAge: string;
    organPart: string;
    pairedEnd: string;
    projectTitle: string;
    sampleEntityType: string;
    sampleId: string;
    selectedCellType: string;
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

        this.element$ = tableData$.pipe(
            map((rows: any[]) => {

                return rows.map((row: any) => {

                    let cellSuspensions = rollUpMetadata(row.cellSuspensions);
                    let fileTypeSummaries = row.fileTypeSummaries;
                    let protocols = rollUpMetadata(row.protocols);
                    let samples = rollUpMetadata(row.samples);
                    let specimens = rollUpMetadata(row.specimens);
                    let donorOrganisms = rollUpMetadata(row.donorOrganisms);
                    let projectTitle = rollUpMetadata(row.projects);
                    // File counts for a set list of file types
                    let fileTypeCounts = getFileTypeCounts(fileTypeSummaries);

                    return {
                        ageUnit: donorOrganisms.organismAgeUnit,
                        bamCount: getFileCountDisplay(fileTypeCounts.bamCount),
                        biologicalSex: getUnspecifiedIfNullValue(donorOrganisms.biologicalSex),
                        disease: getUnspecifiedIfNullValue(samples.disease),
                        genusSpecies: getUnspecifiedIfNullValue(donorOrganisms.genusSpecies),
                        libraryConstructionApproach: getUnspecifiedIfNullValue(protocols.libraryConstructionApproach),
                        matrixCount: getFileCountDisplay(fileTypeCounts.matrixCount),
                        organ: getUnspecifiedIfNullValue(specimens.organ),
                        organismAge: getUnspecifiedIfNullValue(donorOrganisms.organismAge),
                        organPart: getUnspecifiedIfNullValue(specimens.organPart),
                        otherCount: getFileCountDisplay(fileTypeCounts.otherCount),
                        pairedEnd: getPairedEnd(protocols.pairedEnd),
                        projectTitle: getUnspecifiedIfNullValue(projectTitle.projectTitle),
                        rawCount: getFileCountDisplay(fileTypeCounts.rawCount),
                        sampleEntityType: getUnspecifiedIfNullValue(samples.sampleEntityType),
                        sampleId: getSelfOrFirst(samples.id),
                        selectedCellType: getUnspecifiedIfNullValue(cellSuspensions.selectedCellType),
                        totalCells: getUnspecifiedIfNullValue(cellSuspensions.totalCells),
                        totalCount: getFileCountDisplay(fileTypeCounts.totalCount)
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
