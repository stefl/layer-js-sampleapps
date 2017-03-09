import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class TextMessagePart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>{this.props.messagePart.body}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(25, 165, 228, 1.0)'
  },
  messageText: {
    color: 'white'
  }
});
