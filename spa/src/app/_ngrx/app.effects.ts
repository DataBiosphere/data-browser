/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of effects used by Boardwalk.
 */

import { AuthEffects } from "../auth/_ngrx/auth.effects";
import { ConfigEffects } from "../config/_ngrx/config.effects";
import { FileEffects } from "../files/_ngrx/file.effects";
import { KeywordsEffects } from "../keywords/shared/keywords.effects";

export const AppEffects = [
    AuthEffects,
    ConfigEffects,
    FileEffects,
    KeywordsEffects
];
