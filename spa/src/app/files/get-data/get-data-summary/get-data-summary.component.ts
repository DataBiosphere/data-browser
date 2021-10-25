/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying get data summary.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

// App dependencies
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FileSummary } from "../../file-summary/file-summary.model";
import { SearchTerm } from "../../search/search-term.model";
import { Term } from "../../shared/term.model";

@Component({
    selector: "get-data-summary",
    templateUrl: "./get-data-summary.component.html",
    styleUrls: ["./get-data-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GetDataSummaryComponent {

    // Inputs
    @Input() filesFacets: FileFacet[]
    @Input() fileSummary: FileSummary;
    @Input() selectedSearchTerms: SearchTerm[];

    /**
     * Returns the effective terms for the disease facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedDiseases(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.DISEASE);
    }

    /**
     * Returns the effective terms for the donor disease facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedDonorDiseases(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.DONOR_DISEASE);
    }

    /**
     * Returns the effective terms for the genus species facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedGenusSpecies(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.GENUS_SPECIES);
    }

    /**
     * Returns the effective terms for the library construction approach facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedLibraryConstructionApproaches(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);
    }

    /**
     * Returns the effective terms for the organ facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedOrgans(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.ORGAN)
    }

    /**
     * Returns the effective terms for the organ part facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedOrganParts(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.ORGAN_PART)
    }

    /**
     * Returns the effective terms for the paired end facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedPairedEnds(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.PAIRED_END);
    }

    /**
     * Returns the effective terms for the specified facet
     *
     * @param {FileFacet[]} fileFacets
     * @param {string} facetName
     * @returns {Term[]}
     */
    private listSelectedTermsOfFacet(fileFacets: FileFacet[], facetName: string): Term[] {

        if ( fileFacets.length ) {
            const facet = fileFacets.find(fileFacet => fileFacet.name === facetName);
            if ( !facet ) {
                return [];
            }
            return facet.getEffectiveTerms();
        }
        else {
            return [];
        }
    }
}
