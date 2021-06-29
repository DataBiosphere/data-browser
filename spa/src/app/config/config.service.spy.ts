/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spy for config service.
 */

export const ConfigServiceSpy = jasmine.createSpyObj("ConfigService", [
    "getAtlas",
    "getDefaultCatalog",
    "getEntitiesUrl",
    "getFileManifestUrl",
    "getIndexStatusUrl",
    "getIntegrationsUrl",
    "getDefaultCatalog",
    "getPortalUrl",
    "getProjectMetaUrl",
    "getProjectMetaDownloadUrl",
    "getProjectUrl",
    "getTerraExportUrl",
    "getSummaryUrl",
    "initConfig",
    "isAtlasHCA",
    "isEnvCGLDev",
    "isEnvLocal",
    "isEnvDCP2",
    "getZendeskUrl"
]);
