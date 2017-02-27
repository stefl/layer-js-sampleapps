import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as Layer from 'layer-websdk';
import * as LayerUI from 'layer-ui-web';

// initialize lauerUI with your appID and layer sdk
LayerUI.init({
  appId: window.layerSample.appId,
  layer: Layer
});

const LayerUIWidgets = LayerUI.adapters.react(React, ReactDom);
module.exports = LayerUIWidgets;
