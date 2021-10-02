/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing top-level app component.
 */

// Core dependencies
import { Renderer2 } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { DeviceDetectorService } from "ngx-device-detector";
import { of } from "rxjs";

// App dependencies
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

    beforeEach(waitForAsync(() => {

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
                ConfigService,
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
     * Confirm catalog is displayed correctly in explore title
     */
    xit("displays catalog in explore title", () => {
    });

    /**
     * Confirm catalog choose is displayed.
     */
    xit("displays catalog chooser", () => {
    });
});
