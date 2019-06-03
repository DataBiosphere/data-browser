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
import { FILES_TABLE_MODEL } from "../shared/table-state-table-model.mock";
import { EntitiesDataSource } from "../table/entities.data-source";
import { FileRowMapper } from "./file-row-mapper";

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

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Age unit, when specified, should be mapped
     */
    it("should map single age unit value", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.ageUnit).toEqual(files0.donorOrganisms[0].organismAgeUnit[0]);
            return done();
        })
    });

    /**
     * Multiple age units should be rolled up and mapped
     */
    it("should roll up and map multiple age unit values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.ageUnit).toEqual(files1.donorOrganisms[0].organismAgeUnit.join(", "));
            done();
        })
    });

    /**
     * An empty age unit array should be mapped to ""
     */
    it(`should map null age unit to ""`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.biologicalSex).toEqual(files0.donorOrganisms[0].biologicalSex[0]);
            done();
        })
    });

    /**
     * Multiple biological sex values should be rolled up and mapped
     */
    it("should roll up and map biological sex values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.biologicalSex).toEqual(files1.donorOrganisms[0].biologicalSex.join(", "));
            done();
        })
    });

    /**
     * An empty biological sex array should be mapped to "Unspecified"
     */
    it(`should map null biological sex to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.projectTitle).toEqual(files0.projects[0].projectTitle[0]);
            done();
        })
    });

    /**
     * Multiple project titles should be rolled up and mapped.
     */
    it("should roll up and map multiple project title values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.projectTitle).toEqual(files1.projects[0].projectTitle.join(", "));
            done();
        })
    });

    /**
     * A null project name should be mapped to "Unspecified"
     */
    it(`should map null project title to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.disease).toEqual(files0.samples[0].disease[0]);
            done();
        })
    });

    /**
     * Multiple diseases should be rolled up and mapped
     */
    it("should roll up and map multiple disease values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.disease).toEqual(files1.samples[0].disease.join(", "));
            done();
        })
    });

    /**
     * An empty disease array should be mapped to "Unspecified"
     */
    it(`should map null disease to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.disease).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Specimen ID should be mapped
     */
    it("should map specimen ID", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.specimenId).toEqual(files0.specimens[0].id[0]);
            done();
        })
    });

    /**
     * First specimen ID should be mapped if more than one is specified
     */
    it("should map first specimen ID if multiple are specified", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[2];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row2 = rows[2];
            expect(row2.specimenId).toEqual(files1.specimens[0].id[0]);
            done();
        })
    });

    /**
     * Single genus species value should be mapped.
     */
    it("should map single genus species value", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.genusSpecies).toEqual(files0.donorOrganisms[0].genusSpecies[0]);
            done();
        })
    });

    /**
     * Multiple genus species should be rolled up and mapped
     */
    it("should roll up and map multiple genus species values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.genusSpecies).toEqual(files1.donorOrganisms[0].genusSpecies.join(", "));
            done();
        })
    });

    /**
     * A null genus species should be mapped to "Unspecified"
     */
    it(`should map null genus species to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.libraryConstructionApproach).toEqual(files0.protocols[0].libraryConstructionApproach[0]);
            done();
        })
    });

    /**
     * Multiple library construction approaches should be rolled up and mapped.
     */
    it("should roll up and map multiple library construction approach values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const rows1 = rows[1];
            expect(rows1.libraryConstructionApproach).toEqual(files1.protocols[0].libraryConstructionApproach.join(", "));
            done();
        })
    });

    /**
     * An empty library construction approach array should remain as an empty array.
     */
    it(`should map null library construction approach to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.organ).toEqual(files0.samples[0].organ[0]);
            done();
        })
    });

    /**
     * Multiple organ values should be rolled up and mapped.
     */
    it("should roll up and map multiple organ values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.organ).toEqual(files1.samples[0].organ.join(", "));
            done();
        })
    });

    /**
     * A null organ should be mapped to "Unspecified"
     */
    it(`should map null organ to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.organismAge).toEqual(files0.donorOrganisms[0].organismAge[0]);
            done();
        })
    });

    /**
     * Multiple age values should be rolled up and mapped
     */
    it("should roll up and map multiple age values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.organismAge).toEqual(files1.donorOrganisms[0].organismAge.join(", "));
            done();
        })
    });

    /**
     * An empty age array should be mapped to "Unspecified"
     */
    it(`should map null age to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.pairedEnd).toEqual(`${files0.protocols[0].pairedEnd[0]}`); // Boolean value is converted to string
            done();
        })
    });

    /**
     * Multiple paired ends should be rolled up and mapped.
     */
    it("should roll up and map multiple paired end values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.pairedEnd).toEqual(files1.protocols[0].pairedEnd.join(", "));
            done();
        })
    });

    /**
     * A null paired end should be mapped to "Unspecified"
     */
    it(`should map null paired end to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.sampleEntityType).toEqual(files0.samples[0].sampleEntityType[0]);
            done();
        })
    });

    /**
     * Multiple sample entity type values should be rolled up and mapped.
     */
    it("should roll up and map multiple sample entity type values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.sampleEntityType).toEqual(files1.samples[0].sampleEntityType.join(", "));
            done();
        })
    });

    /**
     * An empty sample entity type should be mapped to "Unspecified"
     */
    it(`should map null sample entity type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.selectedCellType).toEqual(files0.cellSuspensions[0].selectedCellType[0]);
            done();
        })
    });

    /**
     * Multiple selected cell type values should be rolled up and mapped.
     */
    it("should roll up and map multiple selected cell type values", (done: DoneFn) => {

        const files1 = FILES_TABLE_MODEL.data[1];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row1 = rows[1];
            expect(row1.selectedCellType).toEqual(files1.cellSuspensions[0].selectedCellType.join(", "));
            done();
        })
    });

    /**
     * An empty selected cell type should be mapped to "Unspecified"
     */
    it(`should map null selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
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

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.cellCount).toEqual(files0.cellSuspensions[0].cellCount);
            done();
        })
    });

    /**
     * A null cell suspension total cell count should remain as undefined
     */
    it("should leave null cell suspension total cell count as undefined", (done: DoneFn) => {

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {
            const row2 = rows[2];
            expect(row2.cellCount).toBeFalsy();
            done();
        })
    });

    /**
     * File format should be included in mapping
     */
    it("should map file format", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.fileFormat).toEqual(files0.files[0].format);
            done();
        })
    });

    /**
     * File name should be included in mapping
     */
    it("should map file name", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.fileName).toEqual(files0.files[0].name);
            done();
        })
    });

    /**
     * File size should be included in mapping
     */
    it("should map file size", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.fileSize).toEqual(files0.files[0].size);
            done();
        })
    });

    /**
     * URL should be included in mapping
     */
    it("should map file URL", (done: DoneFn) => {

        const files0 = FILES_TABLE_MODEL.data[0];

        dataSource = new EntitiesDataSource<FileRowMapper>(of(FILES_TABLE_MODEL.data), FileRowMapper);
        dataSource.connect().subscribe((rows) => {

            const row0 = rows[0];
            expect(row0.url).toEqual(files0.files[0].url);
            done();
        })
    });
});
