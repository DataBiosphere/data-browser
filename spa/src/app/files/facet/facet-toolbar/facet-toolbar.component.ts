/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying search component, and facet menu component.
 */

// Core dependencies
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Store } from "@ngrx/store";

// App dependencies
import { AgeRange } from "../facet-age-range/age-range.model";
import { Facet } from "../facet.model";
import { AppState } from "../../../_ngrx/app.state";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import EntitySpec from "../../shared/entity-spec";
import { FileFacet } from "../file-facet/file-facet.model";
import { FacetTermSelectedEvent } from "../file-facet/facet-term-selected.event";
import { SearchTerm } from "../../search/search-term.model";
import { ResponsiveService } from "../../../shared/responsive/responsive.service";
import { Term } from "../../shared/term.model";
import { TermSortService } from "../../sort/term-sort.service";
import { FacetDisplayService } from "../facet-display.service";
import { FacetAgeRange } from "../facet-age-range/facet-age-range.model";
import { AgeUnit } from "../facet-age-range/age-unit.model";
import { FacetGroup } from "../facet-group.model";
import { FacetAgeRangeName } from "../facet-age-range/facet-age-range-name.model";
import { SelectFacetAgeRangeAction } from "../../_ngrx/search/select-facet-age-range.action";
import { ClearSelectedAgeRangeAction } from "../../_ngrx/search/clear-selected-age-range.action";

@Component({
    selector: "facet-toolbar",
    templateUrl: "./facet-toolbar.component.html",
    styleUrls: ["./facet-toolbar.component.scss"],
})

export class FacetToolbarComponent implements OnChanges {

    // Template variables
    public facetDoubleWideOrganismAge: boolean;
    public fileFacetGroups: FacetGroup[];
    public selectIndex: number;
    private openIndex: number;
    private selectedFacet: number;

    // Inputs
    @Input() facets: Facet[];
    @Input() searchTerms: SearchTerm[];
    @Input() selectedSearchTerms: SearchTerm[];
    @Input() selectedEntity: EntitySpec;

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {FacetDisplayService} facetDisplayService
     * @param {ResponsiveService} responsiveService
     * @param {TermSortService} termSortService
     * @param {Store<AppState>} store
     */
    constructor(private deviceService: DeviceDetectorService,
                private facetDisplayService: FacetDisplayService,
                private responsiveService: ResponsiveService,
                private termSortService: TermSortService,
                private store: Store<AppState>) {
    }

    /**
     * Return the minimum value for the specified age range facet.
     * 
     * @param {string} facetName
     * @returns {number}
     */
    getAgeRangeMin(facetName: string): number {
        
        const facet = this.getFacet(facetName) as FacetAgeRange;
        if ( !facet ) {
            return 0;
        }

        return facet.ageRange.ageMin;
    }

    /**
     * Return the maximum value for the specified age range facet.
     *
     * @param {string} facetName
     * @returns {number}
     */
    getAgeRangeMax(facetName: string): number {

        const facet = this.getFacet(facetName) as FacetAgeRange;
        if ( !facet ) {
            return 0;
        }
        
        return facet.ageRange.ageMax;
    }

    /**
     * Return the maximum value for the specified age range facet.
     *
     * @param {string} facetName
     * @returns {AgeUnit}
     */
    getAgeRangeUnit(facetName: string): AgeUnit {

        const facet = this.getFacet(facetName) as FacetAgeRange;
        if ( !facet ) {
            return AgeUnit.year;
        }
        
        return facet.ageRange.ageUnit;
    }

    /**
     * Returns the facet given a facet name.
     * 
     * @param {string} facetName
     * @returns {Facet}
     */
    public getFacet(facetName: string): Facet {

        return this.facets.find(function (fileFacet) {
            return fileFacet.name === facetName;
        });
    }

