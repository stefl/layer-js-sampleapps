# Sample apps using Layer Web SDK

This repository contains sample chat applications that demonstrate different ways of building a Web Application with Layer.  Sample apps are built using Backbone, Angular and React; each app is built once with the Layer WebSDK, and once with the Layer WebSDK + Layer UI for Web (Layer UI Framework).

## Setup

Before you install and run any of the sample apps provided in this repo, you will need to prepare the apps by configuring your Layer appID and Identity Provider (authenticator) server.

Make sure [common/LayerConfiguration.json](./common/LayerConfiguration.json) file if configured properly.

## Demo

This is a simple example on how one would use the Layer Web SDK using [AngularJS](https://angularjs.org/) framework.

### Install

To install all dependencies use the following command:

    npm install

### Running

To run this project use the following command:

    npm start

Point your browser to: [localhost:8080](http://localhost:8080)

## The Web SDK

These sample apps are built using the [Layer WebSDK](https://docs.layer.com/sdk/web/introduction).  These samples support two message types:
`text/plain` which is any normal message you send, and `text/quote` which is any Message you send that starts with `> `.

### React

The [React App](./websdk-samples/react) uses:

* Redux to implement a flux architecture
* Layer-react to add Layer Query data to the state
* NPM to include the Layer WebSDK

### Angular 1.x

The [Angular App](./websdk-samples/angular) uses:

* CDN to include the Layer WebSDK
* Standard Angular 1.x templates and controllers to work with Layer Query data

### Backbone

The [Backbone App](./websdk-samples/backbone) uses:

* CDN to include the Layer WebSDK
* Standard Backbone Views to work with Layer Query data


## Layer UI for Web

[Layer UI for Web](http://static.layer.com/layer-ui-web-beta/docs/) is a library of Webcomponent widgets for rendering Layer data and events.
To simplify use of these widgets from various frameworks, the library ships with Adapters to provision its widgets in a manner friendlier to other frameworks.  Examples and initialization code for these is shown below.

Out of the box, this library provides the sample apps with support for:

* Images
* Videos
* Links to youtube videos
* Links to images
* Emojis

### React with Layer UI

The [React App](./ui-web-samples/react) uses a single `src/layer-ui-adapters.js` file, which is imported by any Component needing React Views created from the Webcomponent widgets.  This file can be included from anywhere/everywhere requiring an initialized UI library
and initialized React Components.  This is a useful pattern for many apps:

```javascript
import * as Layer from 'layer-websdk';
LayerUI.init({
  appId: 'layer:///apps/staging/my-app-id'
});

const LayerUIWidgets = LayerUI.adapters.react(React, ReactDom);
module.exports = LayerUIWidgets;
```

`LayerUIWidgets` is now a library of React components wrapping the Layer Webcomponents, and is available to all of your Components.

### Angular 1.x with Layer UI

The [Angular App](./ui-web-samples/angular) uses the Layer UI Angular adapter to define the Angular Directives needed to recognize and work with Layer's Webcomponents.  Thus with the following intialization code:

```javascript
window.layerUI.init({
  appId: 'layer:///apps/staging/my-app-id'
});

// Define the "layerUIControllers" controller
window.layerUI.adapters.angular(angular);

var app = angular.module('ChatApp', [
  "layerUIControllers", ...
]);
```

We have now initialized the directives that let us have partials such as:

```html
<layer-conversation
    ng-delete-message-enabled="true"
    ng-app-id="appCtrlState.client.appId"
    ng-conversation-id="chatCtrlState.currentConversation.id"
    ng-compose-buttons="composeButtons"></layer-conversation>
```

You can use any documented property of the webcomponents, but its recommended to prefix it with `ng-` so that scope can be evaluated prior to passing the value into the webcomponent.


### Backbone with Layer UI

The [Backbone App](./ui-web-samples/backbone) uses the Layer UI Backbone adapter to create a library of Backbone Views:

```javascript
window.layerUI.init({
  appId: 'layer:///apps/staging/my-app-id'
});
var LayerUIWidgets = window.layerUI.adapters.backbone(Backbone);
var NotifierView = LayerUIWidgets.Notifier;
var ConversationsListView = LayerUIWidgets.ConversationList;
var ConversationView = LayerUIWidgets.Conversation;
```

After initializing the UI Framework, the adatpor generates the Backbone views so that they can be instantiated and used.
