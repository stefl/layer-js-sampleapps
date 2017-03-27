# Sample apps using Layer Web SDK

This repository contains sample chat applications that demonstrate different ways of building a Web Application with Layer.  The main example is built using angular, but the [examples] folder contains further examples using Backbone and React.

## Identity Server

<<<<<<< HEAD
To run this sample, you need to setup an Identity Service.  This by deploying a service to Heroku's free tier of services.

To deploy this service:

1. Login to the [Developer Dashboard](https://dashboard.layer.com)
2. Navigate to your App
3. Select `Tools` in the Table of contents
4. Click the `Start` button in the Sample Apps section

This will startup the deploy process, and end with a zip file being downloaded which contains this repo, preconfigured
for this app and your Identity Service.
=======
To run this sample, you need to setup an Identity Service.  This can be done via a Deploy to Heroku button.
>>>>>>> Quick start Changes

This Identity Service provides you a sample server for purposes of testing and demoing Layer's products.

This server:

* Lets you setup who the users of your app are, and setup their credentials
* Sets up a `follows` relationship between the first 10 users you register, allowing your users to find
  each other and create conversations with each other.
* When the user logs in, their credentials are sent to this service which returns an Identity Token to your application
  if the user has entered valid credentials.  This Identit Token is used to authenticate with Layer's Services.

## Setup

Before you install and run any of the sample apps provided in this repo, you will need to setup your [Configuration file](common/LayerConfiguration.json) with your Layer appID and the URL to your Identity Provider (authenticator) server.

This JSON file contains an array of at least one:

* `app_id`: Go to [The Developer Dashboard](https://dashboard.layer.com), select your Application, and select `Keys` in the table of contents on the left.  You should see your Application ID.
* `identity_provider_url`: If you are using the Layer Sample Identity server deployed to your server or your Heroku account, enter the url to that server here.  Note that if you are using your own custom identity service (recommended once you are no longer working on demos), you will need to replace your client's authentication code, and this configuration file is no longer needed.
* `name`: Support for this field will be added eventually to let you select between different configurations when logging in.

```json
[{
  "app_id": "layer:///apps/staging/f34bdf52-fd26-11e6-9f75-336a5aaaaaaa",
  "identity_provider_url": "https://layer-quickstart-frodo-the-dodo.herokuapp.com"
  "name": "Staging Demo"
}]
```

## Demo

The main demo shows how to build an application using

* [Layer WebSDK](github.com/layerhq/layer-websdk)
* [Layer UI for Web](github.com/layerhq/layer-ui-web)
* [AngularJS](https://angularjs.org/)

### Install

To install all dependencies use the following command:

    npm install

### Running

To run this project use the following command:

    npm start

Point your browser to: [localhost:8080](http://localhost:8080)

You can also try out an alternate theme with [localhost:8080/index_group_theme.html](http://localhost:8080/index_group_theme.html)

### What does it do?

1. You can create a new conversation using the "pencil" button; this button will show a dialog listing all of the users you follow
  * Note that the first 10 users created in your identity server will automatically follow one another
  * Note that after the first 10, you must do this manually; using the websdk for example, you can call `client.followIdentity('user_id')` and that user will then show up in the new conversation dialog.
1. You can send and receive messages
1. You can send and receive image files and video files
1. You can send and receive emoji characters using :-) or :smile: or unicode characters
1. You can send and receive links to images, web pages and youtube videos
1. You should be able to send/receive typing indicators

## The examples folder

There are two types of example within the examples folder:

* Examples built using the Layer WebSDK and a third party UI framework
* Examples built using the Layer WebSDK _and_ Layer's UI widgets, along with a third party UI framework

## The Web SDK only examples

These sample apps are built using the [Layer WebSDK](https://docs.layer.com/sdk/web/introduction).  These samples support two message types:

* `text/plain` which is any normal message you send
* `text/quote` which is any Message you send that starts with `> `

### React

The [React App](./examples/websdk-samples/react) uses:

* Redux to implement a flux architecture
* [layer-react](github.com/layerhq/layer-react) to add Layer Query data to the state
* NPM to include the [Layer WebSDK]((github.com/layerhq/layer-websdk)

### Angular 1.x

The [Angular App](./examples/websdk-samples/angular) uses:

* CDN to include the [Layer WebSDK]((github.com/layerhq/layer-websdk)
* Standard Angular 1.x templates and controllers to work with Layer Query data

### Backbone

The [Backbone App](./examples/websdk-samples/backbone) uses:

* CDN to include the [Layer WebSDK]((github.com/layerhq/layer-websdk)
* Standard Backbone Views to work with Layer Query data


## Layer UI for Web

[Layer UI for Web](http://static.layer.com/layer-ui-web-beta/docs/) is a library of Webcomponent widgets
for rendering Layer data and events.  To simplify use of these widgets from various frameworks, the library
ships with Adapters to expose widgets as Components understood by other frameworks.
Examples and initialization code for these is shown below.

### React with Layer UI

The [React App](./examples/ui-web-samples/react) uses a single `src/layer-ui-adapters.js` file, which is imported by any Component
needing React Views created from the Webcomponent widgets.  This file can be included from anywhere/everywhere requiring
an initialized UI library and initialized React Components.  This is a useful pattern for many apps:

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

> **Note** This example is in the root folder of this repository; and not in the examples folder.

The [Angular App](./) uses the Layer UI Angular adapter to define the Angular Directives needed to recognize and work with Layer's Webcomponents.  Thus with the following intialization code:

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

You can use any documented property of the webcomponents, but its recommended to prefix it with `ng-` so that
scope can be evaluated prior to passing the value into the webcomponent.


### Backbone with Layer UI

The [Backbone App](./examples/ui-web-samples/backbone) uses the Layer UI Backbone adapter to create a library of Backbone Views:

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
