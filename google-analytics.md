### Google Analytics

#### Events

There are currently two release-related events captured by Google Analytics: `Download` and `Visualize`. Both events send core event data (Category, Action and Label) as well as additional event-related data as dimensions (eg Dataset Name, Release Name, Tool Name) every time they are fired.

These two events are fired by the front end according to the Google Tag Manager configuration.

##### Download Events

Download events are configured as:

- Category: "Dataset"
- Action: "Download"
- Label: `http://path/to/download`

- Dataset Name: `datasetName`
- File Extension: `fileExtension`
- File Name: `fileName`
- File Type: `fileType`
- Release Name: `releaseName`

##### Visualize Events

Visualize events are configured as:

- Category: "Dataset"
- Action: "Visualize"
- Label: `http://path/to/visualization-tool`

- Dataset Name: `datasetName`
- Release Name: `releaseName`
- Tool Name: `toolName`

#### Custom Dimensions

The following custom dimensions are configured in Google Analytics, allowing additional data (beyond Category, Action and Label) to be included in each data layer event fired from the front end.

- `datasetName`
- `fileType`
- `fileExtension`
- `fileName`
- `releaseName`
- `toolName`

### GTM "Data Layer" Variables

##### Dataset Name
- Used to capture `datasetName` dimension from front end data layer.
- Corresponds to `datasetName` custom dimension in Google Analytics.

##### Event Action
- Used to capture `eventAction` dimension from front end data layer.
- Corresponds to the Action value in a Google Analytics event.

##### Event Label
- Used to capture `eventLabel` dimension from front end data layer.
- Corresponds to the Label value in a Google Analytics event.

##### File Extension
- Used to capture `fileExtension` dimension from front end data layer.
- Corresponds to `fileExtension` custom dimension in Google Analytics.

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

### GTM Tags

#### Download
- Sends "Download" event to Google Analytics when Download trigger is fired.
- Event data includes Category, Action and Label as well as Dataset Name, File Extension, File Name, File Type and Release Name dimensions.

#### Visualize
- Sends "Visualize" event to Google Analytics when Download trigger is fired.
- Event data includes Category, Action and Label as well as Dataset Name, Release Name and Tool Name dimensions.

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

Currently published to develop, ux-dev, integration, staging.