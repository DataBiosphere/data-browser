/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for searching across terms and entities.
 */

// Core dependencies
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "../shared/file-facet-name.model";
import { SearchTermOptionGroup } from "./search-term-option-group.model";
import { FileFacetDisplayService } from "../shared/file-facet-display.service";
import { SearchTermOption } from "./search-term-option.model";
import { SelectedSearchTermOption } from "./selected-search-term-option.model";

@Component({
    selector: "hca-search",
    templateUrl: "./hca-search.component.html",
    styleUrls: ["./hca-search.component.scss"],
})
export class HCASearchComponent implements OnInit, OnChanges {

    // Template variables
    searchTermOptionGroups: SearchTermOptionGroup[] = [];
    filteredSearchTerms$: Observable<SearchTermOptionGroup[]>;
    filterControl: FormControl = new FormControl();
    searchReturnsEmpty = false;

    // Inputs
    @Input() searchTerms: SearchTerm[];
    @Input() selectedSearchTerms: SearchTerm[];

    // View child/ren
    @ViewChild("filterInput") filterInput: ElementRef;

    /**
     * @param {FileFacetDisplayService} fileFacetDisplayService
     * @param {Store<AppState>} store
     */
    constructor(private fileFacetDisplayService: FileFacetDisplayService, private store: Store<AppState>) {}

    /**
     * Display function on select of search term. Note, search box is cleared immediately after select so this value
     * is only displayed if an error occurs and search box can not be cleared.
     * 
     * @param {SelectedSearchTermOption} selectedSearchTermOption
     */
    public selectedSearchTermOptionDisplayFn(selectedSearchTermOption?: SelectedSearchTermOption): string | undefined {

        return selectedSearchTermOption ?
            `${selectedSearchTermOption.optionGroup.searchKey}-${selectedSearchTermOption.option.displayValue}` :
            undefined;
    }

    /**
     * Returns class "truncate" if display value not spaced.
     *
     * @param displayValue
     * @returns {string}
     */
    public getTruncatedClass(displayValue: string): string {

        if ( displayValue.indexOf(" ") === -1 ) {
            return "truncate";
        }

        return null;
    }

    /**
     * Search term has been selected from list - emit appropriate event depending on whether a facet or entity was
     * selected.
     *
     * @param {MatAutocompleteSelectedEvent} event
     */
    public onSearchTermSelected(event: MatAutocompleteSelectedEvent) {

        const selectedSearchTermOption = event.option.value;
        
        const searchKey = selectedSearchTermOption.optionGroup.searchKey;
        const displayValue = selectedSearchTermOption.option.displayValue;
        const searchValue = selectedSearchTermOption.option.searchValue;
        hca-file-filter.component.ts
        const action = (searchKey === FileFacetName.PROJECT_ID) ?
            new SelectProjectIdAction(searchValue, displayValue) :
            new SelectFileFacetTermAction(searchKey, searchValue);
        this.store.dispatch(action);

        // Clear the filter input.
        this.filterInput.nativeElement.blur();
    }

    /**
     * Privates
     */

    /**
     * Filter option groups based on the specified search string:
     * - filter out terms that do not match.
     * - filter out option groups that have no matching terms.
     * - do not filter on the facet name (for now any how).
     *
     * @param {string} searchString
     * @returns {SearchTermOptionGroup[]}
     */
    private filterSearchTerms(searchString: string): SearchTermOptionGroup[] {

        if ( searchString == "" ) {
            return this.searchTermOptionGroups;
        }

        // once you select its the term in here how to avoid?
        if ( typeof searchString !== "string" ) {
            return this.searchTermOptionGroups;
        }

        const filteredSearchTermGroupOptions = this.searchTermOptionGroups.reduce((accum, searchTermOptionGroup) => {

            // See if we have any terms matching the search criteria
            const options = searchTermOptionGroup.options.filter((option) => {
                return option.displayValue.toLowerCase().includes(searchString.toLowerCase());
            });

            // Add option group to result set, if it has terms matching search criteria
            if ( options.length > 0 ) {
                accum.push({
                    displayValue: searchTermOptionGroup.displayValue,
                    searchKey: searchTermOptionGroup.searchKey,
                    options: options
                } as SearchTermOptionGroup);
            }

            return accum;
        }, []);

        // Return new list of searchable facets, unless the list is empty
        if ( filteredSearchTermGroupOptions.length > 0 ) {
            this.searchReturnsEmpty = false;
            return filteredSearchTermGroupOptions;
        }
        else {
            this.searchReturnsEmpty = true;
            return this.searchTermOptionGroups;
        }
    }

    /**
     * Set up the set of search terms that can be searched over.
     */
    private setupSearchTerms() {

        // Make a set of search terms IDs so we can easily check to see if a term is selected.
        const selectedSearchTermIds = this.selectedSearchTerms.map(searchTerm => searchTerm.getId());

        // Create grouped options to back autosuggest
        const optionGroupsByFacetName = this.searchTerms.reduce((accum, searchTerm) => {

            const searchKey = searchTerm.getSearchKey();
            
            // Check if we've already created an option group for this facet
            let searchTermGroup = accum.get(searchKey);
            if ( !searchTermGroup ) {
               searchTermGroup = {
                   displayValue: this.fileFacetDisplayService.getFileFacetDisplayName(searchKey),
                   searchKey: searchKey,
                   options: []
               } as SearchTermOptionGroup;
               accum.set(searchKey, searchTermGroup);
            }

            // Add search term to search term group if it's not one of the already selected search terms
            if ( selectedSearchTermIds.indexOf(searchTerm.getId()) === -1 ) {
                searchTermGroup.options.push({
                    displayValue: searchTerm.getDisplayValue(),
                    count: searchTerm.getCount(),
                    searchValue: searchTerm.getSearchValue()
                } as SearchTermOption);
            }

            return accum;
        }, new Map<string, SearchTermOptionGroup>());
        
        // Remove any search term groups that have no search terms
        const searchableOptionGroups = Array.from(optionGroupsByFacetName.values())
            .filter((searchTermGroupOption) => {
                return searchTermGroupOption.options.length > 0;
            });

        // Sort by facet name
        searchableOptionGroups.sort((optionGroup0, optionGroup1) => {
            return optionGroup0.displayValue > optionGroup1.displayValue ? 1 : -1;
        });

        this.searchTermOptionGroups = searchableOptionGroups;
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up search terms and facet groups, and reset filter input value, on change of component inputs.
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

        this.filteredSearchTerms$ = this.filterControl.valueChanges
            .pipe(
                startWith(""),
                map(searchString => this.filterSearchTerms(searchString)));

    }
}
