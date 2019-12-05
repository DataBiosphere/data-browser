/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of matrix URLs (one per species) for a given project.
 */

// App dependencies
import { GenusSpecies } from "./genus-species.model";
import { SpeciesMatrixUrls } from "./species-matrix-urls.model";
import { FileDownloadLink } from "../../shared/file-download/file-download.model";

export class ProjectMatrixUrls {

    constructor(public readonly entityId: string,
                public readonly urlsBySpecies: Map<GenusSpecies, SpeciesMatrixUrls>) {
    }

    /**
     * Returns the distinct set of available file formats, for this project.
     *
     * @returns {string[]}
     */
    public listAvailableMatrixFileFormats(): string[] {

        const fileTypeSet = [...this.urlsBySpecies.values()].reduce((accum, urlsBySpecies) => {
            urlsBySpecies.listMatrixUrls()
                .map((fileDownloadLink: FileDownloadLink) => fileDownloadLink.name)
                .forEach((fileType: string) => accum.add(fileType));
            return accum;
        }, new Set<string>());

        return [...fileTypeSet];
    }

    /**
     * List the set of species that have associated matrix downloads, for this project.
     *
     * @returns {GenusSpecies[]}
     */
    public listSpeciesWithMatrixUrls(): GenusSpecies[] {

        return Array.from(this.urlsBySpecies.keys()).filter(species => {
            return this.urlsBySpecies.get(species).isAnyMatrixUrlAvailable();
        });
    }

    /**
     * List the set of matrix URLs for the specified species.
     *
     * @param {GenusSpecies} species
     * @returns {FileDownloadLink[]}
     */
    public listMatrixUrlsBySpecies(species: GenusSpecies): FileDownloadLink[] {

        return this.urlsBySpecies.get(species).listMatrixUrls();
    }


    /**
     * Returns true if a project matrix, in any format, for any species, is available for download
     *
     * @returns {boolean}
     */
    public isAnyProjectMatrixUrlAvailable(): boolean {

        if ( this.urlsBySpecies.size === 0 ) {
            return false;
        }

        return Array.from(this.urlsBySpecies.keys()).some((species) => {
            return this.urlsBySpecies.get(species).isAnyMatrixUrlAvailable();
        });
    }
}
