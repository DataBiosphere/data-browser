import { FileEffects } from "../files/_ngrx/file.effects";
import { KeywordsEffects } from "../keywords/shared/keywords.effects";
import { AuthEffects } from "../auth/_ngrx/auth.effects";

export const AppEffects = [
    FileEffects,
    KeywordsEffects,
    AuthEffects
];