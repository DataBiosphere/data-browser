/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing files service.
 */

// Core dependencies
import { TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { PROJECTS_ENTITY_API_RESPONSE } from "./entity-api-response.mock";
import { EntityName } from "./entity-name.model";
import { EntityRequestService } from "../entity/entity-request.service";
import { FilesService } from "./files.service";
import { FileSummaryResponse } from "../file-summary/file-summary-response.model";
import { ResponseTermService } from "../http/response-term.service";
import { HttpService } from "../http/http.service";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { DEFAULT_TABLE_PARAMS } from "../table/pagination/table-params.model";
import { PaginationService } from "../table/pagination/pagination.service";

describe("FileService:", () => {
    let httpClientSpy: { get: jasmine.Spy };
    let fileService: FilesService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [],
        });

        const configService = jasmine.createSpyObj("ConfigService", [
            "getEntitiesUrl",
            "getSummaryUrl",
        ]);
        configService.getEntitiesUrl.and.returnValue(""); // Required for testing catalog params on public methods
        configService.getSummaryUrl.and.returnValue(""); // Required for testing catalog params on public methods
        const httpService = new HttpService();
        const termResponseService = new ResponseTermService();
        const searchTermHttpService = new SearchTermHttpService(
            termResponseService
        );

        // Create spy for httpClient.get
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);

        const paginationService = new PaginationService();
        const entityRequestService = new EntityRequestService(
            configService,
            httpService,
            searchTermHttpService,
            paginationService
        );

        fileService = new FilesService(
            configService,
            entityRequestService,
            httpService,
            searchTermHttpService,
            termResponseService,
            <any>httpClientSpy
        );
    }));

    describe("Bind Entity Search Results:", () => {
        /**
         * Confirm both search terms and search entities are returned from bind function.
         */
        it("binds both search terms and search entities", () => {
            // Using square bracket notation here to do a sneaky call of a private method
            const entitySearchResults = fileService[
                "bindEntitySearchResultsResponse"
            ](
                PROJECTS_ENTITY_API_RESPONSE,
                new Map(), // No selected terms
                EntityName.PROJECTS
            );
            expect(entitySearchResults).toBeTruthy();
            expect(entitySearchResults.searchTerms).toBeTruthy(); // Facet terms
            expect(entitySearchResults.searchEntities).toBeTruthy(); // Project IDs
        });
    });

    describe("Fetch Entity Search Results:", () => {
        /**
         * Confirm catalog param is not included in fetch entities if not specified.
         */
        it("doesn't include catalog param if catalog is NONE", () => {
            httpClientSpy.get.and.returnValue(
                of({
                    hits: [],
                    pagination: {},
                    termFacets: [],
                })
            );

            fileService.fetchEntitySearchResults(
                "",
                new Map(),
                DEFAULT_TABLE_PARAMS,
                EntityName.PROJECTS,
                true
            );

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(httpClientSpy.get).not.toHaveBeenCalledWith(
                jasmine.anything(),
                {
                    params: jasmine.objectContaining({
                        catalog: "",
                    }),
                }
            );
        });

        /**
         * Confirm catalog param is included in fetch entities if specified.
         */
        it("includes catalog param if catalog is DCP1", () => {
            httpClientSpy.get.and.returnValue(
                of({
                    hits: [],
                    pagination: {},
                    termFacets: [],
                })
            );

            const catalog = DCPCatalog.DCP1;
            fileService.fetchEntitySearchResults(
                catalog,
                new Map(),
                DEFAULT_TABLE_PARAMS,
                EntityName.PROJECTS,
                true
            );

            expect(httpClientSpy.get).toHaveBeenCalledWith(jasmine.anything(), {
                params: jasmine.objectContaining({
                    catalog,
                }),
            });
        });
    });

    describe("Fetch FileSummary:", () => {
        /**
         * Confirm catalog param is not included in fetch summary if not specified.
         */
        it("doesn't include catalog param if catalog is NONE", () => {
            httpClientSpy.get.and.returnValue(
                of({
                    donorCount: 0,
                    fileCount: 0,
                    fileTypeSummaries: [],
                    organTypes: [],
                    projectCount: 0,
                    specimenCount: 0,
                    totalCellCount: 0,
                    totalFileSize: 0,
                })
            );

            fileService.fetchFileSummary("", []);

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(httpClientSpy.get).not.toHaveBeenCalledWith(
                jasmine.anything(),
                {
                    params: jasmine.objectContaining({
                        catalog: "",
                    }),
                }
            );
        });

        /**
         * Confirm catalog param is included in fetch summary if specified.
         */
        it("includes catalog param if catalog is DCP1", () => {
            httpClientSpy.get.and.returnValue(
                of({
                    donorCount: 0,
                    fileCount: 0,
                    fileTypeSummaries: [],
                    organTypes: [],
                    projectCount: 0,
                    specimenCount: 0,
                    totalCellCount: 0,
                    totalFileSize: 0,
                })
            );

            const catalog = DCPCatalog.DCP1;
            fileService.fetchFileSummary(catalog, []);

            expect(httpClientSpy.get).toHaveBeenCalledWith(jasmine.anything(), {
                params: jasmine.objectContaining({
                    catalog,
                }),
            });
        });

        /**
         * Confirm total cell count is calculated correctly.
         */
        it("calculates total cell count", () => {
            const count0 = 12086;
            const count1 = 7439535;
            const count2 = 921060;
            const stubFileSummaryResponse = {
                projects: [
                    {
                        projects: {
                            estimatedCellCount: count0, // Add this
                        },
                        cellSuspensions: {
                            totalCells: null,
                        },
                    },
                    {
                        projects: {
                            estimatedCellCount: null,
                        },
                        cellSuspensions: {
                            totalCells: count1, // Plus this
                        },
                    },
                    {
                        projects: {
                            estimatedCellCount: count2, // Plus this
                        },
                        cellSuspensions: {
                            totalCells: 933134.0,
                        },
                    },
                ],
            } as FileSummaryResponse;
            const actual = fileService["calculateSummaryTotalCellCount"](
                stubFileSummaryResponse
            );
            expect(actual).toEqual(count0 + count1 + count2);
        });
    });
});
