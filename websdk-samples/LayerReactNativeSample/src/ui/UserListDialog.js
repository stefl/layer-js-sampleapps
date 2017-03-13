import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native';

import UserListItem from './UserListItem';

/**
 * This Component renders a list of users,
 * currently provided by UserListItems which
 * allow the UI to provide a New Conversation panel.
 */
export default class UserList extends Component {
  /**
   * Render a UserListItem for this user
   */
  renderUserItem = (user) => {
    const {
      selectedUsers,
      onUserSelected,
      onUserUnselected
    } = this.props;
    const selected = Boolean(selectedUsers.filter(selectedUser => selectedUser.id === user.id).length);

    return (
      <UserListItem
        key={user.id}
        user={user}
        selected={selected}
        onUserSelected={onUserSelected}
        onUserUnselected={onUserUnselected}/>
    );
  }

  /**
   * Render the User List Dialog
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Participants</Text>
        </View>
        <View style={styles.participantList}>
          {this.props.users.map(this.renderUserItem)}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.props.onSave}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20
  },
  header: {
    padding: 20,
    backgroundColor: '#ebebeb'
  },
  title: {
    fontFamily: 'System',
    fontSize: 14,
    color: '#404F59',
    textAlign: 'center'
  },
  titleUnread: {
    color: 'black',
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#ebebeb',
    padding: 10,
    alignItems: 'center'
  },
});
