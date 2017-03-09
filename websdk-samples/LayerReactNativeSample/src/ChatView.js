import React, { Component } from 'react';

import {
  Navigator
} from 'react-native';

import { Provider } from 'react-redux';
import { LayerProvider } from 'layer-react';
import ConversationListContainer from './containers/ConversationListContainer.js';
import ActiveConversationContainer from './containers/ActiveConversationContainer.js';
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
          <Navigator
            initialRoute={{name: 'ConversationList', title: 'Conversation List'}}
            renderScene={(route, navigator) => {
              switch (route.name) {
                case 'ConversationList':
                  return (
                    <ConversationListContainer navigator={navigator} />
                  )
              }
              switch (route.name) {
                case 'ActiveConversation':
                  return (
                    <ActiveConversationContainer navigator={navigator} />
                  )
              }
            }}
          />
        </Provider>
      </LayerProvider>
    )
  }
}
