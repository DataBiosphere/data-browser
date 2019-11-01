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
import { MatrixFormat } from "../../shared/matrix-format.model";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";
import { CancelFetchMatrixUrlRequestAction } from "../../_ngrx/matrix/cancel-fetch-matrix-url-request.action";
import { ClearMatrixPartialQueryMatchAction } from "../../_ngrx/matrix/clear-matrix-partial-query-match.action";
import { FetchMatrixUrlRequestAction } from "../../_ngrx/matrix/fetch-matrix-url-request.action";
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { MatrixPartialQueryMatchWarningComponent } from "../matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestCompletedComponent } from "../matrix-url-request-completed/matrix-url-request-completed.component";
import { MatrixUrlRequestFormComponent } from "../matrix-url-request-form/matrix-url-request-form.component";
import { HCAGetMatrixComponent } from "./hca-get-matrix.component";

describe("HCAGetMatrixComponent", () => {

    let component: HCAGetMatrixComponent;
    let fixture: ComponentFixture<HCAGetMatrixComponent>;
    let matrixService: MatrixService;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Component input properties
    const COMPONENT_INPUT_PROPERTY_LOADING = "loading";

    // Component names
    const COMPONENT_NAME_HCA_GET_DATA_PANEL = "hca-get-data-panel";
    const COMPONENT_NAME_MATRIX_URL_REQUEST_FORM = "matrix-url-request-form";
    const COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED = "matrix-url-request-completed";

    // Class names
    const CLASSNAME_MATRIX = ".matrix";
    const CLASSNAME_FONTSIZE_M_SEMI_BOLD = "p.fontsize-m.semi-bold"; // for paragraph PARAGRAPH_MULTIPLE_MATRIX_URL

    // Test values
    const PARAGRAPH_MULTIPLE_MATRIX_URL = "Your request contains data from multiple species. Data from each species is returned in its own expression matrix.";
    const SPECIES_HOMO = "Homo sapiens";
    const SPECIES_MUS = "Mus musculus";
    const URL_DATA = "https://test.com";
    const URL_DATA_NULL = "";

    const MATRIX_URL_REQUEST_COMPLETED_HOMO = {eta: "", matrixUrl: URL_DATA, message: "", requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3", species: SPECIES_HOMO, status: MatrixUrlRequestStatus.COMPLETED};
    const MATRIX_URL_REQUEST_COMPLETED_MUS = {eta: "", matrixUrl: URL_DATA, message: "", requestId: "86ecf86d-df97-4b37-af6f-7f25d78d404b", species: SPECIES_MUS, status: MatrixUrlRequestStatus.COMPLETED};
    const MATRIX_URL_REQUEST_COMPLETED_HOMO_NULL_DATA = {eta: "", matrixUrl: URL_DATA_NULL, message: "", requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3", species: SPECIES_HOMO, status: MatrixUrlRequestStatus.COMPLETED};
    const MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA = {eta: "", matrixUrl: URL_DATA_NULL, message: "", requestId: "86ecf86d-df97-4b37-af6f-7f25d78d404b", species: SPECIES_MUS, status: MatrixUrlRequestStatus.COMPLETED};
    const MATRIX_URL_REQUEST_FAILED_HOMO = {eta: "", matrixUrl: URL_DATA, message: "resolved bundles in request do not match bundles available in matrix service", requestId: "ea14b8fc-e567-4215-9625-2e4325c04ad3", species: SPECIES_HOMO, status: MatrixUrlRequestStatus.FAILED};
    const MATRIX_URL_REQUEST_FAILED_MUS = {eta: "", matrixUrl: URL_DATA, message: "resolved bundles in request do not match bundles available in matrix service", requestId: "86ecf86d-df97-4b37-af6f-7f25d78d404b", species: SPECIES_MUS, status: MatrixUrlRequestStatus.FAILED};
    const MATRIX_URL_REQUEST_IN_PROGRESS_HOMO = {eta: "", matrixUrl: undefined, message: "Job started.", requestId: "aace1b45-f7e6-4a86-b80e-17cfd62bcb00", species: SPECIES_HOMO, status: MatrixUrlRequestStatus.IN_PROGRESS};
    const MATRIX_URL_REQUEST_IN_PROGRESS_MUS = {eta: "", matrixUrl: URL_DATA_NULL, message: "", requestId: "23d520f5-b50a-4407-90d7-1dc3500601cb", species: SPECIES_MUS, status: MatrixUrlRequestStatus.IN_PROGRESS};
    const MATRIX_URL_REQUEST_MANIFEST_IN_PROGRESS = {status: MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS};

    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA = new Map([[SPECIES_HOMO, MATRIX_URL_REQUEST_COMPLETED_HOMO],[SPECIES_MUS, MATRIX_URL_REQUEST_COMPLETED_MUS]]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_NULL_DATA = new Map([[SPECIES_HOMO, MATRIX_URL_REQUEST_COMPLETED_HOMO_NULL_DATA],[SPECIES_MUS, MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA]]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA = new Map([[SPECIES_HOMO, MATRIX_URL_REQUEST_COMPLETED_HOMO],[SPECIES_MUS, MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA]]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA = new Map([[SPECIES_HOMO, MATRIX_URL_REQUEST_FAILED_HOMO],[SPECIES_MUS, MATRIX_URL_REQUEST_FAILED_MUS]]);
    const MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS = new Map([[SPECIES_HOMO, MATRIX_URL_REQUEST_IN_PROGRESS_HOMO], [SPECIES_MUS, MATRIX_URL_REQUEST_IN_PROGRESS_MUS]]);
    const MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_COMPLETED_SINGLE_DATA = new Map([[SPECIES_HOMO, MATRIX_URL_REQUEST_COMPLETED_HOMO]]);
    const MATRIX_URL_REQUEST_BY_SPECIES_MANIFEST_IN_PROGRESS = new Map([[undefined, MATRIX_URL_REQUEST_MANIFEST_IN_PROGRESS]]);
    const MATRIX_URL_REQUEST_BY_SPECIES_NOT_STARTED = new Map();

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
                        "get", "head", "post"
                    ])
                }, {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "requestMatrixFileManifestUrl"
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

        expect(getDEByClassName(CLASSNAME_MATRIX)).not.toEqual(null);
    });

    /**
     * Confirm get file formats return a sorted set of possible file formats.
     */
    it("should get file formats return a sorted set of possible file formats", () => {

        // Confirm a sorted set of possible formats is returned
        const getFileFormats = component.getFileFormats(["mtx","loom","zarr","csv"]);
        expect(getFileFormats).toEqual(["csv", "loom", "mtx"]);
    });

    /**
     * Confirm is display multiple matrix url requests return false when matrix URL request for single species.
     */
    it("should is display multiple matrix url requests return false when matrix URL request for single species", () => {

        // Confirm returns false when matrix url request for single species
        const isDisplayMultipleMatrixUrlRequests = component.isDisplayMultipleMatrixUrlRequests([MATRIX_URL_REQUEST_COMPLETED_HOMO]);
        expect(isDisplayMultipleMatrixUrlRequests).toEqual(false);
    });

    /**
     * Confirm is display multiple matrix url requests return false when matrix URL request for multiple species and single species has data.
     */
    it("should is display multiple matrix url requests return false when matrix URL request for multiple species and single species has data", () => {

        // Confirm returns false when matrix url request for multiple species and single species has data
        const isDisplayMultipleMatrixUrlRequests = component.isDisplayMultipleMatrixUrlRequests([MATRIX_URL_REQUEST_COMPLETED_HOMO, MATRIX_URL_REQUEST_COMPLETED_MUS_NULL_DATA]);
        expect(isDisplayMultipleMatrixUrlRequests).toEqual(false);
    });

    /**
     * Confirm is display multiple matrix url requests return true when matrix URL request for multiple species and multiple species has data.
     */
    it("should is display multiple matrix url requests return true when matrix URL request for multiple species and multiple species has data", () => {

        // Confirm returns true when matrix url request for multiple species and multiple species has data
        const isDisplayMultipleMatrixUrlRequests = component.isDisplayMultipleMatrixUrlRequests([MATRIX_URL_REQUEST_COMPLETED_HOMO, MATRIX_URL_REQUEST_COMPLETED_MUS]);
        expect(isDisplayMultipleMatrixUrlRequests).toEqual(true);
    });

    /**
     * Confirm is matrix url request status in progress return true when matrix url request status is in progress.
     */
    it(`should is matrix url request status in progress return true when matrix url request status is "IN_PROGRESS"`, () => {

        // Confirm is matrix url request status in progress returns true, when matrix url is in progress
        const isMatrixUrlRequestStatusInProgress = component.isMatrixUrlRequestStatusInProgress(MatrixUrlRequestStatus.IN_PROGRESS);
        expect(isMatrixUrlRequestStatusInProgress).toEqual(true);
    });

    /**
     * Confirm is matrix url request status manifest in progress return true when matrix url request status is manifest in progress.
     */
    it(`should is matrix url request status manifest in progress return true when matrix url request status is "MANIFEST_IN_PROGRESS"`, () => {

        // Confirm is matrix url request status manifest in progress returns true, when matrix url is manifest in progress
        const isMatrixUrlRequestStatusManifestInProgress = component.isMatrixUrlRequestStatusManifestInProgress(MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS);
        expect(isMatrixUrlRequestStatusManifestInProgress).toEqual(true);
    });

    /**
     * Confirm is matrix url request status not started return true when matrix url request status is not started.
     */
    it(`should is matrix url request status not started return true when matrix url request status is "NOT_STARTED"`, () => {

        // Confirm is matrix url request status not started returns true, when matrix url is not started
        const isMatrixUrlRequestStatusNotStarted = component.isMatrixUrlRequestStatusNotStarted(MatrixUrlRequestStatus.NOT_STARTED);
        expect(isMatrixUrlRequestStatusNotStarted).toEqual(true);
    });

    /**
     * Confirm store dispatch is called when on matrix url requested.
     */
    it("should store dispatch is called when on matrix url requested", () => {

        // Confirm store dispatch is called
        component.onMatrixUrlRequested(MatrixFormat.loom);
        expect(testStore.dispatch).toHaveBeenCalledWith(new FetchMatrixUrlRequestAction(MatrixFormat.loom, component["ngDestroy$"]));
    });

    /**
     * Confirm store dispatch to be called with clear matrix partial query match action when ng on destroy requested.
     */
    it("should store dispatch to be called with clear matrix partial query match action when ng on destroy requested", () => {

        // Confirm store dispatch is called
        component.ngOnDestroy();
        expect(testStore.dispatch).toHaveBeenCalledWith(new ClearMatrixPartialQueryMatchAction());
    });

    /**
     * Confirm store dispatch to be called with cancel fetch matrix url request action when ng on destroy requested.
     */
    it("should store dispatch to be called with cancel fetch matrix url request action when ng on destroy requested", () => {

        // Confirm store dispatch is called
        component.ngOnDestroy();
        expect(testStore.dispatch).toHaveBeenCalledWith(new CancelFetchMatrixUrlRequestAction());
    });

    /**
     * Confirm ng on destroy emits true.
     */
    xit("should ng on destroy emit true", () => {

        // TODO - pending test
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
     * Confirm component <hca-get-data-panel> is displayed with input property "loading" is true when matrix url request status is manifest in progress.
     */
    it(`should display component hca get data panel with input property "loading" is true when matrix url request status is "MANIFEST_IN_PROGRESS"`, () => {

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

        // Confirm input property "loading" is true
        expect(getComponentInputPropertyValue(getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toEqual(true);
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
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed when matrix url request status is in progress.
     */
    it(`should display component hca-get-data-panel when matrix url request status is "IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_HCA_GET_DATA_PANEL)).toBe(true);
    });

    /**
     * Confirm component <hca-get-data-panel> is displayed with input property "loading" is true when matrix url request status is in progress.
     */
    it(`should display component hca get data panel with input property "loading" is true when matrix url request status is "IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm input property "loading" is true
        expect(getComponentInputPropertyValue(getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toEqual(true);
    });

    /**
     * Confirm component <matrix-url-request-completed> is not displayed when matrix url request status is in progress.
     */
    it(`should not display component matrix url request completed when matrix url request status is "IN_PROGRESS"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_IN_PROGRESS), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(false);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is completed.
     */
    it(`should not display component matrix url request form when matrix url request status is "COMPLETED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed with input property "loading" is true when matrix url request status is completed.
     */
    it(`should not display component hca get data panel with input property "loading" is true when matrix url request status is "COMPLETED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed with input property "loading"
        expect(getComponentInputPropertyValue(getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toBeUndefined();
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed when matrix url request status is completed.
     */
    it(`should display component matrix url request completed when matrix url request status is "COMPLETED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(true);
    });

    /**
     * Confirm component <matrix-url-request-form> is not displayed when matrix url request status is failed.
     */
    it(`should not display component matrix url request form when matrix url request status is "FAILED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_FORM)).toBe(false);
    });

    /**
     * Confirm component <hca-get-data-panel> is not displayed with input property "loading" is true when matrix url request status is failed.
     */
    it(`should not display component hca get data panel with input property "loading" is true when matrix url request status is "FAILED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed with input property "loading"
        expect(getComponentInputPropertyValue(getDEByClassName(COMPONENT_NAME_HCA_GET_DATA_PANEL), COMPONENT_INPUT_PROPERTY_LOADING)).toBeUndefined();
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed when multiple matrix url request status is failed.
     */
    it(`should display component matrix url request completed when matrix url request status is "FAILED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_FAILED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed
        expect(isComponentDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED)).toBe(true);
    });

    /**
     * Confirm paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." is displayed when multiple matrix url requests are completed with data from multiple species.
     */
    it(`should display paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." when matrix url request status is "COMPLETED" with data from multiple species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm paragraph is displayed
        expect(getComponentsDisplayed("p")[0].nativeElement.innerHTML).toBe(PARAGRAPH_MULTIPLE_MATRIX_URL);
    });

    /**
     * Confirm paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." is not displayed when multiple matrix url requests are completed with data from single species.
     */
    it(`should not display paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." when matrix url request status is "COMPLETED" with data from single species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const paragraph = getComponentsDisplayed("p")[0];

        // Confirm paragraph is not displayed
        expect(getDEInnerHtml(paragraph)).toBeUndefined();
    });

    /**
     * Confirm paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." is not displayed when multiple matrix url requests are completed with data from null species.
     */
    it(`should not display paragraph "Your request contains data from multiple species. Data from each species is returned in its own expression matrix." when matrix url request status is "COMPLETED" with data from null species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_NULL_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const paragraph = getComponentsDisplayed("p")[0];

        // Confirm paragraph is not displayed
        expect(getDEInnerHtml(paragraph)).toBeUndefined();
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed twice when multiple matrix url request status is completed.
     */
    it(`should display component matrix url request completed twice when multiple matrix url request status is "COMPLETED".`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is displayed twice
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(2);
    });

    /**
     * Confirm component <matrix-url-request-completed> is displayed once when single matrix url request status is completed.
     */
    it(`should display component matrix url request completed once when single matrix url request status is "COMPLETED"`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_SINGLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        // Confirm component is not displayed
        expect(getComponentsDisplayed(COMPONENT_NAME_MATRIX_URL_REQUEST_COMPLETED).length).toEqual(1);
    });

    /**
     * Confirm species label "Homo sapiens" is displayed when multiple matrix url requests are completed with data from multiple species.
     */
    it(`should display species label "Homo sapiens" when multiple matrix url request status is "COMPLETED" with data from multiple species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const speciesLabel = getDEsByClassName(CLASSNAME_FONTSIZE_M_SEMI_BOLD);

        // Confirm label is displayed
        expect(getDEInnerHtml(speciesLabel[0])).toEqual(SPECIES_HOMO);
    });

    /**
     * Confirm species label "Mus musculus" is displayed when multiple matrix url requests are completed with data from multiple species.
     */
    it(`should display species label "Mus musculus" when multiple matrix url request status is "COMPLETED" with data from multiple species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_MULTIPLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const speciesLabel = getDEsByClassName(CLASSNAME_FONTSIZE_M_SEMI_BOLD);

        // Confirm label is displayed
        expect(getDEInnerHtml(speciesLabel[1])).toEqual(SPECIES_MUS);
    });

    /**
     * Confirm no species label is displayed when multiple matrix url requests are completed with data from single species.
     */
    it(`should display no species label when multiple matrix url request status is "COMPLETED" with data from single species`, () => {

        // Set up initial component state
        testStore.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // fileSummary
            of([]), // selectedSearchTerms
            of(["loom", "csv", "mtx"]), // matrixFileFormats
            of(MATRIX_URL_REQUEST_BY_MULTIPLE_SPECIES_COMPLETED_SINGLE_DATA), // matrixUrlRequestsBySpecies
            of(true), // matrixPartialQueryMatch
        );

        fixture.detectChanges();

        const speciesLabel = getDEsByClassName(CLASSNAME_FONTSIZE_M_SEMI_BOLD);

        // Confirm no label is displayed
        expect(speciesLabel).toEqual([]);
    });

    /**
     * Returns the debug element specified by class name ".matrix".
     *
     * @returns {DebugElement[]}
     */
    function getClassNameMatrixChildrenComponents(): DebugElement[] {

        const parentComponentElement = getDEByClassName(CLASSNAME_MATRIX);
        return parentComponentElement.children;
    }

    /**
     * Returns all debug element displayed for the specified component name.
     *
     * @param {string} componentName
     * @returns {DebugElement[]}
     */
    function getComponentsDisplayed(componentName: string): DebugElement[] {

        const childrenComponentElements = getClassNameMatrixChildrenComponents();

        if ( childrenComponentElements.length === 0 ) {

            return;
        }

        return childrenComponentElements.filter(childrenEl => childrenEl.name === componentName);
    }

    /**
     * Returns the component input property value specified by input property.
     *
     * @param {DebugElement} component
     * @param {string} inputProperty
     * @returns {any}
     */
    function getComponentInputPropertyValue(component: DebugElement, inputProperty: string): any {

        if ( !component ) {
            return;
        }

        return component.componentInstance[inputProperty];
    }

    /**
     * Returns debug element for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getDEByClassName(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }

    /**
     * Returns debug elements for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement[]}
     */
    function getDEsByClassName(className: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(className));
    }

    /**
     * Returns the inner html of a debug element.
     *
     * @param {DebugElement} debugElement
     * @returns {any}
     */
    function getDEInnerHtml(debugElement: DebugElement): any {

        if ( !debugElement ) {
            return;
        }

        return debugElement.nativeElement.innerHTML;
    }

    /**
     * Returns true if component is displayed.
     *
     * @param {string} componentName
     * @returns {boolean}
     */
    function isComponentDisplayed(componentName: string): boolean {

        const childrenComponentElements = getClassNameMatrixChildrenComponents();

        if ( childrenComponentElements.length === 0 ) {

            return false;
        }

        return childrenComponentElements.some(childrenEl => childrenEl.name === componentName);
    }
});
