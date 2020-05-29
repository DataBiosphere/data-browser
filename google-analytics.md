### Google Analytics

#### Custom Dimensions

The following custom dimensions are configured in Google Analytics, allowing additional data (in addition to Category, Action and Label) to be included in each data layer event fired from the front end.

- `currentQuery`
- `entityType`
- `entityUrl`
- `facet`
- `fileFormat`
- `fileName`
- `fileType`
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


- Entity Type: "Facet"
- Current Query: `currentQuery`
- Facet: `facetName`
- Term: `termName` or `between 0 and 100 years`
- Source: "Cohort Export", "Manifest Export", "Cohort Matrix", "Facet Browser", "Search" or "Selected Terms"
- Min: `min`
- Max: `max`

###### Clear Search Terms

- Category: "Search"
- Action: "Clear"
- Label: "Clear All"


- Entity Type: "Facet"
- Current Query: `currentQuery`
- Source: "Selected Terms"


##### Sort Events

###### Sort Data Table

- Category: "Search Results"
- Action: "Sort"
- Label: `sortBy`

- Entity Type: "Projects", "Samples" or "Files"
- Direction: "Asc" or "Desc"
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

##### Entity Type Name
- Used to capture `entityType` dimension from front end data layer.
- Corresponds to `entityType` custom dimension in Google Analytics.

##### Entity URL Name
- Used to capture `entityUrl` dimension from front end data layer.
- Corresponds to `entityUrl` custom dimension in Google Analytics.

##### Event Action
- Used to capture `eventAction` dimension from front end data layer.
- Corresponds to the Action value in a Google Analytics event.

##### Event Label
- Used to capture `eventLabel` dimension from front end data layer.
- Corresponds to the Label value in a Google Analytics event.

##### File Format
- Used to capture `fileFormat` dimension from front end data layer.
- Corresponds to `fileFormat` custom dimension in Google Analytics.

##### File Name
- Used to capture `fileName` dimension from front end data layer.
- Corresponds to `fileName` custom dimension in Google Analytics.

##### File Type
- Used to capture `fileType` dimension from front end data layer.
- Corresponds to `fileType` custom dimension in Google Analytics.

##### Release Name
- Used to capture `releaseName` dimension from front end data layer.
- Corresponds to `releaseName` custom dimension in Google Analytics.

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

#### Export Request
- Sends "Export Request" event to Google Analytics when `Export Request` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type and Tool Name dimensions.

#### Export Launch
- Sends "Export Launch" event to Google Analytics when `Export Launch` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type, Entity URL and Tool Name dimensions.

#### Export Copy to Clipboard
- Sends "Export Copy to Clipboard" event to Google Analytics when `Export Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity Type, Entity URL and Tool Name dimensions.

#### Dataset Download
- Sends "Download" event to Google Analytics when `Dataset Download` trigger is fired.
- Event data includes Category, Action and Label as well as Entity URL, File Format, File Name, File Type and Release Name dimensions.

#### Dataset Copy to Clipboard
- Sends "Copy to Clipboard" event to Google Analytics when `Dataset Copy to Clipboard` trigger is fired.
- Event data includes Category, Action and Label as well as Entity URL, File Format, File Name, File Type and Release Name dimensions.

#### Dataset Visualize
- Sends "Visualize" event to Google Analytics when `Dataset Visualize` trigger is fired.
- Event data includes Category, Action and Label as well as Release Name and Tool Name dimensions.

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

### Deployment

Currently published to develop, ux-dev, integration, staging and production.
