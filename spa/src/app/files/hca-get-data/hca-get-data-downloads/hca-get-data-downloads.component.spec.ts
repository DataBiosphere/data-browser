/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAGetDataDownloads.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { WarningComponent } from "../../../shared/warning/warning.component";
import { WarningContentComponent } from "../../../shared/warning/warning-content.component";
import { DownloadViewState } from "../download-view-state.model";
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { HCAGetDataDownloadsComponent } from "./hca-get-data-downloads.component";

describe("HCAGetDataDownloadsComponent", () => {

    let component: HCAGetDataDownloadsComponent;
    let fixture: ComponentFixture<HCAGetDataDownloadsComponent>;

    const DOWNLOAD_DISPLAY_ORDER = ["MATRIX", "MANIFEST", "TERRA"];

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataPanelComponent,
                HCAGetDataDownloadsComponent,
                WarningComponent,
                WarningContentComponent
            ],
            imports: [],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getPortalURL"])
                },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetDataDownloadsComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm is matrix supported loading returns false when matrix is supported.
     */
    it("should is matrix supported loading return false when matrix is supported", () => {

        // Confirm is matrix supported loading returns false, when matrix is supported - first execute the
        // method and then confirm the returned value is false.
        const matrixSupportedLoading = component.isMatrixSupportedLoading(true);
        expect(matrixSupportedLoading).toEqual(false);
    });

    /**
     * Confirm is matrix supported loading returns false when matrix is not supported.
     */
    it("should is matrix supported loading return false when matrix is not supported", () => {

        // Confirm is matrix supported loading returns false, when matrix is not supported - first execute the
        // method and then confirm the returned value is false.
        const matrixSupportedLoading = component.isMatrixSupportedLoading(false);
        expect(matrixSupportedLoading).toEqual(false);
    });

    /**
     * Confirm is matrix supported loading returns true when matrix is not yet determined.
     */
    it("should is matrix supported loading return true when matrix is not yet determined", () => {

        // Confirm is matrix supported loading returns true, when matrix is not yet determined - first execute the
        // method and then confirm the returned value is true.
        const matrixSupportedLoading = component.isMatrixSupportedLoading(null);
        expect(matrixSupportedLoading).toEqual(true);
    });

    /**
     * Confirm "Create Concatenated Expression Matrix" is displayed.
     */
    it(`should display "Create Concatenated Expression Matrix"`, () => {

        // Confirm "Create Concatenated Expression Matrix" is displayed
        expect(isPanelHeaderDisplayed("Create Concatenated Expression Matrix")).toEqual(true);
    });

    /**
     * Confirm "Request an expression matrix for the selected data from the HCA Matrix service." is displayed when matrix enabled is true.
     */
    it(`should display "Request an expression matrix for the selected data from the HCA Matrix service." when matrix enabled is true`, () => {

        component.matrixEnabled = true;
        fixture.detectChanges();

        // Confirm "Request an expression matrix for the selected data from the HCA Matrix service." is displayed
        expect(isPanelTextDisplayed("Request an expression matrix for the selected data from the HCA Matrix service.")).toEqual(true);
    });

    /**
     * Confirm <warning> is not displayed when matrix enabled is true.
     */
    it("should not display component warning when matrix enabled is true", () => {

        component.matrixEnabled = true;
        fixture.detectChanges();

        const warningEl = fixture.debugElement.nativeElement.querySelector("warning");

        // Confirm <warning> is not displayed
        expect(warningEl).toBe(null);
    });

    /**
     * Confirm matrix start button is not disabled when matrix enabled is true.
     */
    it("should matrix start button is not disabled when matrix enabled is true", () => {

        component.matrixEnabled = true;
        fixture.detectChanges();

        const buttonEl = getButtonEl("MATRIX");
        const buttonDisabled = buttonEl.properties.disabled;

        // Confirm start button is not disabled
        expect(buttonDisabled).toBe(false);
    });

    /**
     * Confirm "Request an expression matrix for the selected data from the HCA Matrix service." is not displayed when matrix enabled is false.
     */
    it(`should not display "Request an expression matrix for the selected data from the HCA Matrix service." when matrix enabled is false`, () => {

        component.matrixEnabled = false;
        fixture.detectChanges();

        // Confirm "Request an expression matrix for the selected data from the HCA Matrix service." is not displayed
        expect(isPanelTextDisplayed("Request an expression matrix for the selected data from the HCA Matrix service.")).not.toEqual(true);
    });

    /**
     * Confirm <warning> is displayed when matrix enabled is false.
     */
    it("should display component warning when matrix enabled is false", () => {

        component.matrixEnabled = false;
        fixture.detectChanges();

        const warningEl = fixture.debugElement.nativeElement.querySelector("warning");

        // Confirm <warning> is displayed
        expect(warningEl).not.toBe(null);
    });

    /**
     * Confirm matrix start button is disabled when matrix enabled is false.
     */
    it("should matrix start button is not disabled when matrix enabled is false", () => {

        component.matrixEnabled = false;
        fixture.detectChanges();

        const buttonEl = getButtonEl("MATRIX");
        const buttonDisabled = buttonEl.properties.disabled;

        // Confirm start button is not disabled
        expect(buttonDisabled).toBe(true);
    });

    /**
     * Confirm "Request a File Manifest (for downloading files via the HCA CLI)" is displayed.
     */
    it(`should display "Request a File Manifest (for downloading files via the HCA CLI)"`, () => {

        // Confirm "Request a File Manifest (for downloading files via the HCA CLI)" is displayed
        expect(isPanelHeaderDisplayed("Request a File Manifest (for downloading files via the HCA CLI)")).toEqual(true);
    });

    /**
     * Confirm "Export to Terra" is displayed 
     */
    it(`should display "Export to Terra"`, () => {

        fixture.detectChanges();

        // Confirm "Export to Terra" is displayed
        expect(isPanelHeaderDisplayed("Export to Terra (Beta)")).toEqual(true);
    });

    /**
     * Confirm emit "MATRIX" on click of matrix start button.
     */
    it(`should emit "MATRIX" on click of matrix start button`, () => {

        component.matrixEnabled = true;
        fixture.detectChanges();

        let selectedDownload: string;
        component.downloadSelected.subscribe((download: string) => selectedDownload = download);

        const matrixStartButton = getButtonEl("MATRIX");

        // Execute click on matrix start button
        matrixStartButton.triggerEventHandler("click", null);

        // Confirm emit "MATRIX"
        expect(selectedDownload).toBe(DownloadViewState.MATRIX);
    });

    /**
     * Confirm emit "MANIFEST" on click of manifest start button.
     */
    it(`should emit "MANIFEST" on click of manifest start button`, () => {

        component.matrixEnabled = true;
        fixture.detectChanges();

        let selectedDownload: string;
        component.downloadSelected.subscribe((download: string) => selectedDownload = download);

        const manifestStartButton = getButtonEl("MANIFEST");

        // Execute click on manifest start button
        manifestStartButton.triggerEventHandler("click", null);

        // Confirm emit "MANIFEST"
        expect(selectedDownload).toBe(DownloadViewState.MANIFEST);
    });

    /**
     * Confirm emit "TERRA" on click of terra start button.
     */
    it(`should emit "TERRA" on click of terra start button`, () => {

        component.matrixEnabled = true;
        fixture.detectChanges();

        let selectedDownload: string;
        component.downloadSelected.subscribe((download: string) => selectedDownload = download);

        const terraStartButton = getButtonEl("TERRA");

        // Execute click on terra start button
        terraStartButton.triggerEventHandler("click", null);

        // Confirm emit "TERRA"
        expect(selectedDownload).toBe(DownloadViewState.TERRA);
    });

    /**
     * Returns button element for specified panel download type.
     *
     * @param {string} panelDownloadType
     * @returns {DebugElement}
     */
    function getButtonEl(panelDownloadType: string): DebugElement {

        const buttonEls = fixture.debugElement.queryAll(By.css("button"));
        const buttonIndex = DOWNLOAD_DISPLAY_ORDER.indexOf(panelDownloadType);

        return buttonEls[buttonIndex];
    }

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

    /**
     * Returns true if panel text is displayed.
     *
     * @param {string} panelText
     * @returns {boolean}
     */
    function isPanelTextDisplayed(panelText: string): boolean {

        const panelTextEls = fixture.debugElement.queryAll(By.css("hca-get-data-panel p"));

        return panelTextEls.map(panelTextEl => panelTextEl.nativeElement.innerHTML).some(panelTextHTML => panelTextHTML === panelText);
    }
});
