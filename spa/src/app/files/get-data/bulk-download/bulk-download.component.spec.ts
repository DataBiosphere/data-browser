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
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { BulkDownloadComponent } from "./bulk-download.component";
import { BulkDownloadExecutionEnvironment } from "./bulk-download-execution-environment.model";
import { DataLinkComponent } from "../data-link/data-link.component";
import { DataUseNotificationComponent } from "../../data-use-notification/data-use-notification.component";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileTypeSummaryListComponent } from "../../file-type-summary-list/file-type-summary-list.component";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { PipeModule } from "../../../pipe/pipe.module";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SectionBarComponent } from "../../section-bar/section-bar.component";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { CopyToClipboardComponent } from "../../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { FileFormat } from "../../shared/file-format.model";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";
import { TermSortService } from "../../sort/term-sort.service";
import { WarningDataNormalizationComponent } from "../../warning-data-normalization/warning-data-normalization.component";


describe("BulkDownloadComponent", () => {

    let component: BulkDownloadComponent;
    let fixture: ComponentFixture<BulkDownloadComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataLinkComponent,
                DataUseNotificationComponent,
                FileTypeSummaryListComponent,
                GetDataPanelComponent,
                BulkDownloadComponent,
                SectionBarComponent,
                WarningComponent,
                WarningContentComponent,
                WarningDataNormalizationComponent,
                WarningTitleComponent,
            ],
            imports: [
                ClipboardModule,
                FormsModule,
                MatIconModule,
                MatRadioModule,
                MatTooltipModule,
                PipeModule
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getPortalUrl"])
                },
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                },
                {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "trackRequestCohortManifest",
                        "trackDownloadCohortManifest",
                        "trackCopyToClipboardCohortManifestLink",
                        "trackDownloadProjectManifest",
                        "trackCopyToClipboardProjectManifestLink"
                    ])
                },
                {
                    provide: SearchTermHttpService,
                    useValue: jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"])
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

        fixture = TestBed.createComponent(BulkDownloadComponent);
        component = fixture.componentInstance;
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

        testStore.pipe
            .and.returnValues(
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.NOT_STARTED // manifest download status
            })
        );
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
        testStore.pipe
            .and.returnValues(
            of([selectedSearchTerm]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.NOT_STARTED // manifest download status
            })
        );
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
        testStore.pipe
            .and.returnValues(
            of([selectedSearchTerm]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.NOT_STARTED // manifest download status
            })
        );

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

        testStore.pipe
            .and.returnValues(
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.NOT_STARTED // manifest download status
            })
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
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.NOT_STARTED // manifest download status
            })
        );

        fixture.detectChanges();

        // Confirm <data-use-notification> is displayed
        const dataUseNotificationEl = expect(fixture.debugElement.nativeElement.querySelector("data-use-notification"));
        expect(dataUseNotificationEl).not.toBe(null);
    });

    /**
     * Confirm <section-bar> is not displayed when request status is in progress.
     */
    it(`should not display component section-bar when request status is "IN_PROGRESS"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.IN_PROGRESS // manifest download status
            })
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
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                status: ManifestStatus.IN_PROGRESS // manifest download status
            })
        );

        fixture.detectChanges();

        // Confirm <data-use-notification> is not displayed
        const dataUseNotificationEl = fixture.debugElement.nativeElement.querySelector("data-use-notification");

        expect(dataUseNotificationEl).toEqual(null);
    });

    /**
     * Confirm <section-bar> is displayed when request status is complete.
     */
    it(`should display component section-bar when request status is "COMPLETE"`, () => {

        testStore.pipe
            .and.returnValues(
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                commandLine: {bash: ""},
                fileUrl: "",
                status: ManifestStatus.COMPLETE // manifest download status
            })
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
            of([]), // selected search terms
            of(DEFAULT_FILE_SUMMARY), // manifest file summary
            of({
                commandLine: {bash: ""},
                fileUrl: "",
                status: ManifestStatus.COMPLETE // manifest download status
            })
        );

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

            const manifestFormat = ManifestDownloadFormat.CURL;
            const shell = BulkDownloadExecutionEnvironment.BASH;
            component.onRequestManifest([], shell);
            expect(testStore.dispatch).toHaveBeenCalled();
            expect(testStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
                manifestFormat
            }))
        });
        
        /**
         * Confirm action is triggered to track request of manifest when manifest is requested.
         */
        it("dispatches action to track manifest request", () => {

            const shell = BulkDownloadExecutionEnvironment.BASH;
            component.onRequestManifest([], shell);
            expect(testStore.dispatch).toHaveBeenCalled();
            expect(testStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
                shell
            }))
        });
    });

    describe("onDataLinkCopied", () => {

        /**
         * Confirm action is triggered to track request of copy to clipboard of curl command.
         */
        it("dispatches action to track manifest request", () => {

            const manifestUrl = "http://foo.com";
            const shell = BulkDownloadExecutionEnvironment.BASH;
            component.onDataLinkCopied([], shell, manifestUrl);
            expect(testStore.dispatch).toHaveBeenCalled();
            expect(testStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
                manifestUrl,
                shell
            }))
        });
    });
});
