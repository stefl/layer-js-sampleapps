import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import TextMessagePart from './TextMessagePart';
import QuoteMessagePart from './QuoteMessagePart';
import ImageMessagePart from './ImageMessagePart';
import Avatar from '../Avatar';

/**
 * This Component renders a single Message in a Message List
 * which includes Avatar, sender name, message body,
 * timestamp and status.
 */
export default class MessageListItem extends Component {
  /**
   * At this time we are marking any Message that has been
   * rendered as read.  A more advanced implementation
   * would test if was scrolled into view.
   */
  componentDidMount() {
    this.markMessageRead();
  }

  componentWillReceiveProps() {
    this.markMessageRead();
  }

  markMessageRead() {
    const { onMarkMessageRead, message } = this.props;
    if (message.isUnread) {
      onMarkMessageRead(message.id);
    }
  }

  getMessageStatus(message) {
    switch (message.readStatus) {
      case 'NONE':
        return 'unread';
      case 'SOME':
        return 'read by some';
      case 'ALL':
        return 'read';
    }
  }

  renderPart(messagePart) {
    switch(messagePart.mimeType) {
      case 'text/plain':
        return (
          <TextMessagePart
            key={messagePart.id}
            messagePart={messagePart}/>);
      case 'text/quote':
        return (
          <QuoteMessagePart
            key={messagePart.id}
            messagePart={messagePart}/>);
      case 'image/jpeg+preview':
        return (
          <ImageMessagePart
            key={messagePart.id}
            messagePart={messagePart}/>);
      default:
        return (<View key={messagePart.id} />);
    }
  }


  render() {
    const { message } = this.props;
    const user = message.sender;
    const messageStatus = this.getMessageStatus(message);

    return (
      <View style={styles.container}>
        <Avatar user={user}/>
        <View style={styles.main}>
          <Text style={styles.userName}>{user.displayName}</Text>
          <View style={styles.messageParts}>
            {/*TODO: special case for images so that tapping on a preview of an image with launch a modal with the full version*/}
           {message.parts.map(messagePart => this.renderPart(messagePart))}
         </View>
        </View>
        <View style={styles.status}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  main: {
    flex: 1,
    marginLeft: 10
  },
  userName: {
    marginLeft: 10,
    marginBottom: 2,
    fontFamily: 'System',
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)'
  }
});
