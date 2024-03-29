/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for GetDataPanel.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { GetDataPanelComponent } from "./get-data-panel.component";

// App components

describe("GetDataPanelComponent", () => {
    let component: GetDataPanelComponent;
    let fixture: ComponentFixture<GetDataPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GetDataPanelComponent],
            imports: [],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(GetDataPanelComponent);
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
