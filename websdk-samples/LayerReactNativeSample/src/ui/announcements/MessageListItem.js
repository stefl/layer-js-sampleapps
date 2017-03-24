import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import LayerHelper from '../../layer_helper.js'
import TextMessagePart from './TextMessagePart';
import Avatar from '../Avatar';

import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * This Component renders a single Message in a Message List
 * which includes Avatar, sender name, message body,
 * timestamp and status.
 */
export default class MessageListItem extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * At this time we are marking any Message that has been
   * rendered as read.  A more advanced implementation
   * would test if was scrolled into view.
   */
  markMessageRead() {
    const { onMarkMessageRead, message } = this.props;
    if (message.isUnread) {
      onMarkMessageRead(message.id);
    }
  }

  showItem = (event) => {
    this.markMessageRead();
  }

  render() {
    const { message, users } = this.props;

    return (
      <TouchableOpacity
          style={styles.container}
          onPress={this.showItem}
          activeOpacity={.5}
      >
        {(!message.isRead) &&
          <Icon style={styles.unreadBullet} name='circle' />
        }
        <Text style={styles.displayName}>{message.sender.displayName}</Text>
        <View style={styles.announcementParts}>
          {message.parts.map((messagePart) => {
            return (
              <TextMessagePart
                key={messagePart.id}
                messagePart={messagePart}/>
            )
          })}
        </View>
        <Text style={styles.timestamp}>{LayerHelper.dateFormat(message.sentAt)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
  },
  displayName: {
    fontFamily: 'System',
    color: '#666',
    fontWeight: 'bold',
    width: 100,
  },
  announcementParts: {
    marginHorizontal: 5,
    flex: 1,
  },
  unreadBullet: {
    marginTop: 3,
    marginRight: 5
  },
  timestamp: {
    fontFamily: 'System',
    fontSize: 10,
    width: 100,
    color: '#666',
    textAlign: 'right',
  }
});
