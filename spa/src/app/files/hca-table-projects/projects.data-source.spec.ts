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
import { PROJECTS_TABLE_MODEL } from "../shared/table-state-table-model.mock";
import { EntitiesDataSource } from "../table/entities.data-source";

describe("EntityDataSource - Projects:", () => {

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

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Project name, when specified, should be included in mapping.
     */
    it("should map project title", (done: DoneFn) => {
        
        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {
            
            const row0 = rows[0];
            expect(row0.projectTitle).toEqual(project0.projects[0].projectTitle);
            done();
        })
    });

    /**
     * A null project name should be mapped to "Unspecified"
     */
    it(`should map null project title to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.projectTitle).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Disease, when specified, should be rolled up and mapped 
     */
    it("should map single disease value", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.disease).toEqual(project0.samples[0].disease[0]);
            done();
        })
    });

    /**
     * Multiple diseases should be rolled up and mapped
     */
    it("should roll up and map multiple disease values", (done: DoneFn) => {

        const project1 = PROJECTS_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.disease).toEqual(project1.samples[0].disease.join(", "));
            done();
        })
    });

    /**
     * An empty disease array should be mapped to "Unspecified"
     */
    it(`should map null disease to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.disease).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Donor count, when specified, should be mapped
     */
    it("should map donor count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.donorCount).toEqual(project0.projectSummary.donorCount);
            done();
        })
    });

    /**
     * A null donor count should be mapped to "Unspecified"
     */
    it(`should map null donor count to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.donorCount).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Entry ID should be mapped
     */
    it("should map entry ID", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.entryId).toEqual(project0.entryId);
            done();
        })
    });

    /**
     * Single genus species value should be mapped.
     */
    it("should map single genus species value", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.genusSpecies).toEqual(project0.donorOrganisms[0].genusSpecies[0]);
            done();
        })
    });

    /**
     * Multiple genus species should be rolled up and mapped
     */
    it("should roll up and map multiple genus species values", (done: DoneFn) => {

        const project1 = PROJECTS_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.genusSpecies).toEqual(project1.donorOrganisms[0].genusSpecies.join(", "));
            done();
        })
    });

    /**
     * A null genus species should be mapped to "Unspecified"
     */
    it(`should map null genus species to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.genusSpecies).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Library construction approach should be mapped.
     */
    it("should map library construction approach", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.libraryConstructionApproach).toEqual(project0.projectSummary.libraryConstructionApproach);
            done();
        })
    });

    /**
     * An empty library construction approach array should remain as an empty array. 
     */
    it("should not map null library construction approach", (done: DoneFn) => {

        const project2 = PROJECTS_TABLE_MODEL.data[2];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.libraryConstructionApproach).toEqual(project2.projectSummary.libraryConstructionApproach);
            done();
        })
    });

    /**
     * Single organ value should be mapped.
     */
    it("should map organ value", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.organ).toEqual(project0.samples[0].organ[0]);
            done();
        })
    });

    /**
     * Multiple organ values should be rolled up and mapped.
     */
    it("should roll up and map multiple organ values", (done: DoneFn) => {

        const project1 = PROJECTS_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.organ).toEqual(project1.samples[0].organ.join(", "));
            done();
        })
    });

    /**
     * A null organ should be mapped to "Unspecified"
     */
    it(`should map null organ to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.organ).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single paired end value should be mapped.
     */
    it("should map paired end value", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.pairedEnd).toEqual(`${project0.protocols[0].pairedEnd[0]}`); // Boolean value is converted to string
            done();
        })
    });

    /**
     * Multiple paired ends should be rolled up and mapped.
     */
    it("should roll up and map multiple paired end values", (done: DoneFn) => {

        const project1 = PROJECTS_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.pairedEnd).toEqual(project1.protocols[0].pairedEnd.join(", "));
            done();
        })
    });

    /**
     * A null paired end should be mapped to "Unspecified"
     */
    it(`should map null paired end to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.pairedEnd).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Project short name, when specified, should be included in mapping.
     */
    it("should map project short name", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.projectShortname).toEqual(project0.projects[0].projectShortname);
            done();
        })
    });

    /**
     * A null project short name should be mapped to "Unspecified"
     */
    it(`should map null project short name to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.projectShortname).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single sample entity type value should be mapped.
     */
    it("should map sample entity type value", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.sampleEntityType).toEqual(project0.samples[0].sampleEntityType[0]);
            done();
        })
    });

    /**
     * Multiple sample entity type values should be rolled up and mapped.
     */
    it("should roll up and map multiple sample entity type values", (done: DoneFn) => {

        const project1 = PROJECTS_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.sampleEntityType).toEqual(project1.samples[0].sampleEntityType.join(", "));
            done();
        })
    });

    /**
     * An empty sample entity type should be mapped to "Unspecified"
     */
    it(`should map null sample entity type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.sampleEntityType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single selected cell type value should be mapped.
     */
    it("should map selected cell type value", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.selectedCellType).toEqual(project0.cellSuspensions[0].selectedCellType[0]);
            done();
        })
    });

    /**
     * Multiple selected cell type values should be rolled up and mapped.
     */
    it("should roll up and map multiple selected cell type values", (done: DoneFn) => {

        const project1 = PROJECTS_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.selectedCellType).toEqual(project1.cellSuspensions[0].selectedCellType.join(", "));
            done();
        })
    });

    /**
     * An empty selected cell type should be mapped to "Unspecified"
     */
    it(`should map null selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.selectedCellType).toEqual("Unspecified");
            done();
        })
    });


    /**
     * Cell suspension total cell count, when specified, should be included in mapping.
     */
    it("should map cell suspension total cell count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.cellCount).toEqual(project0.cellSuspensions[0].cellCount);
            done();
        })
    });

    /**
     * A null cell suspension total cell count should remain as undefined
     */
    it("should leave null cell suspension total cell count as undefined", (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {
            const row2 = rows[2];
            expect(row2.cellCount).toBeFalsy();
            done();
        })
    });

    /**
     * BAM count, when specified, should be included in mapping.
     */
    it("should map file type summary bam count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            console.log(row0)
            const fileTypeSummary = getFileTypeSummary(project0.fileTypeSummaries, "bam");
            expect(fileTypeSummary).toBeTruthy();
            expect(row0.bamCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null bam count should be mapped to --.
     */
    it(`should map null file type summary bam count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.bamCount).toEqual("--");
            done();
        })
    });

    /**
     * Matrix count, when specified, should be included in mapping.
     */
    it("should map file type summary matrix count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const fileTypeSummary = getFileTypeSummary(project0.fileTypeSummaries, "matrix");
            expect(fileTypeSummary).toBeTruthy();
            expect(row0.matrixCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null matrix count should be mapped to --.
     */
    it(`should map null file type summary matrix count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.matrixCount).toEqual("--");
            done();
        })
    });

    /**
     * Raw (fastq) count, when is specified, should be included in mapping.
     */
    it("should map file type summary raw (fastq) count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const fileTypeSummary = getFileTypeSummary(project0.fileTypeSummaries, "fastq.gz");
            expect(fileTypeSummary).toBeTruthy();
            expect(row0.rawCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null raw count should be mapped to --.
     */
    it(`should map null file type summary raw (fastq) count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.rawCount).toEqual("--");
            done();
        })
    });

    /**
     * Total count should be included in mapping.
     */
    it("should map file type summary total count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const totalCount = (project0.fileTypeSummaries as any[]).reduce((accum, summary) => {
                return accum + summary.count;
            }, 0);
            expect(row0.totalCount).toEqual(totalCount);
            done();
        })
    });

    /**
     * A null raw count should be mapped to --.
     */
    it(`should map null file type summary total count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.totalCount).toEqual("--");
            done();
        })
    });

    /**
     * Other count should be included in mapping.
     */
    it("should map file type summary other count", (done: DoneFn) => {

        const project0 = PROJECTS_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const totalCount = (project0.fileTypeSummaries as any[]).reduce((accum, summary) => {
                return accum + summary.count;
            }, 0);
            const bam = getFileTypeSummary(project0.fileTypeSummaries, "bam");
            const matrix = getFileTypeSummary(project0.fileTypeSummaries, "matrix");
            const raw = getFileTypeSummary(project0.fileTypeSummaries, "fastq.gz");
            const otherCount = totalCount - bam.count - matrix.count - raw.count;
            expect(row0.otherCount).toEqual(otherCount);
            done();
        })
    });

    /**
     * A null other count should be mapped to --.
     */
    it(`should map null file type summary other count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<ProjectRowMapper>(of(PROJECTS_TABLE_MODEL.data), ProjectRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.otherCount).toEqual("--");
            done();
        })
    });

    /**
     * Returns the the specified file type summary
     * 
     * @param {any} fileTypeSummaries
     * @param {string} fileType
     * @returns {any}
     */
    function getFileTypeSummary(fileTypeSummaries: any, fileType: string): any {

        return fileTypeSummaries.find(summary => {
            return summary.fileType === fileType;
        });
    }
});
