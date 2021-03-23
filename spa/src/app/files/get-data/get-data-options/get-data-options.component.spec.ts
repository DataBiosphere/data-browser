/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for GetDataOptions.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { GetDataViewState } from "../get-data-view-state.model";
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { GetDataOptionsComponent } from "./get-data-options.component";

describe("GetDataOptionsComponent", () => {

    let component: GetDataOptionsComponent;
    let fixture: ComponentFixture<GetDataOptionsComponent>;

    const DOWNLOAD_DISPLAY_ORDER = ["BULK_DOWNLOAD", "MANIFEST", "TERRA"];

    /**
     * Setup before each test.
     */
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                GetDataPanelComponent,
                GetDataOptionsComponent
            ],
            imports: [],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getPortalUrl"])
                },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GetDataOptionsComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm "Bulk Download" is displayed.
     */
    it(`displays "Bulk Download"`, () => {

        fixture.detectChanges();

        expect(isPanelHeaderDisplayed(`Download Selected Data Using "curl"`)).toEqual(true);
    });

    /**
     * Confirm "Request a File Manifest (for downloading files via the HCA CLI)" is displayed.
     */
    it(`displays "Download a File Manifest with Metadata for the Selected Data"`, () => {

        fixture.detectChanges();

        // Confirm "Request a File Manifest (for downloading files via the HCA CLI)" is displayed
        expect(isPanelHeaderDisplayed("Download a File Manifest with Metadata for the Selected Data")).toEqual(true);
    });

    /**
     * Confirm "Export to Terra" is displayed 
     */
    it(`displays "Export to Terra"`, () => {

        fixture.detectChanges();

        // Confirm "Export to Terra" is displayed
        expect(isPanelHeaderDisplayed("Export to Terra")).toEqual(true);
    });

    /**
     * Confirm emit "BULK_DOWNLOAD" on click of bulk download start button.
     */
    it(`emits "BULK_DOWNLOAD" on click of bulk download start button`, () => {

        fixture.detectChanges();

        let selectedDownload: string;
        component.downloadSelected.subscribe((download: string) => selectedDownload = download);

        const bulkDownloadStartButton = getButtonEl("BULK_DOWNLOAD");

        // Execute click on bulk download start button
        bulkDownloadStartButton.triggerEventHandler("click", null);

        // Confirm emit "BULK_DOWNLOAD"
        expect(selectedDownload).toBe(GetDataViewState.BULK_DOWNLOAD);
    });

    /**
     * Confirm emit "MANIFEST" on click of manifest start button.
     */
    it(`emits "MANIFEST" on click of manifest start button`, () => {

        fixture.detectChanges();

        let selectedDownload: string;
        component.downloadSelected.subscribe((download: string) => selectedDownload = download);

        const manifestStartButton = getButtonEl("MANIFEST");

        // Execute click on manifest start button
        manifestStartButton.triggerEventHandler("click", null);

        // Confirm emit "MANIFEST"
        expect(selectedDownload).toBe(GetDataViewState.MANIFEST);
    });

    /**
     * Confirm emit "TERRA" on click of terra start button.
     */
    it(`emits "TERRA" on click of terra start button`, () => {

        fixture.detectChanges();

        let selectedDownload: string;
        component.downloadSelected.subscribe((download: string) => selectedDownload = download);

        const terraStartButton = getButtonEl("TERRA");

        // Execute click on terra start button
        terraStartButton.triggerEventHandler("click", null);

        // Confirm emit "TERRA"
        expect(selectedDownload).toBe(GetDataViewState.TERRA);
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

        const panelHeaderEls = fixture.debugElement.queryAll(By.css("get-data-panel h4"));

        return panelHeaderEls.some(panelHeader => panelHeader.nativeElement.innerHTML === panelHeaderHeading);
    }

    /**
     * Returns true if panel text is displayed.
     *
     * @param {string} panelText
     * @returns {boolean}
     */
    function isPanelTextDisplayed(panelText: string): boolean {

        const panelTextEls = fixture.debugElement.queryAll(By.css("get-data-panel p"));

        return panelTextEls.map(panelTextEl => panelTextEl.nativeElement.innerHTML).some(panelTextHTML => panelTextHTML === panelText);
    }
});
