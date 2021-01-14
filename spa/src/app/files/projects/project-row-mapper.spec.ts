/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing projects table data source.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

// App components
import { ProjectRowMapper } from "./project-row-mapper";
import {
    PROJECT_ROW_EMPTY_ARRAY_VALUES,
    PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT,
    PROJECT_ROW_NULL_VALUES,
    PROJECT_ROW_SINGLE_VALUES, PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "./project-row-mapper.mock";
import { EntitiesDataSource } from "../entities/entities.data-source";
import { getFileTypeSummary, mapMultipleValues } from "../entities/entity-row-mapper.spec";

describe("ProjectRowMapper:", () => {

    let dataSource;
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
            ],
            providers: [{
                provide: Store,
                useValue: testStore
            }]
        });
    }));

    /**
     * Smoke test   
     */
    it("should create data source", () => {

        const v2 = false;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([PROJECT_ROW_SINGLE_VALUES]), ProjectRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Use bam count as a test to check if project mapper extends the file type summaries mapper by confirming BAM
     * count is mapped.
     */
    it("should map file type summary bam count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const fileTypeSummary = getFileTypeSummary(projectToMap.fileTypeSummaries, "bam");
            expect(fileTypeSummary).toBeTruthy();
            expect(mappedProject.bamCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * Entry ID should be mapped
     */
    it("should map entry ID", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.entryId).toEqual(projectToMap.entryId);
            done();
        })
    });

    /**
     * A null entry ID should remain as null.
     */
    it("should not map null entry ID", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_NULL_VALUES;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.entryId).toEqual(projectToMap.entryId);
            done();
        })
    });

    /**
     * Library construction approach should be mapped.
     */
    it("should map library construction approach", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.libraryConstructionApproach).toEqual(projectToMap.protocols[0].libraryConstructionApproach[0]);
            done();
        })
    });

    /**
     * An empty array library construction approach array should be mapped to "Unspecified"
     */
    it(`should map empty library construction approach to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.libraryConstructionApproach).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null library construction approach array should be mapped to "Unspecified" 
     */
    it(`should map null library construction approach to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.libraryConstructionApproach).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Project short name, when specified, should be included in mapping.
     */
    it("should map project short name", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectShortname).toEqual(projectToMap.projects[0].projectShortname);
            done();
        })
    });

    /**
     * Short names within a single project should be rolled up and mapped
     */
    it("should roll up and map short name values in a single project", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectShortname).toEqual(projectToMap.projects[0].projectShortname.join(", "));
            done();
        })
    });

    /**
     * Short names across multiple projects should be rolled up and mapped
     */
    it("should roll up and map short name values across multiple projects", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(v2, projectToMap.projects, "projectShortname");
            expect(mappedProject.projectShortname).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A null project short name should be mapped to "Unspecified"
     */
    it(`should map null project short name to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectShortname).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Donor count, when specified, should be included in mapping.
     */
    it("should map donor count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.donorCount).toEqual(projectToMap.donorOrganisms[0].donorCount);
            done();
        })
    });

    /**
     * Donor count across multiple projects should be rolled up and mapped
     */
    it("should roll up and map donor count values across multiple projects", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([projectToMap]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(v2, projectToMap.donorOrganisms, "donorCount");
            expect(mappedProject.donorCount).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A null donor count should be mapped to "Unspecified"
     */
    it(`should map null donor count to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.donorCount).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An age unit value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty age unit array to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<ProjectRowMapper>(v2, of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectShortname).toEqual("Unspecified");
            done();
        })
    });
});
