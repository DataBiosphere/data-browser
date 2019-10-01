/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete set of effects for app.
 */

// App dependencies
import { AuthEffects } from "../auth/_ngrx/auth.effects";
import { ConfigEffects } from "../config/_ngrx/config.effects";
import { FileEffects } from "../files/_ngrx/file.effects";
import { FileManifestEffects } from "../files/_ngrx/file-manifest/file-manifest.effects";
import { IntegrationEffects } from "../files/_ngrx/integration/integration.effects";
import { MatrixEffects } from "../files/_ngrx/matrix/matrix.effects";
import { ProjectEffects } from "../files/_ngrx/project/project.effects";
import { SystemEffects } from "../system/_ngrx/system.effects";
import { TableEffects } from "../files/_ngrx/table/table.effects";
import { TerraEffects } from "../files/_ngrx/terra/terra.effects";

export const AppEffects = [
    AuthEffects,
    ConfigEffects,
    FileEffects,
    FileManifestEffects,
    IntegrationEffects,
    MatrixEffects,
    ProjectEffects,
    SystemEffects,
    TableEffects,
    TerraEffects
];
