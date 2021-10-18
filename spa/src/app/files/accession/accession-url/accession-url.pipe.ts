/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for creating URL to accessions.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AccessionConfig } from "../accession-config.model";

@Pipe({
    name: "accessionUrl"
})
export class AccessionUrlPipe implements PipeTransform {
    
    private IDENTIFIERS_ORG_URL = "https://identifiers.org";

    /**
     * Convert the accession into the format ${IDENTIFIERS_ORG_PATH}/${ACCESSION_PATH}:${ACCESSION}.
     *
     * @param {string} accessionId
     * @param {AccessionConfig} accessionConfig
     * @returns {string}
     */
    transform(accessionId: string, accessionConfig: AccessionConfig): string {

        if ( !accessionId || !accessionConfig ) {
            return "";
        }
        
        const { identifierOrgPrefix } = accessionConfig;
        if ( !accessionId || !identifierOrgPrefix ) {
            console.error("Unable to determine accession path for `${accession}`");
            return "";
        }

        return `${this.IDENTIFIERS_ORG_URL}/${identifierOrgPrefix}:${accessionId}`;
    }

}
