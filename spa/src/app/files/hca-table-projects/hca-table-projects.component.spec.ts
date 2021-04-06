/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing projects table component.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortHeader, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterTestingModule } from "@angular/router/testing";
import { By, HAMMER_LOADER } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { DeviceDetectorService } from "ngx-device-detector";
import { of } from "rxjs";

// App components
import { AnalysisProtocolPipelineLinkerComponent } from "../analysis-protocol-pipeline-linker/analysis-protocol-pipeline-linker.component";
import { ConfigService } from "../../config/config.service";
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { DataUseNotificationComponent } from "../data-use-notification/data-use-notification.component";
import { EntityRequestService } from "../entity/entity-request.service";
import { HCAContentEllipsisComponent } from "../hca-content-ellipsis/hca-content-ellipsis.component";
import { HCAEllipsisTextComponent } from "../hca-content-ellipsis/hca-ellipsis-text.component";
import { HCAContentUnspecifiedDashComponent } from "../hca-content-unspecified-bar/hca-content-unspecified-dash.component";
import { HCATableCellComponent } from "../hca-table-cell/hca-table-cell.component";
import { HCATableColumnHeaderComponent } from "../hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderCountComponent } from "../hca-table-column-header-count/hca-table-column-header-count.component";
import { HCATableColumnHeaderDownloadComponent } from "../hca-table-column-header-download/hca-table-column-header-download.component";
import { HCATableColumnHeaderTitleComponent } from "../hca-table-column-header-title/hca-table-column-header-title.component";
import { HCATableDataStatusPlaceholderComponent } from "../hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATablePaginationComponent } from "../hca-table-pagination/hca-table-pagination.component";
import { HCATableProjectsComponent } from "./hca-table-projects.component";
import { HCATableSortComponent } from "../hca-table-sort/hca-table-sort.component";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { PipeModule } from "../../pipe/pipe.module";
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { FilesState } from "../_ngrx/files.state";
import {
    selectFileSummary,
    selectPagination,
    selectTableData,
    selectTableLoading,
    selectTermCountsByFacetName
} from "../_ngrx/files.selectors";
import { DEFAULT_PROJECTS_STATE } from "../_ngrx/files.state.mock";
import { FileSummaryState } from "../_ngrx/file-summary/file-summary.state";
import { SectionBarComponent } from "../section-bar/section-bar.component";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DownloadButtonComponent } from "../../shared/download-button/download-button.component";
import { FileDownloadComponent } from "../../shared/file-download/file-download.component";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { GASource } from "../../shared/analytics/ga-source.model";
import { HCATooltipComponent } from "../../shared/hca-tooltip/hca-tooltip.component";
import { ResponsiveService } from "../../shared/responsive/responsive.service";
import { TableScroll } from "../table-scroll/table-scroll.component";
import { PROJECTS_TABLE_MODEL } from "./table-state-table-model-projects.mock";
import { TableRendererService } from "../table/table-renderer.service";
import { PaginationService } from "../table/pagination/pagination.service";

