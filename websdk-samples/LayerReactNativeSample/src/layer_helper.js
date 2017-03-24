'use strict'

require('../layerSample.js');
require('../config.js');

let LayerHelper = {
  appId: window.layerSample.appId,
  getIdentityToken: window.layerSample.getIdentityToken.bind(window.layerSample),
  validateSetup: window.layerSample.validateSetup.bind(window.layerSample),
  dateFormat: window.layerSample.dateFormat.bind(window.layerSample)
}

module.exports = LayerHelper;
