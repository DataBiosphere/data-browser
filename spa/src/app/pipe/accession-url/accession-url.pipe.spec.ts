/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for accession URL pipe.
 */

// App dependencies
import { AccessionUrlPipe } from "./accession-url.pipe";
import { AccessionNamespace } from "../../files/accession/accession-namespace.model";

describe("Pipe: AccessionUrl", () => {

    /**
     * Confirm array express accessions URL is generated correctly.
     */
    it("creates URL for array express accessions", () => {
        
        const pipe = new AccessionUrlPipe();
        const accessionValue = "E-AAAA-00";
        const namespace = AccessionNamespace.ARRAY_EXPRESS;
        const result = pipe.transform(namespace, accessionValue);
        const expected = `https://identifiers.org/arrayexpress:${accessionValue}`;
        expect(result).toEqual(expected);
    });

    /**
     * Confirm GEO series accessions URL is generated correctly.
     */
    it("creates URL for GEO series accessions", () => {

        const pipe = new AccessionUrlPipe();
        const accessionValue = "GSE00000";
        const namespace = AccessionNamespace.GEO_SERIES;
        const result = pipe.transform(namespace, accessionValue);
        const expected = `https://identifiers.org/geo:${accessionValue}`;
        expect(result).toEqual(expected);
    });

    /**
     * Confirm INSDC project accessions URL is generated correctly.
     */
    it("creates URL for INSDC project accessions", () => {

        const pipe = new AccessionUrlPipe();
        const accessionValue = "SRP000000";
        const namespace = AccessionNamespace.INSDC_PROJECT;
        const result = pipe.transform(namespace, accessionValue);
        const expected = `https://identifiers.org/ena.embl:${accessionValue}`;
        expect(result).toEqual(expected);
    });

    /**
     * Confirm INSDC study accessions URL is generated correctly.
     */
    it("creates URL for INSDC study accessions", () => {

        const pipe = new AccessionUrlPipe();
        const accessionValue = "PRJNA000000";
        const namespace = AccessionNamespace.INSDC_STUDY;
        const result = pipe.transform(namespace, accessionValue);
        const expected = `https://identifiers.org/ena.embl:${accessionValue}`;
        expect(result).toEqual(expected);
    });
});
