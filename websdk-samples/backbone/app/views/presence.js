'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.layer-presence',
  initialize: function() {
    this.model.on('identities:change', this.render, this);
    this.$el.addClass('layer-presence');
  },
  render: function() {
    if (this.model) {
      this.$el.removeClass('layer-presence-available');
      this.$el.removeClass('layer-presence-busy');
      this.$el.removeClass('layer-presence-away');
      this.$el.removeClass('layer-presence-invisible');
      this.$el.removeClass('layer-presence-offline');
      this.$el.addClass('layer-presence-' + this.model.presence.status.toLowerCase());
    }
  },
  events: {
    'click': 'togglePresence'
  },
  togglePresence: function(e) {
    if (this.model && this.model.sessionOwner) {
      if (this.model.presence.status === layer.Identity.STATUS.BUSY) {
        this.model.setStatus(layer.Identity.STATUS.AVAILABLE);
      } else {
        this.model.setStatus(layer.Identity.STATUS.BUSY);
      }
    }
  }
});
