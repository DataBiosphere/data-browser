## Configuration Guide

### Configuring an Entity List
Entity lists display result sets from either an API endpoint or a TSV and can be statically built or dynamically requested. To configure an entity list:

#### 1. Add Response Model
Add an interface matching the response model expected from the API endpoint or TSV row.
* Namving convention: `entities.ts`.
* Location: `/apis/${apiName}/common`.

#### 2. Create Entity List-Specific Configuration
* Naming convention: `entityNameEntityConfig.ts`.
* Location: `/site-config/${site}/${env}/index`.
* Entity list configuration implements `EntityConfig<T>` where `T` is the response model defined above in step 1.
* Once configured, the entity list configuration must be specified in the `entities` array in the site config.

#### 3. Create a View Builder
A view builder contains functions that build the component props required for displaying a value in an entity list. Each function takes at least a response model (either from an API endpoint or a row in a TSV), is parameterized by the type of component it builds props for and uses transformers to convert the response value into prop-specific values. 
* Naming convention: `viewModelBuilders.ts`. A view builder is API-specific.
* Location: `/viewModelBuilders/${apiName}/common/`.
* Function naming convention: `buildX` where `X` is the response value to display.

#### 4. Create a Response Transformer
A transformer contains functions that map a response model (either from an API endpoint or a row in a TSV) to a view model that is optimized for display.
* Naming convention: `transformers.ts`. A transformer is API-specific.
* Location: `/apis/${apiName}/common/`.
* Function naming convention: `getX` where `X` is the response value to transform.
