'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var ConversationView = require('./conversation');

module.exports = Backbone.View.extend({
  el: '.conversation-list',
  newConversation: function() {
    this.$el.find('.participant-item').removeClass('selected-conversation');
  },
  render: function() {
    if (!this.conversations) return;
    console.log('render: ' + this.conversations.length + ' Conversations');

    this.$el.empty();
    this.conversations.forEach(this.addConversation, this);
  },
  addConversation: function(conversation) {
    var conversationView = new ConversationView({model: conversation});
    this.$el.append(conversationView.$el);
    conversationView.render();
    if (conversation === this.conversation) conversationView.$el.addClass('selected-conversation');
  },
  events: {
    'click .delete': 'deleteConversation'
  },
  deleteConversation: function(e) {
    e.preventDefault();
    this.trigger('conversation:delete', Backbone.$(e.target).data('id'));
  }
});
