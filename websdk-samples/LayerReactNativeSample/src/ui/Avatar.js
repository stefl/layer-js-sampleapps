import React, { Component, PropTypes } from 'react';

import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class Avatar extends Component {

  // static propTypes = {
  //   user: PropTypes.object,
  //   users: PropTypes.array
  // }

  render() {
    const { user, users } = this.props;

    let usersToRender = user ? [user] : users.filter(item => item.id).slice(-2);

    return (
      <View style={styles.container}>
        {usersToRender.map((user, index) => {
          let imageStyles = (usersToRender.length == 1) ? styles.avatarImage : [styles.avatarImageClustered];
          if (index > 0) imageStyles.push({marginLeft: 15, marginTop: -15});
          return (
            <Image key={`user_${index}`} style={imageStyles} source={{uri: user.avatarUrl}}></Image>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 45
  },
  avatarImage: {
    width: 40,
    height: 40
  },
  avatarImageClustered: {
    width: 30,
    height: 30
  }
});
