/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for BulkDownloadComponent.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { ConfigServiceSpy } from "../../../config/config.service.spy";
import { BulkDownloadComponent } from "./bulk-download.component";
import { BulkDownloadExecutionEnvironment } from "./bulk-download-execution-environment.model";
import { DataLinkComponent } from "../data-link/data-link.component";
import { FacetDisplayService } from "../../facet/facet-display.service";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { GetDataLayoutComponent } from "../get-data-layout/get-data-layout.component";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { GetDataSummaryComponent } from "../get-data-summary/get-data-summary.component";
import { selectFileSummary } from "../../_ngrx/files.selectors";
import { FileSummaryState } from "../../_ngrx/file-summary/file-summary.state";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import {
    selectFileManifestFileTypeSummaries,
    selectFileManifestManifestResponse, selectFilesFacets
} from "../../_ngrx/file-manifest/file-manifest.selectors";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SelectedSearchTermsComponent } from "../../search/selected-search-terms/selected-search-terms.component";
import { SectionBarComponent } from "../../section-bar/section-bar.component";
import { SelectedDataSummaryComponent } from "../selected-data-summary/selected-data-summary.component";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { FileFormat } from "../../shared/file-format.model";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { GenusSpecies } from "../../shared/genus-species.model";
import { HCATabComponent } from "../../../shared/hca-tab/hca-tab.component";
import { HCASectionTitleComponent } from "../../../shared/hca-section-title/hca-section-title.component";
import { HCATooltipComponent } from "../../../shared/hca-tooltip/hca-tooltip.component";
import { PopLayoutComponent } from "../../../shared/pop-layout/pop-layout.component";
import { TermSortService } from "../../sort/term-sort.service";
import { Term } from "../../shared/term.model";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";
import { DataUseNotificationComponent } from "../../../site/data-use-notification/data-use-notification.component";
import { HCADataReleasePolicyLinkComponent } from "../../../site/hca/hca-data-release-policy-link/hca-data-release-policy-link.component";
import { HCADataUseNotificationComponent } from "../../../site/hca/hca-data-use-notification/hca-data-use-notification.component";
import { HCASiteConfigService } from "../../../site/hca/hca-site-config.service";
import { SITE_CONFIG_SERVICE } from "../../../site/site-config/site-config.token";
import { WarningDataNormalizationComponent } from "../../warning-data-normalization/warning-data-normalization.component";
import { DataReleasePolicyLinkComponent } from "../../../site/data-release-policy-link/data-release-policy-link.component";

