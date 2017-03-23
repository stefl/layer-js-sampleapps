/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
} from 'react-native';

import { Client, Query } from 'layer-websdk/index-react-native.js';

import LayerHelper from './src/layer_helper.js'
import configureStore from './src/store/configureStore';
import { ownerSet } from './src/actions/messenger';
import ChatView from './src/ChatView'
import UserSelectDialog from './src/UserSelectDialog'

const appId = 'layer:///apps/staging/1d980162-c5ee-11e5-bb69-e08c0300541f';

export default class LayerReactNativeSample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    }

    /**
     * Initialize Layer Client with `appId`
     */
    this.client = new Client({
      appId: appId
    });

    /**
     * Client authentication challenge.
     * Sign in to Layer sample identity provider service.
     *
     * See http://static.layer.com/sdk/docs/#!/api/layer.Client-event-challenge
     */
    this.client.once('challenge', e => {
      LayerHelper.getIdentityToken(appId, this.state.userId, e.nonce, e.callback);
    });

    this.client.on('ready', () => {
      this.store.dispatch(ownerSet(this.client.user.toObject()));
    });

    /**
     * Share the client with the middleware layer
     */
    this.store = configureStore(this.client);

    /**
     * validate that the sample data has been properly set up
     */
    LayerHelper.validateSetup(this.client);
  }

  login(userId) {
    this.setState({
      userId: userId
    });

    /**
     * Start authentication
     */
    this.client.connect(userId);
  }

  render() {
    return (
      <View style={styles.container}>
        <ChatView client={this.client} store={this.store} />

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.userId === null}
        >
          <View style={styles.modalBackground}>
            <UserSelectDialog onSelectUser={this.login.bind(this)} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('LayerReactNativeSample', () => LayerReactNativeSample);
