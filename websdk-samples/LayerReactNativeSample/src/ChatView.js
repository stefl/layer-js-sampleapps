import React, { Component } from 'react';

import {
  Navigator
} from 'react-native';

import { Provider } from 'react-redux';
import { LayerProvider } from 'layer-react';
import ConversationListContainer from './containers/ConversationListContainer.js';
// import ActiveConversation from './containers/ActiveConversation';
// import DefaultPanel from './components/DefaultPanel';

export default class ChatView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LayerProvider client={this.props.client}>
        <Provider store={this.props.store}>
          <ConversationListContainer />
        </Provider>
      </LayerProvider>
    )
  }
}
