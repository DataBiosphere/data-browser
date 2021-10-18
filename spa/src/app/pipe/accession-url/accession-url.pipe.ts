/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for creating URL to accessions.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AccessionNamespace } from "../../files/accession/accession-namespace.model";

@Pipe({
    name: "accessionUrl"
})
export class AccessionUrlPipe implements PipeTransform {
    
    private IDENTIFIERS_ORG_URL = "https://identifiers.org";
    private ACCESSION_PATH_BY_ACCESSION_KEY = new Map([
        [AccessionNamespace.ARRAY_EXPRESS, "arrayexpress"],
        [AccessionNamespace.BIOSTUDIES, "biostudies"],
        [AccessionNamespace.GEO_SERIES, "geo"],
        [AccessionNamespace.INSDC_PROJECT, "ena.embl"],
        [AccessionNamespace.INSDC_STUDY, "ena.embl"]
    ]);

    /**
     * Convert the accession into the format ${IDENTIFIERS_ORG_PATH}/${ACCESSION_PATH}:${ACCESSION}.
     *
     * @param {AccessionNamespace} namespace
     * @param {string} accessionValue
     * @returns {string}
     */
    transform(namespace: AccessionNamespace, accessionValue: string): string {

        if ( !accessionValue ) {
            return "";
        }

        const accessionPath = this.ACCESSION_PATH_BY_ACCESSION_KEY.get(namespace);
        if ( !accessionPath ) {
            console.error("Unable to determine accession path for `${accession}`");
            return "";
        }

        return `${this.IDENTIFIERS_ORG_URL}/${accessionPath}:${accessionValue}`;
    }

}
