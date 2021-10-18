/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing project view factory.
 */

// Core dependencies
import { TestBed, waitForAsync } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";

// App dependencies
import { DCPCatalog } from "../catalog/dcp-catalog.model";
import { ConfigService } from "../../config/config.service";
import { ConfigState } from "../../config/_ngrx/config.state";
import { ProjectViewFactory } from "./project-view.factory";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";

describe("ProjectViewFactory", () => {

    let projectViewFactory: ProjectViewFactory;
    let configService;

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

        configService = TestBed.inject(ConfigService);
        projectViewFactory = new ProjectViewFactory(configService);
    }));

    describe("buildDataSummaries", () => {

        /**
         * Confirm selected cell type is added to project view if value is Unspecified.
         */
        it(`includes selected cell type with value "Unspecified"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                selectedCellType: "Unspecified"
            };
            const result = projectViewFactory["buildDataSummaries"](mappedProject as any);
            const mappedSelectedCellType = result.find(keyValuePair => keyValuePair.key === "selectedCellType");
            expect(mappedSelectedCellType).toBeTruthy();
        });

        /**
         * Confirm selected cell type is added to project view if value is "neural cell".
         */
        it(`includes selected cell type with value "neural cell"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                selectedCellType: "neural cell"
            };
            const result = projectViewFactory["buildDataSummaries"](mappedProject as any);
            const mappedSelectedCellType = result.find(keyValuePair => keyValuePair.key === "selectedCellType");
            expect(mappedSelectedCellType.value).toEqual(mappedProject.selectedCellType);
        });

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

        /**
         * Confirm development stage is added to project view if value is Unspecified.
         */
        it(`includes development stage with value "Unspecified"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                developmentStage: "Unspecified"
            };
            const result = projectViewFactory["buildDataSummaries"](mappedProject as any);
            const mappedNucleicAcidSource = result.find(keyValuePair => keyValuePair.key === "developmentStage");
            expect(mappedNucleicAcidSource).toBeTruthy();
        });

        /**
         * Confirm development stage is added to project view if value is "adult".
         */
        it(`includes development stage with value "Unspecified"`, () => {

            // Create model of project that has been parsed by the project mapper
            const mappedProject = {
                developmentStage: "adult"
            };
            const result = projectViewFactory["buildDataSummaries"](mappedProject as any);
            const mappedNucleicAcidSource = result.find(keyValuePair => keyValuePair.key === "developmentStage");
            expect(mappedNucleicAcidSource.value).toEqual(mappedProject.developmentStage);
        });

        projectViewFactory = new ProjectViewFactory(configService);
    });

    describe("buildAccessions", () => {

        // Create model of project that has been parsed by the project mapper
        const mappedProject = {
            accessionsByLabel: new Map([
                ["Array Express Accessions", [{
                    id: "123",
                    label: "Array Express Accessions",
                    url: ""
                }]],
                ["GEO Series Accessions", [{
                    id: "123",
                    label: "GEO Series Accessions",
                    url: ""
                }]],
                ["INSDC Project Accessions", [{
                    id: "123",
                    label:"INSDC Project Accessions",
                    url: ""
                }]],
                ["INSDC Study Accessions", [{
                    id: "123",
                    label: "INSDC Study Accessions",
                    url: ""
                }]]
            ])
        };

        /**
         * Confirm all accession values are added to project view.
         */
        it("maps all accession values", () => {

            const result = projectViewFactory["buildAccessions"](mappedProject as any);
            expect(result.length).toBe(4);
            expect(includesAccessions(result, "Array Express Accessions")).toBeTruthy();
            expect(includesAccessions(result, "GEO Series Accessions")).toBeTruthy();
            expect(includesAccessions(result, "INSDC Project Accessions")).toBeTruthy();
            expect(includesAccessions(result, "INSDC Study Accessions")).toBeTruthy();
        });

        /**
         * Confirm a single accession value is added to project view.
         */
        it("maps a single accession value", () => {

            const result = projectViewFactory["buildAccessions"](mappedProject as any);
            const arrayExpressAccessions = includesAccessions(result, "Array Express Accessions");
            expect(arrayExpressAccessions.value.length).toEqual(1);
            const expected = mappedProject.accessionsByLabel.get("Array Express Accessions")[0].id;
            expect((arrayExpressAccessions.value[0] as any).key).toEqual(expected);
        });

        /**
         * Confirm an accession value with multiple values is added to project view.
         */
        it("maps a multi-value accession", () => {

            const multiAccessionMappedProject = {
                accessionsByLabel: new Map([
                    ["Array Express Accessions", [{
                        id: "123",
                        label: "Array Express Accessions"
                    }, {
                        id: "456",
                        label: "Array Express Accessions"
                    }]],
                ])
            };

            const result = projectViewFactory["buildAccessions"](multiAccessionMappedProject as any);
            const arrayExpressAccessions = includesAccessions(result, "Array Express Accessions");
            expect(arrayExpressAccessions.value.length).toEqual(2);
            const values = arrayExpressAccessions.value;
            expect(values[0].key).toEqual("123");
            expect(values[1].key).toEqual("456");
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

    describe("buildCitationUrl", () => {

        it("adds dcp1 catalog to citation url", () => {

            const browserUrl = "https://foo.com";
            spyOn(configService, "getBrowserUrl").and.returnValue(browserUrl);

            const catalog = DCPCatalog.DCP1;
            const projectId = "baz";
            const citationUrl = projectViewFactory["buildCitationUrl"](catalog, projectId);
            expect(citationUrl).toEqual(`${browserUrl}/explore/projects/${projectId}?catalog=${catalog}`)
        });

        it("doesn't add default catalog to citation url", () => {

            const browserUrl = "https://foo.com";
            spyOn(configService, "getBrowserUrl").and.returnValue(browserUrl);

            const catalog = "foo";
            const projectId = "baz";
            const citationUrl = projectViewFactory["buildCitationUrl"](catalog, projectId);
            expect(citationUrl).toEqual(`${browserUrl}/explore/projects/${projectId}`)
        });
    });
});
