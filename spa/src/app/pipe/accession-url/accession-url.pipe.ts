/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for creating URL to accessions.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";
import { Accession } from "../../files/project-view/accession.model";

@Pipe({
    name: "camelToSpace"
})
export class AccessionUrlPipe implements PipeTransform {
    
    private IDENTIFIERS_ORG_URL = "https://identifiers.org";
    private ACCESSION_PATH_BY_ACCESSION_KEY = new Map([
        [Accession.arrayExpressAccessions, "arrayexpress"],
        [Accession.geoSeriesAccessions, "geo"],
        [Accession.insdcProjectAccessions, "ena.embl"],
        [Accession.insdcStudyAccessions, "ena.embl"]
    ]);

    /**
     * Convert the accession into the format ${IDENTIFIERS_ORG_PATH}/${ACCESSION_PATH}:${ACCESSION}.
     *
     * @param {string} accessionValue
     * @param {Accession} accessionKey
     * @returns {string}
     */
    transform(accessionValue: string, accessionKey: Accession): string {

        if ( !accessionValue ) {
            return "";
        }

        const accessionPath = this.ACCESSION_PATH_BY_ACCESSION_KEY.get(accessionKey);
        if ( !accessionPath ) {
            console.error("Unable to determine accession path for `${accession}`");
            return "";
        }

        return `${this.IDENTIFIERS_ORG_URL}/${accessionPath}:${accessionValue}`;
    }

}
