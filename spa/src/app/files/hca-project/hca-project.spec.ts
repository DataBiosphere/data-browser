/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for HCAProject.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatProgressSpinnerModule, MatTooltipModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs/index";
import { DeviceDetectorService } from "ngx-device-detector";

// App dependencies
import { CcPipeModule } from "../../cc-pipe/cc-pipe.module";
import { ConfigService } from "../../config/config.service";
import { HCASectionTitleComponent } from "../../shared/hca-section-title/hca-section-title.component";
import { HCATabComponent } from "../../shared/hca-tab/hca-tab";
import { PopLayoutComponent } from "../../shared/pop-layout/pop-layout.component";
import { HCATooltipComponent } from "../hca-tooltip/hca-tooltip.component";
import { ProjectTSVDownloadComponent } from "../project-tsv-download/project-tsv-download.component";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { HCAProjectComponent } from "./hca-project.component";
import {
    PROJECT_DETAIL_SINGLE_VALUE,
    PROJECT_DETAIL_SINGLE_VALUE_WITH_WORKFLOW_AS_UNSPECIFIED
} from "./hca-project-mapper.mock";

describe("HCAProjectComponent", () => {

    let component: HCAProjectComponent;
    let fixture: ComponentFixture<HCAProjectComponent>;

    const testConfig = jasmine.createSpyObj("ConfigService", ["getPortalURL"]);
    const testRouter = jasmine.createSpyObj("Router", ["navigate"]);
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Project matrix urls
    const PROJECT_DETAIL_PROJECT_MATRIX_URLS = new ProjectMatrixUrls("2cd14cf5-f8e0-4c97-91a2-9e8957f41ea8", "https://dev.data.humancellatlas.org/project-assets/project-matrices/537f5501-a964-4ade-91c8-7bd4a23b049d.csv.zip", "https://dev.data.humancellatlas.org/project-assets/project-matrices/537f5501-a964-4ade-91c8-7bd4a23b049d.loom", "https://dev.data.humancellatlas.org/project-assets/project-matrices/537f5501-a964-4ade-91c8-7bd4a23b049d.mtx.zip");

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAProjectComponent,
                HCASectionTitleComponent,
                HCATabComponent,
                HCATooltipComponent,
                PopLayoutComponent,
                ProjectTSVDownloadComponent
            ],
            imports: [
                CcPipeModule,
                MatIconModule,
                MatTooltipModule,
                MatProgressSpinnerModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: jasmine.createSpyObj("paramMap", ["get"])
                        }
                    }
                },
                {
                    provide: ConfigService,
                    useValue: testConfig
                },
                DeviceDetectorService,
                {
                    provide: Router,
                    useValue: testRouter
                },
                {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAProjectComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Incomplete test
     */
    xit("TBD", () => {

        // TODO - pending test
    });

    /**
     * Confirm "Analysis Protocol" is displayed when workflow is not "Unspecified".
     */
    it(`should display "Analysis Protocol" when workflow is not "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUE), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]) // project ids
        );

        fixture.detectChanges();

        // Confirm "Analysis Protocol" is displayed
        expect(isProjectDetailLabelDisplayed("Analysis Protocol")).toEqual(true);
    });

    /**
     * Confirm "Analysis Protocol" is not displayed when workflow is "Unspecified".
     */
    it(`should not display "Analysis Protocol" when workflow is "Unspecified"`, () => {

        testStore.pipe
            .and.returnValues(
            of(PROJECT_DETAIL_SINGLE_VALUE_WITH_WORKFLOW_AS_UNSPECIFIED), // selected project detail
            of(PROJECT_DETAIL_PROJECT_MATRIX_URLS), // project matrix URLs
            of([]) // project ids
        );

        fixture.detectChanges();

        // Confirm "Analysis Protocol" is not displayed
        expect(isProjectDetailLabelDisplayed("Analysis Protocol")).toEqual(false);
    });

    /**
     * Returns true if project detail label is displayed.
     *
     * @param {string} projectDetailLabel
     * @returns {boolean}
     */
    function isProjectDetailLabelDisplayed(projectDetailLabel: string): boolean {

        const projectDetailLabelEls = fixture.debugElement.queryAll(By.css(".project-details .lhs"));

        return projectDetailLabelEls.some(projectDetailLabelEl => projectDetailLabelEl.nativeElement.innerText === projectDetailLabel);
    }
});
