/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing projects service.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";
import { ConfigService } from "../../config/config.service";
import { of } from "rxjs";

// App dependencies
import { ProjectService } from "./project.service";
import {
    PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT,
    PROJECT_ROW_NULL_TOP_LEVEL_VALUES,
    PROJECT_ROW_NULL_VALUES,
    PROJECT_ROW_SINGLE_VALUES, PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "../hca-table-projects/project-row-mapper.mock";
import { mapMultipleValues } from "../table/entity-row-mapper.spec";
import {
    PROJECT_SINGLE_VALUES,
    PROJECT_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "../hca-table-projects/project-mapper.mock";
import { TermResponseService } from "../shared/term-response.service";
import { SearchTermService } from "../shared/search-term.service";
import { Project } from "../shared/project.model";

describe("ProjectService:", () => {

    let httpClientSpy: { get: jasmine.Spy };
    let projectService: ProjectService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
            ],
            providers: [{
                provide: ConfigService,
                useValue: jasmine.createSpyObj("ConfigService", ["buildApiUrl"])
            }]
        });

        const termResponseService = new TermResponseService();
        const searchTermService = new SearchTermService(termResponseService);

        const configService = TestBed.get(ConfigService);
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        projectService = new ProjectService(configService, searchTermService, <any>httpClientSpy);
    }));

    /**
     * Smoke test
     */
    it("should create service", () => {

        expect(projectService).toBeTruthy();
    });

    describe("fetchProjectById:", () => {

        /**
         * Array express accessions, when specified, should be mapped.
         */
        it("should map array express accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.arrayExpressAccessions).toEqual(projectToMap.projects[0].arrayExpressAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple array express accession values should be rolled up and mapped
         */
        it("should roll up and map array express accession values in single project value", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.arrayExpressAccessions).toEqual(projectToMap.projects[0].arrayExpressAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple array express accession values across multiple objects should be rolled up and mapped. 
         */
        it("should map multiple array express accession values across multiple objects", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                const expectedValue = mapMultipleValues(projectToMap.projects, "arrayExpressAccessions");
                expect(mappedProject.arrayExpressAccessions).toEqual(expectedValue);
                return done();
            });
        });

        /**
         * Array express accessions should be converted to "Unspecified" whe project is null
         */
        it("should handle null project when mapping array express accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_TOP_LEVEL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.arrayExpressAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * A null value for array express accessions should be converted to "Unspecified"
         */
        it(`should map null array express accessions to "Unspecified"`, (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.arrayExpressAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * Contributors, when specified, should be included in mapping.
         */
        it("should map contributors", (done: DoneFn) => {

            const projectToMap = PROJECT_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.contributors).toEqual([]);
                return done();
            });
        });
        
        /**
         * geo series accessions, when specified, should be mapped.
         */
        it("should map geo series accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.geoSeriesAccessions).toEqual(projectToMap.projects[0].geoSeriesAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple geo series accession values should be rolled up and mapped
         */
        it("should roll up and map geo series accession values in single project value", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.geoSeriesAccessions).toEqual(projectToMap.projects[0].geoSeriesAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple geo series accession values across multiple objects should be rolled up and mapped.
         */
        it("should map multiple geo series accession values across multiple objects", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                const expectedValue = mapMultipleValues(projectToMap.projects, "geoSeriesAccessions");
                expect(mappedProject.geoSeriesAccessions).toEqual(expectedValue);
                return done();
            });
        });

        /**
         * geo series accessions should be converted to "Unspecified" whe project is null
         */
        it("should handle null project when mapping geo series accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_TOP_LEVEL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.geoSeriesAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * A null value for geo series accessions should be converted to "Unspecified"
         */
        it(`should map null geo series accessions to "Unspecified"`, (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.geoSeriesAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * insdc project accessions, when specified, should be mapped.
         */
        it("should map insdc project accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcProjectAccessions).toEqual(projectToMap.projects[0].insdcProjectAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple insdc project accession values should be rolled up and mapped
         */
        it("should roll up and map insdc project accession values in single project value", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcProjectAccessions).toEqual(projectToMap.projects[0].insdcProjectAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple insdc project accession values across multiple objects should be rolled up and mapped.
         */
        it("should map multiple insdc project accession values across multiple objects", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                const expectedValue = mapMultipleValues(projectToMap.projects, "insdcProjectAccessions");
                expect(mappedProject.insdcProjectAccessions).toEqual(expectedValue);
                return done();
            });
        });

        /**
         * insdc project accessions should be converted to "Unspecified" whe project is null
         */
        it("should handle null project when mapping insdc project accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_TOP_LEVEL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcProjectAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * A null value for insdc project accessions should be converted to "Unspecified"
         */
        it(`should map null insdc project accessions to "Unspecified"`, (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcProjectAccessions).toEqual("Unspecified");
                return done();
            });
        });


        /**
         * insdc study accessions, when specified, should be mapped.
         */
        it("should map insdc study accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcStudyAccessions).toEqual(projectToMap.projects[0].insdcStudyAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple insdc study accession values should be rolled up and mapped
         */
        it("should roll up and map insdc study accession values in single project value", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcStudyAccessions).toEqual(projectToMap.projects[0].insdcStudyAccessions.join(", "));
                return done();
            });
        });

        /**
         * Multiple insdc study accession values across multiple objects should be rolled up and mapped.
         */
        it("should map multiple insdc study accession values across multiple objects", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                const expectedValue = mapMultipleValues(projectToMap.projects, "insdcStudyAccessions");
                expect(mappedProject.insdcStudyAccessions).toEqual(expectedValue);
                return done();
            });
        });

        /**
         * insdc study accessions should be converted to "Unspecified" whe project is null
         */
        it("should handle null project when mapping insdc study accessions", (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_TOP_LEVEL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcStudyAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * A null value for insdc study accessions should be converted to "Unspecified"
         */
        it(`should map null insdc study accessions to "Unspecified"`, (done: DoneFn) => {

            const projectToMap = PROJECT_ROW_NULL_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.insdcStudyAccessions).toEqual("Unspecified");
                return done();
            });
        });

        /**
         * Project description, when specified, should be included in mapping.
         */
        it("should map project description", (done: DoneFn) => {

            const projectToMap = PROJECT_SINGLE_VALUES;
            httpClientSpy.get.and.returnValue(of(projectToMap));
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

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
            projectService.fetchProjectById("123abc", {} as Project).subscribe((mappedProject) => {

                expect(mappedProject.supplementaryLinks).toEqual([]);
                return done();
            });
        });
    });
});