describe("HCATableProjectsComponent", () => {

    let component: HCATableProjectsComponent;
    let fixture: ComponentFixture<HCATableProjectsComponent>;

    let store: MockStore<FilesState>;

    const selectedCatalog = DCPCatalog.DCP2;

    const INDEX_TABLE_ROW_SINGLE_VALUES = 0;
    const INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES = 3;
    const INDEX_TABLE_ROW_NULL_VALUES = 5;

    // Classnames
    const CLASSNAME_CENTER = "center";
    const CLASSNAME_FLEXCOLUMN = "flex-column";
    const CLASSNAME_RIGHT = "right";
    const CLASSNAME_SELECTED = "selected";

    // Column titles
    const COLUMN_TITLE_DEVELOPMENT_STAGE = "Development Stage";
    const COLUMN_TITLE_DONOR_COUNT = "Donor Count";
    const COLUMN_TITLE_DONOR_DISEASE = "Disease Status (Donor)";
    const COLUMN_TITLE_NUCLEIC_ACID_SOURCE = "Nucleic Acid Source";
    const COLUMN_TITLE_PROJECT_TITLE = "Project Title";
    const COLUMN_TITLE_SPECIMEN_DISEASE = "Disease Status (Specimen)";
    const COLUMN_TITLE_TOTAL_CELLS = "Cell Count Estimate";
    const COLUMN_TITLE_WORKFLOW = "Analysis Protocol";

    // Column names
    const COLUMN_NAME_DEVELOPMENT_STAGE = "developmentStage";
    const COLUMN_NAME_DONOR_COUNT = "donorCount";
    const COLUMN_NAME_DONOR_DISEASE = "donorDisease";
    const COLUMN_NAME_NUCLEIC_ACID_SOURCE = "nucleicAcidSource";
    const COLUMN_NAME_PROJECT_TITLE = "projectTitle";
    const COLUMN_NAME_SPECIMEN_DISEASE = "disease";
    const COLUMN_NAME_TOTAL_CELLS = "totalCells";
    const COLUMN_NAME_WORKFLOW = "workflow";

    // Component names
    const COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER = "analysis-protocol-pipeline-linker";
    const COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH = "hca-content-unspecified-dash";
    const COMPONENT_NAME_HCA_TABLE_SORT = "hca-table-sort";
    const COMPONENT_NAME_MAT_ICON = "mat-icon";

    // Selectors
    const SELECTOR_CELL_PROJECT_TITLE = "a.fontsize-xxs.semi-bold";
    const SELECTOR_CHART_LEGEND_BAR = ".chart-legend-bar";

    // Styles
    const STYLE_FLEX = "flex";
    const STYLE_MAX_WIDTH = "max-width";
    const STYLE_MIN_WIDTH = "min-width";
    const STYLE_OVERFLOW = "overflow";
    const STYLE_POSITION = "position";

    // Test values
    const TEST_VALUE_ROUTER_LINK = "/projects/";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AnalysisProtocolPipelineLinkerComponent,
                CopyToClipboardComponent,
                DataUseNotificationComponent,
                DownloadButtonComponent,
                FileDownloadComponent,
                HCAContentEllipsisComponent,
                HCAContentUnspecifiedDashComponent,
                HCAEllipsisTextComponent,
                HCATableCellComponent,
                HCATableColumnHeaderComponent,
                HCATableColumnHeaderCountComponent,
                HCATableColumnHeaderDownloadComponent,
                HCATableColumnHeaderTitleComponent,
                HCATableDataStatusPlaceholderComponent,
                HCATablePaginationComponent,
                HCATableProjectsComponent,
                HCATableSortComponent,
                HCATooltipComponent,
                SectionBarComponent,
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
                {
                    provide: DeviceDetectorService,
                    useValue: jasmine.createSpyObj("DeviceDetectorService", ["getDeviceInfo", "isMobile", "isTablet", "isDesktop"])
                },
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
                provideMockStore({initialState: DEFAULT_PROJECTS_STATE}),
                {
                    provide: TableRendererService,
                    useValue: jasmine.createSpyObj("TableRendererService", {
                        "onRenderCompleted": of(true)
                    })
                }, {
                    provide: "Window",
                    useFactory: (() => {
                        return window;
                    })
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCATableProjectsComponent);
        component = fixture.componentInstance;

        store = TestBed.inject(Store) as MockStore<AppState>;
        store.overrideSelector(selectTableData, PROJECTS_TABLE_MODEL.data);
        store.overrideSelector(selectTableLoading, PROJECTS_TABLE_MODEL.loading);
        store.overrideSelector(selectPagination, PROJECTS_TABLE_MODEL.pagination);
        store.overrideSelector(selectTermCountsByFacetName, PROJECTS_TABLE_MODEL.termCountsByFacetName);
        store.overrideSelector(selectFileSummary, DEFAULT_FILE_SUMMARY as FileSummaryState);
        store.overrideSelector(selectCatalog, selectedCatalog);
    }));
    
    describe("Sort", () => {

        /**
         * Confirm sort functionality is set up in component.
         */
        it("should set up sort functionality on init", () => {

            component.selectedProjectIds = [];
            fixture.detectChanges();

            // Confirm data was loaded - table should be visible including sort column headers
            expect(component.matSort).toBeTruthy();
        });

        /**
         * Confirm sort function is called on click of sort header.
         */
        it("should call sort on click of sort header", () => {

            component.selectedProjectIds = [];
            fixture.detectChanges();

            // Confirm data was loaded - table should be visible including sort column headers
            expect(component.matSort).toBeTruthy();

            // Find the sort header for the sample entity type column
            const columnName = "sampleEntityType";
            const columnHeaderDE = findHeaderTitle(columnName);
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

            component.selectedProjectIds = [];
            fixture.detectChanges();

            // Mimic clear of sort order and confirm it is reset back to default - grab the sample entity type column header
            const columnName = "sampleEntityType";
            const columnHeaderDE = findHeaderTitle(columnName);
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

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm column header displays component
            expect(isComponentDisplayed(findHeaderTitle(COLUMN_NAME_TOTAL_CELLS), COMPONENT_NAME_HCA_TABLE_SORT)).toBe(true);
        });
    });

    describe("Columns", () => {
        
        beforeEach(async(() => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();
        }));

        /**
         * Confirm project title column labeled as "Project Title" is displayed.
         */
        it(`displays column "Project Title"`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_PROJECT_TITLE);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_PROJECT_TITLE);
        });

        /**
         * Confirm workflow column labeled as "Analysis Protocol" is displayed.
         */
        it(`should display column "Analysis Protocol"`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_WORKFLOW);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_WORKFLOW);
        });

        /**
         * Confirm development stage column labeled as "Development Stage" is displayed.
         */
        it(`displays column "Development Stage" column`, () => {

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
         * Confirm nucleic acid source column labeled as "Nucleic Acid Source" is displayed.
         */
        it(`displays column "Nucleic Acid Source" column`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_NUCLEIC_ACID_SOURCE);

            // Confirm column title is displayed
            expect(columnHeaderDE).toBeTruthy();
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_NUCLEIC_ACID_SOURCE);
        });

        /**
         * Confirm donorCount column labeled as "Donor Count" is displayed.
         */
        it(`should display column "Donor Count"`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_DONOR_COUNT);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_DONOR_COUNT);
        });

        /**
         * Confirm totalCells column labeled as "Cell Count Estimate" is displayed.
         */
        it(`should display column "Cell Count Estimate"`, () => {

            const columnHeaderDE = findHeaderTitle(COLUMN_NAME_TOTAL_CELLS);

            // Confirm column title is displayed
            expect(columnHeaderDE.nativeElement.innerText).toEqual(COLUMN_TITLE_TOTAL_CELLS);
        });
    });

    describe("Project Selection", () => {

        /**
         * Confirm store dispatch is called when on project selected.
         */
        it("dispatches action to store, to select project id action, when project selected", () => {

            spyOn(store, "dispatch").and.callThrough();

            const projectId = PROJECTS_TABLE_MODEL.data[0].entryId;
            const projectName = PROJECTS_TABLE_MODEL.data[0].projects[0].projectTitle;
            const selectProjectIdAction = new SelectProjectIdAction(projectId, projectName, true, GASource.SEARCH_RESULTS);

            // Confirm store dispatch is called
            component.onProjectSelected(projectId, projectName, false);
            expect(store.dispatch).toHaveBeenCalledWith(selectProjectIdAction);
        });

        /**
         * Confirm project title cell class "selected" is true when project is selected.
         */
        it(`displays project title cell with class "selected" when project is selected`, () => {

            component.selectedProjectIds = ["ae5237b4-633f-403a-afc6-cb87e6f90db1"];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleCheckBoxDE = findDEBySelector(SELECTOR_CHART_LEGEND_BAR);

            // Confirm class is displayed
            expect(projectTitleCheckBoxDE.classes[CLASSNAME_SELECTED]).toEqual(true);
        });

        /**
         * Confirm project title cell class "selected" is false when project is not selected.
         */
        it(`displays project title cell with class "selected" is false when project is not selected`, () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleCheckBoxDE = findDEBySelector(SELECTOR_CHART_LEGEND_BAR);

            // Confirm class is not displayed
            expect(projectTitleCheckBoxDE.classes[CLASSNAME_SELECTED]).toBeFalsy();
        });

        /**
         * Confirm component <mat-icon> is displayed when project is selected.
         */
        it("displays component mat icon when project is selected", () => {

            component.selectedProjectIds = ["ae5237b4-633f-403a-afc6-cb87e6f90db1"];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleCheckBoxDE = findDEBySelector(SELECTOR_CHART_LEGEND_BAR);

            const matIconDE = findChildDEByName(projectTitleCheckBoxDE, COMPONENT_NAME_MAT_ICON);

            // Confirm component is displayed
            expect(matIconDE.name).toEqual(COMPONENT_NAME_MAT_ICON);
        });

        /**
         * Confirm component <mat-icon> is not displayed when project is not selected.
         */
        it("should not display component mat icon when project is not selected", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleCheckBoxDE = findDEBySelector(SELECTOR_CHART_LEGEND_BAR);

            const matIconDE = findChildDEByName(projectTitleCheckBoxDE, COMPONENT_NAME_MAT_ICON);

            // Confirm component is not displayed
            expect(matIconDE).toBeUndefined();
        });

        /**
         * Confirm on project selected is called on click of project title check box.
         */
        it("on project selected is called on click of project title check box", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleCheckBoxDE = findDEBySelector(SELECTOR_CHART_LEGEND_BAR);

            const projectSelected = spyOn(component, "onProjectSelected");

            // Execute click on check box
            projectTitleCheckBoxDE.triggerEventHandler("click", null);
            expect(projectSelected).toHaveBeenCalled();
        });
    });

    describe("Project Title Column", () => {

        /**
         * Confirm cell text project title is displayed.
         */
        it("displays project title", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleDE = findDEBySelector(SELECTOR_CELL_PROJECT_TITLE);

            // Confirm cell text is displayed
            expect(projectTitleDE.nativeElement.innerText).toEqual(PROJECTS_TABLE_MODEL.data[0].projects[0].projectTitle);
        });

        /**
         * Confirm project title entry id is added to router link.
         */
        it("displays router link with project title entry id", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleDE = findDEBySelector(SELECTOR_CELL_PROJECT_TITLE);

            // Confirm project title entry id is added router link
            const expected = `${TEST_VALUE_ROUTER_LINK}${PROJECTS_TABLE_MODEL.data[0].entryId}?catalog=${selectedCatalog}`;
            expect(projectTitleDE.properties.href).toEqual(expected);
        });

        /**
         * Confirm ngClass "center", "flex-column" and "right" on project title mat header cell are false.
         */
        it(`returns false values for classes "center", "flex-column" and "right" on project title mat header cell`, () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleHeaderDE = findHeader(COLUMN_NAME_PROJECT_TITLE);

            // Confirm classes are false
            expect(projectTitleHeaderDE.classes[CLASSNAME_CENTER]).toBeFalsy();
            expect(projectTitleHeaderDE.classes[CLASSNAME_FLEXCOLUMN]).toBeFalsy();
            expect(projectTitleHeaderDE.classes[CLASSNAME_RIGHT]).toBeFalsy();
        });

        /**
         * Confirm ngStyle "flex", "max-width", "overflow", "position" on project title mat header cell return empty and "min-width" returns "300px".
         */
        it(`returns empty values for styles "flex", "max-width", "overflow", "position" and "300px" for style "min-width" on project title mat header cell`, () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleHeaderDE = findHeader(COLUMN_NAME_PROJECT_TITLE);

            // Confirm all styles are empty, except for min width which is "300px"
            expect(projectTitleHeaderDE.styles[STYLE_FLEX]).toEqual("");
            expect(projectTitleHeaderDE.styles[STYLE_MAX_WIDTH]).toEqual("");
            expect(projectTitleHeaderDE.styles[STYLE_MIN_WIDTH]).toEqual("300px");
            expect(projectTitleHeaderDE.styles[STYLE_OVERFLOW]).toEqual("");
            expect(projectTitleHeaderDE.styles[STYLE_POSITION]).toEqual("");
        });

        /**
         * Confirm ngClass "center", "flex-column" and "right" on project title mat cell are false.
         */
        it(`returns false values for classes "center", "flex-column" and "right" on project title mat cell`, () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleDE = findColumnCells(COLUMN_NAME_PROJECT_TITLE)[0];

            // Confirm classes are false
            expect(projectTitleDE.classes[CLASSNAME_CENTER]).toBeFalsy();
            expect(projectTitleDE.classes[CLASSNAME_FLEXCOLUMN]).toBeFalsy();
            expect(projectTitleDE.classes[CLASSNAME_RIGHT]).toBeFalsy();
        });

        /**
         * Confirm ngStyle "flex", "max-width", "overflow", "position" on project title mat cell return empty and "min-width" returns "300px".
         */
        it(`returns empty values for styles "flex", "max-width", "overflow", "position" and "300px" for style "min-width" on project title mat cell`, () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            const projectTitleDE = findColumnCells(COLUMN_NAME_PROJECT_TITLE)[0];

            // Confirm all styles are empty, except for min width which is "300px"
            expect(projectTitleDE.styles[STYLE_FLEX]).toEqual("");
            expect(projectTitleDE.styles[STYLE_MAX_WIDTH]).toEqual("");
            expect(projectTitleDE.styles[STYLE_MIN_WIDTH]).toEqual("300px");
            expect(projectTitleDE.styles[STYLE_OVERFLOW]).toEqual("");
            expect(projectTitleDE.styles[STYLE_POSITION]).toEqual("");
        });
    });

    describe("Workflow Column", () => {

        /**
         * Confirm component <hca-content-unspecified-dash> is displayed when workflow value is empty.
         */
        it("should display component hca-content-unspecified-dash when workflow value is empty", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with empty array values in column "Analysis Protocol" displays component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH)).not.toBe(null);
        });

        /**
         * Confirm component <hca-content-unspecified-dash> is displayed when workflow value is null.
         */
        it("should display component hca-content-unspecified-dash when workflow value is null", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with null values in column "Analysis Protocol" displays component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_NULL_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH)).not.toBe(null);
        });

        /**
         * Confirm component <analysis-protocol-pipeline-linker> is not displayed when workflow value is empty.
         */
        it("should not display component analysis protocol pipeline linker when workflow value is empty", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with empty array values in column "Analysis Protocol" does not display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_EMPTY_ARRAY_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER)).toBe(null);
        });

        /**
         * Confirm component <analysis-protocol-pipeline-linker> is not displayed when workflow value is null.
         */
        it("should not display component analysis protocol pipeline linker when workflow value is null", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with null values in column "Analysis Protocol" does not display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_NULL_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER)).toBe(null);
        });

        /**
         * Confirm component <analysis-protocol-pipeline-linker> is displayed when workflow is single value.
         */
        it("should display component analysis protocol pipeline linker when workflow is single value", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with single values in column "Analysis Protocol" does display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_SINGLE_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_ANALYSIS_PROTOCOL_PIPELINE_LINKER)).not.toBe(null);
        });

        /**
         * Confirm component <hca-content-unspecified-dash> is not displayed when workflow is single value.
         */
        it("should not display component hca-content-unspecified-dash when workflow is single value", () => {

            component.selectedProjectIds = [];

            // Trigger change detection so template updates accordingly
            fixture.detectChanges();

            // Confirm row with single values in column "Analysis Protocol" does not display component
            expect(findColumnCellComponent(INDEX_TABLE_ROW_SINGLE_VALUES, COLUMN_NAME_WORKFLOW, COMPONENT_NAME_HCA_CONTENT_UNSPECIFIED_DASH)).toBe(null);
        });        
    });

    /**
     * Returns child debug element of a parent for the specified child debug element name.
     *
     * @param {DebugElement} debugEl
     * @param {string} name
     * @returns {DebugElement}
     */
    function findChildDEByName(debugEl: DebugElement, name: string): DebugElement {

        if ( !debugEl ) {

            return;
        }

        return debugEl.children.find(c => c.name === name);
    }

    /**
     * Returns the debug element for the specified selector.
     *
     * @param {string} selector
     * @returns {DebugElement[]}
     */
    function findDEBySelector(selector: string): DebugElement {

        return fixture.debugElement.query(
            By.css(selector)
        );
    }

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
     * Returns the component for the specified row and column, and specified component.
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
     * Return the mat header cell column with the specified name.
     *
     * @param {string} columnName
     */
    function findHeader(columnName: string): DebugElement {

        return fixture.debugElement.query(
            By.css(`.mat-header-cell.mat-column-${columnName}`)
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
