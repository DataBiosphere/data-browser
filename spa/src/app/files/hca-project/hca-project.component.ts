/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying HCA project table details.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy, OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import EntitySpec from "../shared/entity-spec";
import { EntitySelectAction, FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { Project } from "../shared/project.model";
import { selectSelectedProject } from "../_ngrx/file.selectors";

@Component({
    selector: "hca-project",
    templateUrl: "./hca-project.component.html",
    styleUrls: ["./hca-project.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAProjectComponent implements OnInit {

    // Template variables
    public project$: Observable<Project>;

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     */
    public constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
    }

    /**
     * Public API
     */

    /**
     * Tab provides opportunity to return back to Project table.
     * @returns {EntitySpec[]}
     */
    public getProjectDetailTabs(): EntitySpec[] {
        return [{key: "projects", displayName: "Projects"}];
    }

    /**
     * Returns null value for EntitySpec, no need for an active tab.
     * @returns {EntitySpec}
     */
    public getActiveTab(): EntitySpec {
        return {key: "", displayName: ""};
    }

    /**
     * Handle click on tab - user to be returned back to Project table.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        this.store.dispatch(new EntitySelectAction(tab.key));
    }

    /**
     * Return string-concat'ed version of the specified array.
     *
     * @param {any[]} values
     * @returns {string}
     */
    public stringifyValues(values: any[]): string {

        return values.join(", ");
    }

    /**
     * Life cycle hooks
     */

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        this.project$ = this.store.select(selectSelectedProject);
    }
}
