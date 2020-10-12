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
import { EntitiesDataSource } from "./entities.data-source";
import { getFileTypeSummary } from "./entity-row-mapper.spec";
import { FileTypeSummariesRowMapper } from "./file-type-summaries-row-mapper";
import {
    PROJECT_ROW_NULL_TOP_LEVEL_VALUES,
    PROJECT_ROW_NULL_VALUES,
    PROJECT_ROW_SINGLE_VALUES
} from "../hca-table-projects/project-row-mapper.mock";

describe("FileTypeSummaryRowMapper:", () => {

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
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_SINGLE_VALUES]), FileTypeSummariesRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Use bam count as a test to check if project mapper extends the file type summaries mapper by confirming BAM
     * count is mapped.
     */
    it("should map organ value", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organ).toEqual(projectToMap.samples[0].organ[0]);
            done();
        })
    });

    /**
     * BAM count, when specified, should be included in mapping.
     */
    it("should map file type summary bam count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const fileTypeSummary = getFileTypeSummary(projectToMap.fileTypeSummaries, "bam");
            expect(fileTypeSummary).toBeTruthy();
            expect(mappedProject.bamCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null file type summary should map bam count to --.
     */
    it(`should map file type summary with null bam count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.bamCount).toEqual("--");
            done();
        })
    });

    /**
     * A null bam count should be mapped to --.
     */
    it(`should map null file type summary bam count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.bamCount).toEqual("--");
            done();
        })
    });

    /**
     * Matrix count, when specified, should be included in mapping.
     */
    it("should map file type summary matrix count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const fileTypeSummary = getFileTypeSummary(projectToMap.fileTypeSummaries, "matrix");
            expect(fileTypeSummary).toBeTruthy();
            expect(mappedProject.matrixCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null matrix count should be mapped to --.
     */
    it(`should map null file type summary matrix count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.matrixCount).toEqual("--");
            done();
        })
    });

    /**
     * A null file type summary should map matrix count to --.
     */
    it(`should map file type summary with null matrix count to "--"`, (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_NULL_TOP_LEVEL_VALUES; 
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.matrixCount).toEqual("--");
            done();
        })
    });

    /**
     * Raw (fastq) count, when is specified, should be included in mapping.
     */
    it("should map file type summary raw (fastq) count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const fileTypeSummary = getFileTypeSummary(projectToMap.fileTypeSummaries, "fastq.gz");
            expect(fileTypeSummary).toBeTruthy();
            expect(mappedProject.rawCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null raw count should be mapped to --.
     */
    it(`should map null file type summary raw (fastq) count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.rawCount).toEqual("--");
            done();
        })
    });

    /**
     * A null file type summary should raw matrix count to --.
     */
    it(`should map file type summary with null raw count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.rawCount).toEqual("--");
            done();
        })
    });
    
    /**
     * Total count should be included in mapping.
     */
    it("should map file type summary total count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const totalCount = (projectToMap.fileTypeSummaries as any[]).reduce((accum, summary) => {
                return accum + summary.count;
            }, 0);
            expect(mappedProject.totalCount).toEqual(totalCount);
            done();
        })
    });

    /**
     * A null raw count should be mapped to --.
     */
    it(`should map null file type summary total count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.totalCount).toEqual("--");
            done();
        })
    });

    /**
     * A null file type summary should raw total count to --.
     */
    it(`should map file type summary with null total count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.totalCount).toEqual("--");
            done();
        })
    });
    
    /**
     * Other count should be included in mapping.
     */
    it("should map file type summary other count", (done: DoneFn) => {

        const v2 = false;
        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([projectToMap]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const totalCount = (projectToMap.fileTypeSummaries as any[]).reduce((accum, summary) => {
                return accum + summary.count;
            }, 0);
            const bam = getFileTypeSummary(projectToMap.fileTypeSummaries, "bam");
            const matrix = getFileTypeSummary(projectToMap.fileTypeSummaries, "matrix");
            const raw = getFileTypeSummary(projectToMap.fileTypeSummaries, "fastq.gz");
            const otherCount = totalCount - bam.count - matrix.count - raw.count;
            expect(mappedProject.otherCount).toEqual(otherCount);
            done();
        })
    });

    /**
     * A null other count should be mapped to --.
     */
    it(`should map null file type summary other count to "--"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<FileTypeSummariesRowMapper>(v2, of([PROJECT_ROW_NULL_VALUES]), FileTypeSummariesRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.otherCount).toEqual("--");
            done();
        })
    });
});
