/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for AnnouncementCatalogComponent.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AnnouncementComponent, AnnouncementCatalogComponent],
            imports: [],
            providers: [
                ConfigService,
                {
                    provide: Store,
                    useValue: testStore,
                },
                {
                    provide: "Window",
                    useValue: new WindowStub(),
                },
            ],
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
        const catalogLink = fixture.debugElement.query(
            By.css(".announcement-catalog-link")
        );

        // Execute click on link
        catalogLink.triggerEventHandler("click", null);
        expect(onExportToTerra).toHaveBeenCalledWith(DCPCatalog.DCP2);
    });

    /**
     * Confirm banner is not visible for non-DCP1 catalog.
     */
    it("hides banner for non-DCP1 catalog", () => {
        component.catalog = DCPCatalog.DCP2;
        fixture.detectChanges();
        const catalogLink = fixture.debugElement.query(
            By.css(".announcement-catalog")
        );

        // Confirm banner is not visible for non-dcp1 catalogs
        expect(catalogLink).toBeNull();
    });

    /**
     * Confirm store dispatch is called on click of DCP1 catalog.
     */
    it("dispatches action on click of DCP1 catalog", () => {
        const catalog = DCPCatalog.DCP1;
        fixture.detectChanges();
        component.onCatalogSelected(catalog);
        expect(testStore.dispatch).toHaveBeenCalledWith(
            jasmine.objectContaining({
                catalog,
            })
        );
    });
});
