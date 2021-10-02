/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ManifestDownloadComponent.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
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
import { FacetDisplayService } from "../../facet/facet-display.service";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileTypeSummaryFormComponent } from "../../file-type-summary-form/file-type-summary-form.component";
import { GetDataLayoutComponent } from "../get-data-layout/get-data-layout.component";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { GetDataSummaryComponent } from "../get-data-summary/get-data-summary.component";
import { ManifestDownloadComponent } from "./manifest-download.component";
import {
    selectFileManifestFileTypeSummaries,
    selectFileManifestManifestResponse, selectFilesFacets
} from "../../_ngrx/file-manifest/file-manifest.selectors";
import { FileSummaryState } from "../../_ngrx/file-summary/file-summary.state";
import { selectFileSummary } from "../../_ngrx/files.selectors";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SelectedSearchTermsComponent } from "../../search/selected-search-terms/selected-search-terms.component";
import { SectionBarComponent } from "../../section-bar/section-bar.component";
import { SelectedDataSummaryComponent } from "../selected-data-summary/selected-data-summary.component";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { GenusSpecies } from "../../shared/genus-species.model";
import { HCASectionTitleComponent } from "../../../shared/hca-section-title/hca-section-title.component";
import { HCATabComponent } from "../../../shared/hca-tab/hca-tab.component";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";
import { PopLayoutComponent } from "../../../shared/pop-layout/pop-layout.component";
import { Term } from "../../shared/term.model";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { DataUseNotificationComponent } from "../../../site/data-use-notification/data-use-notification.component";
import { HCADataUseNotificationComponent } from "../../../site/hca/hca-data-use-notification/hca-data-use-notification.component";
import { HCADataReleasePolicyLinkComponent } from "../../../site/hca/hca-data-release-policy-link/hca-data-release-policy-link.component";
import { TermSortService } from "../../sort/term-sort.service";
import { WarningDataNormalizationComponent } from "../../warning-data-normalization/warning-data-normalization.component";
import { SITE_CONFIG_SERVICE } from "../../../site/site-config/site-config.token";
import { DataReleasePolicyLinkComponent } from "../../../site/data-release-policy-link/data-release-policy-link.component";
import { HCASiteConfigService } from "../../../site/hca/hca-site-config.service";


