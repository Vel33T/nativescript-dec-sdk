# Progress Sitefinity Digital Experience Cloud SDK plugin for NativeScript ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/dat

[![NPM version][npm-image]][npm-url]

[npm-image]:https://img.shields.io/npm/v/nativescript-dec-sdk.svg
[npm-url]:https://www.npmjs.com/package/nativescript-dec-sdk

The purpose of this plugin is to help and ease the developers working with Progress Sitefinity Digital Experience Cloud API. It simplifies the sending of user Interactions to the DEC servers and the getting of Personalization information from there.

## Prerequisites

A valid Digital Experience Cloud account is needed for the use of this plugin.

## Installation
```bat
tns plugin add nativescript-dec-sdk
```

## Usage 

Require/Import the DecClient and then to initialize it with proper Options object.
### Javascript
```javascript
var DecClient = require("nativescript-dec-sdk").DecClient;
var client = new DecClient({
    apiKey: 'your DEC Data center Api key',
    source: 'the data source name used by the client',
    authToken: 'your DEC Data center Authentication token', // Not required - needed only if Personalization calls to DEC Data center are used.
    apiServerUrl: 'Api server url' // Not required - only use if the url is a custom one.
});
```
### Typescript
```typescript
import { DecClient } from "nativescript-dec-sdk";
let client = new DecClient({
    apiKey: 'your DEC Data center Api key',
    source: 'the data source name used by the client',
    authToken: 'your DEC Data center Authentication token', // Not required - needed only if Personalization calls to DEC Data center are used.
    apiServerUrl: 'Api server url' // Not required - only use if the url is a custom one.
});
```

## API

### Personalization calls

#### Function
```javascript
client.IsInPersonas(scoringIds, subjectKey)
````
- **scoringIds** - an array of Persona Ids.
- **subjectKey** - the User's Id
---

#### Function
```javascript
client.IsInLeads(scoringIds, subjectKey);
````
- **scoringIds** - an array of Lead Scoring Ids.
- **subjectKey** - the User's Id
---

#### Function
```javascript
client.IsInCampaigns(campaignIds, subjectKey);
````
- **campaignIds** - an array of Lead Scoring Ids.
- **subjectKey** - the User's Id
---
---

### Interactions

#### Function
```javascript
client.writeInteraction(interaction);
````
The interaction should follow this structure:
```js
{
    S: '', // The Interaction's Subject.
    P: '', // The Interaction's Predicate.
    O: '', // The Interaction's Object.
    SM: {}, // The Interaction's Subject Metadata. 
    OM: {}, // The Interaction's Object Metadata.
    MappedTo: {} // The Interaction's Mapping.
}
```
**Important:** _A valid Interaction should always contain a Subject in combination with any number of the other properties._

---

#### Function
```javascript
client.writeSubjectMetadata(subjectKey, metadata);
````
- **subjectKey** - the User's Id
- **metadata** - a metadata object.
---

#### Function
```javascript
client.writeObjectMetadata(subjectKey, metadata);
````
- **subjectKey** - the User's Id
- **metadata** - a metadata object.
---

#### Function
```javascript
client.addMapping(subjectKey, secondSubjectKey, secondDataSource);
````
- **subjectKey** - the User's Id
- **secondSubjectKey** - the User's Id from the other source.
- **secondDataSource** - The other data source.
---

#### Function
```javascript
client.buildPersonalizationReportInteraction(personalizationReportParams);
````
The personalizationReportParams should follow this structure (**all properties are required!**):
```js
{
    subjectKey: '', // The Subject key of the Application's user.
    pageGuid: '', // The guid of the page currently personalized.
    canonicalTitle: '', // The title of the page currently personalized.
    canonicalUrl: '', // The url of the page currently personalized. 
    segment: '', // The segment by which the page is personalized - the Persona, the Lead Scoring or the Campaign.
    language: '' // The language of the page currently personalized.
}
```
---

<!-- 
## License

Apache License Version 2.0, January 2004 -->
