'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var ParticipantView = require('./participant');

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
      var participantView = new ParticipantView({model: participant});
      this.$list.append(participantView.$el);
      participantView.render();
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
