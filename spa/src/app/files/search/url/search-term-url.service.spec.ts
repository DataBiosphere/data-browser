/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing search term URL service.
 */

// Core dependencies
import { waitForAsync } from "@angular/core/testing";

// App dependencies
import { SearchTermUrlService } from "./search-term-url.service";
import { QueryStringSearchTerm } from "./query-string-search-term.model";

describe("SearchTermUrlService", () => {
    let searchTermUrlService;

    beforeEach(waitForAsync(() => {
        searchTermUrlService = new SearchTermUrlService();
    }));

    describe("parseQueryStringSearchTerms", () => {
        /**
         * Returns empty array when no filter is specified.
         */
        it("returns empty array when no filter is specified", () => {
            const searchTerms =
                searchTermUrlService.parseQueryStringSearchTerms({});
            expect(searchTerms).toEqual([]);
        });

        /**
         * Parses valid filter
         */
        it("parses valid filter", () => {
            const params = {
                filter: `[{"facetName":"foo","terms":["bar","baz"]}]`,
            };
            const searchTerms =
                searchTermUrlService.parseQueryStringSearchTerms(params);
            const expected = [new QueryStringSearchTerm("foo", ["bar", "baz"])];
            expect(searchTerms).toEqual(expected);
        });

        /**
         * Parses age range valid filter
         */
        it("parses valid age range filter", () => {
            const params = {
                filter: `[{"facetName":"foo","terms":[{"ageMin":0,"ageMax":10,"ageUnit":"year"}]}]`,
            };
            const searchTerms =
                searchTermUrlService.parseQueryStringSearchTerms(params);
            const expected = [
                new QueryStringSearchTerm("foo", [
                    {
                        ageMin: 0,
                        ageMax: 10,
                        ageUnit: "year",
                    },
                ]),
            ];
            expect(searchTerms).toEqual(expected);
        });

        describe("parse errors", () => {
            const parseErrorParams = [
                { filter: "foo" },
                { filter: "{}" },
                { filter: "[]" },
            ];

            /**
             * Throws parse errors on filters that are invalid JSON.
             */
            parseErrorParams.forEach((params) => {
                it(`throws error for invalid filter: ${params.filter}`, () => {
                    const expectedMessage = `${searchTermUrlService["ERROR_TEXT_PARSE"]} "${searchTermUrlService["PARAM_FILTER"]}": ${params.filter}`;
                    expect(() =>
                        searchTermUrlService.parseQueryStringSearchTerms(params)
                    ).toThrowError(expectedMessage);
                });
            });
        });

        describe("syntax errors", () => {
            const syntaxErrorParams = [
                { filter: `[{"terms":""}]` },
                { filter: `[{"facetName":"foo"}]` },
                { filter: `[{"facetName":"foo","terms":"bar"}]` },
                { filter: `[{"facetName":"foo", "terms": [{}]}]` },
                { filter: `[{"facetName":"foo","terms":[{"ageMin":0}]}]` },
            ];

            /**
             * Throws parse errors on filters that are invalid JSON.
             */
            syntaxErrorParams.forEach((params) => {
                it(`throws error for invalid filter: ${params.filter}`, () => {
                    const expectedMessage = `${searchTermUrlService["ERROR_TEXT_SYNTAX"]} "${searchTermUrlService["PARAM_FILTER"]}": ${params.filter}`;
                    expect(() =>
                        searchTermUrlService.parseQueryStringSearchTerms(params)
                    ).toThrowError(expectedMessage);
                });
            });
        });
    });

    xdescribe("stringifySearchTerms", () => {});
});
