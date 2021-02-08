/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying catalog form.
 */

// Core dependencies
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { Store } from "@ngrx/store";

// App dependencies
import { Catalog } from "../catalog.model";
import { AppState } from "../../../_ngrx/app.state";
import { SelectCatalogAction } from "../../_ngrx/catalog/select-catalog.action";

@Component({
    selector: "catalog-form",
    templateUrl: "./catalog-form.component.html",
    styleUrls: ["./catalog-form.component.scss"]
})
export class CatalogFormComponent implements OnChanges {

    // Locals
    public catalogFormGroup: FormGroup;

    // Inputs
    @Input() catalog: Catalog; // Selected catalog
    @Input() catalogs: Catalog[];

    /**
     * Set up form group and form control backing catalog form.
     * 
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {

        this.catalogFormGroup = new FormGroup({
            catalog: new FormControl(this.catalog),
        });
    }

    /**
     * Handle select of catalog radio button.
     * 
     * @param {MatRadioChange} event
     */
    public onCatalogSelected(event: MatRadioChange) {

        this.store.dispatch(new SelectCatalogAction(event.value));
    }

    /**
     * Update radio button value.
     */
    public ngOnChanges(changes: SimpleChanges) {

        this.catalogFormGroup.patchValue({
            catalog: changes.catalog.currentValue
        });
    }
}
