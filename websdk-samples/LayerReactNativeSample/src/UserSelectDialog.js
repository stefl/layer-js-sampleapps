import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserSelectDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedUserId: 0,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={{uri: 'http://static.layer.com/logo-only-blue.png'}}
          resizeMode='contain'
        />
        <Text style={styles.welcomeText}>Welcome to Layer Sample App!</Text>
        <Text style={styles.selectUserText}>SELECT USER TO LOGIN AS</Text>

        {[...Array(6).keys()].map((i) => {
          return (
            <TouchableOpacity style={styles.userSelectButton}
                              onPress={() => {this.setState({selectedUserId: i})}}
                              activeOpacity={.5}
                              key={`user_${i}`}
            >
              <Icon style={[styles.userSelectIcon, this.state.selectedUserId === i ? styles.userSelectIconSelected : {}]}
                    name={this.state.selectedUserId === i ? 'dot-circle-o' : 'circle-thin'} />
              <Text style={styles.userSelectText}>User {i}</Text>
            </TouchableOpacity>
          )
        })}
        <TouchableOpacity style={styles.loginButton}
                          onPress={() => {this.props.onSelectUser('' + this.state.selectedUserId)}}
                          activeOpacity={.5}
        >
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 25
  },
  logoImage: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginBottom: 10
  },
  welcomeText: {
    fontFamily: 'System',
    fontSize: 20,
    textAlign: 'center',
    color: '#404F59',
    marginHorizontal: 40,
    marginBottom: 40
  },
  selectUserText: {
    fontFamily: 'System',
    fontSize: 14,
    color: '#404F59',
    marginBottom: 10
  },
  userSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3
  },
  userSelectIcon: {
    fontSize: 16,
    color: '#aaa'
  },
  userSelectIconSelected: {
    color: '#27A6E1'
  },
  userSelectText: {
    fontFamily: 'System',
    fontSize: 14,
    color: '#404F59',
    marginLeft: 7
  },
  loginButton: {
    backgroundColor: '#27A6E1',
    borderRadius: 6,
    paddingVertical: 10,
    marginTop: 40
  },
  loginButtonText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
});
