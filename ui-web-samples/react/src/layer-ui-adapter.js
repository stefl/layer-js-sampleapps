import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import * as Layer from 'layer-websdk';
import * as LayerUI from 'layer-ui-web';

// Typically you'd provide an appId here, but since this app lets you change appIds,
// we will instead have to pass app-ids in as attributes into the webcomponents
LayerUI.init({
  appId: '',
  layer: Layer
});

const LayerUIWidgets = LayerUI.adapters.react(React, ReactDom);
module.exports = LayerUIWidgets;