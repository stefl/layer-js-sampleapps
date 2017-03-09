import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native';

import MessageListItem from './MessageListItem';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class MessageList extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    console.log('messages', this.props.messages);

    this.state = {
      dataSource: ds.cloneWithRows(this.props.messages)
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps messages', nextProps.messages);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.messages),
    })
  }

  render() {
    const { onMarkMessageRead } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Announcements</Text>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.onClose}
              activeOpacity={.5}
          >
            <Icon style={styles.closeIcon} name='close' />
          </TouchableOpacity>
        </View>

        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(message) => {
            return (
              <MessageListItem
                key={message.id}
                message={message}
                onMarkMessageRead={onMarkMessageRead}/>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    // marginBottom: 50,
    // marginHorizontal: 20,
    borderColor: '#777',
    borderWidth: 2
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  title: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 14,
    color: '#404F59',
    textAlign: 'center',
    marginLeft: 20
  },
  closeButton: {
    width: 20,
    alignItems: 'flex-end'
  },
  closeIcon: {
    fontSize: 20
  }
});
