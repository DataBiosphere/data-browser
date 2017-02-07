// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy
} from "@angular/core";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";

/**
 * Component for displaying grid of facets.
 */
@Component({
    selector: "bw-file-facets",
    templateUrl: "./file-facets.component.html",
    styleUrls: ["./file-facets.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetsComponent {

  // Inputs
  @Input() fileFacets: FileFacet[];

    /**
     * Return true if file facet interface type is SEARCH.
     *
     * @param fileFacet {FileFacet}
     * @returns {boolean}
     */
    public isInterfaceTypeSearch(fileFacet: FileFacet): boolean {

        return fileFacet.isInterfaceTypeSearch();
    }
}
