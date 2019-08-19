/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for CopyToClipboard.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { CopyToClipboardComponent } from "./copy-to-clipboard.component";

// App components

describe("CopyToClipboardComponent", () => {

    let component: CopyToClipboardComponent;
    let fixture: ComponentFixture<CopyToClipboardComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent
            ],
            imports: [
                ClipboardModule
            ],
            providers: [
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CopyToClipboardComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm copy to clipboard link is displayed.
     */
    it(`should display copy to clipboard link`, () => {

        // Set up initial component state
        component.copyToClipboardLink = "https://copy-to-clipboard-link.com";

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm copy to clipboard link text is displayed - first execute a query to find the element with the
        // class "link" and then confirm the content is displayed.
        const copyToClipboardEl = fixture.debugElement.query(By.css(".link"));
        expect(copyToClipboardEl.nativeElement.textContent).toEqual(component.copyToClipboardLink);
    });

    /**
     * Confirm copy to clipboard link is added to href attribute.
     */
    it(`should add clipboard link to href`, () => {

        // Set up initial component state
        component.copyToClipboardLink = "https://copy-to-clipboard-link.com";

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm copy to clipboard link text is added to href attribute - first execute a query to find the element with the
        // class "link" and then confirm the copy to clipboard link is added to the href attribute.
        const copyToClipboardEl = fixture.debugElement.query(By.css(".link"));
        expect(copyToClipboardEl.nativeElement.getAttribute("href")).toEqual(component.copyToClipboardLink);
    });

    /**
     * Confirm copy to clipboard has attribute target "_blank" when target blank input is set to true.
     */
    fit(`should have attribute target "_blank" when target blank set to true`, () => {

        // Set up initial component state
        component.targetBlank = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm "_blank" is added to target attribute - first execute a query to find the element with the
        // class "link" and then confirm the target attribute is equal to "_blank".
        const copyToClipboardEl = fixture.debugElement.query(By.css(".link"));
        expect(copyToClipboardEl.nativeElement.getAttribute("target")).toEqual("_blank");
    });

    /**
     * Confirm note is displayed when note is defined.
     */
    it(`should display note when note is defined`, () => {

        // Set up initial component state
        component.note = "This link expires in 24 hours.";

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm note text is displayed - first execute a query to find the element with the
        // class "clipboard-copy" and then confirm the note is displayed.
        const noteEl = fixture.debugElement.query(By.css(".clipboard-copy"));
        expect(noteEl.nativeElement.querySelector("span").textContent).toContain(component.note);
    });

    /**
     * Confirm note is not displayed when note is undefined.
     */
    it(`should not display note when note is undefined`, () => {

        // Set up initial component state
        component.note;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm note text is not displayed when note is undefined - first execute a query to find the element with the
        // class "clipboard-copy" and then confirm note is not displayed.
        const noteEl = fixture.debugElement.query(By.css(".clipboard-copy"));
        expect(noteEl.nativeElement.querySelector("span").textContent).toEqual("Copy link to clipboard. ");
    });
});
