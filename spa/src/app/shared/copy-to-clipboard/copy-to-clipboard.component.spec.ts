/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for CopyToClipboard.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { CopyToClipboardComponent } from "./copy-to-clipboard.component";

describe("CopyToClipboardComponent", () => {

    let component: CopyToClipboardComponent;
    let fixture: ComponentFixture<CopyToClipboardComponent>;

    // Test values
    const TEST_VALUE_COPY_TO_CLIPBOARD_LABEL = "link";

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
     * Confirm get copied text method returns "Link copied".
     */
    it(`should get copied text method return "Link copied"`, () => {

        // Set up initial component state
        component.copyToClipboardLabel = TEST_VALUE_COPY_TO_CLIPBOARD_LABEL;

        expect(component.getCopiedText()).toEqual("Link copied");
    });

    /**
     * Confirm get copy text method returns "Copy link".
     */
    it(`should get copy text method return "Copy link"`, () => {

        // Set up initial component state
        component.copyToClipboardLabel = TEST_VALUE_COPY_TO_CLIPBOARD_LABEL;

        expect(component.getCopyText()).toEqual("Copy link");
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
     * Confirm "Copy link" is displayed when copied is false.
     */
    it(`displays "Copy link" when copied is false`, () => {

        // Set up initial component state
        component.copyToClipboardLabel = TEST_VALUE_COPY_TO_CLIPBOARD_LABEL;

        // Set up initial component state
        component.copied.next(false);

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm text is displayed
        const copyInstructionDE = getDEBySelector(".fontsize-xxs");
        expect(copyInstructionDE.nativeElement.textContent).toEqual("Copy link");
    });

    /**
     * Confirm "Linked copied" is displayed when copied is true.
     */
    it(`displays "Link copied" when copied is true`, () => {

        // Set up initial component state
        component.copyToClipboardLabel = TEST_VALUE_COPY_TO_CLIPBOARD_LABEL;

        // Set up initial component state
        component.copied.next(true);

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        // Confirm text is displayed
        const copyInstructionDE = getDEBySelector(".fontsize-xxs");
        expect(copyInstructionDE.nativeElement.textContent).toEqual("Link copied");
    });

    /**
     * Confirm method copy is called on click of copy to clipboard.
     */
    it("should method copy is called on click of copy to clipboard", () => {

        const onCopy = spyOn(component, "onCopy");
        const requestCopyToClipboard = getDEBySelector(".clipboard-copy");

        // Execute click on copy to clipboard
        requestCopyToClipboard.nativeElement.click();

        expect(onCopy).toHaveBeenCalled();
    });

    /**
     * Confirm copied is true on click of copy to clipboard.
     */
    it("should copied is true on click of copy to clipboard", () => {

        const requestCopyToClipboard = getDEBySelector(".clipboard-copy");

        // Execute click on copy to clipboard
        requestCopyToClipboard.nativeElement.click();

        expect(component.copied.value).toEqual(true);
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
