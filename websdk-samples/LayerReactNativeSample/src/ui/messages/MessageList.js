import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';

import MessageListItem from './MessageListItem';

/**
 * A Component for rendering a list of Messages.
 * But most of the work here is managing the scrolling
 * position, and calling this.props.onLoadMoreMessages()
 * to page in more messages.
 */
export default class MessageList extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const reversedMessages = this.props.messages.concat().reverse();

    this.stickBottom = true;

    this.state = {
      dataSource: ds.cloneWithRows(reversedMessages),
    };
  }

  componentWillReceiveProps(nextProps) {
    const reversedMessages = nextProps.messages.concat().reverse();

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(reversedMessages),
    })
  }

  componentDidUpdate() {
    if (this.stickBottom) {
      setTimeout(this.scrollBottom.bind(this), 300);
    }
  }

  scrollBottom() {
    // scroll to bottom of list
    this.refs.listView.scrollToEnd({animated: false});
  }

  handleScroll(e) {
    let nativeEvent = e.nativeEvent;
    this.stickBottom = (nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height)) < 30;
  }

  render() {
    const { onMarkMessageRead } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          ref='listView'
          style={styles.listView}
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
          onEndReached={this.props.onLoadMoreMessages}
          onScroll={this.handleScroll.bind(this)}
          scrollEventThrottle={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listView: {
  }
});
