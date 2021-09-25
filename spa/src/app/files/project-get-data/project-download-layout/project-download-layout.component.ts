/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for a plain old page layout.
 */

// Core dependencies
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import EntitySpec from "../../shared/entity-spec";
import { Project } from "../../shared/project.model";

@Component({
    selector: "project-download-layout",
    templateUrl: "project-download-layout.component.html",
    styleUrls: ["project-download-layout.component.scss"],
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({opacity: 0}),
                animate("750ms ease-out", style({opacity: 1}))
            ])
        ])
    ]
})
export class ProjectDownloadLayoutComponent {
    
    // Inputs
    @Input() fullWidth: boolean;
    @Input() loaded: boolean;
    @Input() project: Project;
    @Input() tabs: EntitySpec[];
    @Output() tabSelected = new EventEmitter<EntitySpec>();

    /**
     * Handle click on back button.
     * 
     * @param {EntitySpec} entitySpec
     */
    public onTabSelected(entitySpec: EntitySpec): void {
        
        this.tabSelected.emit(entitySpec);
    }
}
