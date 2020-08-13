/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing search state.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";

// App dependencies
import { SearchState } from "./search.state";
import { SearchTermsUpdatedAction } from "./search-terms-updated.action";
import { SearchEntity } from "../../search/search-entity.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SearchFacetTerm } from "../../search/search-facet-term.model";

describe("SearchState:", () => {


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: []
        });
    }));

    /**
     * Confirm patch is called when search terms have not yet been initialized. This means there is a project ID in
     * the selected set of filters on load of the app, but the corresponding project SearchEntity (to match a project
     * name to the project ID) has not yet been created from the project facet from the entity endpoint. 
     */
    it("calls patch if search terms not yet initialized", () => {

        const searchState = new SearchState([], new Map(), "");
        const patchSearchTersmSpy = spyOn<any>(searchState, "patchSearchTerms").and.returnValue(new Map()); // <any> enables spy on private method
        
        const action = new SearchTermsUpdatedAction([], [
            new SearchEntity(FileFacetName.PROJECT_ID, "123abc", "project shortname", 1)
        ]);
        searchState.setSearchTerms(action);
        
        expect(patchSearchTersmSpy).toHaveBeenCalled();
    });

    /**
     * Confirm patch is not called if search terms have been initialized. This means a project ID has been selected in
     * the app and it can be matched up with the corresponding project SearchEntity, created from the project facet
     * returned from the entity endpoint.
     */
    it("patch not called if search terms already initialized", () => {

        const searchState = new SearchState([
            new SearchFacetTerm(FileFacetName.ORGAN, "brain")
        ], new Map(), "");
        const patchSearchTersmSpy = spyOn<any>(searchState, "patchSearchTerms").and.returnValue(new Map()); // <any> enables spy on private method

        const action = new SearchTermsUpdatedAction([], [
            new SearchEntity(FileFacetName.PROJECT_ID, "123abc", "project shortname", 1)
        ]);
        searchState.setSearchTerms(action);
        
        expect(patchSearchTersmSpy).not.toHaveBeenCalled();
    });
});
