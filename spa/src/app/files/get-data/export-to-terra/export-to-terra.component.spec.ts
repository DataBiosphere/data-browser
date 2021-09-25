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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { DataLinkComponent } from "../data-link/data-link.component";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { FacetDisplayService } from "../../facet/facet-display.service";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { ExportToTerraComponent } from "./export-to-terra.component";
import { GetDataLayoutComponent } from "../get-data-layout/get-data-layout.component";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { GetDataSummaryComponent } from "../get-data-summary/get-data-summary.component";
import { ResponseTermService } from "../../http/response-term.service";
import { selectFilesFacets } from "../../_ngrx/facet/facet.selectors";
import { selectFileManifestFileTypeSummaries } from "../../_ngrx/file-manifest/file-manifest.selectors";
import { selectFileSummary } from "../../_ngrx/files.selectors";
import { FileSummaryState } from "../../_ngrx/file-summary/file-summary.state";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { selectExportToTerra } from "../../_ngrx/terra/terra.selectors";
import { TerraState } from "../../_ngrx/terra/terra.state";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SelectedSearchTermsComponent } from "../../search/selected-search-terms/selected-search-terms.component";
import { SectionBarComponent } from "../../section-bar/section-bar.component";
import { SelectedDataSummaryComponent } from "../selected-data-summary/selected-data-summary.component";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { GenusSpecies } from "../../shared/genus-species.model";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";
import { PopLayoutComponent } from "../../../shared/pop-layout/pop-layout.component";
import { HCASectionTitleComponent } from "../../../shared/hca-section-title/hca-section-title.component";
import { HCATabComponent } from "../../../shared/hca-tab/hca-tab.component";
import { Term } from "../../shared/term.model";
import { TerraService } from "../../shared/terra.service";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { TermSortService } from "../../sort/term-sort.service";
import { DataUseNotificationComponent } from "../../../site/data-use-notification/data-use-notification.component";
import { HCADataUseNotificationComponent } from "../../../site/hca/hca-data-use-notification/hca-data-use-notification.component";
import { HCADataReleasePolicyLinkComponent } from "../../../site/hca/hca-data-release-policy-link/hca-data-release-policy-link.component";
import { SITE_CONFIG_SERVICE } from "../../../site/site-config/site-config.token";
import { HCASiteConfigService } from "../../../site/hca/hca-site-config.service";
import { WarningDataNormalizationComponent } from "../../warning-data-normalization/warning-data-normalization.component";
import { DataReleasePolicyLinkComponent } from "../../../site/data-release-policy-link/data-release-policy-link.component";

