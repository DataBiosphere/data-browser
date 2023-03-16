# Configuration Guide

## Configuring an Entity List
Entity lists display result sets from either an API endpoint or a TSV and can be statically built or dynamically requested. To configure an entity list:

### 1. Add Response Model

#### 1.1 Azul Response Model

The Azul entity list API endpoint returns entities (`hits`) in a format that can be modeled as a response object containing a core entity and multiple aggregated entities. For example:

* A `hits` value returned from the `/index/files` endpoint contains:

  1. File entity
  2. Aggregated projects
  3. Aggregated samples
  4. Aggregated values for all other entities...

* A `hits` value returned from the `/index/projects` endpoint contains:
  1. Project entity
  2. Aggregated files
  3. Aggregated samples
  4. Aggregated values for all other entities...

* A `hits` value returned from the `/index/samples` endpoint contains:
  1. Sample entity
  2. Aggregated files
  3. Aggregated projects
  4. Aggregated values for all other entities...

An Azul entities endpoint requires the following models:
* `XEntity` - the core entity returned from the endpoint (e.g. the single element contained in the `files` array value returned in `/index/files`). Core entity models are added to `/apis/azul/${site}/common/entities`.
* `XEntityResponse` - a model of the singleton array containing the core entity, returned from the endpoint (e.g. the `files` array value returned in `/index/files`). Entity response models are added to `/apis/azul/${site}/common/entities`.
* `AggregatedY` - an aggregated entity returned from the endpoint (e.g. the `projects` or `files` values returned in `/index/files`).  Aggregated entities are added to `/apis/azul/${site}/common/aggregatedEntities`.
* `XsResponse` - a model of the full response returned from the endpoint. Response models are added to `/apis/azul/${site}/common/responses`.

#### 1.2 TSV Response Model
Add an interface matching the response model expected from the API endpoint or TSV row.
* Naming convention: `entities.ts`.
* Location: `/apis/${apiName}/common`.

### 2. Create Entity List-Specific Configuration
* Naming convention: `entityNameEntityConfig.ts`.
* Location: `/site-config/${site}/${env}/index`.
* Entity list configuration implements `EntityConfig<T>` where `T` is the response model defined above in step 1.
* Once configured, the entity list configuration must be specified in the `entities` array in the site config.

### 3. Create a View Builder
A view builder contains functions that build the component props required for displaying a value in an entity list. Each function takes at least a response model (either from an API endpoint or a row in a TSV), is parameterized by the type of component it builds props for and uses transformers to convert the response value into prop-specific values. 
* Naming convention: `viewModelBuilders.ts`. A view builder is API-specific.
* Location: `/viewModelBuilders/${apiName}/common/`.
* Function naming convention: `buildX` where `X` is the response value to display.

### 4. Create a Response Transformer
A transformer contains functions that map a response model (either from an API endpoint or a row in a TSV) to a view model that is optimized for display.
* Naming convention: `transformers.ts`. A transformer is API-specific.
* Location: `/apis/${apiName}/common/`.
* Function naming convention: `getX` where `X` is the response value to transform.
