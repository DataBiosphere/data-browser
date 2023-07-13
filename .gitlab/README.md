The files in this directory define how GitLab builds Data Browser
distributions (a tarball of the site content) and uploads them to the GitLab
package registry. The Azul pipeline will download these distributions and
deploy them to the S3 bucket backing the CloudFront distribution for
browser & portal.

There is typically one site of the Data Browser per Azul atlas, an atlas being
a set of catalogs. Often there are multiple atlases hosted in an Azul
deployment and therefore multiple Data Browser sites accessing that Azul
instance, one per atlas. 

In order to avoid duplicating substantial amounts of GitLab pipeline YAML, we
dynamically generate the GitLab jobs that produce the distributions. That's
made possible in GitLab via the parent-child pipeline mechanism.

`ci.yaml` defines the parent pipeline. The first job in the parent pipeline
builds the Docker image to be used for all subsequent jobs in the pipeline.
This image is defined in the `Dockerfile`. The first job uses the Azul runner
image, a minimal image containing a `docker` client. The Azul runner image is
pushed manually when the Azul project is first set up in a GitLab instance.
The GitLab job token that is issued to pipelines running for this project
must be granted access to the pull from the registry for the Azul project, so
that the runner can pull the Azul runner image for the first job. 

The second job in the parent pipeline generates the GitLab pipeline YAML for
the child pipeline. The third job triggers a child pipeline using the YAML
generated by the second job, which that job exposes as an artifact. The
generation is done by a a Typescript program running on NodeJS, not because
Typescript is particularly good at generating YAML but simply because
building the Data Browser already requires NodeJS.

The generated child pipeline contains two stages: one stage builds the
distributions, the other stage uploads them to the package registry. There is
one job per atlas in each of these two stages: a `build` job and a `publish`
job.

The `sites` directory contains GitLab YAML job fragments that are merged into
the generated YAML for the child pipeline. There is one subdirectory per Azul
deployment and site. The Azul deployment is fixed as a job variable in
the _Settings_, _CI/CD_, and _Variables_ section of the GitLab project. The
name of the variable is `AZUL_DEPLOYMENT_STAGE`. The GitLab administrator
picks the Azul deployment by configuring the job variable, and the pipeline
builds a distribution per site in that deployment. Each site contains a
number of YAML job fragments:

- `sites/<deployment>/<site>/base.yaml` is merged into the `.base` job
  definition that the `build` and `publish` jobs extend. It typically only
  contains a `variables` section that sets the environment variables for both
  jobs, but specific to a site and a deployment

- `sites/<deployment>/<site>/build.yaml` is merged into the `build` job
  definition. It contains at least a `script` section that actually builds
  the distribution 

- `sites/<deployment>/pipeline.yaml` is merged into the child pipeline, at the
  document root. It typically contains a `variables` section with environment
  variables that are not specific to a site.

The merging uses https://github.com/kleber-swf/deepmerge-json which allows for
merging of JSON arrays, something that GitLab's native inheritance/inclusion
mechanisms doesn't support. This allows for customizing the `rules`
section of a job, say, by appending a rule. See
https://github.com/kleber-swf/deepmerge-json#array-merge

To reuse a YAML fragment file in another site or deployment, use symlinks.