describe("ManifestDownloadComponent", () => {

    let component: ManifestDownloadComponent;
    let fixture: ComponentFixture<ManifestDownloadComponent>;
    let store: MockStore;

    // Search terms with file format selected
    const SEARCH_TERMS_WITH_FILE_FORMAT = [
        new SearchFacetTerm("fileFormat", "fastq", 123),
        new SearchFacetTerm("disease", "ESRD", 8),
        new SearchFacetTerm("genusSpecies", "Homo sapiens", 20)
    ];

    /**
     * Setup before each test.
     */
    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataLinkComponent,
                DataReleasePolicyLinkComponent,
                DataUseNotificationComponent,
                FileTypeSummaryFormComponent,
                GetDataLayoutComponent,
                GetDataPanelComponent,
                GetDataSummaryComponent,
                HCADataUseNotificationComponent,
                HCADataReleasePolicyLinkComponent,
                HCASectionTitleComponent,
                HCATabComponent,
                HCATooltipComponent,
                ManifestDownloadComponent,
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
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getPortalUrl", "isAtlasHCA"])
                },
                FacetDisplayService,
                {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"])
                },
                {
                    provide: SITE_CONFIG_SERVICE,
                    useClass: HCASiteConfigService
                },
                provideMockStore({
                    initialState: {}
                }),
                {
                    provide: TermSortService,
                    useValue: jasmine.createSpyObj("TermSortService", ["sortTerms"])
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ManifestDownloadComponent);

        // Set up selectors for children components
        store = TestBed.inject(Store) as MockStore;
        store.overrideSelector(selectFilesFacets, [new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
            new Term(GenusSpecies.HOMO_SAPIENS, 100, false)
        ])]);
        store.overrideSelector(selectFileSummary, FileSummaryState.getDefaultState());
        store.overrideSelector(selectSelectedSearchTerms, []);
        
        component = fixture.componentInstance;
    }));


    /**
     * Confirm "Select Manifest File Types" is displayed when download status is not started.
     */
    it(`displays "Select Manifest File Types" when download status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm "Select Manifest File Types" is displayed
        expect(isPanelHeaderDisplayed("Select Manifest File Types")).toEqual(true);
    });

    /**
     * Confirm <file-type-summary-form> is displayed when download status is not started.
     */
    it(`displays component file-type-summary-form when download status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm <file-type-summary-form> is displayed
        const fileTypeSummaryListEl = expect(fixture.debugElement.nativeElement.querySelector("file-type-summary-form"));
        expect(fileTypeSummaryListEl).not.toBe(null);
    });

    /**
     * Confirm <section-bar> is displayed when download status is not started.
     */
    it(`displays component section-bar when download status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm <section-bar> is displayed
        const sectionBarEl = expect(fixture.debugElement.nativeElement.querySelector("section-bar"));
        expect(sectionBarEl).not.toBe(null);
    });

    /**
     * Confirm <data-use-notification> is displayed when download status is not started.
     */
    it(`displays component data-use-notification when download status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = expect(fixture.debugElement.nativeElement.querySelector("data-use-notification"));
        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm "Your File Manifest is Being Prepared" is not displayed when download status is not started.
     */
    it(`hides "Your File Manifest is Being Prepared" when download status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED})
        fixture.detectChanges();

        // Confirm "Your File Manifest is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your File Manifest is Ready" is not displayed when download status is not started.
     */
    it(`hides "Your File Manifest is Ready" when download status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm "Your File Manifest is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Ready")).toEqual(false);
    });

    /**
     * Confirm "Select Manifest File Types" is not displayed when download status is in progress.
     */
    it(`hides "Select Manifest File Types" when download status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm "Select Manifest File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Manifest File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-form> is not displayed when download status is in progress.
     */
    it(`hides component file-type-summary-form when download status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm <file-type-summary-form> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-form");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is not displayed when download status is in progress.
     */
    it(`hides component section-bar when download status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm <section-bar> is not displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).toEqual(null);
    });

    /**
     * Confirm <data-use-notification> is not displayed when download status is in progress.
     */
    it(`hides component data-use-notification when download status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm "Your File Manifest is Being Prepared" is displayed when download status is in progress.
     */
    it(`displays "Your File Manifest is Being Prepared" when download status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm "Your File Manifest is Being Prepared" is displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Being Prepared")).toEqual(true);
    });

    /**
     * Confirm "Your File Manifest is Ready" is not displayed when download status is in progress.
     */
    it(`hides "Your File Manifest is Ready" when download status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm "Your File Manifest is Ready" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Ready")).toEqual(false);
    });

    /**
     * Confirm "Select Manifest File Types" is not displayed when download status is complete.
     */
    it(`hides "Select Manifest File Types" when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm "Select Manifest File Types" is not displayed
        expect(isPanelHeaderDisplayed("Select Manifest File Types")).toEqual(false);
    });

    /**
     * Confirm <file-type-summary-form> is not displayed when download status is complete.
     */
    it(`hides component file-type-summary-form when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm <file-type-summary-form> is not displayed
        const fileTypeSummaryListEl = fixture.debugElement.nativeElement.querySelector("file-type-summary-form");

        expect(fileTypeSummaryListEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is displayed when download status is complete.
     */
    it(`displays component section-bar when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm <section-bar> is displayed
        const sectionBarEl = fixture.debugElement.nativeElement.querySelector("section-bar");

        expect(sectionBarEl).not.toBe(null);
    });

    /**
     * Confirm <data-use-notification> is displayed when download status is complete.
     */
    it(`displays component data-use-notification when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm "Your File Manifest is Being Prepared" is not displayed when download status is complete.
     */
    it(`hides "Your File Manifest is Being Prepared" when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE})
        fixture.detectChanges();

        // Confirm "Your File Manifest is Being Prepared" is not displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Being Prepared")).toEqual(false);
    });

    /**
     * Confirm "Your File Manifest is Ready" is displayed when download status is complete.
     */
    it(`displays "Your File Manifest is Ready" when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm "Your File Manifest is Ready" is displayed
        expect(isPanelHeaderDisplayed("Your File Manifest is Ready")).toEqual(true);
    });

    /**
     * Confirm <copy-to-clipboard> is displayed when download status is complete.
     */
    it(`displays component copy-to-clipboard when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm <copy-to-clipboard> is displayed
        const copyToClipboardEl = expect(fixture.debugElement.nativeElement.querySelector("copy-to-clipboard"));

        expect(copyToClipboardEl).not.toBe(null);
    });

    /**
     * Confirm link is added to href attribute when download status is complete.
     */
    it(`should add link to href when download status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.COMPLETE});
        fixture.detectChanges();

        // Confirm link text is added to href attribute
        const anchorEl = fixture.debugElement.nativeElement.querySelector("data-link a");
        expect(anchorEl).toBeTruthy();
        expect(anchorEl.getAttribute("href")).not.toBe(null);
    });

    /**
     * Confirm confirm store dispatch is called on click of request manifest.
     */
    it("dispatches to store on click of request manifest", () => {

        store.overrideSelector(selectSelectedSearchTerms, SEARCH_TERMS_WITH_FILE_FORMAT);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();
        
        spyOn(store, "dispatch").and.callThrough();

        const onRequestManifest = spyOn(component, "onRequestManifest").and.callThrough();
        const prepareManifestButton = fixture.debugElement.query(By.css("button"));

        // Execute click on request manifest
        prepareManifestButton.triggerEventHandler("click", null);
        expect(onRequestManifest).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalled();
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
