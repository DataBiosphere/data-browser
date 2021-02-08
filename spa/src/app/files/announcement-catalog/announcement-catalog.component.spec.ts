/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for AnnouncementCatalogComponent.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

// App dependencies
import { AnnouncementCatalogComponent } from "./announcement-catalog.component";
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { ConfigService } from "../../config/config.service";
import { AnnouncementComponent } from "../../shared/announcement/announcement.component";
import { WindowStub } from "../../test/window.stub";

describe("AnnouncementCatalogComponent", () => {

    let component: AnnouncementCatalogComponent;
    let fixture: ComponentFixture<AnnouncementCatalogComponent>;
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AnnouncementComponent,
                AnnouncementCatalogComponent
            ],
            imports: [],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["isV2", "isEnvLocal", "isEnvUxDev", "getPortalUrl"])
                },
                {
                    provide: Store,
                    useValue: testStore
                },
                {
                    provide: "Window",
                    useValue: new WindowStub()
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AnnouncementCatalogComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Confirm click handler is called for viewing DCP2 catalog.
     */
    it("dispatches action on click of view DCP2 catalog", () => {

        component.catalog = DCPCatalog.DCP1;
        fixture.detectChanges();
        const onExportToTerra = spyOn(component, "onCatalogSelected");
        const catalogLink = fixture.debugElement.query(By.css(".announcement-catalog-link"));

        // Execute click on link
        catalogLink.triggerEventHandler("click", null);
        expect(onExportToTerra).toHaveBeenCalledWith(DCPCatalog.DCP2);
    });

    /**
     * Confirm click handler is called for viewing DCP2 catalog.
     */
    it("dispatches action on click of view DCP1 catalog", () => {

        component.catalog = DCPCatalog.DCP2;
        fixture.detectChanges();
        const onExportToTerra = spyOn(component, "onCatalogSelected");
        const catalogLink = fixture.debugElement.query(By.css(".announcement-catalog-link"));

        // Execute click on link
        catalogLink.triggerEventHandler("click", null);
        expect(onExportToTerra).toHaveBeenCalledWith(DCPCatalog.DCP1);
    });

    /**
     * Confirm store dispatch is called on click of DCP1 catalog.
     */
    it("dispatches action on click of DCP1 catalog", () => {

        const catalog = DCPCatalog.DCP1;
        fixture.detectChanges();
        component.onCatalogSelected(catalog);
        expect(testStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            catalog
        }));
    });

    /**
     * Confirm store dispatch is called on click of DCP2 catalog.
     */
    it("dispatches action on click of DCP2 catalog", () => {

        const catalog = DCPCatalog.DCP2;
        fixture.detectChanges();
        component.onCatalogSelected(catalog);
        expect(testStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
            catalog
        }));
    });
});
