/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectIntegrations.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";
import {
    PROJECT_PORTAL_SINGLE_VALUE_NULL_INTEGRATION_OBJECT,
    PROJECT_PORTAL_MULTIPLE_VALUES_SINGLE_INTEGRATION_OBJECT, PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT
} from "../hca-project/hca-project-mapper.mock";
import { ProjectIntegrationsComponent } from "./project-integrations.component";


describe("ProjectIntegrationsComponent", () => {

    let component: ProjectIntegrationsComponent;
    let fixture: ComponentFixture<ProjectIntegrationsComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                ProjectIntegrationsComponent
            ],
            imports: [],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectIntegrationsComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm single portal is displayed when single portal with single integration value.
     */
    it("should display single portal when single portal with single integration value", () => {

        component.integrations = PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT;

        fixture.detectChanges();

        // Confirm correct number of portal values are displayed
        expect(getCountOfPortalEls()).toEqual(getCountOfIntegrations(PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT));
    });

    /**
     * Confirm multiple portals are displayed when multiple portals with single integration value.
     */
    it("should display multiple string portals when multiple portals with single integration value", () => {

        component.integrations = PROJECT_PORTAL_MULTIPLE_VALUES_SINGLE_INTEGRATION_OBJECT;

        fixture.detectChanges();

        // Confirm correct number of portal values are displayed
        expect(getCountOfPortalEls()).toEqual(getCountOfIntegrations(PROJECT_PORTAL_MULTIPLE_VALUES_SINGLE_INTEGRATION_OBJECT));
    });

    /**
     * Confirm no portals are displayed when single portal with null integration value.
     */
    it("should not display any portals when single portal with null integration value", () => {

        component.integrations = PROJECT_PORTAL_SINGLE_VALUE_NULL_INTEGRATION_OBJECT;

        fixture.detectChanges();

        // Confirm no portal values are displayed
        expect(getCountOfPortalEls()).toEqual(getCountOfIntegrations(PROJECT_PORTAL_SINGLE_VALUE_NULL_INTEGRATION_OBJECT));
    });

    /**
     * Confirm portal url is added to href attribute.
     */
    it(`should add portal url to href`, () => {

        // Set up initial component state
        component.integrations = PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const portalEl = fixture.debugElement.query(By.css("a"));

        // Confirm portal url is added to href attribute
        expect(portalEl.nativeElement.getAttribute("href")).toEqual(getFirstPortalFirstIntegrationUrl(PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT));
    });

    /**
     * Returns the number of portal integrations.
     *
     * @param {Portal[]} integrations
     * @returns {number}
     */
    function getCountOfIntegrations(integrations: Portal[]): number {

        if ( integrations ) {

            return integrations.reduce((integrationCount, portal) => integrationCount + portal.integrations.length, 0);
        }
        return -1;
    }

    /**
     * Returns the total number of portals displayed.
     *
     * @returns {number}
     */
    function getCountOfPortalEls(): number {

        return fixture.debugElement.queryAll(By.css(".fontsize-xs")).length;
    }

    /**
     * Returns the first portal's, first integration's portal url.
     *
     * @param {Portal[]} integrations
     * @returns {string}
     */
    function getFirstPortalFirstIntegrationUrl(integrations: Portal[]): string {

        if ( integrations ) {

            return integrations[0].integrations[0].portalUrl;
        }
        return "";
    }
});
