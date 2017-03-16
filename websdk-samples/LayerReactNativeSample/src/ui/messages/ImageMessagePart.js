import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

export default class ImageMessagePart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.messagePart.url}}
          resizeMode='cover'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderWidth:1,
    borderColor: '#aaa'
  }
});
