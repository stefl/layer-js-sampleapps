import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * This Component provides a title over the conversation list
 * and a button for creating a new Conversation.
 */
export default class ConversationListHeader extends Component {

  render() {
    const { unreadAnnouncements, owner } = this.props;
    const announcementStyles = [styles.menuButton];
    if (unreadAnnouncements) announcementStyles.push(styles.announcementButtonUnread);
    return (
      <View style={styles.container}>
        <Text style={styles.ownerName}>{(owner.displayName + "'s Conversations").toUpperCase()}</Text>

        <View style={styles.menuButtons}>
          <TouchableOpacity style={announcementStyles}
                            onPress={this.props.onShowAnnouncements}
                            activeOpacity={.5}
          >
            <Icon style={styles.icons} name='bullhorn' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}
                            onPress={this.props.onShowParticipants}
                            activeOpacity={.5}
          >
            <Icon style={styles.icons} name='pencil-square-o' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(25, 165, 228)',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 25
  },
  ownerName: {
    flex: 1,
    fontFamily: 'System',
    color: 'white'
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 10
  },
  icons: {
    color: 'white',
    fontSize: 20
  },
  menuButton: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    padding: 5,
    borderRadius: 4
  },
  announcementButtonUnread: {

  }
});
