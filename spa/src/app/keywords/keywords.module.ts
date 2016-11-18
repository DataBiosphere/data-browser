import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KeywordsComponent } from "./keywords.component";
import { KeywordsService } from "./shared/keywords.service";
import { KeywordsDAO } from "./shared/keywords.dao";
import { EffectsModule } from "@ngrx/effects";
import { KeywordsEffects } from "./shared/keywords.effects";

@NgModule({
    imports: [
        CommonModule,

        // EffectsModule.run(KeywordsEffects)
    ],
    declarations: [KeywordsComponent],
    providers: [KeywordsService, KeywordsDAO]
})
export class KeywordsModule {
}
