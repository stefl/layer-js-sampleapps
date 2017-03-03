import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import toUUID from '../utils/toUUID';
import Avatar from './Avatar';

/**
 * This Component provides for a Conversation item
 * in the list, currently consisting of an
 * Avatar, title and Delete button.
 */
export default class ConversationListItem extends Component {
  handleDeleteConversation = () => {
    this.props.onDeleteConversation(this.props.conversation.id);
  }

  render() {
    const { conversation, active, deleteConversation } = this.props;
    const participantUsers = conversation.participants.filter(user => !user.sessionOwner);
    // const conversationUrl = `/conversations/${toUUID(conversation.id)}`;

    // const styles = cx({
    //   'conversation-item': true,
    //   'unread-messages': conversation.unreadCount > 0,
    //   'selected-conversation': active
    // });

    const title = conversation.metadata.title || participantUsers.map(function(user) {
      return user.displayName;
    }).join(', ');

    // Render the UI
    return (
      <TouchableOpacity style={styles.container}
                        onPress={() => {console.log('conversation selected')}}
                        activeOpacity={.5}
      >
        <Avatar users={participantUsers}/>
        <Text style={[styles.title, (conversation.unreadCount > 0) ? styles.titleUnread : {}]}>{title}</Text>
        {/* TODO: how to delete?
            <span
              className="delete fa fa-times-circle"
              title="Delete conversation"
              onClick={this.handleDeleteConversation}/>
              */}
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  title: {
    flex: 1,
    marginLeft: 20,
    fontFamily: 'System',
    fontSize: 14,
    color: '#666'
  },
  titleUnread: {
    color: 'black',
    fontWeight: 'bold'
  }
});