describe("BulkDownloadComponent", () => {

    let component: BulkDownloadComponent;
    let fixture: ComponentFixture<BulkDownloadComponent>;
    let store: MockStore;

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                BulkDownloadComponent,
                CopyToClipboardComponent,
                DataLinkComponent,
                DataUseNotificationComponent,
                DataReleasePolicyLinkComponent,
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
                WarningDataNormalizationComponent,
                WarningTitleComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                ClipboardModule,
                FormsModule,
                MatIconModule,
                MatRadioModule,
                MatTooltipModule,
                PipeModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: ConfigServiceSpy as any
                },
                FacetDisplayService,
                {
                    provide: SITE_CONFIG_SERVICE,
                    useClass: HCASiteConfigService
                },
                provideMockStore({
                    initialState: {}
                }),
                TermSortService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BulkDownloadComponent);
        component = fixture.componentInstance;

        // Set up selectors for children components
        store = TestBed.inject(Store) as MockStore;
        store.overrideSelector(selectFilesFacets, [new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
            new Term(GenusSpecies.HOMO_SAPIENS, 100, false)
        ])]);
        store.overrideSelector(selectFileSummary, FileSummaryState.getDefaultState());
        store.overrideSelector(selectSelectedSearchTerms, []);
    }));

    /**
     * Confirm form is considered invalid if execution environment is not selected.
     */
    it("detects invalid form state if execution environment is not selected", () => {

        // Selected search terms has at least one value selected, no execution environment is selected
        const selectedSearchTerm = new SearchFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM);
        const valid = component.isRequestFormValid([selectedSearchTerm], "" as any);
        expect(valid).toBeFalse();
    });

    /**
     * Confirm form is considered invalid if execution environment is not selected.
     */
    it("detects invalid form state if search term is not selected", () => {

        const valid = component.isRequestFormValid([], BulkDownloadExecutionEnvironment.BASH);
        expect(valid).toBeFalse();
    });

    /**
     * Confirm form is considered valid if execution environment and search terms are selected.
     */
    it("detects valid form state if search terms and execution environments are selected", () => {

        const selectedSearchTerm = new SearchFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM);
        const valid = component.isRequestFormValid([selectedSearchTerm], BulkDownloadExecutionEnvironment.BASH);
        expect(valid).toBeTrue();
    });

    /**
     * Confirm request button is disabled if file type has not been selected
     */
    it("disables button if file type has not been selected", () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        component.executionEnvironment = BulkDownloadExecutionEnvironment.BASH;

        fixture.detectChanges();

        // Confirm the request button is disabled
        console.log(fixture.debugElement.nativeElement);
        const buttonDE = fixture.debugElement.query(By.css("button"));
        expect(buttonDE).toBeTruthy();
        expect(buttonDE.nativeElement.disabled).toBe(true);
    });

    /**
     * Confirm request button is enable if file type and execution environment have been selected.
     */
    it("enables button if file type and execution environment have been selected", () => {

        const selectedSearchTerm = new SearchFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM);
        store.overrideSelector(selectSelectedSearchTerms, [selectedSearchTerm]);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        component.executionEnvironment = BulkDownloadExecutionEnvironment.BASH;

        fixture.detectChanges();

        // Confirm the request button is disabled
        console.log(fixture.debugElement.nativeElement);
        const buttonDE = fixture.debugElement.query(By.css("button"));
        expect(buttonDE).toBeTruthy();
        expect(buttonDE.nativeElement.disabled).toBe(false);
    });

    /**
     * Confirm both bash and cmd.exe radio buttons are displayed.
     */
    it("displays bash and cmd.exe radio options", () => {

        const selectedSearchTerm = new SearchFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM);
        store.overrideSelector(selectSelectedSearchTerms, [selectedSearchTerm]);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm the request button is disabled
        console.log(fixture.debugElement.nativeElement);
        const buttonDEs = fixture.debugElement.queryAll(By.css("mat-radio-button"));
        expect(buttonDEs.length).toBe(2);
    });

    /**
     * Confirm <section-bar> is displayed when request status is not started.
     */
    it(`should display component section-bar when request status is "NOT_STARTED"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
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
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.NOT_STARTED});
        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = expect(fixture.debugElement.nativeElement.querySelector("data-use-notification"));
        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm <section-bar> is not displayed when request status is in progress.
     */
    it(`should not display component section-bar when request status is "IN_PROGRESS"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
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
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {status: ManifestStatus.IN_PROGRESS});
        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is displayed when request status is complete.
     */
    it(`should display component section-bar when request status is "COMPLETE"`, () => {

        store.overrideSelector(selectSelectedSearchTerms, []);
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {
            commandLine: {bash: ""},
            fileUrl: "",
            status: ManifestStatus.COMPLETE // manifest download status
        });
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
        store.overrideSelector(selectFileManifestFileTypeSummaries, DEFAULT_FILE_SUMMARY.fileTypeSummaries);
        store.overrideSelector(selectFileManifestManifestResponse, {
            commandLine: {bash: ""},
            fileUrl: "",
            status: ManifestStatus.COMPLETE // manifest download status
        });
        fixture.detectChanges();

        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).not.toBe(null);
    });

    describe("onRequestManifest", () => {

        /**
         * Confirm action is dispatched to request manifest.
         */
        it("dispatches action to request manifest", () => {

            spyOn(store, "dispatch").and.callThrough();

            const manifestFormat = ManifestDownloadFormat.CURL;
            const shell = BulkDownloadExecutionEnvironment.BASH;
            component.onRequestManifest([], shell);
            expect(store.dispatch).toHaveBeenCalled();
            expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
                manifestFormat
            }))
        });
        
        /**
         * Confirm action is triggered to track request of manifest when manifest is requested.
         */
        it("dispatches action to track manifest request", () => {

            spyOn(store, "dispatch").and.callThrough();

            const shell = BulkDownloadExecutionEnvironment.BASH;
            component.onRequestManifest([], shell);
            expect(store.dispatch).toHaveBeenCalled();
            expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
                shell
            }))
        });
    });

    describe("onDataLinkCopied", () => {

        /**
         * Confirm action is triggered to track request of copy to clipboard of curl command.
         */
        it("dispatches action to track manifest request", () => {
            
            spyOn(store, "dispatch").and.callThrough();

            const manifestUrl = "http://foo.com";
            const shell = BulkDownloadExecutionEnvironment.BASH;
            component.onDataLinkCopied([], shell, manifestUrl);
            expect(store.dispatch).toHaveBeenCalled();
            expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
                manifestUrl,
                shell
            }))
        });
    });
});
