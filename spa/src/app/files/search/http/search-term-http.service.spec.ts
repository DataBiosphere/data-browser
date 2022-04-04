/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing search term HTTP service.
 */

// Core dependencies
import { TestBed, waitForAsync } from "@angular/core/testing";

// App dependencies
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { ResponseTermService } from "../../http/response-term.service";
import { SearchTermHttpService } from "./search-term-http.service";
import { PROJECTS_ENTITY_API_RESPONSE } from "../../shared/entity-api-response.mock";

describe("SearchTermHttpService:", () => {
    let searchTermHttpService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                {
                    provide: ResponseTermService,
                    useValue: jasmine.createSpyObj("ResponseTermService", [
                        "bindTermName",
                    ]),
                },
            ],
        });

        const responseTermService = TestBed.inject(ResponseTermService);
        searchTermHttpService = new SearchTermHttpService(responseTermService);
    }));

    describe("project", () => {
        /**
         * Confirm project facet is not added as a search term.
         */
        it("binds project facet in search terms", () => {
            const searchTerms = searchTermHttpService.bindSearchTerms(
                PROJECTS_ENTITY_API_RESPONSE.termFacets
            );
            expect(searchTerms).toBeTruthy();
            const projectSearchTerm = searchTerms.find(
                (searchTerm) => searchTerm.facetName === FileFacetName.PROJECT
            );
            expect(projectSearchTerm).toBeTruthy();
        });

        /**
         * Confirm project facet is added as a project ID search entity
         */
        it("bind project facets as project ID search entities", () => {
            const searchEntities = searchTermHttpService.bindSearchEntities(
                PROJECTS_ENTITY_API_RESPONSE.termFacets
            );
            expect(searchEntities).toBeTruthy();
            const projectIdSearchEntity = searchEntities.find(
                (searchTerm) =>
                    searchTerm.searchKey === FileFacetName.PROJECT_ID
            );
            expect(projectIdSearchEntity).toBeTruthy();
        });
    });

    describe("publicationTitle", () => {
        /**
         * Confirm project facet is not added as a search term.
         */
        it("includes publication title facet in search terms", () => {
            const searchTerms = searchTermHttpService.bindSearchTerms(
                PROJECTS_ENTITY_API_RESPONSE.termFacets
            );
            expect(searchTerms).toBeTruthy();
            const publicationTitleSearchTerm = searchTerms.find(
                (searchTerm) =>
                    searchTerm.facetName === FileFacetName.PUBLICATION_TITLE
            );
            expect(publicationTitleSearchTerm).toBeTruthy();
        });
    });
});
