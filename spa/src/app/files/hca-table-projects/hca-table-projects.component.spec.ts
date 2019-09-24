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
import { ClipboardModule } from "ngx-clipboard";
import { DeviceDetectorService } from "ngx-device-detector";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

// App components
import { CcPipeModule } from "../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../config/config.service";
import { HCAContentEllipsisComponent } from "../hca-content-ellipsis/hca-content-ellipsis.component";
import { HCAEllipsisTextComponent } from "../hca-content-ellipsis/hca-ellipsis-text.component";
import { HCAContentUnspecifiedDashComponent } from "../hca-content-unspecified-bar/hca-content-unspecified-dash.component";
import { CopyToClipboardComponent } from "../hca-get-data/copy-to-clipboard/copy-to-clipboard.component";
import { HCATableColumnHeaderCountComponent } from "../hca-table-column-header-count/hca-table-column-header-count.component";
import { HCATableColumnHeaderDownloadComponent } from "../hca-table-column-header-download/hca-table-column-header-download.component";
import { HCATableCellComponent } from "../hca-table-cell/hca-table-cell.component";
import { HCATableColumnHeaderComponent } from "../hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderTitleComponent } from "../hca-table-column-header-title/hca-table-column-header-title.component";
import { HCATableDataStatusPlaceholderComponent } from "../hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATablePaginationComponent } from "../hca-table-pagination/hca-table-pagination.component";
import { HCATableProjectsComponent } from "./hca-table-projects.component";
import { HCATableSortComponent } from "../hca-table-sort/hca-table-sort.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { ProjectDownloadsComponent } from "../project-downloads/project-downloads.component";
import { ProjectPreparedMatrixDownloadsComponent } from "../project-prepared-matrix-downloads/project-prepared-matrix-downloads.component";
import { ProjectTSVDownloadComponent } from "../project-tsv-download/project-tsv-download.component";
import { ProjectTSVUrlRequestStatus } from "../project/project-tsv-url-request-status.model";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { TableRenderService } from "../table/table-render.service";
import { PROJECTS_TABLE_MODEL } from "./table-state-table-model-projects.mock";

