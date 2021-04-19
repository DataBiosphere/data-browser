/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ExportToTerraComponent.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App dependencies
import { DCPCatalog } from "../../catalog/dcp-catalog.model";
import { ConfigService } from "../../../config/config.service";
import { DataLinkComponent } from "../data-link/data-link.component";
import { DataUseNotificationComponent } from "../../data-use-notification/data-use-notification.component";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { ExportToTerraComponent } from "./export-to-terra.component";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { ResponseTermService } from "../../http/response-term.service";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SectionBarComponent } from "../../section-bar/section-bar.component";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { TerraService } from "../../shared/terra.service";
import { TermSortService } from "../../sort/term-sort.service";

describe("ExportToTerraComponent", () => {

    let component: ExportToTerraComponent;
    let fixture: ComponentFixture<ExportToTerraComponent>;
    let terraService: TerraService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Search terms with file format selected
    const SEARCH_TERMS_WITH_FILE_FORMAT = [
        new SearchFacetTerm("fileFormat", "fastq", 123),
        new SearchFacetTerm("disease", "ESRD", 8),
        new SearchFacetTerm("genusSpecies", "Homo sapiens", 20)
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
    
    const TERRA_EXPORT_URL = "https://app.terra.bio/#import-data?url=";

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        const configService = jasmine.createSpyObj("ConfigService", ["getPortalUrl", "getFileManifestUrl", "getTerraExportUrl"]);
        configService.getTerraExportUrl.and.callFake((exportUrl) => {
            return `${TERRA_EXPORT_URL}${exportUrl}`;
        });

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataLinkComponent,
                DataUseNotificationComponent,
                ExportToTerraComponent,
                FileTypeSummaryListComponent,
                GetDataPanelComponent,
                SectionBarComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule,
                MatTooltipModule,
                PipeModule
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: configService
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
                SearchTermHttpService,
                {
                    provide: Store,
                    useValue: testStore
                },
                ResponseTermService,
                {
                    provide: TermSortService,
                    useValue: jasmine.createSpyObj("TermSortService", ["sortTerms"])
                },
                {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"])
                },
                TerraService,
                {
                    provide: "Window",
                    useValue: spyOn(window, "open")
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ExportToTerraComponent);
        component = fixture.componentInstance;
        terraService = fixture.debugElement.injector.get(TerraService);
    }));

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
        expect(terraServiceURL).toEqual(`${TERRA_EXPORT_URL}terraURL`);
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
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is displayed
        const fileTypeSummaryListEl = expect(fixture.debugElement.nativeElement.querySelector("file-type-summary-list"));
        expect(fileTypeSummaryListEl).not.toBe(null);
    });

    /**
     * Confirm <section-bar> is displayed when request status is not started.
     */
    it(`should display component section-bar when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <section-bar> is displayed
        const sectionBarEl = expect(fixture.debugElement.nativeElement.querySelector("section-bar"));
        expect(sectionBarEl).not.toBe(null);
    });

    /**
     * Confirm <data-use-notification> is displayed when request status is not started.
     */
    it(`should display component data-use-notification when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = expect(fixture.debugElement.nativeElement.querySelector("data-use-notification"));
        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is not started.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "NOT_STARTED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is not displayed when request status is in progress.
     */
    it(`should not display component section-bar when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <section-bar> is not displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).toEqual(null);
    });

    /**
     * Confirm <data-use-notification> is not displayed when request status is in progress.
     */
    it(`should not display component data-use-notification when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is displayed when request status is in progress.
     */
    it(`should display "Your Export is Being Prepared" when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is displayed when request status is complete.
     */
    it(`should display component section-bar when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <section-bar> is displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).not.toBe(null);
    });

    /**
     * Confirm <data-use-notification> is displayed when request status is complete.
     */
    it(`should display component data-use-notification when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is complete.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is not displayed when request status is failed.
     */
    it(`should not display component section-bar when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <section-bar> is not displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).toEqual(null);
    });

    /**
     * Confirm <data-use-notification> is not displayed when request status is failed.
     */
    it(`should not display component data-use-notification when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
        );

        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is failed.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "FAILED"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // search terms
            of(DEFAULT_FILE_SUMMARY), // file manifest summary
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.FAILED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.NOT_STARTED}), // terra response
            of(DCPCatalog.DCP3)
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
            of({exportToTerraStatus: ExportToTerraStatus.COMPLETE, exportToTerraUrl: "terraURL"}), // terra response
            of(DCPCatalog.DCP3)
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

        const panelHeaderEls = fixture.debugElement.queryAll(By.css("get-data-panel h4"));

        return panelHeaderEls.some(panelHeader => panelHeader.nativeElement.innerHTML === panelHeaderHeading);
    }
});
