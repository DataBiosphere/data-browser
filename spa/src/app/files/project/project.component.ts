/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Top-level project component, wraps all project detail-related, page-level components (e.g. project detail, 
 * project matrices download, project metadata download).
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import { Project } from "../shared/project.model";
import { TitleService } from "../title/title.service";


@Component({
    selector: "project",
    templateUrl: "./project.component.html",
    styleUrls: ["./project.component.scss"]
})
export class ProjectComponent implements OnInit {

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     * @param {TitleService} titleService
     */
    public constructor(private store: Store<AppState>, private titleService: TitleService) {}
    
    /**
     * Set project name as page title on load.
     */
    public ngOnInit() {

        // Grab reference to selected project
        this.store.pipe(
            select(selectSelectedProject),
            takeUntil(this.ngDestroy$),
            filter(project => !!project),
            take(1)
        ).subscribe((project: Project) => this.titleService.setTitle(project.projectTitle));
    }
}
