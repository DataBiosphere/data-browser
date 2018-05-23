// Core dependencies
import { Component, Input } from "@angular/core";
import { FileFacet } from "../shared/file-facet.model";

/**
 * Component wrapper for filtering of term name.
 */
@Component({
    selector: "hca-file-filter-wrapper",
    templateUrl: "./hca-file-filter-wrapper.component.html",
    styleUrls: ["./hca-file-filter-wrapper.component.scss"],
})

export class HCAFileFilterWrapperComponent {

    // Inputs
    @Input() fileFacets: FileFacet[];
    @Input() selectedFacets: FileFacet[];
}
