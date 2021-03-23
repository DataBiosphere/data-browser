/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for DisplayDataLink.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { DataLinkComponent } from "./data-link.component";

describe("DataLinkComponent", () => {

    let component: DataLinkComponent;
    let fixture: ComponentFixture<DataLinkComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                DataLinkComponent
            ],
            imports: [
            ],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(DataLinkComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm link is displayed.
     */
    it(`displays link`, () => {

        // Set up initial component state
        component.link = "https://copy-to-clipboard-link.com";

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm link text is displayed
        const linkDE = getDEBySelector(".link");
        expect(linkDE.nativeElement.textContent).toEqual(component.link);
    });

    /**
     * Confirm link is added to href attribute.
     */
    it(`adds link to href`, () => {

        // Set up initial component state
        component.link = "https://copy-to-clipboard-link.com";

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm link is added to href attribute
        const linkDE = getDEBySelector(".link");
        expect(linkDE.nativeElement.getAttribute("href")).toEqual(component.link);
    });

    /**
     * Confirm link has attribute target "_blank" when target blank input is set to true.
     */
    it(`has attribute target "_blank" when target blank set to true`, () => {

        // Set up initial component state
        component.targetBlank = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm "_blank" is added to target attribute
        const linkDE = getDEBySelector(".link");
        expect(linkDE.nativeElement.getAttribute("target")).toEqual("_blank");
    });

    /**
     * Returns debug element for the specified selector.
     *
     * @param {string} selector
     * @returns {DebugElement}
     */
    function getDEBySelector(selector: string): DebugElement {

        return fixture.debugElement.query(By.css(selector));
    }
});
