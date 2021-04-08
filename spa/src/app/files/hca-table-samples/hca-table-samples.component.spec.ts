/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing samples table component.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatSortHeader, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterTestingModule } from "@angular/router/testing";
import { By, HAMMER_LOADER } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App components
import { AnalysisProtocolPipelineLinkerComponent } from "../analysis-protocol-pipeline-linker/analysis-protocol-pipeline-linker.component";
import { ConfigService } from "../../config/config.service";
import { EntityRequestService } from "../entity/entity-request.service";
import { HCAContentEllipsisComponent } from "../hca-content-ellipsis/hca-content-ellipsis.component";
import { HCAEllipsisTextComponent } from "../hca-content-ellipsis/hca-ellipsis-text.component";
import { HCAContentUnspecifiedDashComponent } from "../hca-content-unspecified-bar/hca-content-unspecified-dash.component";
import { HCATableCellComponent } from "../hca-table-cell/hca-table-cell.component";
import { HCATableColumnHeaderComponent } from "../hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderCountComponent } from "../hca-table-column-header-count/hca-table-column-header-count.component";
import { HCATableColumnHeaderTitleComponent } from "../hca-table-column-header-title/hca-table-column-header-title.component";
import { HCATableDataStatusPlaceholderComponent } from "../hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATablePaginationComponent } from "../hca-table-pagination/hca-table-pagination.component";
import { HCATableSamplesComponent } from "./hca-table-samples.component";
import { HCATableSortComponent } from "../hca-table-sort/hca-table-sort.component";
import { PipeModule } from "../../pipe/pipe.module";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DownloadButtonComponent } from "../../shared/download-button/download-button.component";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { HCATooltipComponent } from "../../shared/hca-tooltip/hca-tooltip.component";
import { ResponsiveService } from "../../shared/responsive/responsive.service";
import { TableScroll } from "../table-scroll/table-scroll.component";
import { SAMPLES_TABLE_MODEL } from "./table-state-table-model-samples.mock";
import { TableRendererService } from "../table/table-renderer.service";
import { PaginationService } from "../table/pagination/pagination.service";

