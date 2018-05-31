/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component searches facet and term names for filtering.
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map, startWith } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";

interface FilterableFacet {
    facetName: string;
    terms: { termName: string; count: number }[];
}

@Component({
    selector: "hca-file-filter",
    templateUrl: "./hca-file-filter.component.html",
    styleUrls: ["./hca-file-filter.component.scss"],
})
export class HCAFileFilterComponent implements OnInit, OnChanges {

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];

    // Template variables
    filterableFacets: FilterableFacet[] = [];
    filteredFacets$: Observable<FilterableFacet[]>;
    filterControl: FormControl = new FormControl();
    removable = true;
    selectedTermSet: Set<string>;
    store: Store<AppState>;

    // View child/ren
    @ViewChild("filterInput") filterInput: ElementRef;

    /**
     * @param {Store<AppState>} store
     */
    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Public API
     */


    /**
     *
     */
    public displayFn(ff?: any): string | undefined {

        return ff ? ff.facetName + "-" + ff.termName : undefined;
    }

    /**
     * FilterFacets
     * - filter out terms that do not match.
     * - filter out facets that have no matching terms.
     * - do not filter on the facet name (for no any how)
     * @param {string} searchString
     * @returns {FilterableFacet[]}
     */
    public filterFacets(searchString: string): FilterableFacet[] {

        if ( searchString == "" ) {
            return this.filterableFacets;
        }


        // once you select its the term in here how to avoid?
        if ( typeof searchString !== "string" ) {
            return this.filterableFacets;
        }


        const newFacets = this.filterableFacets.map((fileFacet) => {

            // see if we have any matching terms
            const terms = fileFacet.terms.filter((term) => {
                return term.termName.toLowerCase().includes(searchString.toLowerCase());
            });

            return {facetName: fileFacet.facetName, terms: terms};

        });

        return newFacets.filter(facet => facet.terms.length > 0);
    }

    /**
     *
     */
    public setupSearchTerms() {

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
                return {termName: term.name, count: term.count};
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

    /**
     * HCA select field open.
     */
    public onHCASelectShowHide() {
    }

    /**
     * Term selected.
     *
     * @param {MatAutocompleteSelectedEvent} event
     */
    public onTermSelected(event: MatAutocompleteSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent(event.option.value.facet.facetName, event.option.value.term.termName, true)));

        // Clear the filter input.
        this.filterInput.nativeElement.blur();
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up search terms and reset filter input value, on change of component inputs.
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {

        this.setupSearchTerms();
        this.filterControl.setValue("");
    }

    /**
     * Set up filter function on change of value on search input.
     */
    ngOnInit() {

        this.filteredFacets$ = this.filterControl.valueChanges
            .pipe(
                startWith(""),
                map(searchString => this.filterFacets(searchString)));
    }
}
