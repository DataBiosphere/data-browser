/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing top-level app component.
 */

// Core dependencies
import { Renderer2 } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { DeviceDetectorService } from "ngx-device-detector";
import { of } from "rxjs";

// App dependencies
import { Catalog } from "./catalog/catalog.model";
import { CatalogFormComponent } from "./catalog/catalog-form/catalog-form.component";
import { ConfigService } from "../config/config.service";
import { FacetToolbarComponent } from "./facet/facet-toolbar/facet-toolbar.component";
import { FilesComponent } from "./files.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCATableFilesComponent } from "./hca-table-files/hca-table-files.component";
import { HCATableProjectsComponent } from "./hca-table-projects/hca-table-projects.component";
import { HCATableSamplesComponent } from "./hca-table-samples/hca-table-samples.component";
import { SelectedSearchTermsComponent } from "./search/selected-search-terms/selected-search-terms.component";
import { DEFAULT_FILE_SUMMARY } from "./shared/file-summary.mock";
import { HCATabComponent } from "../shared/hca-tab/hca-tab.component";
import { HCASectionTitleComponent } from "../shared/hca-section-title/hca-section-title.component";

describe("FilesComponent:", () => {

    let component: FilesComponent;
    let fixture: ComponentFixture<FilesComponent>;

    const storeSpy = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CatalogFormComponent,
                FacetToolbarComponent,
                HCAFileSummaryComponent,
                HCASectionTitleComponent,
                HCATabComponent,
                HCATableFilesComponent,
                HCATableProjectsComponent,
                HCATableSamplesComponent,
                SelectedSearchTermsComponent
            ],
            imports: [
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", [
                        "isV2",
                        "isEnvDCP2",
                        "isEnvLocal",
                        "isEnvProd",
                        "isEnvUxDev",
                        "getPortalUrl"
                    ])
                },
                {
                    provide: DeviceDetectorService,
                    useValue: jasmine.createSpyObj("DeviceDetectorService", ["isMobile", "isTablet"])
                },
                {
                    provide: Store,
                    useValue: storeSpy
                },
                {
                    provide: Renderer2,
                    useValue: jasmine.createSpyObj("Renderer2", ["addClass", "removeClass"])
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FilesComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm catalog is displayed correctly in explore title for v2 environments
     */
    xit("displays catalog in explore title in v2", () => {

        storeSpy.pipe
            .and.returnValues(
            of(DEFAULT_FILE_SUMMARY), // File summary
            of([]), // File facets
            of([]), // Entities
            of({}), // Selected entity
            of([]), // Selected search terms
            of([]), // Search terms
            of([]), // Selected project search terms
            of("") // Selected catalog
        );

        fixture.detectChanges();
        expect(fixture).toBeTruthy();
    });

    /**
     * Confirm catalog is hidden in explore title for v1 environments
     */
    xit("hides catalog in explore title in v1", () => {

    });

    /**
     * Confirm catalog choose is not displayed in v1 environments.
     */
    xit("hides catalog chooser in v1 environments", () => {

    });


    /**
     * Confirm catalog choose is displayed in v2 environments.
     */
    xit("displays catalog chooser in v2 environments", () => {

    });
});
