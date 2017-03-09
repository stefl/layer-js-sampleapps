import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default class TextMessagePart extends Component {
  render() {
    return <Text style={styles.container}>{this.props.messagePart.body}</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: '#666'
  }
});
