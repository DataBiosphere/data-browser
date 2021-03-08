/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing catalog service.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { async, TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

// App dependencies
import { CatalogService } from "./catalog.service";
import { ConfigService } from "../../config/config.service";
import { ConfigServiceSpy } from "../../config/config.service.spy";
import { CatalogState } from "../_ngrx/catalog/catalog.state";
import { AtlasName } from "../atlas/atlas-name.model";
import { Catalog } from "./catalog.model";
import { CatalogsAPIResponse } from "./catalogs-api-response.model";

describe("CatalogService", () => {

    let catalogService: CatalogService;
    let configService: { getAtlas: jasmine.Spy, isEnvDCP2: jasmine.Spy };
    let httpClientSpy: { get: jasmine.Spy };
    let store: MockStore;

    const API_RESPONSE = {
        "default_catalog": "dcp2",
        "catalogs": {
            "dcp1": {
                "atlas": AtlasName.HCA,
                "internal": false,
                "plugins": [
                    {
                        "type": "repository",
                        "name": "tdr"
                    },
                    {
                        "type": "metadata",
                        "name": "hca"
                    }
                ]
            },
            "dcp2": {
                "atlas": "hca",
                "internal": false,
                "plugins": [
                    {
                        "type": "repository",
                        "name": "tdr"
                    },
                    {
                        "type": "metadata",
                        "name": "hca"
                    }
                ]
            },
            "lungmap": {
                "atlas": "lungmap",
                "internal": false,
                "plugins": [
                    {
                        "type": "repository",
                        "name": "tdr"
                    },
                    {
                        "type": "metadata",
                        "name": "hca_lungmap"
                    }
                ]
            },
            "lungmapinternal": {
                "atlas": "lungmap",
                "internal": true,
                "plugins": [
                    {
                        "type": "repository",
                        "name": "tdr"
                    },
                    {
                        "type": "metadata",
                        "name": "hca_lungmap"
                    }
                ]
            }
        }
    };
    const API_RESPONSE_WITH_INTERNAL = Object.assign({}, API_RESPONSE, {
        catalogs: {
            ...API_RESPONSE.catalogs,
            "it2": {
                "atlas": "hca",
                "internal": true,
                "plugins": [
                    {
                        "type": "repository",
                        "name": "tdr"
                    },
                    {
                        "type": "metadata",
                        "name": "hca"
                    }
                ]
            }
        }
    });
    const ATLAS = {
        defaultCatalog: "dcp2",
        catalogs: ["dc1", "dc2"]
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                CatalogService,
                {
                    provide: ConfigService,
                    useValue: ConfigServiceSpy
                },
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj("HttpClient", ["get"])
                },
                provideMockStore({
                    initialState: {
                        catalog: CatalogState.getDefaultState()
                    }
                }),
            ]
        });

        catalogService = TestBed.inject(CatalogService);

        // Set default atlas to "hca"
        configService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
        configService.getAtlas.and.returnValue(AtlasName.HCA);

        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
        store = TestBed.inject(MockStore);
    }));

    describe("Catalog request/response", () => {

        beforeEach(async(() => {

            configService.isEnvDCP2.and.returnValue(true);
        }));

        /**
         * Response value default_catalog is bound to defaultCatalog.
         */
        it("bind default catalog from response value", (doneFn: DoneFn) => {

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE).subscribe(atlas => {
                expect(atlas.defaultCatalog).toEqual(API_RESPONSE["default_catalog"]);
                doneFn();
            });
        });

        /**
         * Response catalogs are bound when default catalog is in the set of catalogs for the current atlas.
         */
        it("binds catalogs from response value", (doneFn: DoneFn) => {

            // Filter catalogs for the current atlas
            const atlasName = configService.getAtlas();
            const expectedCatalogs = createExpectedBoundCatalogs(atlasName, API_RESPONSE);

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE).subscribe(atlas => {

                const catalogs = atlas.catalogs;
                expect(catalogs.length).toEqual(expectedCatalogs.length);
                expectedCatalogs.forEach(expectedCatalog => {
                    expect(catalogs.indexOf(expectedCatalog)).not.toEqual(-1);
                });
                doneFn();
            });
        });

        /**
         * Error is thrown when no catalogs are found the current atlas.
         */
        it("throws error when no catalogs found for atlas", (doneFn: DoneFn) => {

            const dummyAtlasName = "abc";
            configService.getAtlas.and.returnValue(dummyAtlasName);

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE)
                .pipe(
                    catchError(e => of(e))
                )
                .subscribe(errorMessage => {

                    expect(errorMessage as any).toEqual(`No catalogs found for atlas "${dummyAtlasName}".`);
                    doneFn();
                });
        });

        /**
         * Error thrown when default catalog is not in the current atlas, and there are more than one catalogs returned.
         */
        it("throws error for atlas with multiple catalogs but without the response default catalog", (doneFn: DoneFn) => {

            const atlasName = configService.getAtlas();
            const apiResponseDummyDefault = Object.assign({}, API_RESPONSE, {
                default_catalog: "foo"
            });

            catalogService["bindCatalogsAPIResponse"](apiResponseDummyDefault)
                .pipe(
                    catchError(e => of(e))
                )
                .subscribe(errorMessage => {

                    expect(errorMessage as any).toEqual(`Default catalog not specified for atlas "${atlasName}".`);
                    doneFn();
                });
        });

        /**
         * Bind single external catalog of atlas that doesn't contain the default catalog.
         */
        it("binds single (external) catalog of atlas without the response default catalog", (doneFn: DoneFn) => {

            // Set atlas name to lungmup
            const lungMapAtlasName = "lungmap";
            configService.getAtlas.and.returnValue(lungMapAtlasName);

            const expectedCatalogs = createExpectedBoundCatalogs(lungMapAtlasName, API_RESPONSE);

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE).subscribe(atlas => {

                const catalogs = atlas.catalogs;
                expect(catalogs.length).toEqual(expectedCatalogs.length);
                expect(catalogs.indexOf(expectedCatalogs[0])).not.toEqual(-1);
                doneFn();
            });
        });

        /**
         * Sets default catalog of atlas that doesn't contain the default catalog, to be the single catalog returned
         * for the atlas.
         */
        it("sets default catalog of atlas without the response default catalog", (doneFn: DoneFn) => {

            // Set atlas name to lungmup
            const lungMapAtlasName = "lungmap";
            configService.getAtlas.and.returnValue(lungMapAtlasName);

            const responseCatalogs = createExpectedBoundCatalogs(lungMapAtlasName, API_RESPONSE);

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE).subscribe(atlas => {

                expect(atlas.defaultCatalog).toEqual(responseCatalogs[0]);
                doneFn();
            });
        });

        /**
         * Creates error model when HTTP request fails.
         */
        it("creates error model on HTTP error", ((doneFn: DoneFn) => {

            catalogService["handleCatalogsAPIResponseError"]().subscribe(error => {

                expect(error).toEqual({
                    catalogs: [],
                    default_catalog: ""
                });
                doneFn();
            });
        }));
    });

    describe("Catalog initialization", () => {

        /**
         * Action to trigger fetch of catalogs is dispatched.
         */
        it("dispatches action to trigger fetch of catalogs", (() => {

            spyOn(store, "dispatch");
            catalogService.initCatalogs();
            expect(store.dispatch).toHaveBeenCalled();
        }));

        /**
         * Init is completed once catalog data is added to store.
         */
        it("completes catalog init once catalogs are added to store", ((doneFn: DoneFn) => {

            catalogService.initCatalogs().then(() => {
                expect(true).toBeTruthy(); // Dummy expect to trigger pass (no value is passed from resolve)
                doneFn();
            });

            // Trigger resolve of promise in init
            store.setState({
                catalog: {
                    atlas: ATLAS,
                    catalog: ATLAS.defaultCatalog,
                    init: true
                }
            });
        }));
    });

    /**
     * Create the expected response catalogs from the specified catalogs.
     *
     * @param {string} atlasName
     * @param {CatalogsAPIResponse} apiResponse
     * @param {boolean} excludeInternal
     * @returns {Catalog[]}
     */
    function createExpectedBoundCatalogs(atlasName: string, apiResponse: CatalogsAPIResponse, excludeInternal: boolean = false): Catalog[] {

        return Object.keys(apiResponse.catalogs).filter((key) => {
            const catalog = apiResponse.catalogs[key];
            if ( catalog.atlas !== atlasName ) {
                return false;
            }

            return !excludeInternal || (excludeInternal && !catalog.internal);
        });
    }
});
