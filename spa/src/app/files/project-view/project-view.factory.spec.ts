/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing project view factory.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { ProjectViewFactory } from "./project-view.factory";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";

describe("ProjectViewFactory:", () => {

    let projectViewFactory: ProjectViewFactory;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                {
                    provide: ConfigService,
                    useValue: jasmine.createSpyObj("ConfigService", [
                        "getPortalUrl"
                    ])
                }
            ]
        });

        const configService = TestBed.inject(ConfigService);
        projectViewFactory = new ProjectViewFactory(configService);
    }));

    describe("buildDataSummaries", () => {

        /**
         * Confirm nucleic acid source is added to project view if value is Unspecified.
         */
        it(`includes nucleic acid source with value "Unspecified"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                nucleicAcidSource: "Unspecified"
            };
            const result = projectViewFactory["buildDataSummaries"](mappedProject as any);
            const mappedNucleicAcidSource = result.find(keyValuePair => keyValuePair.key === "nucleicAcidSource");
            expect(mappedNucleicAcidSource).toBeTruthy();
        });

        /**
         * Confirm nucleic acid source is added to project view if value is "single cell".
         */
        it(`includes nucleic acid source with value "Unspecified"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                nucleicAcidSource: "single cell"
            };
            const result = projectViewFactory["buildDataSummaries"](mappedProject as any);
            const mappedNucleicAcidSource = result.find(keyValuePair => keyValuePair.key === "nucleicAcidSource");
            expect(mappedNucleicAcidSource.value).toEqual(mappedProject.nucleicAcidSource);
        });
    });
    
    describe("buildProjectAccessionsSummaries", () => {

        /**
         * Confirm no accessions are added to project view if all values are Unspecified.
         */
        it(`excludes all accessions if all values are "Unspecified"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                arrayExpressAccessions: "Unspecified",
                geoSeriesAccessions: "Unspecified",
                insdcProjectAccessions: "Unspecified",
                insdcStudyAccessions: "Unspecified"
            };
            const result = projectViewFactory["buildProjectAccessionsSummaries"](mappedProject as any);
            expect(result.length).toBe(0);
        });

        /**
         * Confirm Unspecified accession value is not added to the project view.
         */
        it(`excludes "Unspecified" accession value from project view`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                arrayExpressAccessions: "Unspecified",
                geoSeriesAccessions: "abc",
                insdcProjectAccessions: "def",
                insdcStudyAccessions: "ghi"
            };
            const result = projectViewFactory["buildProjectAccessionsSummaries"](mappedProject as any);
            expect(result.length).toBe(3);
            expect(includesAccessions(result, "Array Express Accessions")).toBeFalsy();
            expect(includesAccessions(result, "GEO Series Accessions")).toBeTruthy();
            expect(includesAccessions(result, "INSDC Project Accessions")).toBeTruthy();
            expect(includesAccessions(result, "INSDC Study Accessions")).toBeTruthy();
        });

        /**
         * Confirm all accession values are added to project view.
         */
        it(`maps all accession values`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                arrayExpressAccessions: "abc",
                geoSeriesAccessions: "def",
                insdcProjectAccessions: "ghi",
                insdcStudyAccessions: "jkl"
            };
            const result = projectViewFactory["buildProjectAccessionsSummaries"](mappedProject as any);
            expect(result.length).toBe(4);
            expect(includesAccessions(result, "Array Express Accessions")).toBeTruthy();
            expect(includesAccessions(result, "GEO Series Accessions")).toBeTruthy();
            expect(includesAccessions(result, "INSDC Project Accessions")).toBeTruthy();
            expect(includesAccessions(result, "INSDC Study Accessions")).toBeTruthy();
        });

        /**
         * Confirm a single accession value is added to project view.
         */
        it(`maps a single accession value`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                arrayExpressAccessions: "abc",
                geoSeriesAccessions: "def",
                insdcProjectAccessions: "ghi",
                insdcStudyAccessions: "jkl"
            };
            const result = projectViewFactory["buildProjectAccessionsSummaries"](mappedProject as any);
            const arrayExpressAccessions = includesAccessions(result, "Array Express Accessions");
            expect(arrayExpressAccessions.value.length).toEqual(1);
            expect((arrayExpressAccessions.value[0] as any).key).toEqual(mappedProject["arrayExpressAccessions"]);
        });

        /**
         * Confirm an accession value with multiple values is added to project view.
         */
        it(`maps a multi-value accession`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                arrayExpressAccessions: "abc, mno",
                geoSeriesAccessions: "def",
                insdcProjectAccessions: "ghi",
                insdcStudyAccessions: "jkl"
            };
            const result = projectViewFactory["buildProjectAccessionsSummaries"](mappedProject as any);
            const arrayExpressAccessions = includesAccessions(result, "Array Express Accessions");
            expect(arrayExpressAccessions.value.length).toEqual(2);
            const values = arrayExpressAccessions.value;
            expect(arrayExpressAccessions.value[0].key).toEqual("abc");
            expect(arrayExpressAccessions.value[1].key).toEqual("mno");
        });

        /**
         * Returns true if the set of key value pairs contains the speciifed accession key.
         *
         * @param {string} accessionKey
         * @returns {boolean}
         */
        function includesAccessions(result: KeyValuePair[], accessionKey: string): KeyValuePair {

            return result.find(keyValuePair => keyValuePair.key === accessionKey);
        }
    });
});
