/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing projects service.
 */

// Core dependencies
import { TestBed, waitForAsync } from "@angular/core/testing";
import { ConfigService } from "../../config/config.service";
import { provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { filter } from "rxjs/operators";

// App dependencies
import { ConfigState } from "../../config/_ngrx/config.state";
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { HttpService } from "../http/http.service";
import { ResponseTermService } from "../http/response-term.service";
import { ProjectService } from "./project.service";
import { PROJECT_ROW_NULL_VALUES, } from "../projects/project-row-mapper.mock";

import {
    PROJECT_SINGLE_VALUES,
    PROJECT_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "../project/project-mapper.mock";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { Project } from "../shared/project.model";
import { mapMultipleValues } from "../entities/entity-row-mapper.spec";
import { AccessionNamespace } from "../accession/accession-namespace.model";

describe("ProjectService", () => {

    let httpClientSpy: { get: jasmine.Spy };
    let projectService: ProjectService;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                ConfigService,
                provideMockStore({
                    initialState: {
                        catalog: ConfigState.getDefaultState()
                    }
                })
            ]
        });

        const httpService = new HttpService();
        const termResponseService = new ResponseTermService();
        const searchTermService = new SearchTermHttpService(termResponseService);

        const configService = TestBed.inject(ConfigService);
        spyOn(configService, "getProjectUrl").and.returnValue(""); // Required for testing catalog params on public methods
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        projectService = new ProjectService(configService, httpService, searchTermService, <any>httpClientSpy);
    }));

    describe("fetchProjectById", () => {

        const RESPONSE_KEYS_BY_NAMESPACE = {
            [AccessionNamespace.ARRAY_EXPRESS]: "array_express",
            [AccessionNamespace.GEO_SERIES]: "geo_series",
            [AccessionNamespace.INSDC_PROJECT]: "insdc_project",
            [AccessionNamespace.INSDC_STUDY]: "insdc_study"
        };

        describe("accessions", () => {

            Object.keys(AccessionNamespace).forEach(accessionNamespace => {

                /**
                 * Project mapper maps accessions to correct format.
                 */
                it("maps single value accessions", (done: DoneFn) => {

                    const accession = "123";
                    const projectToMap = {
                        projects: [{
                            accessions: [{
                                namespace: RESPONSE_KEYS_BY_NAMESPACE[accessionNamespace],
                                accession
                            }]
                        }]
                    };
                    httpClientSpy.get.and.returnValue(of(projectToMap));
                    projectService.fetchProjectById("", "123abc", {} as Project)
                        .subscribe((mappedProject) => {

                            const {accessionsByNamespace} = mappedProject;
                            const actual = accessionsByNamespace.get(AccessionNamespace[accessionNamespace])
                                .map(accession => accession.accession);
                            expect(actual).toEqual([accession]);
                            return done();
                        });
                });

                /**
                 * Maps multiple accession values for accession namespace.
                 */
                it("maps multi value accessions", (done: DoneFn) => {

                    const accession0 = "123";
                    const accession1 = "456";
                    const responseKey = RESPONSE_KEYS_BY_NAMESPACE[accessionNamespace];
                    const projectToMap = {
                        projects: [{
                            accessions: [{
                                namespace: responseKey,
                                accession: accession0
                            }, {
                                namespace: responseKey,
                                accession: accession1
                            }]
                        }]
                    };
                    httpClientSpy.get.and.returnValue(of(projectToMap));
                    projectService.fetchProjectById("", "123abc", {} as Project)
                        .subscribe((mappedProject) => {

                            const {accessionsByNamespace} = mappedProject;
                            const actual = accessionsByNamespace.get(AccessionNamespace[accessionNamespace])
                                .map(accession => accession.accession);
                            expect(actual).toEqual([accession0, accession1]);
                            return done();
                        });
                });

                /**
                 * Empty accessions object mapped as empty array.
                 */
                it("maps empty accessions", (done: DoneFn) => {

                    const projectToMap = {
                        projects: [{
                            accessions: []
                        }]
                    };
                    httpClientSpy.get.and.returnValue(of(projectToMap));
                    projectService.fetchProjectById("", "123abc", {} as Project)
                        .subscribe((mappedProject) => {

                            const {accessionsByNamespace} = mappedProject;
                            expect(accessionsByNamespace.size).toBe(0);
                            return done();
                        });
                });

                /**
                 * Null accessions object mapped as empty array.
                 */
                it("maps null accessions to empty array", (done: DoneFn) => {

                    const projectToMap = {
                        projects: [{
                            accessions: null
                        }]
                    };
                    httpClientSpy.get.and.returnValue(of(projectToMap));
                    projectService.fetchProjectById("", "123abc", {} as Project)
                        .subscribe((mappedProject) => {

                            const {accessionsByNamespace} = mappedProject;
                            expect(accessionsByNamespace.size).toBe(0);
                            return done();
                        });
                });

                /**
                 * Confirm null accessions entry mapped as empty array.
                 */
                it("maps null accession entry to empty array", (done: DoneFn) => {

                    const projectToMap = {
                        projects: [{
                            accessions: [null]
                        }]
                    };
                    httpClientSpy.get.and.returnValue(of(projectToMap));
                    projectService.fetchProjectById("", "123abc", {} as Project)
                        .subscribe((mappedProject) => {

                            const {accessionsByNamespace} = mappedProject;
                            expect(accessionsByNamespace.size).toBe(0);
                            return done();
                        });
                });
            });
        });

        /**
         * Contributors, when specified, should be included in mapping.
         */
        it("should map contributors", (done: DoneFn) => {

            const projectToMap = PROJECT_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.contributors.length).toEqual(projectToMap.projects[0].contributors.length);
                const mappedContributor = mappedProject.contributors[0];
                const contributorToMap = projectToMap.projects[0].contributors[0];
                expect(mappedContributor.contactName).toEqual(contributorToMap.contactName);
                return done();
            });
        });

        /**
         * A null value for contributors should be mapped to empty array.
         */
        it("should map null contributors to empty array", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.contributors).toEqual([]);
                return done();
            });
        });

        /**
         * Project description, when specified, should be included in mapping.
         */
        it("should map project description", (done: DoneFn) => {

            const projectToMap = PROJECT_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.projectDescription).toEqual(projectToMap.projects[0].projectDescription);
                return done();
            });
        });

        /**
         * Multiple project descriptions across multiple objects should be rolled up and mapped.
         */
        it("should map multiple project descriptions across multiple objects", (done: DoneFn) => {

            const projectToMap = PROJECT_VALUES_ACROSS_MULTIPLE_OBJECTS;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                const expectedValue = mapMultipleValues(projectToMap.projects, "projectDescription");

                expect(mappedProject.projectDescription).toEqual(expectedValue);
                return done();
            });
        });

        /**
         * A null project description should be mapped to "Unspecified"
         */
        it(`should map null project description to "Unspecified"`, (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.projectDescription).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * Publications, when specified, should be included in mapping.
         */
        it("should map publications", (done: DoneFn) => {

            const projectToMap = PROJECT_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.publications.length).toEqual(projectToMap.projects[0].publications.length);
                return done();
            });
        });

        /**
         * A null value for publications should be mapped to empty array.
         */
        it("should map null publications to empty array", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.publications).toEqual([]);
                return done();
            });
        });

        /**
         * Supplementary links, when specified, should be included in mapping.
         */
        it("should map supplementary links", (done: DoneFn) => {

            const projectToMap = PROJECT_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.supplementaryLinks.length).toEqual(projectToMap.projects[0].supplementaryLinks.length);
                return done();
            });
        });

        /**
         * A null value for supplementary links should be mapped to empty array.
         */
        it("should map null supplementary links to empty array", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("", "123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.supplementaryLinks).toEqual([]);
                return done();
            });
        });

        /**
         * Confirm catalog param is not included if catalog is not specified.
         */
        it("doesn't include catalog param if catalog is NONE", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));

            const catalog = "";
            projectService.fetchProjectById(catalog, "123abc", {} as Project).subscribe(() => {

                expect(httpClientSpy.get).toHaveBeenCalled();
                expect(httpClientSpy.get).not.toHaveBeenCalledWith(
                    jasmine.anything(),
                    {
                        params: jasmine.objectContaining({
                            catalog
                        })
                    }
                );

                return done();
            });
        });

        /**
         * Confirm catalog param if catalog is specified.
         */
        it("includes catalog param if catalog is DCP1", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));

            const catalog = DCPCatalog.DCP1;
            projectService.fetchProjectById(catalog, "123abc", {} as Project).subscribe(() => {

                expect(httpClientSpy.get).toHaveBeenCalled();
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    jasmine.anything(),
                    {
                        params: jasmine.objectContaining({
                            catalog
                        })
                    }
                );

                return done();
            });
        });
    });

    /**
     * Return the set of accessions for the given accession namespace.
     *
     * @param projectResponse
     * @param {AccessionNamespace} accessionNamespace
     */
    function listAccessionsWithNamespace(projectResponse, accessionNamespace: AccessionNamespace): string[] {

        const accessionsInNamespace =
            projectResponse.projects[0].accessions.filter(accession => accession.namespace === accessionNamespace);
        return accessionsInNamespace.map(accession => accession.accession);
    }
});
