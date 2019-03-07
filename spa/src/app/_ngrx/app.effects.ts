/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of effects used by Boardwalk.
 */

// App dependencies
import { AuthEffects } from "../auth/_ngrx/auth.effects";
import { ConfigEffects } from "../config/_ngrx/config.effects";
import { FileEffects } from "../files/_ngrx/file.effects";
import { KeywordsEffects } from "../keywords/shared/keywords.effects";
import { SystemEffects } from "../system/_ngrx/system.effects";

export const AppEffects = [
    AuthEffects,
    ConfigEffects,
    FileEffects,
    KeywordsEffects,
    SystemEffects
];
