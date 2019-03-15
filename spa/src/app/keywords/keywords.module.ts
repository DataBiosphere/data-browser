import { NgModule } from "@angular/core";
import { KeywordsService } from "./shared/keywords.service";
import { KeywordsDAO } from "./shared/keywords.dao";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [KeywordsService, KeywordsDAO]
})
export class KeywordsModule {
}
