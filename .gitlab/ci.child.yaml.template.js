"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = __importStar(require("yaml"));
const fs = __importStar(require("fs"));
const assert_1 = require("assert");
let deployment = process.env.AZUL_DEPLOYMENT_STAGE ?? assert_1.strict.fail();
// CI_COMMIT_REF_NAME is the branch name. We want to use it as the `version`
// of the tarball package that we upload to the GitLab package registry. The
// `version` field doesn't support slashes, so we replace them with periods.
// This code is evaluated in the context of the parent pipeline. Luckily,
// CI_COMMIT_REF_NAME will be set to the same value in both the parent and the
// child pipeline.
//
let package_version = process.env.CI_COMMIT_REF_NAME ?? assert_1.strict.fail();
(0, assert_1.strict)(package_version !== undefined);
(0, assert_1.strict)(!package_version.includes('.'));
package_version = package_version.replaceAll('/', '_');
let sites = fs.readdirSync(`sites/${deployment}`, { withFileTypes: true }).filter(entry => entry.isDirectory())
    .map(entry => entry.name);
function load_yaml(...pathElements) {
    let path = pathElements.join('/');
    return fs.existsSync(path) ? YAML.parse(fs.readFileSync(path).toString()) : {};
}
let pipeline = {
    'stages': [
        'build',
        'publish'
    ],
    ...load_yaml('sites', deployment, 'pipeline.yaml'),
    ...Object.fromEntries(sites.map(site => Object.entries({
        [`.${site}_base`]: {
            'rules': [
                {
                    'if': '$CI_PIPELINE_SOURCE == "parent_pipeline"'
                }
            ],
            'image': '$DOCKER_IMAGE:$DOCKER_TAG',
            'dependencies': [],
            ...load_yaml('sites', deployment, site, 'job.yaml')
        },
        [`${site}_build`]: {
            'extends': `.${site}_base`,
            'stage': 'build',
            'script': [
                `source .gitlab/sites/$AZUL_DEPLOYMENT_STAGE/${site}/build.sh`
            ],
            'artifacts': {
                'paths': [
                    '.gitlab/distribution.tar.bz2'
                ]
            }
        },
        [`${site}_publish`]: {
            'extends': `.${site}_base`,
            'stage': 'publish',
            'script': [
                [
                    'curl',
                    '--fail',
                    '--header "JOB-TOKEN: $CI_JOB_TOKEN"',
                    '--upload-file .gitlab/distribution.tar.bz2',
                    '"' +
                        [
                            // PUT /projects/:id/packages/generic/:package_name/:package_version/:file_name?status=:status
                            '${CI_API_V4_URL}',
                            'projects', '${CI_PROJECT_ID}',
                            'packages', 'generic', 'tarball', package_version,
                            ['${CI_PROJECT_NAME}', deployment, site, 'distribution'].join('_') + '.tar.bz2'
                        ].join('/') +
                        '"'
                ].join(' ')
            ],
            'dependencies': [
                `${site}_build`
            ]
        }
    })).flat())
};
console.log(YAML.stringify(pipeline));
