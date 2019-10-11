/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAGetDataPanel.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { HCAGetDataPanelComponent } from "./hca-get-data-panel.component";

// App components

describe("HCAGetDataPanelComponent", () => {

    let component: HCAGetDataPanelComponent;
    let fixture: ComponentFixture<HCAGetDataPanelComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataPanelComponent
            ],
            imports: [
            ],
            providers: [
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetDataPanelComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm panel has class "loading" when loading input is set to true.
     */
    it(`should have class "loading" when downloading set to true`, () => {

        // Set downloading to true on the component
        component.loading = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm downloading class is added to the root div - first execute a query to find the element with the
        // class "loading" and then confirm the element was found.
        const loadingDebugEl = fixture.debugElement.query(By.css(".loading"));
        expect(loadingDebugEl).toBeTruthy();
    });

    /**
     * Confirm panel has class "error" when downloadError is set to true.
     */
    it(`should have class "error" when downloadError set to true`, () => {

        // Set downloadError to true on the component
        component.downloadError = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm error class is added to the root div - first execute a query to find the element with the
        // class "error" and then confirm the element was found.
        const errorDebugEl = fixture.debugElement.query(By.css(".error"));
        expect(errorDebugEl).toBeTruthy();
    });
});
