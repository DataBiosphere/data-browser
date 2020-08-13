/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing search term HTTP service.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";

// App dependencies
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { ResponseTermService } from "../../http/response-term.service";
import { SearchTermHttpService } from "./search-term-http.service";
import { PROJECTS_ENTITY_API_RESPONSE } from "../../shared/entity-api-response.mock";

describe("SearchTermHttpService:", () => {
    
    let searchTermHttpService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                {
                    provide: ResponseTermService,
                    useValue: jasmine.createSpyObj("ResponseTermService", [
                        "bindTermName"
                    ])
                }
            ]
        });

        const responseTermService = TestBed.inject(ResponseTermService);
        searchTermHttpService = new SearchTermHttpService(responseTermService);
    }));

    /**
     * Confirm project facet is not added as a search term.
     */
    it("excludes project facet from search terms", () => {
        
        const searchTerms = searchTermHttpService.bindSearchTerms(PROJECTS_ENTITY_API_RESPONSE.termFacets);
        expect(searchTerms).toBeTruthy();
        const projectSearchTerm = searchTerms.find((searchTerm) => searchTerm.searchKey === FileFacetName.PROJECT);
        expect(projectSearchTerm).toBeFalsy();
    });


    /**
     * Confirm project facet is added as a project ID search entity
     */
    it("bind project facets as project ID search entities", () => {

        const searchEntities = searchTermHttpService.bindSearchEntities(PROJECTS_ENTITY_API_RESPONSE.termFacets);
        expect(searchEntities).toBeTruthy();
        const projectIdSearchEntity = searchEntities.find((searchTerm) => searchTerm.searchKey === FileFacetName.PROJECT_ID);
        expect(projectIdSearchEntity).toBeTruthy();
    });
});
