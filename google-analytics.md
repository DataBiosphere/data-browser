### Google Analytics

#### Custom Dimensions

The following custom dimensions are configured in Google Analytics, allowing additional data (in addition to Category, Action and Label) to be included in each data layer event fired from the front end.

- `currentQuery`
- `direction`
- `entityId`
- `entityType`
- `entityUrl`
- `facet`
- `fileType`
- `index`
- `min`
- `max`
- `relatedEntityId` (previously `fileName`)
- `relatedEntityType` (previously `fileFormat`)
- `relatedEntityUrl`
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

###### View Deprecated Project

- Category: "Project"
- Action: "View Deprecated Project"
- Label: `projectShortname`


- Entity ID: `projectId`
- Entity URL: `http:/path/to/project`
- Current Query: `currentQuery`


###### View Project Integration

- Category: "Project"
- Action: "View External Resource"
- Label: `projectShortname`


- Entity ID: `projectId`
- Entity URL: `http:/path/to/project`
- Current Query: `currentQuery`
- Related Entity Id: `portalName (portalOrg)`
- Related Entity Type: "Integration"
- Related Entity URL: `portalUrl`

###### View Project Supplementary Links

- Category: "Project"
- Action: "View External Resource"
- Label: `projectShortname`


- Entity ID: `projectId`
- Entity URL: `http:/path/to/project`
- Current Query: `currentQuery`
- Related Entity Id: `supplementaryLinkUrl`
- Related Entity Type: "Supplementary Link"
- Related Entity URL: `supplementaryLinkUrl`

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
- File Format: `relatedEntityType`

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

##### Table Events

###### File Download

- Category: "File"
- Action: "Download"
- Label: `fileName`


- Current Query: `currentQuery`
- Entity URL: `http://path/to/download`
- Related Entity Type: `fileType`
- Related Entity ID: `fileName`

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
- `dimension0` represents a dimension to be included in the event values sent to Google Analytics (eg `datasetName`, `toolName`).

