/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for CatalogFormComponent.
 */

// Core dependencies
import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatRadioChange, MatRadioModule } from "@angular/material/radio";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

// App dependencies
import { CatalogFormComponent } from "./catalog-form.component";
import { CatalogState } from "../../_ngrx/catalog/catalog.state";
import { SelectCatalogAction } from "../../_ngrx/catalog/select-catalog.action";
import { ReactiveFormsModule } from "@angular/forms";

describe("CatalogFormComponent", () => {
    let component: CatalogFormComponent;
    let fixture: ComponentFixture<CatalogFormComponent>;
    let store: MockStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CatalogFormComponent],
            imports: [MatRadioModule, ReactiveFormsModule],
            providers: [
                provideMockStore({
                    initialState: {
                        catalog: CatalogState.getDefaultState(),
                    },
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CatalogFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as MockStore;
    }));

    /**
     * Confirm radio button is displayed for each catalog.
     */
    it("displays radio button for each catalog", () => {
        component.catalog = "dcp2";
        component.catalogs = ["dcp1", "dcp2"];
        fixture.detectChanges();

        const radioDEs = fixture.debugElement.queryAll(By.css("input"));
        expect(radioDEs.length).toEqual(component.catalogs.length);

        const displayedCatalogs = radioDEs.map((de) => de.nativeElement.value);
        component.catalogs.forEach((catalog) => {
            expect(displayedCatalogs.indexOf(catalog)).not.toEqual(-1);
        });
    });

    /**
     * Confirm click handler is on click of radio button.
     */
    it("triggers click handler on click of download", () => {
        component.catalog = "dcp2";
        component.catalogs = ["dcp1", "dcp2"];
        fixture.detectChanges();

        const onCatalogSelected = spyOn(component, "onCatalogSelected");
        const radioGroupDE = fixture.debugElement.query(
            By.css("mat-radio-group")
        );
        const radioDE = fixture.debugElement.query(By.css("input"));

        // Trigger change event
        radioGroupDE.triggerEventHandler("change", {
            source: radioDE,
            value: radioDE.nativeElement.value,
        });
        expect(onCatalogSelected).toHaveBeenCalled();
    });

    /**
     * Confirm output is emitted on change on catalog radio value.
     */
    it("emits on change of catalog value", () => {
        spyOn(store, "dispatch");

        component.catalog = "dcp2";
        component.catalogs = ["dcp1", "dcp2"];
        fixture.detectChanges();

        const changeEvent = {
            value: component.catalog,
        } as MatRadioChange;
        component.onCatalogSelected(changeEvent);

        expect(store.dispatch).toHaveBeenCalledWith(
            new SelectCatalogAction(changeEvent.value)
        );
    });

    /**
     * Confirm form value is updated on changes.
     */
    it("updates form value on change", () => {
        component.catalog = "dcp2";
        component.catalogs = ["dcp1", "dcp2"];
        fixture.detectChanges();

        component.ngOnChanges({
            catalog: new SimpleChange("dcp2", "dcp1", false),
        });
        fixture.detectChanges();

        expect(component.catalogFormGroup.value.catalog).toEqual("dcp1");
    });
});
