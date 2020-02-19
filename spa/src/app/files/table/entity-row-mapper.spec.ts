/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing the base (entities)data source.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

// App components
import { EntitiesDataSource } from "./entities.data-source";
import { EntityRowMapper } from "./entity-row-mapper";
import {
    PROJECT_ROW_EMPTY_ARRAY_VALUES,
    PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT, PROJECT_ROW_NULL_TOP_LEVEL_VALUES, PROJECT_ROW_NULL_VALUES,
    PROJECT_ROW_SINGLE_VALUES, PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "../hca-table-projects/project-row-mapper.mock";

describe("EntityRowMapper:", () => {

    let dataSource;
    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
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

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_SINGLE_VALUES]), EntityRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Age unit, when specified, should be mapped
     */
    it("should map single age unit value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.ageUnit).toEqual(projectToMap.donorOrganisms[0].organismAgeUnit[0]);
            return done();
        })
    });

    /**
     * Multiple age units within a single donor organism should be rolled up and mapped
     */
    it("should roll up and map multiple age unit values in a single donor organism", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.ageUnit).toEqual(projectToMap.donorOrganisms[0].organismAgeUnit.join(", "));
            done();
        })
    });

    /**
     * Multiple age units across multiple donor organisms should be rolled up and mapped
     */
    it("should roll up and map multiple age unit values across multiple donor organisms", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.donorOrganisms, "organismAgeUnit");
            expect(mappedProject.ageUnit).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An age unit value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty age unit array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.ageUnit).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Mapper should handle null donor organism value (from which, age, sex, species, and age unit are pulled). Use
     * age unit as the check for this.
     */
    it(`should map age unit to "Unspecified" when donor organism is null`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.ageUnit).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null age unit should be mapped to "Unspecified"
     */
    it(`should map null age unit to ""`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.ageUnit).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Biological sex, when specified, should be mapped
     */
    it("should map biological sex value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.biologicalSex).toEqual(projectToMap.donorOrganisms[0].biologicalSex[0]);
            done();
        })
    });

    /**
     * Multiple biological sex values within a single donor organism should be rolled up and mapped
     */
    it("should roll up and map biological sex values in a single donor organism", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.biologicalSex).toEqual(projectToMap.donorOrganisms[0].biologicalSex.join(", "));
            done();
        })
    });

    /**
     * Multiple biological sex values across multiple donor organisms should be rolled up and mapped
     */
    it("should roll up and map multiple biological sex values across multiple donor organisms", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.donorOrganisms, "biologicalSex");
            expect(mappedProject.biologicalSex).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An age unit value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty age unit array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.biologicalSex).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null value for biological sex should be mapped to "Unspecified"
     */
    it(`should map null biological sex to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.biologicalSex).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Disease, when specified, should be rolled up and mapped
     */
    it("should map single disease value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.disease).toEqual(projectToMap.specimens[0].disease[0]);
            done();
        })
    });

    /**
     * Multiple diseases should be rolled up and mapped
     */
    it("should roll up and map multiple disease values in a single object", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.disease).toEqual(projectToMap.specimens[0].disease.join(", "));
            done();
        })
    });

    /**
     * Multiple disease values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple disease values across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.specimens, "disease");
            expect(mappedProject.disease).toEqual(expectedValue);
            done();
        })
    });

    /**
     * Mapper should handle null samples value (from which, age, donor count, sex, species, and age unit are pulled). Use
     * disease as the check for this.
     */
    it(`should map disease to "Unspecified" when samples is null`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.disease).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A disease value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty disease array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.disease).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null disease array should be mapped to "Unspecified"
     */
    it(`should map null disease to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.disease).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single donor count value should be mapped.
     */
    it("should map donor count value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.donorCount).toEqual(projectToMap.donorOrganisms[0].donorCount);
            done();
        })
    });

    /**
     * Single donor count across multiple objects should be rolled up and mapped.
     */
    it("should map single donor count across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.donorOrganisms, "donorCount");

            expect(mappedProject.donorCount).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A null donor count should be mapped to "Unspecified"
     */
    it(`should map null donor count to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.donorCount).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single genus species value should be mapped.
     */
    it("should map single genus species value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.genusSpecies).toEqual(projectToMap.donorOrganisms[0].genusSpecies[0]);
            done();
        })
    });

    /**
     * Multiple genus species should be rolled up and mapped
     */
    it("should roll up and map multiple genus species values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.genusSpecies).toEqual(projectToMap.donorOrganisms[0].genusSpecies.join(", "));
            done();
        })
    });

    /**
     * Multiple genus species values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple genus species values across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.donorOrganisms, "genusSpecies");
            expect(mappedProject.genusSpecies).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A disease value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty genus species array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.genusSpecies).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null genus species should be mapped to "Unspecified"
     */
    it(`should map null genus species to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.genusSpecies).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single organ value should be mapped.
     */
    it("should map organ value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organ).toEqual(projectToMap.specimens[0].organ[0]);
            done();
        })
    });

    /**
     * Multiple organ values should be rolled up and mapped.
     */
    it("should roll up and map multiple organ values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organ).toEqual(projectToMap.specimens[0].organ.join(", "));
            done();
        })
    });

    /**
     * Multiple organ values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple organ values across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.specimens, "organ");
            expect(mappedProject.organ).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An organ value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty organ array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organ).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Mapper should handle null protocol value. Use paired end as the check for this.
     */
    it(`should map paired end to "Unspecified" when protocols is null`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.pairedEnd).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null organ should be mapped to "Unspecified"
     */
    it(`should map null organ to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organ).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Age, when specified, should be mapped
     */
    it("should map single age value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedRow = rows[0];
            expect(mappedRow.organismAge).toEqual(projectToMap.donorOrganisms[0].organismAge[0]);
            done();
        })
    });

    /**
     * Multiple age values should be rolled up and mapped
     */
    it("should roll up and map multiple age values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedRow = rows[0];
            expect(mappedRow.organismAge).toEqual(projectToMap.donorOrganisms[0].organismAge.join(", "));
            done();
        })
    });

    /**
     * Multiple age values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple age values across multiple donor organism objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.donorOrganisms, "organismAge");
            expect(mappedProject.organismAge).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An organ value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty age array to "Unspecified"`, (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_EMPTY_ARRAY_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organismAge).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An empty age array should be mapped to "Unspecified"
     */
    it(`should map null age to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedRow = rows[0];
            expect(mappedRow.organismAge).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single organ part value should be mapped.
     */
    it("should map organ part value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organPart).toEqual(projectToMap.specimens[0].organPart[0]);
            done();
        })
    });

    /**
     * Multiple organ part values should be rolled up and mapped.
     */
    it("should roll up and map multiple organ part values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organPart).toEqual(projectToMap.specimens[0].organPart.join(", "));
            done();
        })
    });

    /**
     * Multiple organ part values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple part organ values across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.specimens, "organPart");
            expect(mappedProject.organPart).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An organ part value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty organ part array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organPart).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null organ part should be mapped to "Unspecified"
     */
    it(`should map null organ part to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.organPart).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single paired end value should be mapped.
     */
    it("should map paired end value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.pairedEnd).toEqual(`${projectToMap.protocols[0].pairedEnd[0]}`); // Boolean value is converted to string
            done();
        })
    });

    /**
     * Multiple paired ends should be rolled up and mapped.
     */
    it("should roll up and map multiple paired end values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.pairedEnd).toEqual(projectToMap.protocols[0].pairedEnd.join(", "));
            done();
        })
    });

    /**
     * Multiple paired end values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple part paired end across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.protocols, "pairedEnd");
            expect(mappedProject.pairedEnd).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An paired end value that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty paired end array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.pairedEnd).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null paired end should be mapped to "Unspecified"
     */
    it(`should map null paired end to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.pairedEnd).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Project name, when specified, should be included in mapping.
     */
    it("should map project title", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectTitle).toEqual(projectToMap.projects[0].projectTitle);
            done();
        })
    });

    /**
     * Multiple project titles in a single object should be rolled up and mapped.
     */
    it("should map multiple project titles in a single object", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectTitle).toEqual(projectToMap.projects[0].projectTitle.join(", "));
            done();
        })
    });

    /**
     * Multiple project titles across multiple objects should be rolled up and mapped.
     */
    it("should map multiple project titles across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.projects, "projectTitle");

            expect(mappedProject.projectTitle).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A project name that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty array project title to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectTitle).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null project name should be mapped to "Unspecified"
     */
    it(`should map null project title to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.projectTitle).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single sample entity type value should be mapped.
     */
    it("should map sample entity type value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.sampleEntityType).toEqual(projectToMap.samples[0].sampleEntityType[0]);
            done();
        })
    });

    /**
     * Multiple sample entity type values should be rolled up and mapped.
     */
    it("should roll up and map multiple sample entity type values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.sampleEntityType).toEqual(projectToMap.samples[0].sampleEntityType.join(", "));
            done();
        })
    });

    /**
     * Multiple sample entity type values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple sample entity type values across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.samples, "sampleEntityType");

            expect(mappedProject.sampleEntityType).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A sample entity type that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty array sample entity type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.sampleEntityType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An empty sample entity type should be mapped to "Unspecified"
     */
    it(`should map null sample entity type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.sampleEntityType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single selected cell type value should be mapped.
     */
    it("should map selected cell type value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.selectedCellType).toEqual(projectToMap.cellSuspensions[0].selectedCellType[0]);
            done();
        })
    });

    /**
     * Multiple selected cell type values should be rolled up and mapped.
     */
    it("should roll up and map multiple selected cell type values", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.selectedCellType).toEqual(projectToMap.cellSuspensions[0].selectedCellType.join(", "));
            done();
        })
    });

    /**
     * Multiple selected cell type values across multiple objects should be rolled up and mapped.
     */
    it("should map multiple selected cell type values across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.cellSuspensions, "selectedCellType");

            expect(mappedProject.selectedCellType).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A selected cell type that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty array selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.selectedCellType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Mapper should handle null cell suspensions value. Use selected cell type as the check for this.
     */
    it(`should map selected cell type to "Unspecified" when cell suspensions is null`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_TOP_LEVEL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.selectedCellType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An empty selected cell type should be mapped to "Unspecified"
     */
    it(`should map null selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.selectedCellType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An empty sample entity type should be mapped to "Unspecified"
     */
    it(`should map null sample entity type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.sampleEntityType).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Single total cell count value should be mapped.
     */
    it("should map total cell count value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.totalCells).toEqual(projectToMap.cellSuspensions[0].totalCells);
            done();
        })
    });

    /**
     * Multiple selected total cell count should be rolled up and mapped.
     */
    it("should roll up and map multiple selected total cell count", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.totalCells).toEqual(projectToMap.cellSuspensions[0].totalCells);
            done();
        })
    });

    /**
     * Multiple selected total cell count across multiple objects should be rolled up and mapped.
     */
    it("should map multiple selected total cell count across multiple objects", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.cellSuspensions, "totalCells");

            expect(mappedProject.totalCells).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A selected cell type that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty array selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.totalCells).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An empty selected cell type should be mapped to "Unspecified"
     */
    it(`should map null selected cell type to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.totalCells).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Workflow, when specified, should be mapped
     */
    it("should map single workflow value", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.workflow).toEqual(projectToMap.protocols[0].workflow[0]);
            return done();
        })
    });

    /**
     * Multiple workflows within a single protocol should be rolled up and mapped
     */
    it("should roll up and map multiple workflow values in a single protocol", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.workflow).toEqual(projectToMap.protocols[0].workflow.join(", "));
            done();
        })
    });

    /**
     * Multiple workflows across multiple protocols should be rolled up and mapped
     */
    it("should roll up and map multiple workflow values across multiple protocols", (done: DoneFn) => {

        const projectToMap = PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<EntityRowMapper>(of([projectToMap]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const expectedValue = mapMultipleValues(projectToMap.protocols, "workflow");
            expect(mappedProject.workflow).toEqual(expectedValue);
            done();
        })
    });

    /**
     * A workflow that is an empty array should be mapped to "Unspecified"
     */
    it(`should map an empty workflow array to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_EMPTY_ARRAY_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.workflow).toEqual("Unspecified");
            done();
        })
    });

    /**
     * A null workflow should be mapped to "Unspecified"
     */
    it(`should map null workflow to "Unspecified"`, (done: DoneFn) => {

        dataSource = new EntitiesDataSource<EntityRowMapper>(of([PROJECT_ROW_NULL_VALUES]), EntityRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            expect(mappedProject.workflow).toEqual("Unspecified");
            done();
        })
    });
});

/**
 * Returns the the specified file type summary
 *
 * @param {any} fileTypeSummaries
 * @param {string} fileType
 * @returns {any}
 */
export function getFileTypeSummary(fileTypeSummaries: any, fileType: string): any {

    return fileTypeSummaries.find(summary => {
        return summary.fileType === fileType;
    });
}

/**
 * Flatten values - with the exception of totalCells and donorCount - across multiple objects into a single, comma-delimited string.
 */
export function mapMultipleValues(arrayToMap: any[], valueToMap: string): string {

    const tokens = arrayToMap.reduce((accum, objectToMap) => {

        const mappedValue = Array.isArray(objectToMap[valueToMap]) ?
            objectToMap[valueToMap].join(", ") :
            objectToMap[valueToMap];

        if ( !!mappedValue ) {
            accum.push(mappedValue);
        }

        return accum;
    }, []);

    if ( valueToMap === "totalCells" || valueToMap === "donorCount" ) {
        return tokens.reduce((accum, token) => {
            accum += token;
            return accum;
        }, 0)
    }

    return tokens.join(", ");
}
