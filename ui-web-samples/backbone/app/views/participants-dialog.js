'use strict';

/**
 * A dialog for selecting users for a new Conversation.
 *
 * Can also be used for updating participants in an existing Conversation.
 *
 * Manages a Dialog and a `<layer-identities-list/>` widget
 */


var Backbone = require('backbone');
const LayerUIWidgets = window.layerUI.adapters.backbone(Backbone);
var IdentitiesList = LayerUIWidgets.IdentitiesList;

module.exports = Backbone.View.extend({
  el: '.participants-dialog',
  initialize: function(client) {
    this.$el.find('.button-ok').on('click', this.createConversation.bind(this));
    this.identitiesList = new IdentitiesList(client);
  },

  /**
   * In the future, you may want this to be setParticipants so
   * you can use it to update the participants in a Conversation.
   */
  clearParticipants: function() {
    this.identitiesList.selectedIdentities = [];
  },

  /**
   * Tell the Controller to create the Conversation.
   */
  createConversation: function() {
    var participants = this.identitiesList.selectedIdentities;
    if (participants.length) {
      this.hide();
      this.trigger('conversation:create', participants);
    }
  },
  events: {
    'click .participant-list-container': 'clickStopPropagation',
    'click': 'hide'
  },
  clickStopPropagation: function(e) {
    e.stopPropagation();
  },
  show: function() {
    this.$el.removeClass('hidden');
  },
  hide: function() {
    this.$el.addClass('hidden');
  }
});
