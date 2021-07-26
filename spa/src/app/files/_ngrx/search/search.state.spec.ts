/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing search state.
 */

// Core dependencies
import { async, TestBed } from "@angular/core/testing";

// App dependencies
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { FetchSelectedProjectsSuccessAction } from "./fetch-selected-projects-success.action";
import { SearchState } from "./search.state";
import { SearchEntity } from "../../search/search-entity.model";

describe("SearchState", () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: []
        });
    }));
    
    describe("selectedSearchTermsLoading", () => {

        /**
         * Confirm selected search term loading state is true when there is a selected project ID without a corresponding
         * display name.
         */
        it("inits loading to true when project ID selected without a corresponding name", () => {

            const selectedProjectId = new SearchEntity(FileFacetName.PROJECT_ID, "123abc", "", 0);
            const selectedSearchTermsByKey = new Map([[
                FileFacetName.PROJECT_ID, new Set([selectedProjectId])
            ]]);

            const searchState = new SearchState([], selectedSearchTermsByKey, "");
            expect(searchState.selectedSearchTermsLoading).toBeTrue();
        });

        /**
         * Confirm selected search term loading state is false when there's no project IDs specified in the set of 
         * selected search terms.
         */
        it("inits loading to false when no project ID selected", () => {

            const searchState = new SearchState([], new Map(), "");
            expect(searchState.selectedSearchTermsLoading).toBeFalse();
        });
    });

    describe("isSelectedSearchTermsLoading", () => {

        /**
         * Confirm selected search term loading state is true when there is a selected project ID without a corresponding
         * display name.
         */
        it("returns true for selected project IDs without a corresponding name", () => {

            const selectedProjectId = new SearchEntity(FileFacetName.PROJECT_ID, "123abc", "", 0);
            const selectedSearchTermsByKey = new Map([[
                FileFacetName.PROJECT_ID, new Set([selectedProjectId])
            ]]);

            const searchState = new SearchState([], selectedSearchTermsByKey, "");
            const result = searchState["isSelectedSearchTermsLoading"](selectedSearchTermsByKey);
            expect(result).toBeTrue();
        });

        /**
         * Confirm selected search term loading state is false when a selected project ID has a corresponding name.
         */
        it("returns false for selected project IDs with a corresponding name", () => {

            const selectedProjectId = new SearchEntity(FileFacetName.PROJECT_ID, "123abc", "project name", 0);
            const selectedSearchTermsByKey = new Map([[
                FileFacetName.PROJECT_ID, new Set([selectedProjectId])
            ]]);

            const searchState = new SearchState([], selectedSearchTermsByKey, "");
            const result = searchState["isSelectedSearchTermsLoading"](selectedSearchTermsByKey);
            expect(result).toBeFalse();
        });

        /**
         * Confirm selected search term loading state is true when there's no project IDs specified in the set of
         * selected search terms.
         */
        it("returns true for no selected project IDs", () => {

            const searchState = new SearchState([], new Map(), "");
            const result = searchState["isSelectedSearchTermsLoading"](new Map());
            expect(result).toBeFalse();
        });
    });

    describe("patchSelectedProjectSearchTerms", () => {

        /**
         * Confirm project IDs are matched with their corresponding names.
         */
        it("patches selected project IDs with their corresponding names", () => {

            const selectedProjectId = new SearchEntity(FileFacetName.PROJECT_ID, "123abc", "", 0);
            const selectedSearchTermsByKey = new Map([[
                FileFacetName.PROJECT_ID, new Set([selectedProjectId])
            ]]);

            const searchState = new SearchState([], selectedSearchTermsByKey, "");
            
            const projectSearchEntity = 
                new SearchEntity(FileFacetName.PROJECT_ID, selectedProjectId.getId(), "project name");
            const action = new FetchSelectedProjectsSuccessAction([projectSearchEntity]);
            const result = searchState.patchSelectedProjectSearchTerms(action);
            expect(result.selectedSearchTermsLoading).toBeFalse();
            
            const selectedProjects = result.selectedSearchTermsBySearchKey.get(FileFacetName.PROJECT_ID);
            expect(selectedProjects.size).toEqual(1);
            
            const patchedSelectedProjectId = [...selectedProjects][0];
            expect(patchedSelectedProjectId.getDisplayValue()).toEqual(projectSearchEntity.getDisplayValue());
        });
    });
});
