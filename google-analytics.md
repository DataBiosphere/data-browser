### Google Analytics

#### Custom Dimensions

The following custom dimensions are configured in Google Analytics, allowing additional data (in addition to Category, Action and Label) to be included in each data layer event fired from the front end.

- `currentQuery`
- `direction`
- `entityId`
- `entityType`
- `entityUrl`
- `facet`
- `fileFormat`
- `fileName`
- `fileType`
- `index`
- `min`
- `max`
- `releaseName`
- `source`
- `term`
- `toolName`

#### Tracked Events

##### Search Events

###### De/Select Search Value

- Category: "Search"
- Action: "Select" or "Deselect"
- Label: `termName` or `between 0 and 100 years`


- Current Query: `currentQuery`
- Entity Type: "Facet"
- Facet: `facetName`
- Index: `index`
- Max: `max`
- Min: `min`
- Source: "Cohort Export", "Manifest Export", "Cohort Matrix", "Facet Browser", "Search" or "Selected Terms"
- Term: `termName` or `between 0 and 100 years`

###### Clear Search Terms

- Category: "Search"
- Action: "Clear"
- Label: "Clear All"


- Current Query: `currentQuery`
- Entity Type: "Facet"
- Index: `index`
- Source: "Selected Terms"

###### Empty Search Results

- Category: "Search"
- Action: "Exception"
- Label: "Empty Result Set"

- Current Query: `currentQuery`
- Index: `index`


##### Sort Events

###### Sort Data Table

- Category: "Search Results"
- Action: "Sort"
- Label: `sortBy`

- Direction: "Asc" or "Desc"
- Current Query: `currentQuery`
- Index: `index`

##### Page Events

###### Next Page

- Category: "Search Results"
- Action: "Next Page"
- Label: `currentPageNumber`

- Current Query: `currentQuery`
- Index: `index`

###### Previous Page

- Category: "Search Results"
- Action: "Previous Page"
- Label: `currentPageNumber`

- Current Query: `currentQuery`
- Index: `index`

##### Project Events

###### View Project

- Category: "Project"
- Action: "View Overview", "View Metadata", "View Matrices", "View External Resources"
- Label: `projectShortname`


- Entity URL: `http:/path/to/project`
- Current Query: `currentQuery`

##### Manifest Events

###### Cohort Manifest Request

- Category: "Manifest"
- Action: "Request"
- Label: `query`


- Entity Type: "Cohort Manifest"

###### Cohort Manifest Download

- Category: "Manifest"
- Action: "Download"
- Label: `query`


- Entity Type: "Cohort Manifest Link"
- Entity URL: `http://path/to/download`

###### Cohort Manifest Download Link Copy to Clipboard

- Category: "Manifest"
- Action: "Copy to Clipboard"
- Label: `query`


- Entity Type: "Cohort Manifest Link"
- Entity URL: `http://path/to/download`

###### Cohort Manifest Download

- Category: "Manifest"
- Action: "Download"
- Label: `projectTitle`


- Entity Type: "Project Manifest Link"
- Entity URL: `http://path/to/download`

###### Cohort Manifest Download Link Copy to Clipboard

- Category: "Manifest"
- Action: "Copy to Clipboard"
- Label: `projectTitle`


- Entity Type: "Project Manifest Link"
- Entity URL: `http://path/to/download`

##### Matrix Events

###### Cohort Matrix Request

- Category: "Matrix"
- Action: "Request"
- Label: `query`


- Entity Type: "Cohort Matrix"
- File Format: `fileFormat`

###### Cohort Matrix Download

- Category: "Matrix"
- Action: "Download"
- Label: `query`


- Entity Type: "Cohort Matrix Link"
- Entity URL: `http://path/to/download`

###### Cohort Matrix Download Link Copy to Clipboard

- Category: "Matrix"
- Action: "Copy to Clipboard"
- Label: `query`


- Entity Type: "Cohort Matrix Link"
- Entity URL: `http://path/to/download`

###### Cohort Matrix Download

- Category: "Matrix"
- Action: "Download"
- Label: `projectTitle`


- Entity Type: "Project Matrix Link"
- Entity URL: `http://path/to/download`

###### Cohort Matrix Download Link Copy to Clipboard

- Category: "Matrix"
- Action: "Copy to Clipboard"
- Label: `projectTitle`


- Entity Type: "Project Matrix Link"
- Entity URL: `http://path/to/download`

##### Terra Events

###### Export Request

- Category: "Export"
- Action: "Request"
- Label: `query`


