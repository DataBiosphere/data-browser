import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KeywordsComponent } from "./keywords.component";
import { KeywordsService } from "./shared/keywords.service";
import { KeywordsDAO } from "./shared/keywords.dao";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [KeywordsComponent],
    providers: [KeywordsService, KeywordsDAO]
})
export class KeywordsModule {
}
