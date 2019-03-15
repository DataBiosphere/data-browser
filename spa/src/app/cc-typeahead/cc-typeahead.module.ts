// Core dependencies
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule } from "@angular/material";

// App dependencies
import { CcTypeaheadComponent } from "./cc-typeahead.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    declarations: [CcTypeaheadComponent],
    exports: [CcTypeaheadComponent]
})
export class CcTypeaheadModule {
}
