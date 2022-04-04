/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for accession URL pipe.
 */

// App dependencies
import { AccessionUrlPipe } from "./accession-url.pipe";
import { ACCESSION_CONFIGS_BY_RESPONSE_KEY } from "../accession-configs";

describe("Pipe: AccessionUrl", () => {
    /**
     * Confirm array express accessions URL is generated correctly.
     */
    it("creates URL for array express accessions", () => {
        const pipe = new AccessionUrlPipe();
        const accessionId = "E-AAAA-00";
        const result = pipe.transform(
            accessionId,
            ACCESSION_CONFIGS_BY_RESPONSE_KEY.get("array_express")
                .identifierOrgPrefix
        );
        const expected = `https://identifiers.org/arrayexpress:${accessionId}`;
        expect(result).toEqual(expected);
    });

    /**
     * Confirm GEO series accessions URL is generated correctly.
     */
    it("creates URL for GEO series accessions", () => {
        const pipe = new AccessionUrlPipe();
        const accessionId = "GSE00000";
        const result = pipe.transform(
            accessionId,
            ACCESSION_CONFIGS_BY_RESPONSE_KEY.get("geo_series")
                .identifierOrgPrefix
        );
        const expected = `https://identifiers.org/geo:${accessionId}`;
        expect(result).toEqual(expected);
    });

    /**
     * Confirm INSDC project accessions URL is generated correctly.
     */
    it("creates URL for INSDC project accessions", () => {
        const pipe = new AccessionUrlPipe();
        const accessionId = "SRP000000";
        const result = pipe.transform(
            accessionId,
            ACCESSION_CONFIGS_BY_RESPONSE_KEY.get("insdc_project")
                .identifierOrgPrefix
        );
        const expected = `https://identifiers.org/ena.embl:${accessionId}`;
        expect(result).toEqual(expected);
    });

    /**
     * Confirm INSDC study accessions URL is generated correctly.
     */
    it("creates URL for INSDC study accessions", () => {
        const pipe = new AccessionUrlPipe();
        const accessionId = "PRJNA000000";
        const result = pipe.transform(
            accessionId,
            ACCESSION_CONFIGS_BY_RESPONSE_KEY.get("insdc_study")
                .identifierOrgPrefix
        );
        const expected = `https://identifiers.org/ena.embl:${accessionId}`;
        expect(result).toEqual(expected);
    });
});
