'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.participants-dialog',
  initialize: function() {
    this.$el.find('.button-ok').on('click', this.createConversation.bind(this));
  },
  render: function() {
    if (!this.users) return;
    this.$list = this.$el.find('.participant-list');
    this.$list.empty();
    this.users.forEach(this.addUser, this);
  },
  addUser: function(participant) {
    if (participant !== this.user) {
      this.$list.append(
        '<div class="participant-item">' +
          '<div class="avatar-image"><img src="' + participant.avatarUrl + '" /></div>' +
          '<label for="participant-checkbox-' + participant.id + '">' + participant.displayName + '</label>' +
          '<input value="' + participant.userId + '" ' +
              'id="participant-checkbox-' + participant.id + '" ' +
              'type="checkbox" ' +
              'name="userList"/>' +
        '</div>'
      );
    }
  },
  createConversation: function() {
    var participants = [];
    this.$el.find('input:checked').each(function(i, input) {
      participants.push(input.value);
    });
    this.trigger('conversation:create', participants);
    this.hide();
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
    Backbone.history.navigate('/', {trigger: true});
  }
});
