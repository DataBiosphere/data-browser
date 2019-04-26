/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Complete set of effects for app.
 */

// App dependencies
import { AuthEffects } from "../auth/_ngrx/auth.effects";
import { ConfigEffects } from "../config/_ngrx/config.effects";
import { FileEffects } from "../files/_ngrx/file.effects";
import { FileManifestEffects } from "../files/_ngrx/file-manifest/file-manifest.effects";
import { SystemEffects } from "../system/_ngrx/system.effects";
import { TerraEffects } from "../files/_ngrx/terra/terra.effects";

export const AppEffects = [
    AuthEffects,
    ConfigEffects,
    FileEffects,
    FileManifestEffects,
    SystemEffects,
    TerraEffects
];
