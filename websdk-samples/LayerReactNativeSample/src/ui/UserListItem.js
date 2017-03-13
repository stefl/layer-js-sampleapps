import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch
} from 'react-native';

import Avatar from './Avatar';

/**
 * This Component renders a User in the form of an
 * Avatar, name and checkbox.  Calls onUserSelected
 * and onUserUnselected as checkbox state changes.
 */
export default class UserListItem extends Component {
  handleValueChange = (value) => {
    const user = this.props.user;

    if (value) {
      this.props.onUserSelected(user);
    } else {
      this.props.onUserUnselected(user);
    }
  }

  render() {
    const { user, selected } = this.props;
    return (
      <View style={styles.container}>
        <Avatar user={user}/>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Switch
          onValueChange={this.handleValueChange}
          value={this.props.selected} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  displayName: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 12,
    color: '#404F59'
  },
  titleUnread: {
    color: 'black',
    fontWeight: 'bold'
  }
});
