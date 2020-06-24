/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for organizing and formatting file facet-related values.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { FacetGroup } from "./facet-group.model";
import { FileFacetNameDisplay } from "./file-facet/file-facet-name-display.model";
import { CamelToSpacePipe } from "../../pipe/camel-to-space/camel-to-space.pipe";

@Injectable()
export class FacetDisplayService {

    // File facet groupings
    public readonly FILE_FACET_GROUPS: FacetGroup[] = [

        {
            facetGroupName: "Donor",
            facetNames: ["genusSpecies", "organismAgeRange", "biologicalSex", "donorDisease"]
        },
        {
            facetGroupName: "Tissue Type",
            facetNames: ["sampleEntityType", "specimenOrgan", "specimenOrganPart", "modelOrgan", "selectedCellType"]
        },
        {
            facetGroupName: "Specimen",
            facetNames: ["specimenDisease"]
        },
        {
            facetGroupName: "Method",
            facetNames: ["instrumentManufacturerModel", "preservationMethod", "libraryConstructionApproach", "pairedEnd", "workflow"]
        },
        {
            facetGroupName: "File",
            facetNames: ["fileFormat"]
        }
    ];

    private camelToSpacePipe = new CamelToSpacePipe();

    /**
     * Determine display name for specified facet name. Search terms are grouped by file facet name.
     *
     * @param {string} fileFacetName
     * @returns {name}
     */
    public getFacetDisplayName(fileFacetName: string): string {

        const displayName = FileFacetNameDisplay[fileFacetName];
        return displayName ? displayName : this.camelToSpacePipe.transform(fileFacetName);
    }
}

