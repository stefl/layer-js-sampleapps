'use strict';

var Backbone = require('backbone');
var PresenceView = require('./presence');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'participant-item',
  render: function() {
    var el = this.$el[0];
    var participant = this.model;
    var avatar;
    if (participant.avatarUrl) {
        avatar = '<span><img src="' + participant.avatarUrl + '" /></span>';
      } else {
        avatar = '<span class="no-avatar">' + participant.displayName.substring(0, 2) + '</span>';
      }
    this.$el.append(
      '<div class="avatar-image">' + avatar + '</div>' +
      '<label for="participant-checkbox-' + participant.id + '">' + participant.displayName + '</label>' +
      '<input value="' + participant.userId + '" ' +
          'id="participant-checkbox-' + participant.id + '" ' +
          'type="checkbox" ' +
          'name="userList"/>');
    var presenceView = new PresenceView({
      model: participant,
      el: null
    });
    presenceView.render();
    presenceView.$el.appendTo(this.$el.find('.avatar-image'));
  }
});