/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing matrix service.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";
import { ConfigService } from "../../config/config.service";
import { of } from "rxjs";

// App dependencies
import { FileManifestService } from "./file-manifest.service";
import { HttpService } from "../http/http.service";
import { ResponseTermService } from "../http/response-term.service";
import { MatrixService } from "./matrix.service";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { GTMService } from "../../shared/analytics/gtm.service";

describe("MatrixService:", () => {

    let httpClientSpy: { get: jasmine.Spy };
    let matrixService: MatrixService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
            ],
            providers: [{
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", ["getMatrixUrl", "getProjectPreparedMatrixDownloadUrl"])
                },
                {
                    provide: FileManifestService,
                    useValue: jasmine.createSpyObj("FileManifestService", [
                        "buildManifestSearchTerms",
                        "requestFileManifestUrl",
                        "requestMatrixFileManifestUrl",
                        "fetchFileManifestFileSummary"
                    ])
                },
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                }]
        });

        const configService = TestBed.inject(ConfigService);
        const httpService = new HttpService();
        const fileManifestService = TestBed.inject(FileManifestService);
        const gtmService = TestBed.inject(GTMService);

        const termResponseService = new ResponseTermService();
        const searchTermService = new SearchTermHttpService(termResponseService);
        
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        matrixService = new MatrixService(configService, gtmService, httpService, fileManifestService, searchTermService, <any>httpClientSpy);
    }));

    /**
     * Smoke test
     */
    it("should create service", () => {

        expect(matrixService).toBeTruthy();
    });

    describe("buildMatrixPartialQueryStatus:", () => {

        // /**
        //  * Array express accessions, when specified, should be mapped.
        //  */
        // it("should map array express accessions", (done: DoneFn) => {
        //
        //     const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        //     httpClientSpy.get.and.returnValue(of(projectToMap));
        //     projectService.fetchProjectById("123abc").subscribe((mappedProject) => {
        //
        //         expect(mappedProject.arrayExpressAccessions).toEqual(projectToMap.projects[0].arrayExpressAccessions.join(", "));
        //         return done();
        //     });
        // });
    });
});
