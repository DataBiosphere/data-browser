/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for FileDownloadLink.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { CopyToClipboardComponent } from "../copy-to-clipboard/copy-to-clipboard.component";
import { FileDownloadComponent } from "./file-download.component";

describe("FileDownloadComponent", () => {
    let component: FileDownloadComponent;
    let fixture: ComponentFixture<FileDownloadComponent>;

    // Input property
    const INPUT_PROPERTY_COPY_TO_CLIPBOARD_LINK = "copyToClipboardLink";

    // Selectors
    const SELECTOR_COMPONENT_COPY_TO_CLIPBOARD = "copy-to-clipboard";

    // Test values
    const TEST_VALUE_LABEL_MTX = "mtx";
    const TEST_VALUE_URL = "https://test.com";
    const TEST_FILE_DOWNLOAD = {
        name: TEST_VALUE_LABEL_MTX,
        url: TEST_VALUE_URL,
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CopyToClipboardComponent, FileDownloadComponent],
            imports: [ClipboardModule, MatIconModule],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(FileDownloadComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {
        expect(component).toBeTruthy();
    });

    /**
     * Confirm url is added to href attribute.
     */
    it("should add url to href", () => {
        // Set up initial component state
        component.link = TEST_FILE_DOWNLOAD;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const urlDE = getDEBySelector("a");

        // Confirm url is added to href attribute
        expect(getDEProperty(urlDE, "href")).toEqual(component.link.url);
    });

    /**
     * Confirm file name label is displayed when label is a value.
     */
    it("displays file name label when label is a value", () => {
        // Set up initial component state
        component.link = TEST_FILE_DOWNLOAD;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const labelDE = getDEBySelector("span");

        // Confirm label is displayed
        expect(getDETextContent(labelDE)).toEqual(component.link.name);
    });

    /**
     * Confirm file name label is not displayed when label is empty.
     */
    it("should not display file name label when label is empty", () => {
        // Set up initial component state
        component.link = {
            url: TEST_VALUE_URL,
        };

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const labelDE = getDEBySelector(".fontsize-s span");

        // Confirm label is displayed
        expect(getDETextContent(labelDE)).toBeUndefined();
    });

    /**
     * Confirm component <copy-to-clipboard> is displayed when hide copy to clipboard is false.
     */
    it("displays component copy to clipboard when hide copy to clipboard is false", () => {
        // Set up initial component state
        component.link = TEST_FILE_DOWNLOAD;
        component.hideCopyToClipboard = false;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const copyToClipboardDE = getDEBySelector(
            SELECTOR_COMPONENT_COPY_TO_CLIPBOARD
        );

        // Confirm label is displayed
        expect(copyToClipboardDE).not.toBe(null);
    });

    /**
     * Confirm component <copy-to-clipboard> is not displayed when hide copy to clipboard is true.
     */
    it("should not display component copy to clipboard when hide copy to clipboard is true", () => {
        // Set up initial component state
        component.link = TEST_FILE_DOWNLOAD;
        component.hideCopyToClipboard = true;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const copyToClipboardDE = getDEBySelector(
            SELECTOR_COMPONENT_COPY_TO_CLIPBOARD
        );

        // Confirm label is displayed
        expect(copyToClipboardDE).toBe(null);
    });

    /**
     * Confirm component <copy-to-clipboard> is displayed with input property "copyToClipboardLink" when url is a value.
     */
    it(`displays component copy to clipboard with input property "copyToClipboardLink" when url is a value`, () => {
        // Set up initial component state
        component.link = TEST_FILE_DOWNLOAD;

        fixture.detectChanges();

        const copyToClipboardDE = getDEBySelector(
            SELECTOR_COMPONENT_COPY_TO_CLIPBOARD
        );

        // Confirm input property "copyToClipboardLink" equals input value "url"
        expect(
            getDEInputPropertyValue(
                copyToClipboardDE,
                INPUT_PROPERTY_COPY_TO_CLIPBOARD_LINK
            )
        ).toEqual(component.link.url);
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

    /**
     * Returns the debug element input property value specified by input property.
     *
     * @param {DebugElement} debugEl
     * @param {string} inputProperty
     * @returns {any}
     */
    function getDEInputPropertyValue(
        debugEl: DebugElement,
        inputProperty: string
    ): any {
        if (!debugEl) {
            return;
        }

        return debugEl.componentInstance[inputProperty];
    }

    /**
     * Returns property of specified debug element.
     *
     * @param {debugElement} debugEl
     * @param {string} property
     * @returns {any}
     */
    function getDEProperty(debugEl: DebugElement, property: string): any {
        if (!debugEl) {
            return;
        }

        return debugEl.properties[property];
    }

    /**
     * Returns text content of specified debug element.
     *
     * @param {debugElement} debugEl
     * @returns {string}
     */
    function getDETextContent(debugEl: DebugElement): string {
        if (!debugEl) {
            return;
        }

        return debugEl.nativeElement.textContent;
    }
});
