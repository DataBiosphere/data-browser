/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing Terra service.
 */

// Core dependencies
import { TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";

// App dependencies
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { EntityRequestService } from "../entity/entity-request.service";
import { ExportToTerraStatus } from "./export-to-terra-status.model";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FilesService } from "./files.service";
import { FileManifestService } from "../file-manifest/file-manifest.service";
import { HttpService } from "../http/http.service";
import { ResponseTermService } from "../http/response-term.service";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { PaginationService } from "../table/pagination/pagination.service";
import { TerraService } from "./terra.service";
import { ManifestDownloadFormat } from "../file-manifest/manifest-download-format.model";

describe("TerraService:", () => {

    let httpClientSpy: { get: jasmine.Spy };
    let terraService: TerraService;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: []
        });

        const configService =
            jasmine.createSpyObj("ConfigService", ["getEntitiesUrl", "getSummaryUrl", "getFileManifestUrl"]);
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

        const fileManifestService = new FileManifestService(
            configService,
            filesService,
            searchTermHttpService,
            <any>httpClientSpy);
        
        terraService = new TerraService(
            configService,
            fileManifestService,
            searchTermHttpService,
            <any>httpClientSpy);
    }));

    /**
     * Confirm catalog param is not included in export to Terra if not specified.
     */
    it("doesn't include catalog param in file manifest URL request if catalog is NONE", () => {

        httpClientSpy.get.and.returnValue(of({
            status: ExportToTerraStatus.IN_PROGRESS
        }));

        terraService.exportToTerra(
            "", 
            [],
            new FileFacet(FileFacetName.FILE_FORMAT, 0, []),
            ManifestDownloadFormat.TERRA_BDBAG, 
            of());

                expect(httpClientSpy.get).toHaveBeenCalled();
                expect(httpClientSpy.get).not.toHaveBeenCalledWith(
                    jasmine.anything(),
                    {
                        params: jasmine.stringMatching(/catalog\=dcp1/)
                    }
                );
                
    });

    /**
     * Confirm catalog param is included in export to Terra if specified.
     */
    it("includes catalog param if catalog is DCP1", () => {

        httpClientSpy.get.and.returnValue(of({
            status: ExportToTerraStatus.IN_PROGRESS
        }));

        const catalog = DCPCatalog.DCP1;
        terraService.exportToTerra(
            catalog,
            [],
            new FileFacet(FileFacetName.FILE_FORMAT, 0, []),
            ManifestDownloadFormat.TERRA_BDBAG,
            of());

            expect(httpClientSpy.get).toHaveBeenCalledWith(
                jasmine.anything(),
                {
                    params: jasmine.stringMatching(/catalog\=dcp1/)
                }
            );
    });
});
