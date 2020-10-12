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
import {
    SAMPLE_EMPTY_ARRAY_VALUES,
    SAMPLE_MULTIPLE_VALUES_SINGLE_OBJECT, SAMPLE_NULL_TOP_LEVEL_VALUES,
    SAMPLE_NULL_VALUES,
    SAMPLE_SINGLE_VALUES,
    SAMPLE_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "./samples-row-mapper.mock";
import { EntitiesDataSource } from "../table/entities.data-source";
import { getFileTypeSummary, mapMultipleValues } from "../table/entity-row-mapper.spec";

describe("SampleRowMapper:", () => {

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
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([SAMPLE_SINGLE_VALUES]), SampleRowMapper);
        expect(dataSource).toBeTruthy();
    });

    /**
     * Use bam count as a test to check if sample mapper extends the file type summaries mapper by confirming BAM
     * count is mapped.
     */
    it("should map file type summary bam count", (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedProject = rows[0];
            const fileTypeSummary = getFileTypeSummary(sampleToMap.fileTypeSummaries, "bam");
            expect(fileTypeSummary).toBeTruthy();
            expect(mappedProject.bamCount).toEqual(fileTypeSummary.count);
            done();
        })
    });

    /**
     * Sample ID should be mapped
     */
    it("should map sample ID", (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.sampleId).toEqual(sampleToMap.samples[0].id);
            done();
        })
    });

    /**
     * First sample ID should be mapped if more than one is specified
     */
    it("should map first sample ID if multiple are specified", (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.sampleId).toEqual(sampleToMap.samples[0].id);
            done();
        })
    });

    /**
     * Mapper leave unspecified sample IDs as is.
     */
    it("should not map sample ID when null", (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([SAMPLE_NULL_VALUES]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.sampleId).toBeFalsy();
            done();
        })
    });

    /**
     * Mapper leave unspecified specimens IDs as is.
     */
    it("should not map sample ID when samples is null", (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([SAMPLE_NULL_TOP_LEVEL_VALUES]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.sampleId).toBeFalsy();
            done();
        })
    });

    /**
     * Library construction approach should be mapped.
     */
    it("should map library construction approach", (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_SINGLE_VALUES;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.libraryConstructionApproach).toEqual(sampleToMap.protocols[0].libraryConstructionApproach[0]);
            done();
        })
    });

    /**
     * Multiple library construction approaches should be rolled up and mapped.
     */
    it("should roll up and map multiple library construction approach values", (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_MULTIPLE_VALUES_SINGLE_OBJECT;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.libraryConstructionApproach).toEqual(
                sampleToMap.protocols[0].libraryConstructionApproach.join(", "));
            done();
        })
    });

    /**
     * Multiple library construction approaches should be rolled up and mapped.
     */
    it("should roll up and map multiple library construction approach values across multiple protocols", (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_VALUES_ACROSS_MULTIPLE_OBJECTS;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            const expectedValue = mapMultipleValues(sampleToMap.protocols, "libraryConstructionApproach");
            expect(mappedSample.libraryConstructionApproach).toEqual(expectedValue);
            done();
        })
    });

    /**
     * An empty library construction approach array should be mapped to "Unspecified".
     */
    it(`should map empty array library construction approach to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        const sampleToMap = SAMPLE_EMPTY_ARRAY_VALUES;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([sampleToMap]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.libraryConstructionApproach).toEqual("Unspecified");
            done();
        })
    });

    /**
     * Mapper should handle null protocols value. Use library construction approach as the check for this.
     */
    it(`should map library construction approach to "Unspecified" when protocols is null`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([SAMPLE_NULL_VALUES]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.libraryConstructionApproach).toEqual("Unspecified");
            done();
        })
    });

    /**
     * An empty library construction approach array should be mapped to "Unspecified"
     */
    it(`should map null library construction approach to "Unspecified"`, (done: DoneFn) => {

        const v2 = false;
        dataSource = new EntitiesDataSource<SampleRowMapper>(v2, of([SAMPLE_NULL_VALUES]), SampleRowMapper);
        dataSource.connect().subscribe((rows) => {

            const mappedSample = rows[0];
            expect(mappedSample.libraryConstructionApproach).toEqual("Unspecified");
            done();
        })
    });
});
