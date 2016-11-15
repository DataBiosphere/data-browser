import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CcTypeaheadComponent } from "./cc-typeahead.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [CcTypeaheadComponent],
    exports: [CcTypeaheadComponent]
})
export class CcTypeaheadModule {
}
