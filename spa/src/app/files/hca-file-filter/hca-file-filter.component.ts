/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for searching across facet and term names for filtering.
 */

// Core dependencies
import {
    Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges,
    ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { map, startWith } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { CamelToSpacePipe } from "../../cc-pipe/camel-to-space/camel-to-space.pipe";
import { DeviceDetectorService } from "ngx-device-detector";
import { FacetGroup } from "./facet-group.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FilterableFacet } from "./filterable-facet.model";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { FileFacet } from "../shared/file-facet.model";

@Component({
    selector: "hca-file-filter",
    templateUrl: "./hca-file-filter.component.html",
    styleUrls: ["./hca-file-filter.component.scss"],
})
export class HCAFileFilterComponent implements OnInit, OnChanges {

    // Constants
    private FACET_GROUPS = [
        {
            facetGroupName: "Organ",
            facetNames: ["organ", "organPart"]
        },
        {
            facetGroupName: "Method",
            facetNames: ["instrumentManufacturerModel", "preservationMethod", "libraryConstructionApproach"]
        },
        {
            facetGroupName: "Donor",
            facetNames: ["genusSpecies", "organismAge", "organismAgeUnit", "biologicalSex"]
        },
        {
            facetGroupName: "Specimen",
            facetNames: ["disease"]
        },
        {
            facetGroupName: "More",
            facetNames: ["project", "fileFormat"]
        }
    ];

    // Facet blacklist - exclude from autosuggest
    private FACET_BLACKLIST = [
        "contactName",
        "laboratory",
        "organismAge",
        "organismAgeUnit"
    ];

    // Facet display names
    private FACET_DISPLAY_NAMES = {
        "disease": "Known Diseases",
        "libraryConstructionApproach": "Library Construction Method"
    };

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    // Template variables
    facetGroups: FacetGroup[];
    filterableFacets: FilterableFacet[] = [];
    filteredFacets$: Observable<FilterableFacet[]>;
    filterControl: FormControl = new FormControl();
    openIndex: number;
    removable = true;
    searchReturnsEmpty = false;
    selectedFacet: number;
    selectIndex: number;
    selectedTermSet: Set<string>;

    // Privates
    private camelToSpacePipe = new CamelToSpacePipe();

    // View child/ren
    @ViewChild("filterInput") filterInput: ElementRef;

    /**
     * @param {Store<AppState>} store
     */
    constructor(private deviceService: DeviceDetectorService, private store: Store<AppState>, @Inject("Window") private window: Window) {
    }

    /**
     * Public API
     */

    /**
     *
     */
    public displayFn(ff ?: any): string | undefined {

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

            const facetName = fileFacet.facetName;
            const displayName = this.getFileFacetDisplayName(facetName);
            return {
                displayName: displayName,
                facetName: facetName,
                terms: terms
            };

        });

        /* Return new list of searchable facets, unless the list is empty */
        if ( newFacets.filter(facet => facet.terms.length).length ) {
            this.searchReturnsEmpty = false;
            return newFacets.filter(facet => facet.terms.length > 0);
        }
        else {
            this.searchReturnsEmpty = true;
            return this.filterableFacets;
        }
    }

    /**
     * Returns the facet given a facet name
     */
    public getFacet(facetName: string): FileFacet {

        const fileFacet = this.fileFacets.find(function (fileFacet) {
            return fileFacet.name === facetName;
        });

        return fileFacet;
    }

    /**
     * Returns the width of each facet, determined by screen size
     * @returns {number}
     */
    public getFacetWidth(): number {

        return (this.isWindowWidthMedium() ? 216 : 256);
    }

    /**
     * @param f
     * @param t
     * @returns {string}
     */
    public getIsOpenClass(f, t) {

        if ( this.openIndex === t && this.selectedFacet === f ) {
            return "open";
        }

        return "closed";
    }

    /**
     * Returns class hca-select active if select box is active.
     * @param i
     * @returns {any}
     */
    public getSelectClass(i) {

        if ( this.selectIndex == i ) {
            return "hca-select active";
        }
        else {
            return "hca-select";
        }
    }

    /**
     * @param i
     * @returns {string}
     */
    public getOptionsClass(i) {

        if ( this.selectIndex == i ) {
            return "hca-options";
        }
        else {
            return "hca-options hide";
        }
    }

    /**
     * @returns {string}
     */
    public getOptionsSmallClass() {

        if ( this.selectIndex == 1 ) {
            return "hca-options-small";
        }
        else {
            return "hca-options-small hide";
        }
    }

    /**
     * Returns class truncate if termName is not spaced
     * @param termName
     * @returns {string}
     */
    public getTruncatedClass(termName) {

        if ( termName.indexOf(" ") == -1 ) {
            return "truncate";
        }
    }

    /**
     * Returns true if device is mobile.
     * @returns {boolean}
     */
    public isDeviceMobile(): boolean {

        return (this.deviceService.isMobile());
    }

    /**
     * Returns true if window width is less than 1200px
     * @returns {boolean}
     */
    public isWindowWidthMedium() {

        return document.body.offsetWidth < 1200;
    }

    /**
     * Returns true if window width is less than 675px
     * @returns {boolean}
     */
    public isWindowWidthSmall() {

        return document.body.offsetWidth < 675;
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(
            new FileFacetSelectedEvent(fileFacetSelectedEvent.facetName, fileFacetSelectedEvent.termName, true)));
    }

    /**
     * HCA show terms for selected Facet
     * @param t
     */
    public onHCAFacetSelect(f, t) {

        if ( this.selectedFacet == f && this.openIndex == t ) {
            this.selectedFacet = null;
            this.openIndex = null;
        }
        else {
            this.selectedFacet = f;
            this.openIndex = t;
        }
    }

    /**
     * HCA show select box.
     */
    public onHCASelect(i) {

        this.menuOpen.emit(true);
        this.selectIndex = i;
    }

    /**
     * HCA hide select box on mouse leave.
     */
    public onHCASelectClose() {
        this.menuOpen.emit(false);
        this.selectIndex = null;
        this.openIndex = null;
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
     * Returns options container positioning.
     *
     * @param {number} i
     * @param {number} numberOfFacets
     * @param {number} facetGroupCount
     * @returns {{[rule: string]: string}}
     */
    public getFacetStyles(i: number, numberOfFacets: number, facetGroupCount: number): { [key: string]: string } {

        let widthOfEachFacet = this.getFacetWidth(); // Width of facet - either 216px or 256px
        let widthOfSelectBox = document.getElementsByClassName("hca-select")[0].getBoundingClientRect().width + 8; // Width inclusive of margin 8px on the select box - 158px or 128px
        let widthOfAllSelectBoxes = document.getElementById("select").getBoundingClientRect().width - 8; // With of select boxes (excludes first and last margin - 8px) - 782px or 632px
        let widthRequired = numberOfFacets * widthOfEachFacet + 14; // 14px for left and right padding and border, 216px or 256px for each facet inside drop down
        let allowableWidth = (widthOfAllSelectBoxes - (widthOfSelectBox * i)); // width of select boxes, i is position of select box, 158px is width inclusive of margin on the select box
        let right = (widthOfSelectBox * (facetGroupCount - 1 - i)); // Calculates position right if there is a need to be right aligned
        let left = (widthOfSelectBox * (i)); // Calculates position left if there is a need to be left aligned
        let maxHeight;

        // Calculate max allowable height of hca-options - scrolls if extends beyond page bounds
        if ( this.selectIndex === i ) {

            maxHeight = (document.body.getBoundingClientRect().height - document.getElementById("options").getBoundingClientRect().top) + "px";
        }

        /* Check if the drop down can be left aligned with its select box */
        /* Will be right aligned if width required is greater than allowable width */
        /* Exception to this case is when the select boxes have wrapped under the search bar (< 960px) and the width required is greater than the select boxes width */
        /* In this instance, the drop down will be left aligned with the screen */
        if ( widthRequired > allowableWidth ) {

            // Calculate a new allowable width - full width of filter area
            let rightSideAllowableWidth = document.getElementById("filter").offsetWidth;

            /* Check if width required is greater than the full width of filter area */
            /* If true, return a max width of hca-file-filter as a constraint */
            /* Facets will wrap within */
            if ( widthRequired > rightSideAllowableWidth ) {

                // Calculate number of facets that fits neatly in the first row of the allowable width
                // Then calculate new width required
                let numberOfFacetsPerRow = Math.trunc((rightSideAllowableWidth - 14) / widthOfEachFacet);
                widthRequired = (numberOfFacetsPerRow * widthOfEachFacet) + 14;
            }

            /* Check if the new width required is still greater than the allowable width - to either left align with screen, or right align with last select box */
            if ( widthRequired > allowableWidth ) {

                /* Left aligned with screen - if screen size is less than 960px and is not the last select box */
                if ( document.body.offsetWidth < 960 && i !== facetGroupCount - 1 ) {

                    return {
                        "left": (-left + "px"),
                        "maxHeight": maxHeight,
                        "maxWidth": (widthOfAllSelectBoxes + "px"),
                        "minWidth": (widthRequired + "px"),
                        "right": "unset"
                    };
                }

                /* Right aligned */
                return {
                    "left": "unset",
                    "maxHeight": maxHeight,
                    "maxWidth": (widthOfAllSelectBoxes + "px"),
                    "minWidth": (widthRequired + "px"),
                    "right": (-right + "px")
                };
            }
        }

        // Can be left aligned with its select box
        return {
            "left": "0",
            "maxHeight": maxHeight,
            "maxWidth": (allowableWidth + "px"),
            "minWidth": (widthRequired + "px"),
            "right": "unset"
        };
    }

    /**
     * Track by function used when drawing list of file facets.
     *
     * @param index
     * @param {FileFacet} fileFacet
     * @returns {string}
     */
    public trackFileFacetByFn(index, fileFacet: FileFacet): string {

        return fileFacet.name;
    }

    /**
     * Track by function used when drawing list of facet groups.
     *
     * @param {number} index
     * @param {any} facetGroup
     * @returns {string}
     */
    public trackFacetGroupByFn(index: number, facetGroup: any): string {

        return facetGroup.facetGroupName;
    }

    /**
     * Privates
     */

    /**
     * Determine display name for specified file facet name.
     *
     * @param {string} fileFacetName
     * @returns {name}
     */
    private getFileFacetDisplayName(fileFacetName: string): string {

        const displayName = this.FACET_DISPLAY_NAMES[fileFacetName];
        return displayName ? displayName : this.camelToSpacePipe.transform(fileFacetName);
    }

    /**
     * Group the specified facets into groups, for display in facet drop downs.
     */
    private initFacetGroups() {

        // Get the set of available facets.
        const specifiedFacetNames = this.fileFacets.map(facet => facet.name);

        // Iterate over the facet groups definition and filter out any facets that are not in the set of
        // available facets.
        this.facetGroups = this.FACET_GROUPS.map((group) => {

            const groupFacetNames = group.facetNames.filter((facetName: string) => {
                return specifiedFacetNames.indexOf(facetName) >= 0;
            });

            return Object.assign({}, group, {
                facetNames: groupFacetNames
            });
        });
    }

    /**
     * Set up the set of facets that can be searched over.
     */
    private setupSearchTerms() {

        // Make a set that is easy to query to see if a term is selected.
        this.selectedTermSet = this.selectedFacets.reduce((acc, facet) => {

            facet.selectedTerms.forEach((term) => {
                acc.add(facet.name + ":" + term.name);
            });

            return acc;

        }, new Set<string>());

        // map file facets to filterable facets.
        const filterableFacets = this.fileFacets
            .filter(fileFacet => {

                return this.FACET_BLACKLIST.indexOf(fileFacet.name) === -1;
            })
            .map(fileFacet => {

                const terms = fileFacet.terms
                    .map(term => {
                        // map to the filterable / display structure
                        return {termName: term.name, count: term.count};
                    })
                    .filter((term) => {
                        // remove any selected terms from the term list
                        return !this.selectedTermSet.has(fileFacet.name + ":" + term.termName);
                    });

                const facetName = fileFacet.name;
                const displayName = this.getFileFacetDisplayName(facetName);
                return {
                    displayName: displayName,
                    facetName: facetName,
                    terms: terms
                };
            })
            .filter((facet) => {
                // now filter out any empty facets.
                return facet.terms.length > 0;
            });

        // Sort by facet name
        filterableFacets.sort((facet0, facet1) => {
            return facet0.displayName > facet1.displayName ? 1 : -1;
        });

        this.filterableFacets = filterableFacets;
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

        this.initFacetGroups();
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
