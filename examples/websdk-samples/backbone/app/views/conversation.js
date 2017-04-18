'use strict';

var Backbone = require('backbone');
var PresenceView = require('./presence');

module.exports = Backbone.View.extend({
  tagName: 'a',
  className: 'conversation-item',
  render: function() {
    var el = this.$el[0];
    var conversation = this.model;
    var uuid = conversation.id.substr(conversation.id.lastIndexOf('/') + 1); // extract just UUID
    if (conversation.unreadCount !== 0) el.classList.add('unread-messages');
    var participants = conversation.participants;
    var client = conversation.getClient();

    var title = conversation.metadata.conversationName;
    var interestingParticipants = participants
      .filter(function(user) {
        return !user.sessionOwner;
      });

    if (!title) {
      title = interestingParticipants
      .map(function(user) {
        return user.displayName;
      });
    }

    var selectedClass = '';
    if (this.conversation && conversation.id === this.conversation.id) el.classList.add('selected-conversation');
    el.setAttribute('href', '#conversations/' + uuid);

    var avatars = interestingParticipants.map(function(user) {
      if (user.avatarUrl) {
        return '<span><img src="' + user.avatarUrl + '" /></span>';
      } else {
        return '<span class="no-avatar">' + user.displayName.substring(0, 2) + '</span>';
      }
    });
    var cluster = avatars.length > 1 ? 'cluster' : '';

    this.$el.append('<div class="avatar-image ' + cluster + '">' +
                      avatars.join('') +
                    '</div>' +
                    '<div class="info">' +
                      '<div class="main">' +
                        '<span class="title">' + title + '</span>' +
                        '<span class="delete fa fa-times-circle" title="Delete conversation" data-id="' + conversation.id + '"></span>' +
                      '</div>' +
                    '</div>');
    if (interestingParticipants.length === 1) {
      var presenceView = new PresenceView({
        model: interestingParticipants[0],
        el: null
      });
      presenceView.render();
      presenceView.$el.appendTo(this.$el.find('.avatar-image'));
    }
  }
});