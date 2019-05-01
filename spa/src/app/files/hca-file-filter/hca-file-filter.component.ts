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
import { FileFacetGroup } from "../shared/file-facet-group.model";
import { FileFacetTermSelectedEvent } from "../shared/file-facet-term-selected.event";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { SearchTerm } from "../search/search-term.model";
import EntitySpec from "../shared/entity-spec";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetDisplayService } from "../shared/file-facet-display.service";
import { ResponsiveService } from "../../shared/responsive/responsive.service";
import { Term } from "../shared/term.model";
import { TermSortService } from "../sort/term-sort.service";

@Component({
    selector: "hca-file-filter",
    templateUrl: "./hca-file-filter.component.html",
    styleUrls: ["./hca-file-filter.component.scss"],
})

export class HCAFileFilterComponent implements OnChanges {

    // Template variables
    fileFacetGroups: FileFacetGroup[];
    openIndex: number;
    selectedFacet: number;
    selectIndex: number;

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() searchTerms: SearchTerm[];
    @Input() selectedSearchTerms: SearchTerm[];
    @Input() selectedEntity: EntitySpec;

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {FileFacetDisplayService} fileFacetDisplayService
     * @param {ResponsiveService} responsiveService
     * @param {TermSortService} termSortService
     * @param {Store<AppState>} store
     */
    constructor(private deviceService: DeviceDetectorService,
                private fileFacetDisplayService: FileFacetDisplayService,
                private responsiveService: ResponsiveService,
                private termSortService: TermSortService,
                private store: Store<AppState>) {
    }

    /**
     * Returns the facet given a facet name
     */
    public getFacet(facetName: string): FileFacet {

        return this.fileFacets.find(function (fileFacet) {
            return fileFacet.name === facetName;
        });
    }

    /**
     * Determine display name for specified file facet name. Search terms are grouped by file facet name.
     *
     * @param {string} fileFacetName
     * @returns {name}
     */
    private getFileFacetDisplayName(fileFacetName: string): string {

        return this.fileFacetDisplayService.getFileFacetDisplayName(fileFacetName);
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
     * Return the set of sorted terms for the specified facet.
     *
     * @param {string} facetName
     * @returns {Term[]}
     */
    public getSortedFacetTerms(facetName: string): Term[] {

        const facet = this.getFacet(facetName);
        const sortedTerms = [...facet.terms];
        this.termSortService.sortTerms(facetName, sortedTerms);
        return sortedTerms;
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
     * Returns true if device is mobile.
     * @returns {boolean}
     */
    public isDeviceMobile(): boolean {

        return this.deviceService.isMobile();
    }

    /**
     * Returns true if window width is less than 1200px.
     *
     * @returns {boolean}
     */
    public isWindowWidthMedium() {

        return this.responsiveService.isWindowWidthMedium();
    }

    /**
     * Returns true if window width is less than 960px.
     *
     * @returns {boolean}
     */
    public isWindowWidthSmallTablet() {

        return this.responsiveService.isWindowWidthSmallTablet();
    }

    /**
     * Returns true if window width is less than 675px.
     *
     * @returns {boolean}
     */
    public isWindowWidthSmall() {

        return this.responsiveService.isWindowWidthSmall();
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetTermSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetTermSelectedEvent) {

        this.store.dispatch(new SelectFileFacetTermAction(fileFacetSelectedEvent.facetName, fileFacetSelectedEvent.termName, true));
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
     * Returns options container positioning.
     *
     * @param {number} i
     * @param {number} numberOfFacets
     * @param {number} facetGroupCount
     * @returns {{[rule: string]: string}}
     */
    public getFacetStyles(i: number, numberOfFacets: number, facetGroupCount: number): { [key: string]: string } {

        /* Width of facet - either 216px or 256px */
        let widthOfFacet = this.getFacetWidth();
        let widthOfInputBox = document.getElementsByClassName("hca-input")[0].getBoundingClientRect().width;
        /* Width of select box - inclusive of margin 8px on the select box - 158px or 128px */
        let widthOfSelectBox = document.getElementsByClassName("hca-select")[0].getBoundingClientRect().width + 8;
        /* Width of select boxes - (excludes first and last margin - 8px) - 782px or 632px */
        let widthOfSelectBoxes = document.getElementById("select").getBoundingClientRect().width - 8;
        /* Width required for facets - 14px for left and right padding and border, 216px or 256px for each facet inside drop down */
        let widthRequired = numberOfFacets * widthOfFacet + 14;
        /* AllowableWidth determines whether the facets are able to be left aligned with its select box.
         * Calculated using width of select boxes, i is position of select box, 158px is width inclusive of margin on the select box */
        let allowableWidthIfLeftAligned = (widthOfSelectBoxes - (widthOfSelectBox * i));
        /* Position right - if right aligned */
        let right = (widthOfSelectBox * (facetGroupCount - 1 - i));
        /* Position left - if left aligned */
        let left = this.isWindowWidthSmallTablet() ? (widthOfSelectBox * i) : (widthOfInputBox + (widthOfSelectBox * i) + 8);
        /* Left position of select box - assists with check if facets can be left aligned with screen */
        let leftPosOfSelectBox = this.isWindowWidthSmallTablet() ? ((widthOfSelectBox * (i + 1)) - 8) : ((widthOfSelectBox * (i + 1)) + widthOfInputBox);
        /* Maximum allowable width for facet display */
        let maxAllowableWidth = document.getElementById("filter").offsetWidth;
        let maxHeight;

        /* Calculate max allowable height of hca-options - scrolls if extends beyond page bounds */
        if ( this.selectIndex === i ) {
            maxHeight = (document.body.getBoundingClientRect().height - document.getElementById("options").getBoundingClientRect().top) + "px";
        }

        /* Wrap facets if the widthRequired is greater than the maximum allowable width.
         * Calculate number of facets that fits neatly in the first row of the max allowable width.
         * Then calculate new width. */
        if ( widthRequired > maxAllowableWidth ) {
            let numberOfFacetsPerRow = Math.trunc((maxAllowableWidth - 14) / widthOfFacet);
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
     * Returns the name of the activeTab
     * @param {EntitySpec} activeTab
     * @returns {string}
     */
    public getLabelName(activeTab: EntitySpec): string {

        return activeTab.displayName;
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
     * Track by function used when drawing list of file facet groups.
     *
     * @param {number} index
     * @param {FileFacetGroup} facetGroup
     * @returns {string}
     */
    public trackFileFacetGroupsByFn(index: number, facetGroup: FileFacetGroup): string {

        return facetGroup.facetGroupName;
    }

    /**
     * Privates
     */

    /**
     * Group the specified facets into groups, for display in facet drop downs.
     */
    private initFacetGroups() {

        // Get the set of available facets.
        const specifiedFacetNames = this.fileFacets.map(facet => facet.name);

        // Iterate over the facet groups definition and filter out any facets that are not in the set of
        // available facets.
        this.fileFacetGroups = this.fileFacetDisplayService.FILE_FACET_GROUPS.map((group) => {

            const groupFacetNames = group.facetNames.filter((facetName: string) => {
                return specifiedFacetNames.indexOf(facetName) >= 0;
            });

            return Object.assign({}, group, {
                facetNames: groupFacetNames
            });
        });
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up facet groups on change of search terms.
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {

        this.initFacetGroups();
    }
}
