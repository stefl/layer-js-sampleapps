/* global layer */
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var controller = require('./controller');

let appId = window.layerSample.appId;

/**
 * Initialize Layer Client with `appId`.
 */
var client = new layer.Client({
  appId: appId
});

/**
 * Client authentication challenge.
 * Sign in to Layer sample identity provider service.
 *
 * See http://static.layer.com/sdk/docs/#!/api/layer.Client
 */
client.once('challenge', function(e) {
  window.layerSample.getIdentityToken(e.nonce, e.callback);
});

window.layerSample.onLogin(() => {
  /**
   * Start authentication
   */
  client.connect();
});

/**
 * validate that the sample data has been properly set up
 */
window.layerSample.validateSetup(client);

/**
 * Client ready. Initialize controller.
 */
client.once('ready', function() {
  $('.left-panel .panel-header .title').text(client.user.displayName + '\'s Conversations');
  controller(client);
});
