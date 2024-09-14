import * as YAML from 'yaml';
import * as fs from 'fs';
import {strict as assert} from 'assert';
import merge from 'deepmerge-json';


let deployment = process.env.AZUL_DEPLOYMENT_STAGE ?? assert.fail();

// CI_COMMIT_REF_NAME is the branch name.
//
let branch = process.env.CI_COMMIT_REF_NAME ?? assert.fail();

// The main GitLab branches follow a naming convention
//
let [branch_prefix, branch_site, branch_deployment] = branch.split('/');

// We want to use the branch name as the `version` of the tarball package that
// we upload to the GitLab package registry. The `version` field doesn't support
// slashes, so we replace them with underscores.
//
assert(!branch.includes('_'));
branch = branch.replaceAll('/', '_');

let sites = fs.readdirSync(
    `sites/${deployment}`,
    {withFileTypes: true}
).filter(entry => entry.isDirectory())
    .map(entry => entry.name);

// If the branch name follows the naming convention, we just build the site
// encoded in it. Otherwise we build all sites. This is just an efficiency
// measure. For all other branches, like feature branches or the main branch, we
// build a tarball for every site, but in the package registry, the tarball is
// still labeled with the complete, transliterated branch name.
//
if (branch_prefix == 'ucsc') {
    assert(branch_deployment == deployment);
    assert(sites.includes(branch_site));
    sites = [branch_site]
}

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
                load_yaml('sites', deployment, site, 'base')
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
                load_yaml('sites', deployment, site, 'build')
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
                            'packages', 'generic', 'tarball', branch,
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
    },
    load_yaml('sites', deployment, 'pipeline')
);
console.log(YAML.stringify(pipeline));