describe("HCATableProjectsComponent", () => {

    let component: HCATableProjectsComponent;
    let fixture: ComponentFixture<HCATableProjectsComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const ROW_INDEX_0 = 0;
    const ROW_INDEX_1 = 1;
    const ROW_INDEX_2 = 2;
    const ROW_INDEX_3 = 3;

    const PROTOCOL_ARRAY_INDEX_0 = 0;

    const WORKFLOW_COLUMN = "workflow";

    const HCA_CONTENT_UNSPECIFIED_DASH_COMPONENT = "hca-content-unspecified-dash";
    const HCA_CONTENT_ELLIPSIS_COMPONENT = "hca-content-ellipsis";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
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
                ProjectDownloadsComponent,
                ProjectTSVDownloadComponent,
                ProjectPreparedMatrixDownloadsComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CcPipeModule,
                ClipboardModule,
                MatIconModule,
                MatSortModule,
                MatProgressSpinnerModule,
                MatTableModule,
                MatTooltipModule,
                RouterTestingModule
            ],
            providers: [{
                provide: Store,
                useValue: testStore
            }, {
                provide: "Window",
                useFactory: (() => {
                    return window;
                })
            }, {
                provide: ConfigService,
                useValue: jasmine.createSpyObj("ConfigService", ["getProjectMetaURL", "getProjectMetaDownloadURL"])
            }, {
                provide: DeviceDetectorService,
                useValue: jasmine.createSpyObj("DeviceDetectorService", ["getDeviceInfo", "isMobile", "isTablet", "isDesktop"])
            }, {
                provide: HAMMER_LOADER, // https://github.com/angular/components/issues/14668#issuecomment-450474862
                useValue: () => new Promise(() => {
                })
            }, {
                provide: TableRenderService,
                useValue: jasmine.createSpyObj("TableRenderService", ["isHorizontalScrollDisabled"])
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(HCATableProjectsComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm sort functionality is set up in component.
     */
    it("should set up sort functionality on init", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];
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
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];
        fixture.detectChanges();

        // Confirm data was loaded - table should be visible including sort column headers
        expect(component.matSort).toBeTruthy();

        // Find the sort header for the sample entity type column
        const columnName = "sampleEntityType";
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
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];
        fixture.detectChanges();

        // Mimic clear of sort order and confirm it is reset back to default - grab the sample entity type column header
        const columnName = "sampleEntityType";
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
     * Confirm workflow column labeled as "Analysis Protocol" is displayed.
     */
    it(`should display column "Analysis Protocol"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const columnHeaderDE = findHeader(WORKFLOW_COLUMN);

        // Confirm column "Analysis Protocol" is displayed
        expect(columnHeaderDE.nativeElement.innerText).toEqual("Analysis Protocol");
    });

    /**
     * Confirm <hca-content-unspecified-dash> is displayed when workflow value is empty.
     */
    it("should display component hca-content-unspecified-dash when workflow value is empty", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm first row in column "Analysis Protocol" displays component
        expect(findColumnCellComponent(ROW_INDEX_0, WORKFLOW_COLUMN, HCA_CONTENT_UNSPECIFIED_DASH_COMPONENT)).not.toBe(null);
    });

    /**
     * Confirm <hca-content-unspecified-dash> is displayed when workflow value is null.
     */
    it("should display component hca-content-unspecified-dash when workflow value is null", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm second row in column "Analysis Protocol" displays component
        expect(findColumnCellComponent(ROW_INDEX_1, WORKFLOW_COLUMN, HCA_CONTENT_UNSPECIFIED_DASH_COMPONENT)).not.toBe(null);
    });

    /**
     * Confirm <hca-content-ellipsis> is not displayed when workflow value is empty.
     */
    it("should not display component hca-content-ellipsis when workflow value is empty", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm first row in column "Analysis Protocol" does not display component
        expect(findColumnCellComponent(ROW_INDEX_0, WORKFLOW_COLUMN, HCA_CONTENT_ELLIPSIS_COMPONENT)).toBe(null);
    });

    /**
     * Confirm <hca-content-ellipsis> is not displayed when workflow value is null.
     */
    it("should not display component hca-content-ellipsis when workflow value is null", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm second row in column "Analysis Protocol" does not display component
        expect(findColumnCellComponent(ROW_INDEX_1, WORKFLOW_COLUMN, HCA_CONTENT_ELLIPSIS_COMPONENT)).toBe(null);
    });

    /**
     * Confirm single value is displayed when workflow is single value.
     */
    it("should display single value when workflow is single value", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const columnRowDE = findColumnCells(WORKFLOW_COLUMN)[ROW_INDEX_2];

        // Confirm third row in column "Analysis Protocol" displays a single value
        expect(columnRowDE.nativeElement.innerText).toEqual(PROJECTS_TABLE_MODEL.data[ROW_INDEX_2].protocols[PROTOCOL_ARRAY_INDEX_0].workflow.join(", "));
    });

    /**
     * Confirm multiple string value is displayed when multiple workflows within a single protocol.
     */
    it("should display multiple string value when multiple workflows within a single protocol", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const columnRowDE = findColumnCells(WORKFLOW_COLUMN)[ROW_INDEX_3];

        // Confirm fourth row in column "Analysis Protocol" displays multiple string value
        expect(columnRowDE.nativeElement.innerText).toEqual(PROJECTS_TABLE_MODEL.data[ROW_INDEX_3].protocols[PROTOCOL_ARRAY_INDEX_0].workflow.join(", "));
    });

    /**
     * Confirm <hca-content-unspecified-dash> is not displayed when workflow is single value.
     */
    it("should not display component hca-content-unspecified-dash when workflow is single value", () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.data),
            of(PROJECTS_TABLE_MODEL.loading),
            of(PROJECTS_TABLE_MODEL.pagination),
            of(PROJECTS_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY),
            of(new Map()), // project matrix URLs
            of({
                status: ProjectTSVUrlRequestStatus.NOT_STARTED // selectProjectTSVUrlsByProjectId inside ProjectTSVDownloadComponent
            })
        );

        component.selectedProjectIds = [];

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm third row in column "Analysis Protocol" does not display component
        expect(findColumnCellComponent(ROW_INDEX_2, WORKFLOW_COLUMN, HCA_CONTENT_UNSPECIFIED_DASH_COMPONENT)).toBe(null);
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
     * Return the sort header for the specified column.
     *
     * @param {DebugElement} columnHeaderDE
     */
    function findSortHeader(columnHeaderDE): DebugElement {

        return columnHeaderDE.query(
            By.directive(MatSortHeader)
        );
    }
});
