/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for organizing and formatting file facet-related values. 
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { CamelToSpacePipe } from "../../cc-pipe/camel-to-space/camel-to-space.pipe";
import { FileFacetGroup } from "./file-facet-group.model";
import { FileFacetNameDisplay } from "./file-facet-name-display.model";

@Injectable()
export class FileFacetDisplayService {

    // File facet groupings
    public readonly FILE_FACET_GROUPS: FileFacetGroup[] = [

        {
            facetGroupName: "Donor",
            facetNames: ["genusSpecies", "organismAge", "organismAgeUnit", "biologicalSex"]
        },
        {
            facetGroupName: "Tissue Type",
            facetNames: ["sampleEntityType", "organ", "organPart", "modelOrgan", "selectedCellType"]
        },
        {
            facetGroupName: "Specimen",
            facetNames: ["disease"]
        },
        {
            facetGroupName: "Method",
            facetNames: ["instrumentManufacturerModel", "preservationMethod", "libraryConstructionApproach"]
        },
        {
            facetGroupName: "File",
            facetNames: ["fileFormat"]
        }
    ];

    private camelToSpacePipe = new CamelToSpacePipe();

    /**
     * Determine display name for specified file facet name. Search terms are grouped by file facet name.
     *
     * @param {string} fileFacetName
     * @returns {name}
     */
    public getFileFacetDisplayName(fileFacetName: string): string {

        const displayName = FileFacetNameDisplay[fileFacetName];
        return displayName ? displayName : this.camelToSpacePipe.transform(fileFacetName);
    }
}

