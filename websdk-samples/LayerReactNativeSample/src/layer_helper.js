'use strict'

require('../layerSample.js');
require('../config.js');

let LayerHelper = {
  appId: window.layerSample.appId,
  getIdentityToken: window.layerSample.getIdentityToken,
  validateSetup: window.layerSample.validateSetup,
  dateFormat: window.layerSample.dateFormat
}

module.exports = LayerHelper;
