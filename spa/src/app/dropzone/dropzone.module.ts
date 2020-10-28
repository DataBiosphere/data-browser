/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Dropzone module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";

// App dependencies
import { DirectoryButtonComponent } from "./directory-button/directory-button.component";
import { DropzoneComponent } from "./dropzone.component";
import { DropzoneService } from "./dropzone.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        DirectoryButtonComponent,
        DropzoneComponent
    ],
    providers: [
        DropzoneService
    ],
    exports: [
        DirectoryButtonComponent,
        DropzoneComponent
    ]
})
export class DropzoneModule {
}