    /**
     * Returns options container positioning.
     *
     * @param {number} i
     * @param {number} numberOfFacets
     * @param {number} facetGroupCount
     * @param {string[]} facetNames
     * @returns {{[key: string]: string}}
     */
    public getFacetStyles(i: number, numberOfFacets: number, facetGroupCount: number, facetNames: string[]): { [key: string]: string } {

        /* Width of standard facet - either 216px or 256px */
        const widthOfFacet = this.getFacetWidth();
        /* Width of facet ORGANISM_AGE_RANGE is set at 318px */
        let widthOfFacetOrganismAge = 318;
        /* We will test to see if facet ORGANISM_AGE_RANGE fits within the max allowable width at current specified 318px
         * If it doesn't, we will use double the standard facet width */
        this.facetDoubleWideOrganismAge = false;
        /* Facet group includes ORGANISM_AGE_RANGE facet */
        const facetGroupHasOrganismAge = facetNames.includes(FacetAgeRangeName.ORGANISM_AGE_RANGE);
        const widthOfInputBox = document.getElementsByClassName("hca-input")[0].getBoundingClientRect().width;
        /* Width of select box - inclusive of margin 8px on the select box - 158px or 128px */
        const widthOfSelectBox = document.getElementsByClassName("facet-group-menu")[0].getBoundingClientRect().width + 8;
        /* Width of select boxes - (excludes first and last margin - 8px) - 782px or 632px */
        const widthOfSelectBoxes = document.getElementById("select").getBoundingClientRect().width - 8;

        /* AllowableWidth determines whether the fileFacets are able to be left aligned with its select box.
         * Calculated using width of select boxes, i is position of select box, 158px is width inclusive of margin on the select box */
        const allowableWidthIfLeftAligned = (widthOfSelectBoxes - (widthOfSelectBox * i));
        /* Position right - if right aligned */
        const right = (widthOfSelectBox * (facetGroupCount - 1 - i));
        /* Position left - if left aligned */
        const left = this.isWindowWidthSmallTablet() ? (widthOfSelectBox * i) : (widthOfInputBox + (widthOfSelectBox * i) + 8);
        /* Left position of select box - assists with check if fileFacets can be left aligned with screen */
        const leftPosOfSelectBox = this.isWindowWidthSmallTablet() ? ((widthOfSelectBox * (i + 1)) - 8) : ((widthOfSelectBox * (i + 1)) + widthOfInputBox);
        /* Maximum allowable width for facet display */
        const maxAllowableWidth = document.getElementById("filter").offsetWidth;

        /* Width required for fileFacets - 14px for left and right padding and border, 216px or 256px for each facet inside drop down */
        let widthRequired = facetGroupHasOrganismAge ? (numberOfFacets - 1) * widthOfFacet + widthOfFacetOrganismAge + 14 : numberOfFacets * widthOfFacet + 14;
        let maxHeight;

        /* Calculate max allowable height of hca-options - scrolls if extends beyond page bounds */
        if ( this.selectIndex === i ) {

            maxHeight = (document.body.getBoundingClientRect().height - document.getElementById("options").getBoundingClientRect().top) + "px";
        }

        /* Wrap fileFacets if the widthRequired is greater than the maximum allowable width.
         * Calculate number of fileFacets that fits neatly in the first row of the max allowable width.
         * Then calculate new width. */
        if ( widthRequired > maxAllowableWidth ) {

            /* Set facet ORGANISM_AGE_RANGE double wide of standard facet width */
            this.facetDoubleWideOrganismAge = true;

            const numberOfFacetsPerRow = Math.trunc((maxAllowableWidth - 14) / widthOfFacet);
            widthRequired = (numberOfFacetsPerRow * widthOfFacet) + 14;
        }

        /* Rules of alignment:
         * Facets will be left aligned with own select box if it can be contained between itself and last select box.
         * Facets will be left aligned with screen if the widthRequired is greater than the position of the facet's select box.
         * Facets will be right aligned with last select box. */
        let leftPos = widthRequired < allowableWidthIfLeftAligned ? "0" : widthRequired < leftPosOfSelectBox ? "unset" : (-left + "px");
        let rightPos = widthRequired < allowableWidthIfLeftAligned ? "unset" : widthRequired < leftPosOfSelectBox ? (-right + "px") : "unset";
        let minWidth = (widthRequired + "px");
        let maxWidth = widthRequired < allowableWidthIfLeftAligned ? (allowableWidthIfLeftAligned + "px") : (widthOfSelectBoxes + "px");

        return {
            "left": leftPos,
            "maxHeight": maxHeight,
            "maxWidth": maxWidth,
            "minWidth": minWidth,
            "right": rightPos
        };
    }

    /**
     * Returns the width of each facet, determined by screen size.
     *
     * @returns {number}
     */
    public getFacetWidth(): number {

        return (this.isWindowWidthHCAMedium() ? 216 : 256);
    }

    /**
     * Returns the width of organism age facet, determined by screen size.
     *
     * @returns {number}
     */
    public getFacetWidthOrganismAge(): number {

        return (this.isWindowWidthHCAMedium() ? 432 : 318);
    }

