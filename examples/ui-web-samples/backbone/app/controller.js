/* global layer */
'use strict';

var Backbone = require('backbone');

// initialize lauerUI with your appID and layer sdk
window.layerUI.init({
  appId: window.layerSample.appId
});
var LayerUIWidgets = window.layerUI.adapters.backbone(Backbone);
var NotifierView = LayerUIWidgets.Notifier;
var ConversationsListView = LayerUIWidgets.ConversationsList;
var ConversationView = LayerUIWidgets.ConversationPanel;
var PresenceView = LayerUIWidgets.Presence;
var TitlebarView = require('./views/titlebar');
var ParticipantsView = require('./views/participants-dialog');
var AnnouncementsView = require('./views/announcements');

/**
 * Client router
 */
var Router = Backbone.Router.extend({
  routes: {
    'conversations/:id': 'conversation:selected',
    'announcements': 'announcements'
  }
});
var router = new Router();

/**
 * Controller initializer
 */
module.exports = function(client) {
  var activeConversationId = null;
  var presenceView = new PresenceView(client, {
    item: client.user,
    onPresenceClick: function(evt) {
      if (client.user.status === layer.Identity.STATUS.BUSY) {
        client.user.setStatus(layer.Identity.STATUS.AVAILABLE);
      } else {
        client.user.setStatus(layer.Identity.STATUS.BUSY);
      }
    }
  });
  var notifierView = new NotifierView(client, {
    // Use toast notifications when in the foreground (rather than `none` or `desktop` for Desktop Notifications
    notifyInForeground: 'toast',

    // If we are in the foreground, and the message is in the currently selected Conversation,
    // prevent the toast notification.
    onMessageNotification: function(evt) {
      if (evt.detail.item.conversationId === conversationView.conversationId && !evt.detail.isBackground) {
        evt.preventDefault();
      }
    },

    // On clicking on the notification, open the Conversation
    onNotificationClick: function(evt) {
      var message = evt.detail.item;
      location.hash = message.conversationId.replace(/^layer:\/\/\//, '');
    }
  });

  var conversationsListView = new ConversationsListView(client, {
    onConversationSelected: function(evt) {
      location.hash = evt.detail.item.id.replace(/^layer:\/\/\//, '');
    }
  });


  var conversationView = new ConversationView(client, {
    composeButtons: [
      document.createElement('layer-file-upload-button'),
      document.createElement('layer-send-button')
    ]
  });
  var titlebarView = new TitlebarView();
  var participantsView = new ParticipantsView(client);
  var announcementsView = new AnnouncementsView();

  participantsView.user = client.user;
  Backbone.$('.create-conversation').on('click', newConversation);

  /**
   * Create Announcements Query
   */
  var announcementsQuery = client.createQuery({
    model: layer.Query.Announcement,
    paginationWindow: 30
  });

  announcementsQuery.on('change', function(e) {
    switch (e.type) {
      case 'data':
      case 'insert':
        announcementsView.announcements = announcementsQuery.data;
        announcementsView.render();
        break;
      case 'property':
        break;
    }

    // Mark unread announcements
    var unread = announcementsQuery.data.filter(function(item) {
      return !item.isRead;
    });
    Backbone.$('.announcements-button').toggleClass('unread-announcements', unread.length > 0);
  });


  /**
   * Handle request to start creating a New Conversation
   */
  function newConversation() {
    participantsView.clearParticipants();
    participantsView.show();
  }

  /**
   * Create a Conversation using the WebSDK Client.
   */
  participantsView.on('conversation:create', function(participants) {
    var conversation = client.createConversation({
      participants: participants,
      distinct: participants.length === 1
    });

    // Update our location.
    var uuid = conversation.id.substr(conversation.id.lastIndexOf('/') + 1);
    router.navigate('conversations/' + uuid, {trigger: true});
  });

  /**
   * Handle navigation to a Conversation
   */
  router.on('route:conversation:selected', function(uuid) {
    activeConversationId = 'layer:///conversations/' + uuid;
    var conversation = client.getConversation(activeConversationId, true);
    conversationView.conversationId = conversation.id;
    conversationsListView.selectedConversationId = conversation.id;
    titlebarView.setConversation(conversation);
  });

  /**
   * Handle request to view Announcements
   */
  router.on('route:announcements', function() {
    announcementsView.show();
  });

  if (window.location.hash) Backbone.history.loadUrl(Backbone.history.fragment);
};

Backbone.history.start();
