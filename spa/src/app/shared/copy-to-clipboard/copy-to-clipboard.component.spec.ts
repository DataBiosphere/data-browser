/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for CopyToClipboard.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { CopyToClipboardComponent } from "./copy-to-clipboard.component";

describe("CopyToClipboardComponent", () => {

    let component: CopyToClipboardComponent;
    let fixture: ComponentFixture<CopyToClipboardComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule
            ],
            providers: []
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
     * Confirm copied method returns true when copied is true.
     */
    it("should copied method return true when copied is true", () => {

        expect(component.isCopied(true)).toEqual(true);
    });

    /**
     * Confirm copied method returns false when copied is false.
     */
    it("should copied method return false when copied is false", () => {

        expect(component.isCopied(false)).toEqual(false);
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
        const copyToClipboardEl = getElementByClassName(".link");
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
        const copyToClipboardEl = getElementByClassName(".link");
        expect(copyToClipboardEl.nativeElement.getAttribute("href")).toEqual(component.copyToClipboardLink);
    });

    /**
     * Confirm copy to clipboard has attribute target "_blank" when target blank input is set to true.
     */
    it(`should have attribute target "_blank" when target blank set to true`, () => {

        // Set up initial component state
        component.targetBlank = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm "_blank" is added to target attribute - first execute a query to find the element with the
        // class "link" and then confirm the target attribute is equal to "_blank".
        const copyToClipboardEl = getElementByClassName(".link");
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
        const noteEl = getElementByClassName(".clipboard-copy");
        expect(noteEl.nativeElement.querySelector("span").textContent).toContain(component.note);
    });

    /**
     * Confirm note is not displayed when note is undefined.
     */
    it(`should not display note when note is undefined`, () => {

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm note text is not displayed when note is undefined - first execute a query to find the element with the
        // class "clipboard-copy" and then confirm note is not displayed.
        const noteEl = getElementByClassName(".clipboard-copy");
        expect(noteEl.nativeElement.querySelector("span").textContent).toEqual("Copy link ");
    });

    /**
     * Confirm "Copy link " is displayed when copied is false.
     */
    it(`should display "Copy link " when copied is false`, () => {

        // Set up initial component state
        component.copied.next(false);

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm text is displayed - first execute a query to find the element with the
        // class "fontsize-xxs" and then confirm the content is displayed.
        const copyInstructionEl = getElementByClassName(".fontsize-xxs");
        expect(copyInstructionEl.nativeElement.textContent).toEqual("Copy link ");
    });

    /**
     * Confirm "Linked copied." is displayed when copied is true.
     */
    it(`should display "Copied!" when copied is true`, () => {

        // Set up initial component state
        component.copied.next(true);

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm text is displayed - first execute a query to find the element with the
        // class "fontsize-xxs" and then confirm the content is displayed.
        const copyInstructionEl = getElementByClassName(".fontsize-xxs");
        expect(copyInstructionEl.nativeElement.textContent).toEqual("Link copied.");
    });

    /**
     * Confirm method copy is called on click of copy to clipboard.
     */
    it("should method copy is called on click of copy to clipboard", () => {

        const onCopy = spyOn(component, "onCopy");
        const requestCopyToClipboard = getElementByClassName(".clipboard-copy");

        // Execute click on copy to clipboard
        requestCopyToClipboard.nativeElement.click();

        expect(onCopy).toHaveBeenCalled();
    });

    /**
     * Confirm copied is true on click of copy to clipboard.
     */
    it("should copied is true on click of copy to clipboard", () => {

        const requestCopyToClipboard = getElementByClassName(".clipboard-copy");

        // Execute click on copy to clipboard
        requestCopyToClipboard.nativeElement.click();

        expect(component.copied.value).toEqual(true);
    });

    /**
     * Returns element for the specified class name.
     *
     * @param {string} className
     * @returns {DebugElement}
     */
    function getElementByClassName(className: string): DebugElement {

        return fixture.debugElement.query(By.css(className));
    }
});
