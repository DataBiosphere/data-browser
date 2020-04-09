/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAExportToTerra.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App dependencies
import { CcPipeModule } from "../../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../../config/config.service";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { SearchFileFacetTerm } from "../../search/search-file-facet-term.model";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { FileManifestService } from "../../shared/file-manifest.service";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { SearchTermService } from "../../shared/search-term.service";
import { TermResponseService } from "../../shared/term-response.service";
import { TerraService } from "../../shared/terra.service";
import { TermSortService } from "../../sort/term-sort.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DisplayDataLinkComponent } from "../display-data-link/display-data-link.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { HCAExportToTerraComponent } from "./hca-export-to-terra.component";
import { GTMService } from "../../../shared/gtm/gtm.service";

describe("HCAExportToTerraComponent", () => {

    let component: HCAExportToTerraComponent;
    let fixture: ComponentFixture<HCAExportToTerraComponent>;
    let terraService: TerraService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Search terms with file format selected
    const SEARCH_TERMS_WITH_FILE_FORMAT = [
        new SearchFileFacetTerm("fileFormat", "fastq", 123),
        new SearchFileFacetTerm("disease", "ESRD", 8),
        new SearchFileFacetTerm("genusSpecies", "Homo sapiens", 20)
    ];

    // Empty file summary
    const FILE_SUMMARY_EMPTY = {
        "donorCount": 0,
        "fileCount": 0,
        "fileTypeSummaries": [],
        "organTypes": [],
        "projectCount": 0,
        "specimenCount": 0,
        "totalCellCount": 0,
        "totalFileSize": 0
    };

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DisplayDataLinkComponent,
                FileTypeSummaryListComponent,
                HCAGetDataPanelComponent,
                HCAExportToTerraComponent
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
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestFileManifestUrl"
                    ])
                },
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                },
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", [
                        "get"
                    ])
                },
                SearchTermService,
                {
                    provide: Store,
                    useValue: testStore
                },
                TermResponseService,
                {
                    provide: TermSortService,
                    useValue: jasmine.createSpyObj("TermSortService", ["sortTerms"])
                },
                TerraService,
                {
                    provide: "Window",
                    useValue: spyOn(window, "open")
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAExportToTerraComponent);
        component = fixture.componentInstance;
        terraService = fixture.debugElement.injector.get(TerraService);
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
        const fileTypeSummaries = component.getFileTypeSummaries(FILE_SUMMARY_EMPTY);
        expect(fileTypeSummaries).toEqual([]);
    });

    /**
     * Confirm get file type summaries returns file type summaries when file summaries is not empty.
     */
    it("should get file type summaries return file type summaries when file summaries is not empty", () => {

        // Confirm get file type summaries returns file type summaries, when file summaries is not empty - first execute the
        // method and then confirm the returned value is equal to the DEFAULT_FILE_SUMMARY file type summaries.
        const fileTypeSummaries = component.getFileTypeSummaries(DEFAULT_FILE_SUMMARY);
        expect(fileTypeSummaries).toEqual(DEFAULT_FILE_SUMMARY.fileTypeSummaries);
    });

    /**
     * Confirm terra service URL returns the terra workspace URL, when export to terra url is not empty.
     */
    it("should get terra service url return terra url when export to terra url is not empty", () => {

        // Confirm get terra service url returns terra url, when export to terra url is not empty - first execute the
        // method and then confirm the returned value is not null and equals "https://app.terra.bio/#import-data?url=terraURL".
        const terraServiceURL = component.getTerraServiceUrl("terraURL");
        expect(terraServiceURL).not.toEqual(null);
        expect(terraServiceURL).toEqual("https://app.terra.bio/#import-data?url=terraURL");
    });

    /**
     * Confirm any file format selected returns false when no "fileFormat" facet terms are selected.
     */
    it(`should any file format selected return false when no "fileFormat" facet terms are selected`, () => {

        // Confirm any file format selected returns false, when no "fileFormat" facet terms are selected - first execute the
        // method and then confirm the returned value is false.
        const anyFormatSelected = component.isAnyFileFormatSelected([]);
        expect(anyFormatSelected).toEqual(false);
    });

    /**
     * Confirm any file format selected returns true when "fileFormat" facet terms are selected.
     */
    it(`should any file format selected return true when "fileFormat" facet terms are selected`, () => {

        // Confirm any file format selected returns true, when "fileFormat" facet terms are selected - first execute the
        // method and then confirm the returned value is true.
        const anyFormatSelected = component.isAnyFileFormatSelected(SEARCH_TERMS_WITH_FILE_FORMAT);
        expect(anyFormatSelected).toEqual(true);
    });

    /**
     * Confirm "Select Export File Types" is displayed when request status is not started.
     */
    it(`should display "Select Export File Types" when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Select Export File Types" is displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(true);
    });

    /**
     * Confirm <file-type-summary-list> is displayed when request status is not started.
     */
    it(`should display component file-type-summary-list when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}) // terra response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is displayed
        const fileTypeSummaryListEl = expect(fixture.debugElement.nativeElement.querySelector("file-type-summary-list"));
        expect(fileTypeSummaryListEl).not.toBe(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is not started.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your Export is Ready" is not displayed when request status is not started.
     */
    it(`should not display "Your Export is Ready" when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Ready")).toEqual(false);
    });

    /**
     * Confirm "Error" is not displayed when request status is not started.
     */
    it(`should not display "Error" when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Error" is not displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(false);
    });

    /**
     * Confirm "Select Export File Types" is not displayed when request status is in progress.
     */
    it(`should not display "Select Export File Types" when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Select Export File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when request status is in progress.
     */
    it(`should not display component file-type-summary-list when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}) // terra response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is displayed when request status is in progress.
     */
    it(`should display "Your Export is Being Prepared" when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(true);
    });

    /**
     * Confirm "Your Export is Ready" is not displayed when request status is in progress.
     */
    it(`should not display "Your Export is Ready" when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Ready")).toEqual(false);
    });

    /**
     * Confirm "Error" is not displayed when request status is in progress.
     */
    it(`should not display "Error" when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Error" is not displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(false);
    });

    /**
     * Confirm "Select Export File Types" is not displayed when request status is complete.
     */
    it(`should not display "Select Export File Types" when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Select Export File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when request status is complete.
     */
    it(`should not display component file-type-summary-list when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}) // terra response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is complete.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your Export is Ready" is displayed when request status is complete.
     */
    it(`should display "Your Export is Ready" when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Ready" is displayed
        expect(isPanelHeaderDisplayed("Your Export is Ready")).toEqual(true);
    });

    /**
     * Confirm "Error" is not displayed when request status is complete.
     */
    it(`should not display "Error" when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Error" is not displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(false);
    });

    /**
     * Confirm "Select Export File Types" is not displayed when request status is failed.
     */
    it(`should not display "Select Export File Types" when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Select Export File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when request status is failed.
     */
    it(`should not display component file-type-summary-list when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}) // terra response
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is failed.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your Export is Ready" is not displayed when request status is failed.
     */
    it(`should not display "Your Export is Ready" when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Your Export is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Ready")).toEqual(false);
    });

    /**
     * Confirm "Error" is displayed when request status is failed.
     */
    it(`should display "Error" when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}) // terra response
        );

        fixture.detectChanges();

        // Confirm "Error" is displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(true);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when request status is complete.
     */
    it(`should display component copy-to-clipboard when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}) // terra response
        );

        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        const copyToClipboardEl = expect(fixture.debugElement.nativeElement.querySelector("copy-to-clipboard"));

        expect(copyToClipboardEl).not.toBe(null);
    });

    /**
     * Confirm confirm store dispatch is called on click of request export to terra.
     */
    it("should store dispatch on click of request export", () => {

        testStore.pipe
            .and.returnValues(
            of(SEARCH_TERMS_WITH_FILE_FORMAT), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}) // terra response
        );

        fixture.detectChanges();

        const onExportToTerra = spyOn(component, "onExportToTerra");
        const requestExportButton = fixture.debugElement.query(By.css("button"));

        // Execute click on request manifest
        requestExportButton.triggerEventHandler("click", null);
        expect(onExportToTerra).toHaveBeenCalled();
        expect(testStore.dispatch).toHaveBeenCalled();
    });

    /**
     * Confirm new window opens when request status is complete.
     */
    it(`should new window open when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of(SEARCH_TERMS_WITH_FILE_FORMAT), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE, exportToTerraUrl: "terraURL"}) // terra response
        );

        fixture.detectChanges();

        expect(window.open).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith("https://app.terra.bio/#import-data?url=terraURL");
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
