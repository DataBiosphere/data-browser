// Core dependencies
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FileFacet } from "../shared/file-facet.model";
import { AppState } from "../../_ngrx/app.state";
import { Store } from "@ngrx/store";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { map, startWith } from "rxjs/operators";


// App dependencies

interface FilterableFacet {
    facetName: string;
    terms: { termName: string; count: number }[];
}

/**
 * Component displaying three summary counts: files, donors, and file size.
 */
@Component({
    selector: "bw-file-filter",
    templateUrl: "./file-filter.component.html",
    styleUrls: ["./file-filter.component.scss"],
})

export class FileFilterComponent implements OnInit, OnChanges {


    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];


    // locals
    store: Store<AppState>;
    removable = true;
    filterableFacets: FilterableFacet[] = [];
    selectedTermSet: Set<string>;
    filteredFacets$: Observable<FilterableFacet[]>;
    myControl: FormControl = new FormControl();

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    removeFacet(facetName: string, termName: string) {
        this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(facetName, termName, false)));
    }

    /**
     * Save rep without surgeon.
     *
     * @param {MatAutocompleteSelectedEvent} event
     */
    public onTermSelected(event: MatAutocompleteSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent(event.option.value.facet.facetName, event.option.value.term.termName, true)));

        //   this.myControl.setValue("");
    }

    ngOnInit() {
        this.filteredFacets$ = this.myControl.valueChanges
            .pipe(
                startWith(""),
                map(searchString => this.filterFacets(searchString)));
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setupSearchTerms();
        this.myControl.setValue("");
    }


    /**
     * FilterFacets
     * - filter out terms that do not match.
     * - filter out facets that have no matching terms.
     * - do not filter on the facet name (for no any how)
     * @param {string} searchString
     * @returns {FilterableFacet[]}
     */
    filterFacets(searchString: string): FilterableFacet[] {

        if (searchString == "") {
            return this.filterableFacets;
        }


        // once you select its the term in here how to avoid?
        if (typeof searchString !== "string") {
            return this.filterableFacets;
        }


        const newFacets = this.filterableFacets.map((fileFacet) => {

            // see if we have any matching terms
            const terms = fileFacet.terms.filter((term) => {
                return term.termName.toLowerCase().includes(searchString.toLowerCase());
            });

            return { facetName: fileFacet.facetName, terms: terms };

        });

        return newFacets.filter(facet => facet.terms.length > 0);


    }

    setupSearchTerms() {

        // Make a set that is easy to query to see if a term is selected.
        this.selectedTermSet = this.selectedFacets.reduce((acc, facet) => {

            facet.selectedTerms.forEach((term) => {
                acc.add(facet.name + ":" + term.name);
            });

            return acc;

        }, new Set<string>());

        // map file facets to filterable facets.
        this.filterableFacets = this.fileFacets.map(fileFacet => {

            const terms = fileFacet.terms.map(term => {
                // map to the filterable / display structure
                return { termName: term.name, count: term.count };
            }).filter((term) => {
                // remove any seleted terms from the term list
                return !this.selectedTermSet.has(fileFacet.name + ":" + term.termName);
            });

            return {
                facetName: fileFacet.name,
                terms: terms
            };

        }).filter((facet) => {
            // now filter out any empty facets.
            return facet.terms.length > 0;
        });

    }

    displayFn(ff?: any): string | undefined {
        return ff ? ff.facetName + "-" + ff.termName : undefined;
    }
}
