// Core dependencies
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FileFacet } from "../shared/file-facet.model";

/**
 * Component wrapper for filtering of term name.
 */
@Component({
    selector: "hca-file-filter-wrapper",
    templateUrl: "./hca-file-filter-wrapper.component.html",
    styleUrls: ["./hca-file-filter-wrapper.component.scss"],
})

export class HCAFileFilterWrapperComponent implements OnInit, OnChanges {

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];

    // Outputs
    @Output() hcaFilterWrapperEvent = new EventEmitter<number>();

    // Public variables
    public hcaFilterWrapper;
    public hcaFilterWrapperHeight: number;

    /**
     * Public API
     */

    /**
     * Sets up element by id and get initial component height
     */
    public getComponentElementById() {
        this.hcaFilterWrapper = document.getElementById("hcaFilterWrapper");
        this.hcaFilterWrapperHeight = this.hcaFilterWrapper.offsetHeight;
        this.hcaFilterWrapper.style.minHeight = this.hcaFilterWrapperHeight + "px";
    }

    /**
     * Returns event to parent if component height is changed
     */
    public getComponentHeight() {

        if ( this.hcaFilterWrapper ) {

            // Event fired if height of component changes
            if ( this.hcaFilterWrapperHeight != this.hcaFilterWrapper.offsetHeight ) {

                // Update wrapper height
                this.hcaFilterWrapperHeight = this.hcaFilterWrapper.offsetHeight;
                this.hcaFilterWrapperEvent.emit();
            }
        }
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up
     */
    public ngOnInit() {

        // Sets up element by id
        this.getComponentElementById();
    }

    /**
     * On Changes
     */
    public ngOnChanges() {
        this.getComponentHeight();
    }
}
