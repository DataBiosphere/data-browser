// Core dependencies
import { Component, Input } from "@angular/core";
import { FileFacet } from "../shared/file-facet.model";
import { AppState } from "../../_ngrx/app.state";
import { Store } from "@ngrx/store";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { startWith } from "rxjs/operators";
import { map } from "rxjs/operator/map";


// App dependencies


/**
 * Component displaying three summary counts: files, donors, and file size.
 */
@Component({
    selector: "bw-file-filter",
    templateUrl: "./file-filter.component.html",
    styleUrls: ["./file-filter.component.scss"],
})


export class FileFilterComponent {


    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];


    // locals
    store: Store<AppState>
    removable = true;


    myControl: FormControl = new FormControl();

    constructor(store: Store<AppState>) {
        this.store = store;
    }


    removeFacet(facetName: string, termName: string) {
        this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(facetName, termName, false)));
    }


    filteredOptions: Observable<FileFacet[]>;

    ngOnInit() {
       // this.filteredOptions = this.myControl.valueChanges
            // .pipe(
            //     startWith(""),
            //     map(val => this.filter(val))
            // // );
    }

    filter(val: string): FileFacet[] {
        return this.fileFacets.filter(option =>
            option.name.toLowerCase().includes(val.toLowerCase()));
    }


}
