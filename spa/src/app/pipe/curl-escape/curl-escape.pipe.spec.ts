/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for CURL escape pipe.
 */

/* tslint:disable:no-unused-variable */

// App dependencies
import { CurlEscapePipe } from "./curl-escape.pipe";

describe("Pipe: CurlEscape", () => {

    /**
     * Confirm pipe converts null to empty string. 
     */
    it(`converts null values to empty string`, () => {
        const pipe = new CurlEscapePipe();
        expect(pipe.transform(null)).toEqual("");
    });

    /**
     * Confirm pipe escapes single quotes.
     */
    it(`escapes single quotes`, () => {
        const pipe = new CurlEscapePipe();
        expect(pipe.transform("'lorem'")).toEqual("\\'lorem\\'");
    });

    /**
     * Confirm pipe escapes backslashes.
     */
    it(`escapes backslashes`, () => {
        const pipe = new CurlEscapePipe();
        expect(pipe.transform("\\lorem\\")).toEqual("\\\\lorem\\\\");
    });

    /**
     * Confirm pipe escapes backslashes and single quotes.
     */
    it(`escapes backslashes and single quotes`, () => {
        const pipe = new CurlEscapePipe();
        expect(pipe.transform("\\lorem\\'lorem'")).toEqual("\\\\lorem\\\\\\'lorem\\'");
    });
});
