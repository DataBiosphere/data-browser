/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing HCA get matrix component.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";
import { of } from "rxjs";

// App components
import { ConfigService } from "../../../config/config.service";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { WarningTitleComponent } from "../../../shared/warning/warning-title.component";
import { FileManifestService } from "../../shared/file-manifest.service";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { MatrixService } from "../../shared/matrix.service";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { MatrixPartialQueryMatchWarningComponent } from "../matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestFormComponent } from "../matrix-url-request-form/matrix-url-request-form.component";
import { MatrixUrlRequestCompletedComponent } from "../matrix-url-request-completed/matrix-url-request-completed.component";
import { HCAGetMatrixComponent } from "./hca-get-matrix.component";

describe("HCAGetMatrixComponent", () => {

    let component: HCAGetMatrixComponent;
    let fixture: ComponentFixture<HCAGetMatrixComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const COMPONENT_NAME_HCA_GET_DATA_PANEL = "hca-get-data-panel";
    const COMPONENT_NAME_MATRIX_URL_REQUEST_FORM = "matrix-url-request-form";
    const COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED = "matrix-url-request-completed";

    const CLASSNAME_MATRIX = ".matrix";

    const MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED = new Map();
    const MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS = new Map();
    const MATRIX_URL_REQUEST_BY_SPECIES_IN_PROGRESS = new Map();

    const MATRIX_URL_REQUEST_MANIFEST_IN_PROGRESS = {status: MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS};
    const MATRIX_URL_REQUEST_IN_PROGRESS_HOMO = {matrixUrl: undefined, message: "Job started.", requestId: "aace1b45-f7e6-4a86-b80e-17cfd62bcb00", species: "Homo sapiens", status: MatrixUrlRequestStatus.IN_PROGRESS};
    const MATRIX_URL_REQUEST_IN_PROGRESS_MUS = {matrixUrl: "", requestId: "23d520f5-b50a-4407-90d7-1dc3500601cb", species: "Mus musculus", status: MatrixUrlRequestStatus.IN_PROGRESS};

    MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS.set(undefined, MATRIX_URL_REQUEST_MANIFEST_IN_PROGRESS);
    MATRIX_URL_REQUEST_BY_SPECIES_IN_PROGRESS.set(["Homo sapiens", MATRIX_URL_REQUEST_IN_PROGRESS_HOMO], ["Mus musculus", MATRIX_URL_REQUEST_IN_PROGRESS_MUS]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataPanelComponent,
                CopyToClipboardComponent,
                HCAGetMatrixComponent,
                MatrixPartialQueryMatchWarningComponent,
                MatrixUrlRequestFormComponent,
                MatrixUrlRequestCompletedComponent,
                WarningComponent,
                WarningContentComponent,
                WarningTitleComponent
            ],
            imports: [
                ClipboardModule,
                FormsModule,
                MatIconModule,
                MatRadioModule
            ],
            providers: [
                MatrixService,
                ConfigService,
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", [
                        "get"
                    ])
                }, {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestFileManifestUrl"
                    ])
                }, {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetMatrixComponent);
        component = fixture.componentInstance;
        matrixService = fixture.debugElement.injector.get(MatrixService);
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm class "matrix" is displayed on init of state
     */
    it(`should display class "matrix" on init of state`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        expect(getElementByClassName(CLASSNAME_MATRIX)).not.toEqual(null);
    });

    /**
     * Confirm component <matrix-url-request-form> is displayed when matrix url request status is not started.
     */
    it(`should display component matrix url request form when matrix url request status is "NOT_STARTED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(true);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed when matrix url request status is not started.
     */
    it(`should not display component hca get data panel when matrix url request status is "NOT_STARTED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-completed> is not displayed when matrix url request status is not started.
     */
    it(`should not display component matrix url request progress when matrix url request status is "NOT_STARTED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED), // matrixUrlRequestsBySpecies
            of(null), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is manifest in progress.
     */
    it(`should not display component matrix url request form when matrix url request status is "MANIFEST_IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed when matrix url request status is manifest in progress.
     */
    it(`should display component hca-get-data-panel when matrix url request status is "MANIFEST_IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(true);
    });

    /**
     * Confirm component <matrix-url-request-completed> is not displayed when matrix url request status is manifest in progress.
     */
    it(`should not display component matrix url request completed when matrix url request status is "MANIFEST_IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is in progress.
     */
    it(`should not display component matrix url request form when matrix url request status is "IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed when matrix url request status is in progress.
     */
    it(`should not display component hca-get-data-panel when matrix url request status is "IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed when matrix url request status is manifest in progress.
     */
    it(`should not display component matrix url request completed when matrix url request status is "IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Returns debug element for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getElementByClassName(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }

    /**
     * Returns true if component is displayed.
     *
     * @param {string} panelHeaderHeading
     * @returns {boolean}
     */
    function isComponentDisplayed(componentName: string): boolean {

        const parentComponentElement = getElementByClassName(CLASSNAME_MATRIX);
        const childrenComponentElements = parentComponentElement.children;

        if ( !childrenComponentElements ) {

            return false;
        }

        return childrenComponentElements.some(childrenEl => childrenEl.name === componentName);
    }
});
