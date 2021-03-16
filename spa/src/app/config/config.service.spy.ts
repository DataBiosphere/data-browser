/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spy for config service.
 */

export const ConfigServiceSpy = jasmine.createSpyObj("ConfigService", [
    "getAtlas",
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
    "isEnvCGLDev",
    "isEnvLocal",
    "isEnvUxDev",
    "isEnvDCP2",
    "isEnvProd",
    "isCurrentVersion",
    "getZendeskUrl"
]);
