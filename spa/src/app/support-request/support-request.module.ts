/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Support request module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";

// App dependencies
import { AttachmentErrorComponent } from "./attachment-error/attachment-error.component";
import { DropzoneModule } from "../dropzone/dropzone.module";
import { SharedModule } from "../shared/shared.module";
import { SupportRequestButtonComponent } from "./support-request-button/support-request-button.component";
import { SupportRequestComponent } from "./support-request.component";
import { SupportRequestFormComponent } from "./support-request-form/support-request-form.component";
import { SupportRequestService } from "./support-request.service";
import { SupportRequestErrorComponent } from "./support-request-error/support-request-error.component";
import { SupportRequestSubmittedComponent } from "./support-request-submitted/support-request-submitted.component";

@NgModule({
    imports: [
        DropzoneModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        SupportRequestService
    ],
    declarations: [
        AttachmentErrorComponent,
        SupportRequestButtonComponent,
        SupportRequestComponent,
        SupportRequestErrorComponent,
        SupportRequestFormComponent,
        SupportRequestSubmittedComponent
    ],
    exports: [
        SupportRequestComponent
    ]
})
export class SupportRequestModule {
}
