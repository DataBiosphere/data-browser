/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing file manifest service.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { EntityRequestService } from "../entity/entity-request.service";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileManifestService } from "./file-manifest.service";
import { FilesService } from "./files.service";
import { ResponseTermService } from "../http/response-term.service";
import { HttpService } from "../http/http.service";
import { ManifestStatus } from "./manifest-status.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { GTMService } from "../../shared/analytics/gtm.service";
import { PaginationService } from "../table/pagination/pagination.service";

describe("FileManifestService:", () => {

    let httpClientSpy: { get: jasmine.Spy };
    let fileManifestService: FileManifestService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                }
            ]
        });

        const configService = jasmine.createSpyObj("ConfigService", ["getEntitiesUrl", "getSummaryUrl", "getFileManifestUrl"]);
        configService.getEntitiesUrl.and.returnValue(""); // Required for testing catalog params on public methods
        configService.getSummaryUrl.and.returnValue(""); // Required for testing catalog params on public methods
        configService.getFileManifestUrl.and.returnValue(""); // Required for testing catalog params on public methods
        
        const responseTermService = new ResponseTermService();
        const searchTermHttpService = new SearchTermHttpService(responseTermService);

        const httpService = new HttpService();
        const paginationService = new PaginationService();
        const entityRequestService = new EntityRequestService(configService, httpService, searchTermHttpService, paginationService);
        const filesService = new FilesService(
            configService,
            entityRequestService,
            httpService,
            searchTermHttpService,
            responseTermService,
            <any>httpClientSpy);

        // Create spy for httpClient.get
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);

        fileManifestService = new FileManifestService(
            configService,
            filesService,
            TestBed.inject(GTMService),
            searchTermHttpService,
            <any>httpClientSpy);
    }));

    /**
     * Confirm catalog param is not included in file manifest URL request if not specified.
     */
    it("doesn't include catalog param if catalog is NONE", (done: DoneFn) => {

        httpClientSpy.get.and.returnValue(of({
            status: ManifestStatus.NOT_STARTED
        }));

        fileManifestService.requestFileManifestUrl(
            Catalog.NONE, 
            [],
            new FileFacet(FileFacetName.FILE_FORMAT, 0, []),
            of()).subscribe(() => {

                expect(httpClientSpy.get).toHaveBeenCalled();
                expect(httpClientSpy.get).not.toHaveBeenCalledWith(
                    jasmine.anything(),
                    {
                        params: jasmine.stringMatching(/catalog\=dcp1/)
                    }
                );
                
                done();
            });
    });

    /**
     * Confirm catalog param is included in file manifest URL request if specified.
     */
    it("includes catalog param if catalog is DCP1", (done: DoneFn) => {

        httpClientSpy.get.and.returnValue(of({
            status: ManifestStatus.NOT_STARTED
        }));

        const catalog = Catalog.DCP1;
        fileManifestService.requestFileManifestUrl(
            catalog,
            [],
            new FileFacet(FileFacetName.FILE_FORMAT, 0, []),
            of()).subscribe(() => {

            expect(httpClientSpy.get).toHaveBeenCalledWith(
                jasmine.anything(),
                {
                    params: jasmine.stringMatching(/catalog\=dcp1/)
                }
            );
            
            done();
        });
    });
});
