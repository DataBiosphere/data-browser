/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for StatusPanelComponent.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { StatusPanelComponent } from "./status-panel.component";

// App components

describe("StatusPanelComponent", () => {
    let component: StatusPanelComponent;
    let fixture: ComponentFixture<StatusPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StatusPanelComponent],
            imports: [],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(StatusPanelComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {
        expect(component).toBeTruthy();
    });

    /**
     * Confirm panel has class "status-panel".
     */
    it(`should have class "status-panel" when loading set to true`, () => {
        // Confirm downloading class is added to the root div - first execute a query to find the element with the
        // class "loading" and then confirm the element was found.
        const loadingDebugEl = fixture.debugElement.query(
            By.css(".status-panel")
        );
        expect(loadingDebugEl).toBeTruthy();
    });

    /**
     * Confirm panel has class "loading" when loading input is set to true.
     */
    it(`should have class "loading" when loading set to true`, () => {
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
        component.error = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm error class is added to the root div - first execute a query to find the element with the
        // class "error" and then confirm the element was found.
        const errorDebugEl = fixture.debugElement.query(By.css(".error"));
        expect(errorDebugEl).toBeTruthy();
    });
});