- Entity Type: "Cohort Export"
- Tool Name: "Terra"

###### Export Launch

- Category: "Export"
- Action: "Launch"
- Label: `query`


- Entity Type: "Cohort Export Link"
- Entity URL: `http://path/to/terra`
- Tool Name: "Terra"

###### Export Link Copy to Clipboard

- Category: "Export"
- Action: "Copy to Clipboard"
- Label: `query`


- Entity Type: "Cohort Export Link"
- Entity URL: `http://path/to/terra`
- Tool Name: "Terra"

##### Release Events

###### Dataset Download

- Category: "Dataset"
- Action: "Download"
- Label: `datasetName`


- Entity URL: `http://path/to/download`
- File Format: `fileFormat`
- File Name: `fileName`
- File Type: `fileType`
- Release Name: `releaseName`

###### Dataset Copy to Clipboard

Copy to Clipboard events are configured as:

- Category: "Dataset"
- Action: "Copy to Clipboard"
- Label: `datasetName`


- Entity URL: `http://path/to/download`
- File Format: `fileFormat`
- File Name: `fileName`
- File Type: `fileType`
- Release Name: `releaseName`

###### Dataset Visualize

Visualize events are configured as:

- Category: "Dataset"
- Action: "Visualize"
- Label: `datasetName`


- Entity URL: `http://path/to/visualization-tool`
- Release Name: `releaseName`
- Tool Name: `toolName`


### GTM "Data Layer" Variables

##### Current Query
- Selected search terms at time of event.
- Used to capture `currentQuery` dimension from front end data layer.
- Corresponds to `currentQuery` custom dimension in Google Analytics.

##### Direction
- Specific to sort actions.
- Used to capture `direction` dimension from front end data layer.
- Corresponds to `direction` custom dimension in Google Analytics.

##### Entity Id
- Used to capture `entityId` dimension from front end data layer.
- Corresponds to `entityId` custom dimension in Google Analytics.

##### Entity Type
- UI entity type (see `index` for data entity type).
- Used to capture `entityType` dimension from front end data layer.
- Corresponds to `entityType` custom dimension in Google Analytics.

##### Entity URL
- Used to capture `entityUrl` dimension from front end data layer.
- Corresponds to `entityUrl` custom dimension in Google Analytics.

##### Event Action
- Used to capture `eventAction` dimension from front end data layer.
- Corresponds to the Action value in a Google Analytics event.

##### Event Label
- Used to capture `eventLabel` dimension from front end data layer.
- Corresponds to the Label value in a Google Analytics event.

##### Facet
- Used by search-related events when facet term is selected.
- Used to capture `facet` dimension from front end data layer.
- Corresponds to `facet` custom dimension in Google Analytics.

##### File Format
- Used to capture `fileFormat` dimension from front end data layer.
- Corresponds to `fileFormat` custom dimension in Google Analytics.

##### File Name
- Used to capture `fileName` dimension from front end data layer.
- Corresponds to `fileName` custom dimension in Google Analytics.

##### File Type
- Used to capture `fileType` dimension from front end data layer.
- Corresponds to `fileType` custom dimension in Google Analytics.

##### Index
- Data entity type (eg Projects, Samples, Files).
- Used to capture `index` dimension from front end data layer.
- Corresponds to `index` custom dimension in Google Analytics.

##### Min
- Specific to age range searches.
- Used to capture `min` dimension from front end data layer, used during 
- Corresponds to `min` custom dimension in Google Analytics.

##### Max
- Specific to age range searches.
- Used to capture `max` dimension from front end data layer, used during 
- Corresponds to `max` custom dimension in Google Analytics.

##### Release Name
- Used to capture `releaseName` dimension from front end data layer.
- Corresponds to `releaseName` custom dimension in Google Analytics.

##### Source
- UI element where event was triggered from.
- Used to capture `source` dimension from front end data layer.
- Corresponds to `source` custom dimension in Google Analytics.

##### Term
- Used by search-related events when facet term is selected.
- Used to capture `term` dimension from front end data layer.
- Corresponds to `term` custom dimension in Google Analytics.

##### Tool Name
- Used to capture `fileType` dimension from front end data layer.
- Corresponds to `fileType` custom dimension in Google Analytics.

### GTM Triggers

#### Download
- Custom event, listens for events where event name is "Dataset" and event action is "Download".

#### Visualize
- Custom event, listens for events where event name is "Dataset" and event action is "Visualize".

### GTM Tags and Triggers

