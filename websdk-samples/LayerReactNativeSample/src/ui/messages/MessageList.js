import React, { Component, PropTypes } from 'react';
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

    console.log('reversedMessages', reversedMessages);

    this.state = {
      dataSource: ds.cloneWithRows(reversedMessages),
      stickBottom: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const reversedMessages = nextProps.messages.concat().reverse();

    console.log('componentWillReceiveProps reversedMessages', reversedMessages);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(reversedMessages),
    })
  }

  componentDidMount() {
    this.scrollBottom();
  }

  componentDidUpdate() {
    if (this.state.stickBottom) {
      this.scrollBottom();
    }
  }

  scrollBottom() {
    // scroll to bottom of list
  }

  handleScroll() {
    // var el = findDOMNode(this);
    // if (el.scrollTop === 0) {
    //   this.props.onLoadMoreMessages();
    // }

    const stickBottom = el.scrollHeight - 1 <= el.clientHeight + el.scrollTop;

    if (stickBottom !== this.state.stickBottom) {
      this.setState({ stickBottom });
    }
  }

  render() {
    const { onMarkMessageRead } = this.props;

    return (
      <View style={styles.container}>
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
  }
});
