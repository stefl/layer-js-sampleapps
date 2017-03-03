import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';

import ConversationListItem from './ConversationListItem';

export default class ConversationList extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      dataSource: ds.cloneWithRows(this.props.conversations),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.conversations),
    })
  }

  /**
   * Render every Conversation in this.props.conversations
   * in the Conversation List.
   */
  render() {
    const {activeConversationId, onDeleteConversation} = this.props;

    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(conversation) => {
            return (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                active={activeConversationId === conversation.id}
                onDeleteConversation={onDeleteConversation} />
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
