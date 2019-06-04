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
import { SampleRowMapper } from "./sample-row-mapper";
import { SAMPLES_TABLE_MODEL } from "../shared/table-state-table-model.mock";
import { EntitiesDataSource } from "../table/entities.data-source";

describe("EntityDataSource - Samples:", () => {

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

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Age unit, when specified, should be mapped
     */
    it("should map single age unit value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.ageUnit).toEqual(samples0.donorOrganisms[0].organismAgeUnit[0]);
            done();
        })
    });

    /**
     * Multiple age units should be rolled up and mapped
     */
    it("should roll up and map multiple age unit values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.ageUnit).toEqual(samples1.donorOrganisms[0].organismAgeUnit.join(", "));
            done();
        })
    });

    /**
     * An empty age unit array should be mapped to ""
     */
    it(`should map null age unit to ""`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.ageUnit).toEqual("");
            done();
        })
    });

    /**
     * Biological sex, when specified, should be mapped
     */
    it("should map biological sex value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.biologicalSex).toEqual(samples0.donorOrganisms[0].biologicalSex[0]);
            done();
        })
    });

    /**
     * Multiple biological sex values should be rolled up and mapped
     */
    it("should roll up and map biological sex values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.biologicalSex).toEqual(samples1.donorOrganisms[0].biologicalSex.join(", "));
            done();
        })
    });

    /**
     * An empty biological sex array should be mapped to "Unspecified"
     */
    it(`should map null biological sex to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.biologicalSex).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Project name, when specified, should be included in mapping.
     */
    it("should map project title", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.projectTitle).toEqual(samples0.projects[0].projectTitle[0]);
            done();
        })
    });

    /**
     * Multiple project titles should be rolled up and mapped.
     */
    it("should roll up and map multiple project title values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.projectTitle).toEqual(samples1.projects[0].projectTitle.join(", "));
            done();
        })
    });

    /**
     * A null project name should be mapped to "Unspecified"
     */
    it(`should map null project title to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.disease).toEqual(samples0.samples[0].disease[0]);
            done();
        })
    });

    /**
     * Multiple diseases should be rolled up and mapped
     */
    it("should roll up and map multiple disease values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.disease).toEqual(samples1.samples[0].disease.join(", "));
            done();
        })
    });

    /**
     * An empty disease array should be mapped to "Unspecified"
     */
    it(`should map null disease to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.disease).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Sample ID should be mapped
     */
    it("should map sample ID", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.sampleId).toEqual(samples0.samples[0].id);
            done();
        })
    });

    /**
     * First sample ID should be mapped if more than one is specified
     */
    it("should map first sample ID if multiple are specified", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[2];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.sampleId).toEqual(samples1.samples[0].id[0]);
            done();
        })
    });

    /**
     * Single genus species value should be mapped.
     */
    it("should map single genus species value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.genusSpecies).toEqual(samples0.donorOrganisms[0].genusSpecies[0]);
            done();
        })
    });

    /**
     * Multiple genus species should be rolled up and mapped
     */
    it("should roll up and map multiple genus species values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.genusSpecies).toEqual(samples1.donorOrganisms[0].genusSpecies.join(", "));
            done();
        })
    });

    /**
     * A null genus species should be mapped to "Unspecified"
     */
    it(`should map null genus species to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.libraryConstructionApproach).toEqual(samples0.protocols[0].libraryConstructionApproach[0]);
            done();
        })
    });

    /**
     * An empty library construction approach array should remain as an empty array.
     */
    it(`should map null library construction approach to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.libraryConstructionApproach).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single organ value should be mapped.
     */
    it("should map organ value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.organ).toEqual(samples0.samples[0].organ); // Organ can potentially be a string value, not a string array
            done();
        })
    });

    /**
     * Multiple organ values should be rolled up and mapped.
     */
    it("should roll up and map multiple organ values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.organ).toEqual(samples1.samples[0].organ.join(", "));
            done();
        })
    });

    /**
     * A null organ should be mapped to "Unspecified"
     */
    it(`should map null organ to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.organ).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Age, when specified, should be mapped
     */
    it("should map single age value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.organismAge).toEqual(samples0.donorOrganisms[0].organismAge[0]);
            done();
        })
    });

    /**
     * Multiple age values should be rolled up and mapped
     */
    it("should roll up and map multiple age values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.organismAge).toEqual(samples1.donorOrganisms[0].organismAge.join(", "));
            done();
        })
    });

    /**
     * An empty age array should be mapped to "Unspecified"
     */
    it(`should map null age to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.organismAge).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single paired end value should be mapped.
     */
    it("should map paired end value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.pairedEnd).toEqual(`${samples0.protocols[0].pairedEnd[0]}`); // Boolean value is converted to string
            done();
        })
    });

    /**
     * Multiple paired ends should be rolled up and mapped.
     */
    it("should roll up and map multiple paired end values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.pairedEnd).toEqual(samples1.protocols[0].pairedEnd.join(", "));
            done();
        })
    });

    /**
     * A null paired end should be mapped to "Unspecified"
     */
    it(`should map null paired end to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.pairedEnd).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single sample entity type value should be mapped.
     */
    it("should map sample entity type value", (done: DoneFn) => {

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.sampleEntityType).toEqual(samples0.samples[0].sampleEntityType); // Can be string, or string []
            done();
        })
    });

    /**
     * Multiple sample entity type values should be rolled up and mapped.
     */
    it("should roll up and map multiple sample entity type values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.sampleEntityType).toEqual(samples1.samples[0].sampleEntityType.join(", "));
            done();
        })
    });

    /**
     * An empty sample entity type should be mapped to "Unspecified"
     */
    it(`should map null sample entity type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.selectedCellType).toEqual(samples0.cellSuspensions[0].selectedCellType[0]);
            done();
        })
    });

    /**
     * Multiple selected cell type values should be rolled up and mapped.
     */
    it("should roll up and map multiple selected cell type values", (done: DoneFn) => {

        const samples1 = SAMPLES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.selectedCellType).toEqual(samples1.cellSuspensions[0].selectedCellType.join(", "));
            done();
        })
    });

    /**
     * An empty selected cell type should be mapped to "Unspecified"
     */
    it(`should map null selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.cellCount).toEqual(samples0.cellSuspensions[0].cellCount);
            done();
        })
    });

    /**
     * A null cell suspension total cell count should remain as undefined
     */
    it("should leave null cell suspension total cell count as undefined", (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const fileTypeSummary = getFileTypeSummary(samples0.fileTypeSummaries, "bam");
            expect(fileTypeSummary).toBeTruthy();
            expect(row0.bamCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null bam count should be mapped to --.
     */
    it(`should map null file type summary bam count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const fileTypeSummary = getFileTypeSummary(samples0.fileTypeSummaries, "matrix");
            expect(fileTypeSummary).toBeTruthy();
            expect(row0.matrixCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null matrix count should be mapped to --.
     */
    it(`should map null file type summary matrix count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const fileTypeSummary = getFileTypeSummary(samples0.fileTypeSummaries, "fastq.gz");
            expect(fileTypeSummary).toBeTruthy();
            expect(row0.rawCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * A null raw count should be mapped to --.
     */
    it(`should map null file type summary raw (fastq) count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const totalCount = (samples0.fileTypeSummaries as any[]).reduce((accum, summary) => {
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

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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

        const samples0 = SAMPLES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            const totalCount = (samples0.fileTypeSummaries as any[]).reduce((accum, summary) => {
                return accum + summary.count;
            }, 0);
            const bam = getFileTypeSummary(samples0.fileTypeSummaries, "bam");
            const matrix = getFileTypeSummary(samples0.fileTypeSummaries, "matrix");
            const raw = getFileTypeSummary(samples0.fileTypeSummaries, "fastq.gz");
            const otherCount = totalCount - bam.count - matrix.count - raw.count;
            expect(row0.otherCount).toEqual(otherCount);
            done();
        })
    });

    /**
     * A null other count should be mapped to --.
     */
    it(`should map null file type summary other count to "--"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<SampleRowMapper>(of(SAMPLES_TABLE_MODEL.data), SampleRowMapper);
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
