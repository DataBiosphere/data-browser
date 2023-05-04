import * as YAML from 'yaml';
import * as fs from 'fs';
import {strict as assert} from 'assert';
import merge from 'deepmerge-json';


let azul_deployment = process.env.AZUL_DEPLOYMENT_STAGE ?? assert.fail();

// CI_COMMIT_REF_NAME is the branch name. We want to use it as the `version`
// of the tarball package that we upload to the GitLab package registry. The
// `version` field doesn't support slashes, so we replace them with periods.
// This code is evaluated in the context of the parent pipeline. Luckily,
// CI_COMMIT_REF_NAME will be set to the same value in both the parent and the
// child pipeline.
//
let package_version = process.env.CI_COMMIT_REF_NAME ?? assert.fail();
assert(!package_version.includes('.'));
package_version = package_version.replaceAll('/', '_');

let sites = fs.readdirSync(
    `sites/${azul_deployment}`,
    {withFileTypes: true}
).filter(entry => entry.isDirectory())
    .map(entry => entry.name);

function load_yaml(...pathElements: Array<string>) {
    let path = pathElements.join('/') + '.yaml';
    if (fs.existsSync(path)) {
        return YAML.parse(fs.readFileSync(path).toString());
    } else {
        console.error(`Warning: ${[path]} does not exist, returning empty YAML`)
        return {};
    }
}

let pipeline = merge(
    {
        'stages': [
            'build',
            'publish'
        ],
        ...Object.fromEntries(sites.map(site => Object.entries({
            [`.${site}_base`]: merge(
                {
                    'rules': [
                        {
                            'if': '$CI_PIPELINE_SOURCE == "parent_pipeline"'
                        }
                    ],
                    'image': '$DOCKER_IMAGE:$DOCKER_TAG',
                    'dependencies': []
                },
                load_yaml('sites', azul_deployment, site, 'base')
            ),
            [`${site}_build`]: merge(
                {
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
                load_yaml('sites', azul_deployment, site, 'build')
            ),
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
                            ['${CI_PROJECT_NAME}', azul_deployment, site, 'distribution'].join('_') + '.tar.bz2'
                        ].join('/') +
                        '"'
                    ].join(' ')
                ],
                'dependencies': [
                    `${site}_build`
                ]
            }
        })).flat())
    },
    load_yaml('sites', azul_deployment, 'pipeline')
);
console.log(YAML.stringify(pipeline));
