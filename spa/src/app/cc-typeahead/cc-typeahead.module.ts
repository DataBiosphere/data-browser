// Core dependencies
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MdInputModule } from "@angular/material";

// App dependencies
import { CcTypeaheadComponent } from "./cc-typeahead.component";

@NgModule({
    imports: [
        CommonModule,
        MdInputModule,
        ReactiveFormsModule
    ],
    declarations: [CcTypeaheadComponent],
    exports: [CcTypeaheadComponent]
})
export class CcTypeaheadModule {
}