#### Cohort Manifest Request
- Sends "Cohort Manifest Request" event to Google Analytics when `Cohort Manifest Request` trigger is fired.
- Event data includes Category, Action and Label as well as the Entity Type dimension.

#### Cohort Manifest Download
- Sends "Cohort Manifest Download" event to Google Analytics when `Cohort Manifest Download` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Cohort Manifest Download Link Copy to Clipboard
- Sends "Cohort Manifest Copy to Clipboard" event to Google Analytics when `Cohort Manifest Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Cohort Matrix Request
- Sends "Cohort Matrix Request" event to Google Analytics when `Cohort Matrix Request` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and File Format dimensions.

#### Cohort Matrix Download
- Sends "Cohort Matrix Download" event to Google Analytics when `Cohort Matrix Download` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Cohort Matrix Download Link Copy to Clipboard
- Sends "Cohort Matrix Copy to Clipboard" event to Google Analytics when `Cohort Matrix Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Entity Return to Tab
- Fired when tab (Projects, Samples, Files) is returned to from project detail or get dat flow. 
- Sends "Entity Return to Tab" event to Google Analytics when `Entity Return to Tab` trigger is fired.
- Event data includes Category, Action and Label as well as the Current Query dimension. 

#### Entity Select Tab
- Fired when tab is selected (Projects, Samples, Files).
- Sends "Entity Select Tab" event to Google Analytics when `Entity Select Tab` trigger is fired.
- Event data includes Category, Action and Label as well as the Current Query dimension. 

#### Export Request
- Sends "Export Request" event to Google Analytics when `Export Request` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Tool Name dimensions.

#### Export Launch
- Sends "Export Launch" event to Google Analytics when `Export Launch` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type, Entity URL and Tool Name dimensions.

#### Export Copy to Clipboard
- Sends "Export Copy to Clipboard" event to Google Analytics when `Export Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type, Entity URL and Tool Name dimensions.

#### Portal Link
- Sends "Portal Link" event to Google Analytics when `Portal Link` trigger is fired.
- Event data includes Category, Action and Label as well as Entity URL, Current Query and Source dimensions.

#### Project Manifest Request
- Sends "Project Manifest Request" event to Google Analytics when `Project Manifest Request` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Project Manifest Download
- Sends "Project Manifest Download" event to Google Analytics when `Project Manifest Download` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Project Manifest Download Link Copy to Clipboard
- Sends "Project Manifest Copy to Clipboard" event to Google Analytics when `Project Manifest Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Entity URL dimensions.

#### Project View Tab
- Sends "Project View Tab" event to Google Analytics when `Project View Tab` trigger is fired.
- Event data includes Category, Action and Label as well as Entity URL, Entity ID and Current Query dimensions.

#### Release Download
- Sends "Download" event to Google Analytics when `Release Download` trigger is fired.
- Event data includes Category, Action and Label as well as Entity URL, File Format, File Name, File Type and Release Name dimensions.

#### Release Copy to Clipboard
- Sends "Copy to Clipboard" event to Google Analytics when `Release Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity URL, File Format, File Name, File Type and Release Name dimensions.

#### Release Visualize
- Sends "Visualize" event to Google Analytics when `Release Visualize` trigger is fired.
- Event data includes Category, Action and Label as well as Release Name and Tool Name dimensions.

#### Search
- Sends "Search" event to Google Analytics when `Search` trigger is fired.
- Event data includes Category, Action and Label as well as Entity ID, Entity Type, Current Query, Facet, Term, Source, Min, Max, and Index dimensions.

#### Search Results Page
- Sends "Search Results Page" event to Google Analytics when `Search Results Page` trigger is fired.
- Event data includes Category, Action and Label as well as Current Query and Index dimensions.

#### Search Results Sort
- Sends "Search Results Sort" event to Google Analytics when `Search Results Sort` trigger is fired.
- Event data includes Category, Action and Label as well as Current Query and Index dimensions.

### Front End Data Layer Event Configuration

```
{
    event: "eventName"
    eventAction: "eventAction",
    eventLabel: "eventLabel",
    dimension0: "dimension0Value",
    ...
}
```

where:
- `event` is the Category value sent to Google Analytics, always "Dataset".
- `eventAction` is the Action value sent to Google Analytics, either "Download" or "Visualize".
- `eventLabel` is the Label value sent to Google Analytics, always the full URL to the file or visualization tool.
- `dimension0` represents a dimension to be included in the event values sent to Google Analytics (eg `datasetName`, `toolName`, `releaseName`).

