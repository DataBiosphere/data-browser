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
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { Project } from "../shared/project.model";

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
    public constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

    /**
     * Public API
     */

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
