import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';

export default class MessageComposer extends Component {

  /**
   * Any time the input changes, we'll want to send a typing indicator
   * to other participants; this.props.onChange handles that.
   */
  handleChange = (text) => {
    this.props.onChange(text);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TextInput
          style={styles.messageInput}
          multiline={false}
          placeholder='Enter a message...'
          placeholderTextColor='#999'
          onChangeText={this.handleChange}
          onSubmitEditing={this.props.onSubmit}
          returnKeyType='send'
          value={this.props.value}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafbfc',
    borderTopWidth: 1,
    borderColor: '#E4E9EC',
  },
  messageInput: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
