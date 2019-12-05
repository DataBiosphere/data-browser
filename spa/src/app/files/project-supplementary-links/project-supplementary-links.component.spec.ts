/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectSupplementaryLinks.
 * 
 * Pending tests must be updated as component has been moved outside of previous component, into a router outlet (and
 * must therefore set itself up).
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import {
    PROJECT_DETAIL_EMPTY_VALUES,
    PROJECT_DETAIL_MULTIPLE_VALUES,
    PROJECT_DETAIL_SINGLE_VALUES, PROJECT_DETAIL_SPECIFIC_VALUES,
    PROJECT_DETAIL_UNSPECIFIED_VALUES
} from "../project/hca-project-mapper.mock";
import { ProjectSupplementaryLinksComponent } from "./project-supplementary-links.component";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";


describe("ProjectSupplementaryLinksComponent", () => {

    let component: ProjectSupplementaryLinksComponent;
    let fixture: ComponentFixture<ProjectSupplementaryLinksComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Selectors
    const SELECTOR_P_FONTSIZE_XS = "p.fontsize-xs";
    const SELECTOR_COPY_TO_CLIPBOARD = "copy-to-clipboard";

    // Test value
    const TEST_VALUE_LINK_UNSPECIFIED = PROJECT_DETAIL_UNSPECIFIED_VALUES.supplementaryLinks[0];
    const TEST_VALUE_LINK = PROJECT_DETAIL_SINGLE_VALUES.supplementaryLinks[0];
    const TEST_VALUE_LINK_INVALID = PROJECT_DETAIL_SPECIFIC_VALUES.supplementaryLinks[1];

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                ProjectSupplementaryLinksComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule
            ],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    parent: {
                        snapshot: {
                            paramMap: jasmine.createSpyObj("paramMap", ["get"])
                        }
                    }
                }
            }, {
                provide: Store,
                useValue: testStore
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectSupplementaryLinksComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    xit("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm is valid url returns true when link is a url.
     */
    xit("is valid url returns true when link is a url", () => {

        const validUrl = component.isValidUrl(TEST_VALUE_LINK);

        // Confirm valid url returns true
        expect(validUrl).toEqual(true);
    });

    /**
     * Confirm is valid url returns false when link is invalid.
     */
    xit("is valid url returns false when link is invalid", () => {

        const validUrl = component.isValidUrl(TEST_VALUE_LINK_INVALID);

        // Confirm valid url returns false
        expect(validUrl).toEqual(false);
    });

    /**
     * Confirm is valid url returns false when link is "Unspecified".
     */
    xit(`is valid url returns false when link is "Unspecified`, () => {

        const validUrl = component.isValidUrl(TEST_VALUE_LINK_UNSPECIFIED);

        // Confirm valid url returns false
        expect(validUrl).toEqual(false);
    });

    /**
     * Confirm displays supplementary link when single supplementary links.
     */
    xit("displays supplementary link when single supplementary links", () => {

        component.supplementaryLinks = PROJECT_DETAIL_SINGLE_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const suppLinksDEs = getDebugElementsByCSS(SELECTOR_P_FONTSIZE_XS);

        // Confirm displays single supplementary link
        expect(suppLinksDEs.length).toEqual(1);
    });

    /**
     * Confirm displays multiple supplementary links when multiple supplementary links.
     */
    xit("displays multiple supplementary links when multiple supplementary link", () => {

        component.supplementaryLinks = PROJECT_DETAIL_MULTIPLE_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const suppLinksDEs = getDebugElementsByCSS(SELECTOR_P_FONTSIZE_XS);

        // Confirm displays multiple supplementary links
        expect(suppLinksDEs.length).toEqual(2);
    });

    /**
     * Confirm displays no supplementary links when empty supplementary links.
     */
    xit("displays no supplementary links when empty supplementary links", () => {

        component.supplementaryLinks = PROJECT_DETAIL_EMPTY_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const suppLinksDEs = getDebugElementsByCSS(SELECTOR_P_FONTSIZE_XS);

        // Confirm displays no supplementary links
        expect(suppLinksDEs.length).toEqual(0);
    });

    /**
     * Confirm displays no supplementary links when unspecified supplementary links.
     */
    xit("displays no supplementary links when unspecified supplementary links", () => {

        component.supplementaryLinks = PROJECT_DETAIL_UNSPECIFIED_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const suppLinksDEs = getDebugElementsByCSS(SELECTOR_P_FONTSIZE_XS);

        // Confirm displays no supplementary links
        expect(suppLinksDEs.length).toEqual(0);
    });

    /**
     * Confirm displays valid supplementary links when some supplementary links are invalid.
     */
    xit("displays valid supplementary links when some supplementary links are invalid", () => {

        component.supplementaryLinks = PROJECT_DETAIL_SPECIFIC_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const suppLinksDEs = getDebugElementsByCSS(SELECTOR_P_FONTSIZE_XS);

        // Confirm displays only valid supplementary links
        expect(suppLinksDEs.length).toEqual(1);
        expect(getDisplayedLinksInnerText(suppLinksDEs)[1]).toEqual(PROJECT_DETAIL_SPECIFIC_VALUES.supplementaryLinks[0])
    });

    /**
     * Confirm supplementary link is added to href attribute.
     */
    xit("adds supplementary link to href attribute", () => {

        component.supplementaryLinks = PROJECT_DETAIL_SINGLE_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const suppLinksDEs = getDebugElementsByCSS(SELECTOR_P_FONTSIZE_XS);

        // Confirm link is added to href attribute
        expect(getDisplayedLinksHref(suppLinksDEs)[1]).toEqual(PROJECT_DETAIL_SINGLE_VALUES.supplementaryLinks[0])
    });

    /**
     * Confirm component copy-to-clipboard is displayed.
     */
    xit("displays component copy to clipboard", () => {

        component.supplementaryLinks = PROJECT_DETAIL_SINGLE_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const copyToClipboardDE = fixture.debugElement.query(By.css(SELECTOR_COPY_TO_CLIPBOARD));

        // Confirm component is displayed
        expect(copyToClipboardDE).toBeDefined();
    });

    /**
     * Confirm component copy-to-clipboard input value copy to clipboard link is equal to the supplementary link.
     */
    xit("builds component copy to clipboard input value copy to clipboard link with supplementary link", () => {

        component.supplementaryLinks = PROJECT_DETAIL_SINGLE_VALUES.supplementaryLinks;

        fixture.detectChanges();

        const copyToClipboardDE = fixture.debugElement.query(By.css(SELECTOR_COPY_TO_CLIPBOARD));

        // Confirm component input value is equal to link
        expect(copyToClipboardDE).toBeDefined();
        expect(copyToClipboardDE.componentInstance.copyToClipboardLink).toEqual(TEST_VALUE_LINK);
    });

    /**
     * Returns the debug elements for the specified selector.
     *
     * @param {string} selector
     * @returns {DebugElement}
     */
    function getDebugElementsByCSS(selector: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(selector));
    }

    /**
     * Returns all of the displayed supplementary links' debug elements.
     *
     * @param {DebugElement[]} debugEls
     * @returns {DebugElement[]}
     */
    function getDisplayedSupplementaryLinksDEs(debugEls: DebugElement[]): DebugElement[] {

        if ( !debugEls ) {

            return;
        }

        // Flatten all the children of the debug element
        const debugElsChildren = debugEls.map(de => de.children).reduce((a, b) => a.concat(b), []);

        if ( !debugElsChildren ) {

            return;
        }

        // Filter out all instances of copy-to-clipboard component
        return debugElsChildren.filter(child => child.name !== SELECTOR_COPY_TO_CLIPBOARD);

    }

    /**
     * Returns all of the displayed supplementary links' inner text as a string array.
     *
     * @param {DebugElement[]} debugEls
     * @returns {string[]}
     */
    function getDisplayedLinksInnerText(debugEls: DebugElement[]): string[] {

        const linksDEs = getDisplayedSupplementaryLinksDEs(debugEls);

        if ( !linksDEs ) {

            return;
        }

        return linksDEs.map(child => child.nativeElement.innerText);
    }

    /**
     * Returns all of the displayed supplementary links' href.
     *
     * @param {DebugElement[]} debugEls
     * @returns {string[]}
     */
    function getDisplayedLinksHref(debugEls: DebugElement[]): string[] {

        const linksDEs = getDisplayedSupplementaryLinksDEs(debugEls);

        if ( !linksDEs ) {

            return;
        }

        return linksDEs.map(child => child.properties.href);
    }
});
