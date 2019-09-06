/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing files table component.
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
import { Store } from "@ngrx/store";
import { of } from "rxjs";

// App components
import { CcPipeModule } from "../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../config/config.service";
import { HCAContentEllipsisComponent } from "../hca-content-ellipsis/hca-content-ellipsis.component";
import { HCADownloadFileComponent } from "../hca-download-file/hca-download-file.component";
import { HCATableCellComponent } from "../hca-table-cell/hca-table-cell.component";
import { HCATableColumnHeaderComponent } from "../hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderCountComponent } from "../hca-table-column-header-count/hca-table-column-header-count.component";
import { HCATableColumnHeaderTitleComponent } from "../hca-table-column-header-title/hca-table-column-header-title.component";
import { HCATableFilesComponent } from "./hca-table-files.component";
import { HCATableDataStatusPlaceholderComponent } from "../hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATablePaginationComponent } from "../hca-table-pagination/hca-table-pagination.component";
import { HCATableSortComponent } from "../hca-table-sort/hca-table-sort.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { DEFAULT_FILE_SUMMARY } from "../shared/file-summary.mock";
import { ProjectDownloadsComponent } from "../project-downloads/project-downloads.component";
import { ProjectPreparedMatrixDownloadsComponent } from "../project-prepared-matrix-downloads/project-prepared-matrix-downloads.component";
import { FILES_TABLE_MODEL } from "./table-state-table-model-files.mock";
import { DownloadService } from "../shared/download.service";
import { HCAEllipsisTextComponent } from "../hca-content-ellipsis/hca-ellipsis-text.component";
import { ProjectTSVDownloadComponent } from "../project-tsv-download/project-tsv-download.component";
import { ClipboardModule } from "ngx-clipboard";
import { CopyToClipboardComponent } from "../hca-get-data/copy-to-clipboard/copy-to-clipboard.component";

describe("HCATableFilesComponent", () => {

    let component: HCATableFilesComponent;
    let fixture: ComponentFixture<HCATableFilesComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                HCAContentEllipsisComponent,
                HCAEllipsisTextComponent,
                HCADownloadFileComponent,
                ProjectDownloadsComponent,
                ProjectTSVDownloadComponent,
                ProjectPreparedMatrixDownloadsComponent,
                HCATableCellComponent,
                HCATableColumnHeaderComponent,
                HCATableColumnHeaderCountComponent,
                HCATableColumnHeaderTitleComponent,
                HCATableDataStatusPlaceholderComponent,
                HCATableFilesComponent,
                HCATablePaginationComponent,
                HCATableSortComponent,
                HCATooltipComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CcPipeModule,
                ClipboardModule,
                MatIconModule,
                MatProgressSpinnerModule,
                MatSortModule,
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
                useValue: jasmine.createSpyObj("ConfigService", ["getProjectMetaURL"])
            }, {
                provide: DownloadService,
                useValue: jasmine.createSpyObj("DownloadService", [
                    "isFileDownloading",
                    "isFileDownloadRequestCompleted",
                    "isFileDownloadRequestFailed",
                    "isFileDownloadInitiated",
                    "isFileDownloadRequestInProgress",
                    "isFileDownloadRequestNotStarted",
                    "requestFileDownload"
                ])
            }, {
                provide: HAMMER_LOADER, // https://github.com/angular/components/issues/14668#issuecomment-450474862
                useValue: () => new Promise(() => {
                })
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(HCATableFilesComponent);
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
            of(FILES_TABLE_MODEL.data),
            of(FILES_TABLE_MODEL.data),
            of(FILES_TABLE_MODEL.loading),
            of(FILES_TABLE_MODEL.pagination),
            of(FILES_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY)
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
            of(FILES_TABLE_MODEL.data),
            of(FILES_TABLE_MODEL.data),
            of(FILES_TABLE_MODEL.loading),
            of(FILES_TABLE_MODEL.pagination),
            of(FILES_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY)
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
            of(FILES_TABLE_MODEL.data),
            of(FILES_TABLE_MODEL.data),
            of(FILES_TABLE_MODEL.loading),
            of(FILES_TABLE_MODEL.pagination),
            of(FILES_TABLE_MODEL.termCountsByFacetName),
            of(DEFAULT_FILE_SUMMARY)
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
