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

export class HCAFileFilterWrapperComponent implements OnChanges {

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];

    @Output() hcaFilterWrapper = new EventEmitter<number>();


    /**
     * Public API
     */

    /**
     * Returns component heights for calculating sticky header position
     */
    public getComponentHeight() {

        // Get height of component
        let hcaFilterWrapper = document.getElementById("hcaFilterWrapper");

        // Update wrapper height
        this.hcaFilterWrapper.emit(hcaFilterWrapper.offsetHeight);
    }

    /**
     * Life cycle hooks
     */

    /**
     * On Changes
     */
    public ngOnChanges() {
        this.getComponentHeight();
    }
}
