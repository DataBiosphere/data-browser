// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    dataURL: "https://service.dev.singlecell.gi.ucsc.edu",
    dcpHealthCheckUrl: "https://status.data.humancellatlas.org/service/dcp-health-check-prod",
    matrixURL: "https://matrix.data.humancellatlas.org/v0/matrix",
    portalURL: "https://dev.singlecell.gi.ucsc.edu",
    projectMetaURL: "https://dev.singlecell.gi.ucsc.edu",
    deployment: "cgl-dev",
    version: "2.0"
};
