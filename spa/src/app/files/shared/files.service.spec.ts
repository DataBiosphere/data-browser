/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing service service.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";
import { ConfigService } from "../../config/config.service";
import { of } from "rxjs";

// App dependencies
import { FileFormat } from "./file-format.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFacet } from "./file-facet.model";
import { FilesService } from "./files.service";
import { GenusSpecies } from "./genus-species.model";
import { FILE_SINGLE_VALUES } from "../hca-table-files/file-row-mapper.mock";
import { LibraryConstructionApproach } from "./library-construction-approach.model";
import { MatrixableFileFacets } from "./matrixable-file-facets.model";
import { PairedEnd } from "./paired-end.model";
import { SearchTerm } from "../search/search-term.model";
import { DEFAULT_TABLE_PARAMS, TableParamsModel } from "../table/table-params.model";
import { SearchTermService } from "./search-term.service";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { Term } from "./term.model";
import { TermResponseService } from "./term-response.service";

describe("FileService:", () => {

    let httpClientSpy: { get: jasmine.Spy };
    let fileService: FilesService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: []
        });

        // Set return value of buildApiUrl to "", to avoid undefined httpClient.get being called with undefined; we want
        // to confirm httpClient.get is called with a string value for url.
        const configService = jasmine.createSpyObj("ConfigService", ["buildApiUrl"]);
        configService.buildApiUrl.and.returnValue("");

        const termResponseService = new TermResponseService();
        const searchTermService = new SearchTermService(termResponseService);

        // Create spy for httpClient.get
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);

        fileService = new FilesService(configService, searchTermService, termResponseService, <any>httpClientSpy);
    }));

    /**
     * Smoke test
     */
    it("should create service", () => {

        expect(fileService).toBeTruthy();
    });

    describe("Matrix Supported:", () => {

        /**
         * When no file format is specified, matrix is added.
         */
        it("should add matrix file format to query params when no file formats are selected", () => {

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixSupportedSearchTerms"](new Map());
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: file format
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.FILE_FORMAT);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * When file formats other than matrix is specified, matrix is added and all other file formats are removed
         */
        it("should clear other selected file formats and add matrix file format to query params", () => {

            // Set up search terms - add file formats other than matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM),
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAI),
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixSupportedSearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: file format
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.FILE_FORMAT);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * Matrix file format should remain unchanged in query params.
         */
        it("should retain matrix file format in query params", () => {

            // Set up search terms - add file formats other than matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixSupportedSearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: file format
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.FILE_FORMAT);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * Matrix file format should remain unchanged in query params, and additional file formats should be removed.
         */
        it("should retain matrix file format and clear other file formats in query params", () => {

            // Set up search terms - add file formats other than matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAI),
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixSupportedSearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: file format
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.FILE_FORMAT);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * Facets other than file format should remain unchanged
         */
        it("should retain facets other than file format in query params", () => {

            // Set up search terms - add file formats other than matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAI),
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
            ]));
            searchTerms.set(FileFacetName.GENUS_SPECIES, new Set([
                new SearchFileFacetTerm(FileFacetName.GENUS_SPECIES, GenusSpecies.HOMO_SAPIENS)
            ]));
            searchTerms.set(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, new Set([
                new SearchFileFacetTerm(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, LibraryConstructionApproach.SMART_SEQ2)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixSupportedSearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should be three facet names: file format, genus species, library construction approach
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(3);
            expect(facetNames).toContain(FileFacetName.FILE_FORMAT);
            expect(facetNames).toContain(FileFacetName.GENUS_SPECIES);
            expect(facetNames).toContain(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * Matrix is considered not supported if no hits are returned
         */
        it("should consider matrix not supported when hits is empty", (done: DoneFn) => {

            // Create response for httpClient.get 
            httpClientSpy.get.and.returnValue(of({
                hits: [],
                pagination: {},
                termFacets: []
            }));

            fileService.fetchIsMatrixSupported(new Map(), DEFAULT_TABLE_PARAMS).subscribe((response: boolean) => {

                expect(response).toEqual(false);
                return done();
            });
        });

        /**
         * Matrix is considered supported if hits are returned
         */
        it("should consider matrix supported when hits are returned", (done: DoneFn) => {

            // Create response for httpClient.get 
            httpClientSpy.get.and.returnValue(of({
                hits: [{
                    FILE_SINGLE_VALUES
                }],
                pagination: {},
                termFacets: []
            }));

            fileService.fetchIsMatrixSupported(new Map(), DEFAULT_TABLE_PARAMS).subscribe((response: boolean) => {

                expect(response).toEqual(true);
                return done();
            });
        });
    });

    describe("Matrix Partial Query Match:", () => {

        /**
         * If no file formats are specified, they remain unchanged
         */
        it("should not modify file formats if none specified", () => {

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixPartialQuerySearchTerms"](new Map());
            expect(searchTermsByFacetNames).toBeTruthy();
        });

        /**
         * Retains matrix file format if specified
         */
        it("should retain matrix file format if only file format specified", () => {

            // Set up search terms - add matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixPartialQuerySearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: file format
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.FILE_FORMAT);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * Retains only matrix file format if matrix and other file formats are specified
         */
        it("should retain matrix file format if matrix and other file formats specified", () => {

            // Set up search terms - add matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAI),
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixPartialQuerySearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: file format
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.FILE_FORMAT);

            // There should only be a single search term for file format: matrix
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.FILE_FORMAT));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.FILE_FORMAT);
            expect(fileFormat.getSearchValue()).toEqual(FileFormat.MATRIX);
        });

        /**
         * No file format included if only non-matrix file formats specified
         */
        it("should clear file formats other than matrix", () => {

            // Set up search terms - add matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAI),
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixPartialQuerySearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should be no search terms
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(0);
        });

        /**
         * Search terms for facets other than file format should remain unchanged
         */
        it("should not change search terms other than file format", () => {

            // Set up search terms - add matrix
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAI),
                new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.BAM)
            ]));
            searchTerms.set(FileFacetName.GENUS_SPECIES, new Set([
                new SearchFileFacetTerm(FileFacetName.GENUS_SPECIES, GenusSpecies.HOMO_SAPIENS)
            ]));
            searchTerms.set(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, new Set([
                new SearchFileFacetTerm(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, LibraryConstructionApproach.SMART_SEQ2)
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createMatrixPartialQuerySearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should be two facet names: fgenus species, library construction approach
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(2);
            expect(facetNames).toContain(FileFacetName.GENUS_SPECIES);
            expect(facetNames).toContain(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);

            // There should only be a single search term for genus species
            const genusSpeciesFileFormat = Array.from(searchTermsByFacetNames.get(FileFacetName.GENUS_SPECIES));
            expect(genusSpeciesFileFormat.length).toEqual(1);
            const genusSpecies = genusSpeciesFileFormat[0];
            expect(genusSpecies.getSearchKey()).toEqual(FileFacetName.GENUS_SPECIES);
            expect(genusSpecies.getSearchValue()).toEqual(GenusSpecies.HOMO_SAPIENS);


            // There should only be a single search term for genus species
            const libraryConstructionApproaches = Array.from(searchTermsByFacetNames.get(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH));
            expect(libraryConstructionApproaches.length).toEqual(1);
            const libraryConstructionApproach = libraryConstructionApproaches[0];
            expect(libraryConstructionApproach.getSearchKey()).toEqual(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);
            expect(libraryConstructionApproach.getSearchValue()).toEqual(LibraryConstructionApproach.SMART_SEQ2);
        });

        /**
         * Genus species is considered partial match if it contains a value other than homo sapiens and unspecified
         */
        it("should consider genus species a partial match if it contains a value other than homo sapiens, mouse and unspecified", () => {

            const genusSpecies = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                new Term(GenusSpecies.HOMO_SAPIENS, 90, false),
                new Term(GenusSpecies.UNSPECIFIED, 5, false),
                new Term(GenusSpecies.MUS_MUSCULUS, 5, false),
                new Term(GenusSpecies.DANIO_RERIO, 5, false)
            ]);
            expect(fileService["isGenusSpeciesPartialQueryMatch"](genusSpecies)).toEqual(true)
        });

        /**
         * Genus species is not considered partial match if it contains unspecified
         */
        it("should not consider genus species a partial match if it only contains unspecified", () => {

            const genusSpecies = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                new Term(GenusSpecies.UNSPECIFIED, 90, false)
            ]);
            expect(fileService["isGenusSpeciesPartialQueryMatch"](genusSpecies)).toEqual(false)
        });

        /**
         * Genus species is not considered partial match if it only contains homo sapiens
         */
        it("should not consider genus species a partial match if it only contains homo sapiens", () => {

            const genusSpecies = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
            ]);
            expect(fileService["isGenusSpeciesPartialQueryMatch"](genusSpecies)).toEqual(false)
        });

        /**
         * Genus species is not considered partial match if it only contains homo sapiens lower case
         */
        it("should not consider genus species a partial match if it only contains homo sapiens lower case", () => {

            const genusSpecies = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                new Term(GenusSpecies.homo_sapiens, 90, false)
            ]);
            expect(fileService["isGenusSpeciesPartialQueryMatch"](genusSpecies)).toEqual(false)
        });

        /**
         * Genus species is not considered partial match if it contains mouse
         */
        it("should not consider genus species a partial match if it only contains mouse", () => {

            const genusSpecies = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                new Term(GenusSpecies.MUS_MUSCULUS, 90, false)
            ]);
            expect(fileService["isGenusSpeciesPartialQueryMatch"](genusSpecies)).toEqual(false)
        });

        /**
         * Paired end is considered partial match if it contains a value other than true
         */
        it("should consider paired end a partial match if it contains a value other than true", () => {

            const pairedEnd = new FileFacet(FileFacetName.PAIRED_END, 100, [
                new Term(PairedEnd.TRUE, 90, false),
                new Term(PairedEnd.FALSE, 10, false)
            ]);
            expect(fileService["isPairedEndPartialQueryMatchForSmartSeq2"](pairedEnd)).toEqual(true)
        });

        /**
         * Paired end is not considered partial match if it only contains true
         */
        it("should not consider paired end a partial match if it only contains true", () => {

            const pairedEnd = new FileFacet(FileFacetName.PAIRED_END, 100, [
                new Term(PairedEnd.TRUE, 90, false)
            ]);
            expect(fileService["isPairedEndPartialQueryMatchForSmartSeq2"](pairedEnd)).toEqual(false)
        });

        /**
         * 10x v2 is a valid library construction approach
         */
        it("should consider 10x v2 to be a valid library construction approach", () => {

            const libraryConstructionApproach = new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                new Term(LibraryConstructionApproach.TENX_V2, 90, false)
            ]);
            expect(fileService["isValidMatrixLibraryConstructionApproach"](libraryConstructionApproach)).toEqual(true)
        });

        /**
         * 10x 3' v2 is a valid library construction approach
         */
        it("should consider 10x 3' v2 to be a valid library construction approach", () => {

            const libraryConstructionApproach = new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                new Term(LibraryConstructionApproach.TENX_3PRIME_V2, 90, false)
            ]);
            expect(fileService["isValidMatrixLibraryConstructionApproach"](libraryConstructionApproach)).toEqual(true)
        });

        /**
         * Smart seq 2 is a valid library construction approach
         */
        it("should consider smart seq 2 to be a valid library construction approach", () => {

            const libraryConstructionApproach = new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                new Term(LibraryConstructionApproach.SMART_SEQ2, 90, false)
            ]);
            expect(fileService["isValidMatrixLibraryConstructionApproach"](libraryConstructionApproach)).toEqual(true)
        });

        /**
         * Unspecified is a valid library construction approach
         */
        it("should consider unspecified to be a valid library construction approach", () => {

            const libraryConstructionApproach = new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                new Term(LibraryConstructionApproach.UNSPECIFIED, 90, false)
            ]);
            expect(fileService["isValidMatrixLibraryConstructionApproach"](libraryConstructionApproach)).toEqual(true)
        });

        /**
         * Value other than smart seq 2, 10x v2, 10x 3' v2, unspecified is not a valid construction approach
         */
        it("should not consider inDrop to be a valid library construction approach", () => {

            const libraryConstructionApproach = new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                new Term(LibraryConstructionApproach.INDROP, 90, false)
            ]);
            expect(fileService["isValidMatrixLibraryConstructionApproach"](libraryConstructionApproach)).toEqual(false)
        });

        /**
         * Matrix is not considered partial query match when genus species only contains homo sapiens
         */
        it("should not be considered partial match when genus species only contains homo sapiens", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facets that we are not expecting to be considered a
            // partial query match. Pass in genus species that is not considered partial. Using square bracket notation
            // to access private method.
            const matrixableFileFacets = {
                // Non-partial genus species
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                // Non-partial library construction approach 
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_V2, 100, false)
                ]),
                // Non-partial paired ends
                pairedEnds: new FileFacet(FileFacetName.PAIRED_END, 100, [
                    new Term(PairedEnd.TRUE, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });

        /**
         * Matrix is not considered partial query match when genus species only contains unspecified
         */
        it("should not be considered partial match when genus species only contains unspecified", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facets that we are not expecting to be considered a
            // partial query match. Pass in genus species that is not considered partial. Using square bracket notation
            // to access private method.
            const matrixableFileFacets = {
                // Non-partial genus species
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                // Non-partial library construction approach 
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_V2, 100, false)
                ]),
                // Non-partial paired ends
                pairedEnds: new FileFacet(FileFacetName.PAIRED_END, 100, [
                    new Term(PairedEnd.UNSPECIFIED, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });
        
        /**
         * Matrix is considered partial query match if genus species contains value other than homo sapiens
         */
        it("should be considered partial match when genus species contains value other than homo sapiens and mouse", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Using square bracket notation to access private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false),
                    new Term(GenusSpecies.MUS_MUSCULUS, 90, false),
                    new Term(GenusSpecies.DANIO_RERIO, 90, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(true);
                    done();
                })
        });

        /**
         * Matrix is considered partial query match if the library construction is inDrop.
         */
        it("should be considered a partial match when library construction approach contains inDrop", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.INDROP, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(true);
                    done();
                })
        });

        /**
         * Matrix is not considered partial query match if the library construction is 10x v2.
         */
        it("should not be considered a partial match when library construction approach is 10x v2", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_V2, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });

        /**
         * Matrix is not considered partial query match if the library construction is 10x 3' v2.
         */
        it("should not be considered a partial match when library construction approach is 10x 3' v2", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_3PRIME_V2, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });

        /**
         * Matrix is not considered partial query match if the library construction is unspecified.
         */
        it("should not be considered a partial match when library construction approach is unspecified", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.UNSPECIFIED, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });

        /**
         * Matrix is not considered partial query match if the library construction is smart seq 2 and paired end is true
         */
        it("should not be considered a partial match when library construction approach is smart seq 2 and paired end true", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_3PRIME_V2, 100, false)
                ]),
                pairedEnds: new FileFacet(FileFacetName.PAIRED_END, 100, [
                    new Term(PairedEnd.TRUE, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });

        /**
         * Matrix is not considered partial query match if the library construction is smart seq 2 and paired end is
         * unspecified
         */
        it("should not be considered a partial match when library construction approach is smart seq 2 and paired end unspecified", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_3PRIME_V2, 100, false)
                ]),
                pairedEnds: new FileFacet(FileFacetName.PAIRED_END, 100, [
                    new Term(PairedEnd.UNSPECIFIED, 100, false)
                ])
            } as MatrixableFileFacets;
            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(partialQuery => {
                    expect(partialQuery).toBe(false);
                    done();
                })
        });

        /**
         * Additional call must be sent to server to determine partial query match if smart seq 2 and paired end is
         * anything other than true
         */
        it("should execute additional query to determine partial match if smart seq 2 and paired end true and false", (done: DoneFn) => {

            // Pass any search terms and any table params in because these values are not used to determine the partial
            // query match at this point. Build up matrixable file facet that we are expecting to be considered a partial
            // query match. Pass in genus species that is not considered partial. Using square bracket notation to access
            // private method.
            const matrixableFileFacets = {
                genusSpecies: new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
                    new Term(GenusSpecies.HOMO_SAPIENS, 90, false)
                ]),
                libraryConstructionApproaches: new FileFacet(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, 100, [
                    new Term(LibraryConstructionApproach.TENX_3PRIME_V2, 100, false),
                    new Term(LibraryConstructionApproach.SMART_SEQ2, 100, false)
                ]),
                pairedEnds: new FileFacet(FileFacetName.PAIRED_END, 100, [
                    new Term(PairedEnd.TRUE, 100, false),
                    new Term(PairedEnd.FALSE, 100, false)
                ])
            } as MatrixableFileFacets;

            // Use <any> here to access private method
            const fetchIsSmartSeq2False = 
                spyOn<any>(fileService, "fetchIsSmartSeq2False").and.returnValue(of(true));

            fileService["isMatrixPartialQueryMatch"](new Map(), {} as TableParamsModel, matrixableFileFacets)
                .subscribe(() => {
                    expect(fetchIsSmartSeq2False).toHaveBeenCalled();
                    done();
                })
        });

        /**
         * Clear all library construction approaches other than smart seq 2 when generating smart seq 2 search terms.
         */
        it("should clear library construction approaches other than smart seq 2 from smart seq 2 search terms", () => {

            // Set up search terms - add library construction approaches
            const searchTerms = new Map<string, Set<SearchTerm>>();
            searchTerms.set(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, new Set([
                new SearchFileFacetTerm(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, LibraryConstructionApproach.TENX_V2),
                new SearchFileFacetTerm(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, LibraryConstructionApproach.SMART_SEQ2),
            ]));

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createSmartSeq2SearchTerms"](searchTerms);
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: library construction approach
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);

            // There should only be a single search term for file format: smart seq 2
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);
            expect(fileFormat.getSearchValue()).toEqual(LibraryConstructionApproach.SMART_SEQ2);
        });

        /**
         * If not specified, smart seq 2 should be added to params when generating smart seq 2 search terms.
         */
        it("should add smart seq 2 to empty smart seq 2 search terms", () => {

            // Using square bracket notation here to do a sneaky call of a private method
            const searchTermsByFacetNames = fileService["createSmartSeq2SearchTerms"](new Map());
            expect(searchTermsByFacetNames).toBeTruthy();

            // There should only be a single search term key: library construction approach
            const facetNames = Array.from(searchTermsByFacetNames.keys());
            expect(facetNames.length).toEqual(1);
            expect(facetNames[0]).toEqual(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);

            // There should only be a single search term for file format: smart seq 2
            const fileFormats = Array.from(searchTermsByFacetNames.get(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH));
            expect(fileFormats.length).toEqual(1);
            const fileFormat = fileFormats[0];
            expect(fileFormat.getSearchKey()).toEqual(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);
            expect(fileFormat.getSearchValue()).toEqual(LibraryConstructionApproach.SMART_SEQ2);
        });
    });
});
