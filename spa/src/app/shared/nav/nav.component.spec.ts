/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for Nav.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

// App dependencies
import { NavComponent } from "./nav.component";
import { DebugElement } from "@angular/core";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { MatTooltipModule } from "@angular/material/tooltip";

describe("NavComponent", () => {

    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    // Selectors
    const SELECTOR_NAV = ".nav";

    // Input values
    const INPUT_VALUE_NAV_ITEMS = [
        {
            "display": "Project Information",
            "routerLink": ["/projects", "efb89bf7-5191-4dd2-8fe6-c6cb15f38dce"]
        },
        {
            "display": "External Resources",
            "routerLink": ["/projects", "efb89bf7-5191-4dd2-8fe6-c6cb15f38dce", "external-resources"]
        },
        {
            "display": "Project Metadata",
            "routerLink": ["/projects", "efb89bf7-5191-4dd2-8fe6-c6cb15f38dce", "project-metadata"]
        },
        {
            "display": "Project Matrices",
            "routerLink": ["/projects", "efb89bf7-5191-4dd2-8fe6-c6cb15f38dce", "project-matrices"]
        },
        {
            "display": "Summary Stats",
            "routerLink": ["/projects", "efb89bf7-5191-4dd2-8fe6-c6cb15f38dce", "summary-stats"]
        },
        {
            "display": "Data Citation",
            "routerLink": ["/projects", "efb89bf7-5191-4dd2-8fe6-c6cb15f38dce", "data-citation"]
        },
    ];

    // Test values
    const TEST_VALUE_ROUTER_LINK_PROJECT_INFORMATION = INPUT_VALUE_NAV_ITEMS[0].routerLink.join("/");

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                NavComponent,
                HCATooltipComponent
            ],
            imports: [
                MatTooltipModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm single nav is displayed when single nav value.
     */
    it("displays single nav when single nav value", () => {

        component.navItems = INPUT_VALUE_NAV_ITEMS.slice(0, 1);

        fixture.detectChanges();

        // Confirm correct number of navs are displayed
        expect(getNavDEs().length).toEqual(1);
    });

    /**
     * Confirm multiple nav is displayed when multiple nav values.
     */
    it("displays multiple nav when multiple nav values", () => {

        component.navItems = INPUT_VALUE_NAV_ITEMS;

        fixture.detectChanges();

        // Confirm correct number of navs are displayed
        expect(getNavDEs().length).toEqual(INPUT_VALUE_NAV_ITEMS.length);
    });

    /**
     * Confirm no nav is displayed when no nav values.
     */
    it("does not display nav when no nav values", () => {

        component.navItems = [];

        fixture.detectChanges();

        // Confirm correct number of navs are displayed
        expect(getNavDEs().length).toEqual(0);
    });

    /**
     * Confirm displays nav display value.
     */
    it("displays nav display value", () => {

        component.navItems = INPUT_VALUE_NAV_ITEMS;

        fixture.detectChanges();

        // Confirm displays nav display value
        expect(getNavDEs()[0].nativeElement.innerText).toEqual(INPUT_VALUE_NAV_ITEMS[0].display);
    });

    /**
     * Confirm href is added to nav link.
     */
    it("adds href to nav link", () => {

        component.navItems = INPUT_VALUE_NAV_ITEMS;

        fixture.detectChanges();

        // Confirm nav router is added to href attribute
        expect(getNavDEs()[0].properties.pathname).toEqual(TEST_VALUE_ROUTER_LINK_PROJECT_INFORMATION);
    });

    /**
     * Returns all debug elements by ".nav" selector.
     *
     * @returns {DebugElement[]}
     */
    function getNavDEs(): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(SELECTOR_NAV));
    }
});