describe("HCATableSamplesComponent", () => {

    let component: HCATableSamplesComponent;
    let fixture: ComponentFixture<HCATableSamplesComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const INDEX_TABLE_ROW_SINGLE_VALUES = 0;
    const INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES = 3;
    const INDEX_TABLE_ROW_NULL_VALUES = 5;

    // Column titles
    const COLUMN_TITLE_DEVELOPMENT_STAGE = "Development Stage";
    const COLUMN_TITLE_DONOR_DISEASE = "Disease Status (Donor)";
    const COLUMN_TITLE_MODEL_ORGAN = "Model Organ";
    const COLUMN_TITLE_NUCLEIC_ACID_SOURCE = "Nucleic Acid Source";
    const COLUMN_TITLE_SPECIMEN_DISEASE = "Disease Status (Specimen)";
    const COLUMN_TITLE_TOTAL_CELLS = "Cell Count Estimate";

    const COLUMN_TITLE_WORKFLOW = "Analysis Protocol";
    // Column names
    const COLUMN_NAME_DEVELOPMENT_STAGE = "developmentStage";
    const COLUMN_NAME_DONOR_DISEASE = "donorDisease";
    const COLUMN_NAME_MODEL_ORGAN = "modelOrgan";
    const COLUMN_NAME_NUCLEIC_ACID_SOURCE = "nucleicAcidSource";
    const COLUMN_NAME_SPECIMEN_DISEASE = "disease";
    const COLUMN_NAME_WORKFLOW = "workflow";
    const COLUMN_NAME_TOTAL_CELLS = "totalCells";

    // Component names
    const COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER = "analysis-protocol-pipeline-linker";
    const COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH = "hca-content-unspecified-dash";
    const COMPONENT_NAME_HCA_TABLE_SORT = "hca-table-sort";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AnalysisProtocolPipelineLinkerComponent,
                CopyToClipboardComponent,
                HCAContentEllipsisComponent,
                HCAContentUnspecifiedDashComponent,
                HCAEllipsisTextComponent,
                HCATableCellComponent,
                HCATableColumnHeaderComponent,
                HCATableColumnHeaderCountComponent,
                HCATableColumnHeaderTitleComponent,
                HCATableDataStatusPlaceholderComponent,
                HCATablePaginationComponent,
                HCATableSamplesComponent,
                HCATableSortComponent,
                HCATooltipComponent,
                DownloadButtonComponent,
                TableScroll
            ],
            imports: [
                BrowserAnimationsModule,
                ClipboardModule,
                MatIconModule,
                MatSortModule,
                MatProgressSpinnerModule,
                MatTableModule,
                MatTooltipModule,
                PipeModule,
                RouterTestingModule
            ],
            providers: [
                ConfigService,
                EntityRequestService,
                {
                    provide: HAMMER_LOADER, // https://github.com/angular/components/issues/14668#issuecomment-450474862
                    useValue: () => new Promise(() => {
                    })
                },
                PaginationService,
                {
                    provide: ResponsiveService,
                    useValue: jasmine.createSpyObj("ResponsiveService", ["isWindowWidthHCAMedium", "isWindowWidthSmallTablet", "isWindowWidthSmall"])
                },
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: TableRendererService,
                    useValue: jasmine.createSpyObj("TableRendererService", {
                        "onRenderCompleted": of(true)
                    })
                },
                {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCATableSamplesComponent);
        component = fixture.componentInstance;
    }));

    describe("Sort", () => {

        /**
         * Confirm sort functionality is set up in component.
         */
        it("should set up sort functionality on init", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Confirm data was loaded - table should be visible including sort column headers
            expect(component.matSort).toBeTruthy();
        });

        /**
         * Confirm sort function is called on click of sort header.
         */
        it("should call sort on click of sort header", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Confirm data was loaded - table should be visible including sort column headers
            expect(component.matSort).toBeTruthy();

            // Find the sort header for the project name column
            const columnName = "projectTitle";
            const columnHeaderDE = findHeader(columnName);
            expect(columnHeaderDE).toBeTruthy();
            const sortHeaderDE = findSortHeader(columnHeaderDE);
            expect(sortHeaderDE).toBeTruthy();

            // Execute click on sort header
            const onSortTable = spyOn(component, "sortTable");
            sortHeaderDE.triggerEventHandler("click", null);
            expect(onSortTable).toHaveBeenCalled();
        });

        /**
         * Confirm sort order is returned to default if no sort direction is specified (sort direction is not specified
         * when the user has clicked on a column header three times in a row; the first time sets the sort direction to asc,
         * the second to desc and the third clears the direction.
         */
        it("should reset sort order to default on clear of sort", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Mimic clear of sort order and confirm it is reset back to default - grab the project name column header
            const columnName = "projectTitle";
            const columnHeaderDE = findHeader(columnName);
            const sortHeaderDE = findSortHeader(columnHeaderDE);

            // Execute first click to sort by sample entity type sort header
            sortHeaderDE.triggerEventHandler("click", null);
            expect(component.matSort.active).toEqual(columnName);
            expect(component.matSort.direction).toEqual("asc");

            // Execute second click to sort by sample entity type descending
            sortHeaderDE.triggerEventHandler("click", null);
            expect(component.matSort.active).toEqual(columnName);
            expect(component.matSort.direction).toEqual("desc");

            // Execute third click to clear sort
            sortHeaderDE.triggerEventHandler("click", null);
            fixture.detectChanges();
            expect(component.matSort.active).toEqual(component.defaultSortOrder.sort);
            expect(component.matSort.direction).toEqual(component.defaultSortOrder.order);
        });

        /**
         * Confirm component <hca-table-sort> is displayed in totalCells header.
         */
        it("should display component hca-table-sort in totalCells header", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Confirm column header displays component
            expect(isComponentDisplayed(findHeader(COLUMN_NAME_TOTAL_CELLS), COMPONENT_NAME_HCA_TABLE_SORT)).toBe(true);
        });
    });

    describe("Columns", () => {

        beforeEach(async(() => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();
        }));

        /**
         * Confirm development stage column labeled as "Development Stage" is displayed.
         */
        it(`displays column "Development Stage" column `, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_DEVELOPMENT_STAGE);

            // Confirm column title is displayed
            expect(columnHeaderDE).toBeTruthy();
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_DEVELOPMENT_STAGE);
        });

        /**
         * Confirm specimen disease column labeled as "Disease Status (Specimen)" is displayed.
         */
        it(`displays column "Disease Status (Specimen)" column`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_SPECIMEN_DISEASE);

            // Confirm column title is displayed
            expect(columnHeaderDE).toBeTruthy();
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_SPECIMEN_DISEASE);
        });

        /**
         * Confirm specimen disease column labeled as "Disease Status (Donor)" is displayed.
         */
        it(`displays column "Disease Status (Donor)" column`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_DONOR_DISEASE);

            // Confirm column title is displayed
            expect(columnHeaderDE).toBeTruthy();
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_DONOR_DISEASE);
        });

        /**
         * Confirm modelOrgan column labeled as "Model Organ" is displayed.
         */
        it(`should display column "Model Organ"`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_MODEL_ORGAN);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_MODEL_ORGAN);
        });

        /**
         * Confirm nucleic acid source column labeled as "Nucleic Acid Source" is displayed.
         */
        it(`displays column "Nucleic Acid Source" column`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_NUCLEIC_ACID_SOURCE);

            // Confirm column title is displayed
            expect(columnHeaderDE).toBeTruthy();
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_NUCLEIC_ACID_SOURCE);
        });

        /**
         * Confirm workflow column labeled as "Analysis Protocol" is displayed.
         */
        it(`should display column "Analysis Protocol"`, () => {

            const columnHeaderDE = findHeader(COLUMN_NAME_WORKFLOW);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_WORKFLOW);
        });

        /**
         * Confirm totalCells column labeled as "Cell Count Estimate" is displayed.
         */
        it(`should display column "Cell Count Estimate"`, () => {

            const columnHeaderDE = findHeader(COLUMN_NAME_TOTAL_CELLS);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_TOTAL_CELLS);
        });
    });

    describe("Model Organ Column", () => {

        beforeEach(async(() => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();
        }));

        /**
         * Confirm component <hca-content-unspecified-dash> is displayed when model organ value is empty.
         */
        it("should display component hca-content-unspecified-dash when model organ value is empty", () => {

            // Confirm row with empty array values in column "Model Organ" displays component
            const actual =
                findColumnCellComponent(INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES, COLUMN_NAME_MODEL_ORGAN, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH);
            expect(actual).not.toBe(null);
        });

        /**
         * Confirm component <hca-content-unspecified-dash> is displayed when model organ value is null.
         */
        it("should display component hca-content-unspecified-dash when model organ value is null", () => {

            // Confirm row with null values in column "Model Organ" displays component
            const actual =
                findColumnCellComponent(INDEX_TABLE_ROW_NULL_VALUES, COLUMN_NAME_MODEL_ORGAN, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH);
            expect(actual).not.toBe(null);
        });

        /**
         * Confirm model organ value is displayed.
         */
        it("should display model organ", () => {

            // Confirm row with single values in column "Model Organ" does display component
            const modelOrganDE = findColumnCells(COLUMN_NAME_MODEL_ORGAN)[0];
            const actual = modelOrganDE.nativeElement.textContent;
            const expected = SAMPLES_TABLE_MODEL.data[INDEX_TABLE_ROW_SINGLE_VALUES].samples[0].modelOrgan.join(", ");
            expect(actual).toEqual(expected);
        });
    });
    
    describe("Workflow Column", () => {

        /**
         * Confirm component <hca-content-unspecified-dash> is displayed when workflow value is empty.
         */
        it("should display component hca-content-unspecified-dash when workflow value is empty", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Confirm row with empty values in column "Analysis Protocol" displays component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH)).not.toBe(null);
        });

        /**
         * Confirm component <hca-content-unspecified-dash> is displayed when workflow value is null.
         */
        it("should display component hca-content-unspecified-dash when workflow value is null", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Confirm row with null values in column "Analysis Protocol" displays component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_NULL_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH)).not.toBe(null);
        });

        /**
         * Confirm component <analysis-protocol-pipeline-linker> is not displayed when workflow value is empty.
         */
        it("should not display component analysis protocol pipeline linker when workflow value is empty", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with empty values in column "Analysis Protocol" does not display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER)).toBe(null);
        });

        /**
         * Confirm component <analysis-protocol-pipeline-linker> is not displayed when workflow value is null.
         */
        it("should not display component analysis protocol pipeline linker when workflow value is null", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with null values in column "Analysis Protocol" does not display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_NULL_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER)).toBe(null);
        });

        /**
         * Confirm component <analysis-protocol-pipeline-linker> is displayed when workflow is single value.
         */
        it("should display component analysis protocol pipeline linker when workflow is single value", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            fixture.detectChanges();

            // Confirm row with single value in column "Analysis Protocol" does display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_SINGLE_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER)).not.toBe(null);
        });

        /**
         * Confirm component <hca-content-unspecified-dash> is not displayed when workflow is single value.
         */
        it("should not display component hca-content-unspecified-dash when workflow is single value", () => {

            testStore.pipe
                .and.returnValues(
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.data),
                of(SAMPLES_TABLE_MODEL.loading),
                of(SAMPLES_TABLE_MODEL.pagination),
                of(SAMPLES_TABLE_MODEL.termCountsByFacetName),
                of(DEFAULT_FILE_SUMMARY),
                of([])
            );

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with single values in column "Analysis Protocol" does not display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_SINGLE_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH)).toBe(null);
        });
    });

    /**
     * Returns the column cells for the specified name.
     *
     * @param {string} columnName
     * @returns {DebugElement[]}
     */
    function findColumnCells(columnName: string): DebugElement[] {

        return fixture.debugElement.queryAll(
            By.css(`.mat-cell.mat-column-${columnName}`)
        );
    }

    /**
     * Returns the component for the specified column cell and specified component.
     *
     * @param {number} rowIndex
     * @param {string} columnName
     * @param {string} componentName
     * @returns {DebugElement}
     */
    function findColumnCellComponent(rowIndex: number, columnName: string, componentName: string): DebugElement {

        const columnRowDE = findColumnCells(columnName)[rowIndex];

        if ( !columnRowDE ) {
            return null;
        }

        return columnRowDE.nativeElement.querySelector(componentName);
    }

    /**
     * Return the column with the specified name.
     *
     * @param {string} columnName
     */
    function findHeader(columnName: string): DebugElement {

        return fixture.debugElement.query(
            By.css(`hca-table-column-header-title[ng-reflect-column-name="${columnName}"]`)
        );
    }

    /**
     * Return the column header title debug element with the specified name.
     *
     * @param {string} columnName
     */
    function findHeaderTitle(columnName: string): DebugElement {

        return fixture.debugElement.query(
            By.css(`hca-table-column-header-title[ng-reflect-column-name="${columnName}"]`)
        );
    }

    /**
     * Return the sort header for the specified column.
     *
     * @param {DebugElement} columnHeaderDE
     */
    function findSortHeader(columnHeaderDE): DebugElement {

        return columnHeaderDE.query(
            By.directive(MatSortHeader)
        );
    }


    /**
     * Returns true if component is a child of the specified debug element.
     *
     * @param {DebugElement} debugElement
     * @param {string} componentName
     * @returns {boolean}
     */
    function isComponentDisplayed(debugElement: DebugElement, componentName: string): boolean {

        if ( !debugElement ) {

            return false;
        }

        if ( !debugElement.children ) {

            return false;
        }

        return debugElement.children.some(child => child.name === componentName);
    }
});
