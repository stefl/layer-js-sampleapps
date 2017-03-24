import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class QuoteMessagePart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>{'"' + this.props.messagePart.body + '"'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(240, 240, 240, 1.0)',
    borderColor: 'rgba(25, 165, 228, 1.0)',
    borderWidth: 2
  },
  messageText: {
    color: 'black',
    fontStyle: 'italic'
  }
});
