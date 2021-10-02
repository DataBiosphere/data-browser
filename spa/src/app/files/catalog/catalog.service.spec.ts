/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing catalog service.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
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
import { DCPCatalog } from "./dcp-catalog.model";

describe("CatalogService", () => {

    let catalogService: CatalogService;
    let configService: ConfigService;
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
    const ATLAS = {
        defaultCatalog: "dcp2",
        catalogs: ["dc1", "dc2"]
    };
    const CONFIG_ATLAS_NAME = AtlasName.HCA;
    const CONFIG_DEFAULT_CATALOG = DCPCatalog.DCP2;


    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                CatalogService,
                ConfigService,
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

        // Set default atlas to "hca" and default catalog to "dcp2"
        configService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;

        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
        store = TestBed.inject(MockStore);
    }));

    describe("Catalog request/response", () => {

        /**
         * Valid default catalog specified in config is set as default catalog
         */
        it("sets valid default catalog from config", (doneFn: DoneFn) => {

            spyOn(configService, "getAtlas").and.returnValue(CONFIG_ATLAS_NAME);
            spyOn(configService, "getDefaultCatalog").and.returnValue(CONFIG_DEFAULT_CATALOG);

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE).subscribe(atlas => {
                expect(atlas.defaultCatalog).toEqual(CONFIG_DEFAULT_CATALOG);
                doneFn();
            });
        });

        /**
         * An error is thrown when configured default catalog is not in the set of catalogs returned from Azul.
         */
        it("throws error on invalid default catalog in config", (doneFn: DoneFn) => {

            spyOn(configService, "getAtlas").and.returnValue(CONFIG_ATLAS_NAME);
            
            const invalidDefaultCatalog = "foo";
            spyOn(configService, "getDefaultCatalog").and.returnValue(invalidDefaultCatalog);

            catalogService["bindCatalogsAPIResponse"](API_RESPONSE)
                .pipe(
                    catchError(e => of(e))
                )
                .subscribe(errorMessage => {

                    const expectedErrorMessage =
                        `Invalid default catalog "${invalidDefaultCatalog}" for atlas "${CONFIG_ATLAS_NAME}".`;
                    expect(errorMessage as any).toEqual(expectedErrorMessage);
                    doneFn();
                });
        });

        /**
         * Response catalogs are bound when default catalog is in the set of catalogs for the current atlas.
         */
        it("binds catalogs from response value", (doneFn: DoneFn) => {

            spyOn(configService, "getAtlas").and.returnValue(CONFIG_ATLAS_NAME);
            spyOn(configService, "getDefaultCatalog").and.returnValue(CONFIG_DEFAULT_CATALOG);

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

            const dummyAtlasName = "foo";
            spyOn(configService, "getAtlas").and.returnValue(dummyAtlasName);

            spyOn(configService, "getDefaultCatalog").and.returnValue(CONFIG_DEFAULT_CATALOG);

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
