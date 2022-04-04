/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component for displaying project nav, and the child component specific to the current route. For example,
 * project information, external tools, summary stats etc.
 */

// Core dependencies
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { BackToEntityAction } from "../_ngrx/entity/back-to-entity.action";
import {
    selectSelectedEntitySpec,
    selectSelectedProject,
} from "../_ngrx/files.selectors";
import { selectSelectedProjectSearchTerms } from "../_ngrx/search/search.selectors";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { ClearSelectedProjectAction } from "../_ngrx/table/clear-selected-project.action";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectDetailComponentState } from "./project-detail.component.state";
import { ProjectDetailService } from "./project-detail.service";
import { SearchTerm } from "../search/search-term.model";
import { GASource } from "../../shared/analytics/ga-source.model";
import { EntityName } from "../shared/entity-name.model";
import EntitySpec from "../shared/entity-spec";

@Component({
    selector: "project-detail",
    templateUrl: "./project-detail.component.html",
    styleUrls: ["./project-detail.component.scss"],
})
export class ProjectDetailComponent {
    // Locals
    private ngDestroy$ = new Subject();

    // Template variables
    public state$ = new BehaviorSubject<ProjectDetailComponentState>({
        loaded: false,
    });

    /**
     * @param {ProjectDetailService} projectDetailService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    public constructor(
        private projectDetailService: ProjectDetailService,
        private store: Store<AppState>,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    /**
     * Returns the class for the select box.
     *
     * @param {boolean} selected
     * @returns {{[p: string]: boolean}}
     */
    public getLegendClass(selected: boolean): { [className: string]: boolean } {
        return {
            box: true,
            selected: selected,
        };
    }

    /**
     * Tab provides opportunity to return back to the selected entity table.
     *
     * @returns {EntitySpec[]}
     */
    public getProjectDetailTabs(selectedEntity: EntitySpec): EntitySpec[] {
        return [{ key: selectedEntity.key, displayName: "Back" }];
    }

    /**
     * Handle click on term in list of terms - update store with selected / unselected project and returns user back to project table.
     *
     * @param {boolean} projectSelected
     * @param {string} projectId
     * @param {string} projectShortname
     */
    public onProjectSelected(
        projectSelected: boolean,
        projectId: string,
        projectShortname: string
    ) {
        this.store.dispatch(
            new SelectProjectIdAction(
                projectId,
                projectShortname,
                !projectSelected,
                GASource.PROJECT
            )
        );
        this.router.navigate(["/projects"], {
            queryParamsHandling: "preserve",
        });
    }

    /**
     * Handle click on tab - update selected entity in state and return user back to tab key.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {
        // Only update state if we have a tab key that corresponds to an entity. In the case that the tab key that does
        // not correspond to an entity, use projects as the default.
        const tabKey = tab.key;
        const selectedEntity = !!EntityName[tabKey]
            ? tabKey
            : EntityName.PROJECTS;
        this.store.dispatch(new BackToEntityAction(selectedEntity));

        // Navigate to specified tab key
        this.router.navigate(["/" + tab.key], {
            queryParamsHandling: "preserve",
        });
    }

    /**
     * Returns true if project is a selected facet.
     *
     * @param {string[]} selectedProjectIds
     * @param {string} projectId
     * @returns {boolean}
     */
    private isProjectSelected(
        selectedProjectIds: string[],
        projectId: string
    ): boolean {
        return selectedProjectIds.indexOf(projectId) >= 0;
    }

    /**
     * Transform selected project search term set into set of selected project IDs.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string[]}
     */
    private mapSearchTermsToProjectIds(searchTerms: SearchTerm[]): string[] {
        return searchTerms.map((searchTerm: SearchTerm) => {
            return searchTerm.getSearchValue();
        });
    }

    /**
     * Clear out the selected project when the user navigates away from project detail page.
     */
    public ngOnDestroy() {
        this.projectDetailService.removeProjectMeta();

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();

        this.store.dispatch(new ClearSelectedProjectAction());
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {
        // Grab the current and default catalog values - we need these for the citation link.
        const catalog$ = this.store.pipe(
            select(selectCatalog),
            takeUntil(this.ngDestroy$)
        );

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(
            select(selectSelectedProject),
            takeUntil(this.ngDestroy$),
            filter((project) => !!project),
            take(1)
        );

        // Grab the ID's of the current set of selected projects, if any
        const selectedProjectIds$ = this.store.pipe(
            select(selectSelectedProjectSearchTerms),
            takeUntil(this.ngDestroy$),
            take(1),
            map(this.mapSearchTermsToProjectIds)
        );

        // Grab the selected entity, required for the back button
        const selectedEntity$ = this.store.pipe(
            select(selectSelectedEntitySpec),
            takeUntil(this.ngDestroy$),
            take(1)
        );

        // Set up component state
        combineLatest([
            catalog$,
            project$,
            selectedProjectIds$,
            selectedEntity$,
        ])
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(
                ([catalog, project, selectedProjectIds, selectedEntity]) => {
                    const projectSelected = this.isProjectSelected(
                        selectedProjectIds,
                        project.entryId
                    );

                    this.state$.next({
                        catalog,
                        loaded: true,
                        project,
                        projectSelected,
                        selectedEntity,
                    });

                    this.projectDetailService.addProjectMeta(
                        project.projectTitle
                    );
                }
            );
    }
}
