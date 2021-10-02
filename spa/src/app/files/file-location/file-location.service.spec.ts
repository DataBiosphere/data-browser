/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing file location service.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { combineLatest, of, Subject } from "rxjs";
import { filter, take } from "rxjs/operators";

// App dependencies
import { APIEndpoints } from "../../config/api-endpoints.model";
import { FileLocationService } from "./file-location.service";
import { FileLocationStatus } from "./file-location-status.model";

describe("FileLocationService", () => {

    const apiResponse301 = {
        Location: "location301",
        "Retry-After": 0, // Keeping retry delay at 0 for tests to prevent timeouts
        Status: 301
    };
    const apiResponse302 = {
        Location: "location302",
        "Retry-After": 0, // Keeping retry delay at 0 for tests to prevent timeouts
        Status: 302
    };
    let killSwitch$;
    const fileUrl = "http://foo.com";
    
    let httpClientSpy: { get: jasmine.Spy };
    let fileLocationService: FileLocationService;

    beforeEach(waitForAsync(() => {

        // Create spy for httpClient.get
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                FileLocationService, 
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }
            ]
        });
        
        fileLocationService = TestBed.inject(FileLocationService);
        killSwitch$ = new Subject<boolean>();
    }));

    describe("Polling", () => {

        /**
         * API endpoint is polled if response status is 301.
         */
        it("polls endpoint on response status 301", (doneFn: DoneFn) => {

            spyOn<any>(fileLocationService, "pollFileLocation").and.callThrough();
            httpClientSpy.get.and.returnValues(of(apiResponse301), of(apiResponse302));
            fileLocationService.fetchFileLocation(fileUrl, killSwitch$).subscribe(() => {

                expect(fileLocationService["pollFileLocation"]).toHaveBeenCalled();
                doneFn();
            });
        });

        /**
         * API endpoint is polled with the location returned in the previous response with status 301.
         */
        it("polls url returned in response with status 301", (doneFn: DoneFn) => {

            spyOn<any>(fileLocationService, "pollFileLocation").and.callThrough();
            httpClientSpy.get.and.returnValues(of(apiResponse301), of(apiResponse302));
            fileLocationService.fetchFileLocation(fileUrl, killSwitch$).subscribe(() => {

                expect(fileLocationService["pollFileLocation"]).toHaveBeenCalledWith(
                    jasmine.objectContaining({
                        fileUrl: apiResponse301.Location
                    }),
                    jasmine.any(Object),
                    jasmine.any(Object)
                );
                doneFn();
            });
        });

        /**
         * API endpoint is not polled if response status is 302.
         */
        it("doesn't poll endpoint on response status 302", (doneFn: DoneFn) => {

            spyOn<any>(fileLocationService, "pollFileLocation").and.callThrough();
            httpClientSpy.get.and.returnValues(of(apiResponse302));
            fileLocationService.fetchFileLocation(fileUrl, killSwitch$).subscribe(() => {

                expect(fileLocationService["pollFileLocation"]).not.toHaveBeenCalled();
                doneFn();
            });
        });

        /**
         * API endpoint is polled until response status is 302 is received.
         */
        it("polls endpoint until response status 302 is returned", (doneFn: DoneFn) => {

            spyOn<any>(fileLocationService, "pollFileLocation").and.callThrough();
            spyOn<any>(fileLocationService, "requestFileLocation").and.callThrough();
            httpClientSpy.get.and.returnValues(of(apiResponse301), of(apiResponse301), of(apiResponse302));
            const fileLocation$ = fileLocationService.fetchFileLocation(fileUrl, killSwitch$);
            const inProgress$ = fileLocation$.pipe(
                filter(fileLocation => fileLocation.status === FileLocationStatus.IN_PROGRESS)
            );
            const completed$ = fileLocation$.pipe(
                filter(fileLocation => fileLocation.status === FileLocationStatus.COMPLETED)
            );
            
            combineLatest(inProgress$, completed$).subscribe(([inProgress, completed$]) => {

                expect(inProgress.status).toEqual(FileLocationStatus.IN_PROGRESS);
                expect(completed$.status).toEqual(FileLocationStatus.COMPLETED);
                doneFn();
            });
        });
    });

    describe("Binding API response", () => {

        /**
         * Response value Location is bound to fileUrl.
         */
        it(`bind fileUrl from "Location" response value`, (doneFn: DoneFn) => {

            const apiResponse = {
                Location: "location",
                "Retry-After": 1,
                Status: 301
            };
            fileLocationService["bindFileLocationAPIResponse"](apiResponse).subscribe(fileLocation => {
                expect(fileLocation.fileUrl).toEqual(apiResponse.Location);
                doneFn();
            });
        });

        /**
         * Response value Retry-After is bound to retryAfter.
         */
        it(`bind retryAfter from "Retry-After" response value`, (doneFn: DoneFn) => {

            const apiResponse = {
                Location: "location",
                "Retry-After": 1,
                Status: 301
            };
            fileLocationService["bindFileLocationAPIResponse"](apiResponse).subscribe(fileLocation => {
                expect(fileLocation.retryAfter).toEqual(apiResponse["Retry-After"]);
                doneFn();
            });
        });

        /**
         * Response status 301 is translated to in progress.
         */
        it("translates 301 to IN_PROGRESS", () => {

            const status = fileLocationService["translateAPIResponseStatus"](301);
            expect(status).toEqual(FileLocationStatus.IN_PROGRESS);
        });

        /**
         * Response status 302 is translated to completed.
         */
        it("translates 302 to COMPLETED", () => {

            const status = fileLocationService["translateAPIResponseStatus"](302);
            expect(status).toEqual(FileLocationStatus.COMPLETED);
        });

        /**
         * Non 301/302 responses are translated to failed.
         */
        it("translates non 30x response status to FAILED", () => {

            const status = fileLocationService["translateAPIResponseStatus"](300);
            expect(status).toEqual(FileLocationStatus.FAILED);
        });

        /**
         * Binds 301 response to in progress file location.
         */
        it("binds 301 response to in progress file location", (doneFn: DoneFn) => {

            httpClientSpy.get.and.returnValues(of(apiResponse301), of(apiResponse302));
            fileLocationService.fetchFileLocation(fileUrl, killSwitch$)
                .pipe(
                    take(1)
                )
                .subscribe((fileLocation) => {
    
                    killSwitch$.next(true);
                    killSwitch$.complete();
                    expect(fileLocation.status).toEqual(FileLocationStatus.IN_PROGRESS);
                    doneFn();
                });
        });

        /**
         * Binds 302 response to completed file location.
         */
        it("binds 302 response to completed file location", (doneFn: DoneFn) => {

            httpClientSpy.get.and.returnValues(of(apiResponse302));
            fileLocationService.fetchFileLocation(fileUrl, killSwitch$).pipe(
                take(1)
            ).subscribe((fileLocation) => {

                expect(fileLocation.status).toEqual(FileLocationStatus.COMPLETED);
                doneFn();
            });
        });
    });
    
    describe("buildFetchFileUrl", () => {
        
        const ORIGIN = "https://foo.com";
        const PATH = "/repository/files/12345";
        const SEARCH = "?catalog=dcp3";

        it(`adds "/fetch" to "/path`, () => {

            const fileUrl = `${ORIGIN}${PATH}${SEARCH}`;
            const fetchFileUrl = fileLocationService["buildFetchFileUrl"](fileUrl);
            expect(fetchFileUrl).toEqual(`${ORIGIN}${APIEndpoints.FETCH}${PATH}${SEARCH}`)
        });

        it(`doesn't adds "/fetch" to "/fetch/path"`, () => {

            const fileUrl = `${ORIGIN}${APIEndpoints.FETCH}${PATH}${SEARCH}`;
            const fetchFileUrl = fileLocationService["buildFetchFileUrl"](fileUrl);
            expect(fetchFileUrl).toEqual(fileUrl)
        });
    });
});
