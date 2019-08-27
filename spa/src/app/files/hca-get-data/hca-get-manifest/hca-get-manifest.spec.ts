/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAGetManifest.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs/index";

// App dependencies
import { CcPipeModule } from "../../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../../config/config.service";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { ManifestStatus } from "../../shared/manifest-status.model";
import { TermSortService } from "../../sort/term-sort.service";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { DEFAULT_FILE_SUMMARY_EMPTY, DEFAULT_SEARCH_TERM_WITH_FILE_FORMAT } from "./get-manifest-state.mock";
import { HCAGetManifestComponent } from "./hca-get-manifest.component";

describe("HCAGetManifestComponent", () => {

    let component: HCAGetManifestComponent;
    let fixture: ComponentFixture<HCAGetManifestComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                FileTypeSummaryListComponent,
                HCAGetDataPanelComponent,
                HCAGetManifestComponent
            ],
            imports: [
                CcPipeModule,
                ClipboardModule,
                MatIconModule,
                MatTooltipModule
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getPortalURL"])
                },
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: TermSortService,
                    useValue: jasmine.createSpyObj("TermSortService", ["sortTerms"])
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetManifestComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm get file type summaries returns an empty array when file summaries is empty.
     */
    it("should get file type summaries return an empty array when file summaries is empty", () => {

        // Confirm get file type summaries returns an empty array, when file summaries is empty - first execute the
        // method and then confirm the returned value is an empty array.
        const getFileTypeSummaries = component.getFileTypeSummaries(DEFAULT_FILE_SUMMARY_EMPTY);
        expect(getFileTypeSummaries).toEqual([]);
    });

    /**
     * Confirm get file type summaries returns file type summaries when file summaries is not empty.
     */
    it("should get file type summaries return file type summaries when file summaries is not empty", () => {

        // Confirm get file type summaries returns file type summaries, when file summaries is not empty - first execute the
        // method and then confirm the returned value is equal to the DEFAULT_FILE_SUMMARY file type summaries.
        const getFileTypeSummaries = component.getFileTypeSummaries(DEFAULT_FILE_SUMMARY);
        expect(getFileTypeSummaries).toEqual(DEFAULT_FILE_SUMMARY.fileTypeSummaries);
    });

    /**
     * Confirm any file format selected returns false when no "fileFormat" facet terms are selected.
     */
    it(`should any file format selected return true when no "fileFormat" facet terms are selected`, () => {

        // Confirm any file format selected returns false, when no "fileFormat" facet terms are selected - first execute the
        // method and then confirm the returned value is false.
        const getFileTypeSummaries = component.isAnyFileFormatSelected([]);
        expect(getFileTypeSummaries).toEqual(false);
    });

    /**
     * Confirm any file format selected returns true when "fileFormat" facet terms are selected.
     */
    it(`should any file format selected return true when "fileFormat" facet terms are selected`, () => {

        // Confirm any file format selected returns true, when "fileFormat" facet terms are selected - first execute the
        // method and then confirm the returned value is true.
        const getFileTypeSummaries = component.isAnyFileFormatSelected(DEFAULT_SEARCH_TERM_WITH_FILE_FORMAT);
        expect(getFileTypeSummaries).toEqual(true);
    });

    /**
     * Confirm file type summaries empty returns true when file summary is empty.
     */
    it("should file type summaries empty return true when file summary is empty", () => {

        // Confirm file type summaries empty returns true, when file summary is empty - first execute the
        // method and then confirm the returned value is true.
        const isFileTypeSummariesEmpty = component.isFileTypeSummariesEmpty(DEFAULT_FILE_SUMMARY_EMPTY);
        expect(isFileTypeSummariesEmpty).toEqual(true);
    });

    /**
     * Confirm file type summaries empty returns false when file summary is not empty.
     */
    it("should file type summaries empty return false when file summary is not empty", () => {

        // Confirm file type summaries empty returns false, when file summary is not empty - first execute the
        // method and then confirm the returned value is false.
        const isFileTypeSummariesEmpty = component.isFileTypeSummariesEmpty(DEFAULT_FILE_SUMMARY);
        expect(isFileTypeSummariesEmpty).toEqual(false);
    });

    /**
     * Confirm "Select Manifest File Types" is displayed when download status is not started.
     */
    it(`should display "Select Manifest File Types" when download status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.NOT_STARTED
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Select Manifest File Types" is displayed
        expect(isPanelHeaderDisplayed("Select Manifest File Types")).toEqual(true);
    });

    /**
     * Confirm <file-type-summary-list> is displayed when download status is not started.
     */
    it(`should display component file-type-summary-list when download status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.NOT_STARTED
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is displayed
        const fileTypeSummaryListEl = expect(fixture.debugElement.nativeElement.querySelector("file-type-summary-list"));
        expect(fileTypeSummaryListEl).not.toBe(null);
    });

    /**
     * Confirm "Your File Manifest is Being Prepared" is not displayed when download status is not started.
     */
    it(`should not display "Your File Manifest is Being Prepared" when download status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.NOT_STARTED
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Your File Manifest is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your File Manifest is Ready" is not displayed when download status is not started.
     */
    it(`should not display "Your File Manifest is Ready" when download status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.NOT_STARTED
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Your File Manifest is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Ready")).toEqual(false);
    });

    /**
     * Confirm "Select Manifest File Types" is not displayed when download status is in progress.
     */
    it(`should not display "Select Manifest File Types" when download status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.IN_PROGRESS
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Select Manifest File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Manifest File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when download status is in progress.
     */
    it(`should not display component file-type-summary-list when download status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.IN_PROGRESS
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm "Your File Manifest is Being Prepared" is displayed when download status is in progress.
     */
    it(`should display "Your File Manifest is Being Prepared" when download status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.IN_PROGRESS
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Your File Manifest is Being Prepared" is displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Being Prepared")).toEqual(true);
    });

    /**
     * Confirm "Your File Manifest is Ready" is not displayed when download status is in progress.
     */
    it(`should not display "Your File Manifest is Ready" when download status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.IN_PROGRESS
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Your File Manifest is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Ready")).toEqual(false);
    });

    /**
     * Confirm "Select Manifest File Types" is not displayed when download status is complete.
     */
    it(`should not display "Select Manifest File Types" when download status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.COMPLETE
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Select Manifest File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Manifest File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when download status is complete.
     */
    it(`should not display component file-type-summary-list when download status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.COMPLETE
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm "Your File Manifest is Being Prepared" is not displayed when download status is complete.
     */
    it(`should not display "Your File Manifest is Being Prepared" when download status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.COMPLETE
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Your File Manifest is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your File Manifest is Ready" is displayed when download status is complete.
     */
    it(`should display "Your File Manifest is Ready" when download status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.COMPLETE
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm "Your File Manifest is Ready" is displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Ready")).toEqual(true);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when download status is complete.
     */
    it(`should display component copy-to-clipboard when download status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.COMPLETE
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        const copyToClipboardEl = expect(fixture.debugElement.nativeElement.querySelector("copy-to-clipboard"));

        expect(copyToClipboardEl).not.toBe(null);
    });

    /**
     * Confirm link is added to href attribute when download status is complete.
     */
    it(`should add link to href when download status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.COMPLETE
            }) // manifest response
        );

        fixture.detectChanges();

        // Confirm link text is added to href attribute
        const copyToClipboardEl = fixture.debugElement.nativeElement.querySelector("p a");

        expect(copyToClipboardEl.getAttribute("href")).not.toBe(null);
    });

    /**
     * Confirm confirm store dispatch is called on click of request manifest.
     */
    it("should store dispatch on click of request manifest", () => {

        testStore.pipe
            .and.returnValues(
            of(DEFAULT_SEARCH_TERM_WITH_FILE_FORMAT), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({
                status: ManifestStatus.NOT_STARTED
            }) // manifest response
        );

        fixture.detectChanges();

        const onRequestManifest = spyOn(component, "onRequestManifest");
        const prepareManifestButton = fixture.debugElement.query(By.css("button"));

        // Execute click on request manifest
        prepareManifestButton.triggerEventHandler("click", null);
        expect(onRequestManifest).toHaveBeenCalled();
        expect(testStore.dispatch).toHaveBeenCalled();
    });

    /**
     * Returns true if panel header is displayed.
     *
     * @param {string} panelHeaderHeading
     * @returns {boolean}
     */
    function isPanelHeaderDisplayed(panelHeaderHeading: string): boolean {

        const panelHeaderEls = fixture.debugElement.queryAll(By.css("hca-get-data-panel h4"));

        return panelHeaderEls.some(panelHeader => panelHeader.nativeElement.innerHTML === panelHeaderHeading);
    }
});
