import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KeywordsService } from "./shared/keywords.service";
import { KeywordsDAO } from "./shared/keywords.dao";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [KeywordsService, KeywordsDAO]
})
export class KeywordsModule {
}