    /**
     * Determine display name for specified file facet name. Search terms are grouped by file facet name.
     *
     * @param {string} fileFacetName
     * @returns {name}
     */
    private getFacetDisplayName(fileFacetName: string): string {

        return this.facetDisplayService.getFacetDisplayName(fileFacetName);
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
     * Returns the name of the activeTab
     * @param {EntitySpec} activeTab
     * @returns {string}
     */
    public getLabelName(activeTab: EntitySpec): string {

        return activeTab.displayName;
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
     * Return the set of sorted terms for the specified facet. Terms should only be listed for facets of type FileFacet.
     *
     * @param {string} facetName
     * @returns {Term[]}
     */
    public getSortedFacetTerms(facetName: string): Term[] {

        const facet = this.getFacet(facetName) as FileFacet;
        const sortedTerms = [...facet.terms];
        this.termSortService.sortTerms(facetName, sortedTerms);
        return sortedTerms;
    }

    /**
     * Returns true if device is mobile.
     * @returns {boolean}
     */
    public isDeviceMobile(): boolean {

        return this.deviceService.isMobile();
    }

    /**
     * Returns true if facet is organism age.
     *
     * @param {string} facetName
     * @returns {boolean}
     */
    public isFacetOrganismAge(facetName: string): boolean {

        return facetName === FacetAgeRangeName.ORGANISM_AGE_RANGE;
    }

    /**
     * Returns true if window width is less than 1200px, which is a HCA-specific breakpoint for medium devices.
     *
     * @returns {boolean}
     */
    public isWindowWidthHCAMedium() {

        return this.responsiveService.isWindowWidthHCAMedium();
    }

    /**
     * Returns true if window width is less than 675px. TODO is this a custom HCA breakpoint? If so, rename method.
     *
     * @returns {boolean}
     */
    public isWindowWidthSmall() {

        return this.responsiveService.isWindowWidthSmall();
    }

    /**
     * Returns true if window width is less than 960px, which is a standard Material Design breakpoint.
     *
     * @returns {boolean}
     */
    public isWindowWidthSmallTablet() {

        return this.responsiveService.isWindowWidthSmallTablet();
    }

    /**
     * Handle age range cleared.
     *
     * @param {string} facetName
     * @param {AgeRange} ageRange
     */
    public onAgeRangeCleared(facetName: string, ageRange: AgeRange) {

        this.store.dispatch(new ClearSelectedAgeRangeAction(facetName, ageRange));
    }
    

    /**
     * Handle age range selection and update store with the age range value.
     *
     * @param {string} facetName
     * @param {AgeRange} ageRange
     */
    public onAgeRangeSelected(facetName: string, ageRange: AgeRange) {
        
        this.store.dispatch(new SelectFacetAgeRangeAction(facetName, ageRange));
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param facetTermSelectedEvent {FacetTermSelectedEvent}
     */
    public onFacetTermSelected(facetTermSelectedEvent: FacetTermSelectedEvent) {

        this.store.dispatch(new SelectFileFacetTermAction(
            facetTermSelectedEvent.facetName,
            facetTermSelectedEvent.termName,
            facetTermSelectedEvent.selected));
    }

    /**
     * Mobile only - update state to indicate accordion section is now open, and facet contained inside is visible.
     * 
     * @param {F} f
     * @param {T} t
     */
    public onFacetAccordionOpened(f, t) {

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
     * Update state to indicate facet menu is now open.
     * 
     * @param {number} index - Index of facet group
     */
    public onFacetMenuOpened(index) {

        this.menuOpen.emit(true);
        this.selectIndex = index;
    }

    /**
     * Update state to indicate facet menu is now closed (due to mouseout from menu or click on "apply" events).
     */
    public onFacetMenuClosed() {

        this.menuOpen.emit(false);
        this.selectIndex = null;
        this.openIndex = null;
    }

    /**
     * Track by function used when drawing list of file fileFacets.
     *
     * @param index
     * @param {FileFacet} fileFacet
     * @returns {string}
     */
    public trackFileFacetByFn(index, fileFacet: FileFacet): string {

        return fileFacet.name;
    }

    /**
     * Track by function used when drawing list of file facet groups.
     *
     * @param {number} index
     * @param {FacetGroup} facetGroup
     * @returns {string}
     */
    public trackFileFacetGroupsByFn(index: number, facetGroup: FacetGroup): string {

        return facetGroup.facetGroupName;
    }

    /**
     * Group the specified fileFacets into groups, for display in facet drop downs.
     */
    private initFacetGroups() {

        // Get the set of available fileFacets.
        const specifiedFacetNames = this.facets.map(facet => facet.name);

        // Iterate over the facet groups definition and filter out any fileFacets that are not in the set of
        // available fileFacets.
        this.fileFacetGroups = this.facetDisplayService.FILE_FACET_GROUPS.map((group) => {

            const groupFacetNames = group.facetNames.filter((facetName: string) => {
                return specifiedFacetNames.indexOf(facetName) >= 0;
            });

            return Object.assign({}, group, {
                facetNames: groupFacetNames
            });
        });
    }

    /**
     * Set up facet groups on change of search terms.
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {

        this.initFacetGroups();
    }
}