describe("ExportToTerraComponent", () => {

    let component: ExportToTerraComponent;
    let fixture: ComponentFixture<ExportToTerraComponent>;
    let configService: ConfigService;
    let store: MockStore;
    let terraService: TerraService;

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

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataLinkComponent,
                DataReleasePolicyLinkComponent,
                DataUseNotificationComponent,
                ExportToTerraComponent,
                FileTypeSummaryListComponent,
                GetDataLayoutComponent,
                GetDataPanelComponent,
                GetDataSummaryComponent,
                HCADataUseNotificationComponent,
                HCADataReleasePolicyLinkComponent,
                HCASectionTitleComponent,
                HCATabComponent,
                HCATooltipComponent,
                PopLayoutComponent,
                SectionBarComponent,
                SelectedDataSummaryComponent,
                SelectedSearchTermsComponent,
                WarningComponent,
                WarningContentComponent,
                WarningDataNormalizationComponent
            ],
            imports: [
                BrowserAnimationsModule,
                ClipboardModule,
                MatIconModule,
                MatTooltipModule,
                PipeModule,
                RouterTestingModule
            ],
            providers: [
                ConfigService,
                FacetDisplayService,
                {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestFileManifestUrl"
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
                    provide: SITE_CONFIG_SERVICE,
                    useClass: HCASiteConfigService
                },
                provideMockStore({
                    initialState: {}
                }),
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

        // Set up selectors for children components
        store = TestBed.inject(Store) as MockStore;
        store.overrideSelector(selectFilesFacets, [new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
            new Term(GenusSpecies.HOMO_SAPIENS, 100, false)
        ])]);
        store.overrideSelector(selectFileSummary, FileSummaryState.getDefaultState());
        store.overrideSelector(selectSelectedSearchTerms, []);

        configService = TestBed.inject(ConfigService);
        spyOn(configService, "getTerraExportUrl").and.callFake((exportUrl) => {
            return `${TERRA_EXPORT_URL}${exportUrl}`;
        });
        
        terraService = fixture.debugElement.injector.get(TerraService);
    }));

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
     * Confirm "Select File Types" is displayed when request status is not started.
     */
    it(`should display "Select File Types" when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        // Confirm "Select Export File Types" is displayed
        expect(isPanelHeaderDisplayed("Select File Types")).toEqual(true);
    });

    /**
     * Confirm <file-type-summary-list> is displayed when request status is not started.
     */
    it(`should display component file-type-summary-list when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();
        
        // Confirm <file-type-summary-list> is displayed
        const fileTypeSummaryListEl = expect(fixture.debugElement.nativeElement.querySelector("file-type-summary-list"));
        expect(fileTypeSummaryListEl).not.toBe(null);
    });

    /**
     * Confirm <section-bar> is displayed when request status is not started.
     */
    it(`should display component section-bar when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        // Confirm <section-bar> is displayed
        const sectionBarEl = expect(fixture.debugElement.nativeElement.querySelector("section-bar"));
        expect(sectionBarEl).not.toBe(null);
    });

    /**
     * Confirm <data-use-notification> is displayed when request status is not started.
     */
    it(`should display component data-use-notification when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = expect(fixture.debugElement.nativeElement.querySelector("data-use-notification"));
        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is not started.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your Link is Ready" is not displayed when request status is not started.
     */
    it(`should not display "Your Link is Ready" when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your Link is Ready")).toEqual(false);
    });

    /**
     * Confirm "Error" is not displayed when request status is not started.
     */
    it(`should not display "Error" when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        // Confirm "Error" is not displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(false);
    });

    /**
     * Confirm "Select Export File Types" is not displayed when request status is in progress.
     */
    it(`should not display "Select Export File Types" when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm "Select Export File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when request status is in progress.
     */
    it(`should not display component file-type-summary-list when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is not displayed when request status is in progress.
     */
    it(`should not display component section-bar when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm <section-bar> is not displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).toEqual(null);
    });

    /**
     * Confirm <data-use-notification> is not displayed when request status is in progress.
     */
    it(`should not display component data-use-notification when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm "Your Link is Being Prepared" is displayed when request status is in progress.
     */
    it(`should display "Your Link is Being Prepared" when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is displayed
        expect(isPanelHeaderDisplayed("Your Link is Being Prepared")).toEqual(true);
    });

    /**
     * Confirm "Your Export is Ready" is not displayed when request status is in progress.
     */
    it(`should not display "Your Export is Ready" when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Ready")).toEqual(false);
    });

    /**
     * Confirm "Error" is not displayed when request status is in progress.
     */
    it(`should not display "Error" when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.IN_PROGRESS} as TerraState);
        fixture.detectChanges();

        // Confirm "Error" is not displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(false);
    });

    /**
     * Confirm "Select Export File Types" is not displayed when request status is complete.
     */
    it(`should not display "Select Export File Types" when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm "Select Export File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when request status is complete.
     */
    it(`should not display component file-type-summary-list when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is displayed when request status is complete.
     */
    it(`should display component section-bar when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm <section-bar> is displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).not.toBe(null);
    });

    /**
     * Confirm <data-use-notification> is displayed when request status is complete.
     */
    it(`should display component data-use-notification when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is complete.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your Link is Ready" is displayed when request status is complete.
     */
    it(`should display "Your Link is Ready" when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Link is Ready" is displayed
        expect(isPanelHeaderDisplayed("Your Link is Ready")).toEqual(true);
    });

    /**
     * Confirm "Error" is not displayed when request status is complete.
     */
    it(`should not display "Error" when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm "Error" is not displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(false);
    });

    /**
     * Confirm "Select Export File Types" is not displayed when request status is failed.
     */
    it(`should not display "Select Export File Types" when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm "Select Export File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Export File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-list> is not displayed when request status is failed.
     */
    it(`should not display component file-type-summary-list when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm <file-type-summary-list> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-list");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is not displayed when request status is failed.
     */
    it(`should not display component section-bar when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm <section-bar> is not displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).toEqual(null);
    });

    /**
     * Confirm <data-use-notification> is not displayed when request status is failed.
     */
    it(`should not display component data-use-notification when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm "Your Export is Being Prepared" is not displayed when request status is failed.
     */
    it(`should not display "Your Export is Being Prepared" when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your Export is Ready" is not displayed when request status is failed.
     */
    it(`should not display "Your Export is Ready" when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm "Your Export is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your Export is Ready")).toEqual(false);
    });

    /**
     * Confirm "Error" is displayed when request status is failed.
     */
    it(`should display "Error" when request status is "FAILED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.FAILED} as TerraState);
        fixture.detectChanges();

        // Confirm "Error" is displayed
        expect(isPanelHeaderDisplayed("Error")).toEqual(true);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when request status is complete.
     */
    it(`should display component copy-to-clipboard when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.COMPLETE} as TerraState);
        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        const copyToClipboardEl = expect(fixture.debugElement.nativeElement.querySelector("copy-to-clipboard"));

        expect(copyToClipboardEl).not.toBe(null);
    });

    /**
     * Confirm confirm store dispatch is called on click of request export to terra.
     */
    it("should store dispatch on click of request export", () => {

        store.overrideSelector(selectSelectedSearchTerms, SEARCH_TERMS_WITH_FILE_FORMAT);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {exportToTerraStatus: ExportToTerraStatus.NOT_STARTED} as TerraState);
        fixture.detectChanges();

        spyOn(store, "dispatch").and.callThrough();
        
        const onExportToTerra = spyOn(component, "onExportToTerra").and.callThrough();
        const requestExportButton = fixture.debugElement.query(By.css("button"));

        // Execute click on request manifest
        requestExportButton.triggerEventHandler("click", null);
        expect(onExportToTerra).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalled();
    });

    /**
     * Confirm new window opens when request status is complete.
     */
    it(`should new window open when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, SEARCH_TERMS_WITH_FILE_FORMAT);
        store.overrideSelector(selectFileManifestFileTypeSummaries, FileSummaryState.getDefaultState().fileTypeSummaries);
        store.overrideSelector(selectExportToTerra, {
            exportToTerraStatus: ExportToTerraStatus.COMPLETE,
            exportToTerraUrl: "terraURL"
        } as TerraState);
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
