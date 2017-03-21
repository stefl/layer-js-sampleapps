import React, { Component, PropTypes } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect as connectRedux } from 'react-redux';
import { QueryBuilder } from 'layer-websdk/index-react-native.js';
import { connectQuery } from 'layer-react';
import * as MessengerActions from '../actions/messenger';
import ConversationHeader from '../ui/ConversationHeader';
import MessageList from '../ui/messages/MessageList';
import MessageComposer from '../ui/MessageComposer';
import TypingIndicatorContainer from './TypingIndicatorContainer';

/**
 * Copy data from reducers into our properties
 */
function mapStateToProps({ activeConversation }) {
  return {
    ...activeConversation,
    activeConversationId: activeConversation.activeConversationId ? `layer:///conversations/${activeConversation.activeConversationId}` : null
  };
}

/**
 * Copy all actions into this.props.actions
 */
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(MessengerActions, dispatch) };
}

/**
 * Setup the Messages Queriy; will set the query results to be
 * this.props.messages.
 */
function getQueries({ activeConversationId, messagePagination }) {
  if (!activeConversationId) {
    return {};
  }
  return {
    conversations: QueryBuilder.conversations(),
    messages: QueryBuilder
      .messages()
      .forConversation(activeConversationId)
      .paginationWindow(messagePagination)
  };
}

@connectRedux(mapStateToProps, mapDispatchToProps)
@connectQuery({}, getQueries)

export default class ActiveConversationContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.activeConversationId) {
      this.props.navigator.pop();
    }
  }

  render() {
    const {
      editingTitle,
      title,
      composerMessage,
      activeConversationId,
      conversations,
      messages,
      actions
    } = this.props;

    // set this on state in ConversationListContainer instead of running this query again
    const activeConversation = conversations.find((conversation) => {
      return conversation.id === activeConversationId;
    });

    return (
      <View style={styles.container}>
        <ConversationHeader
          title={title}
          activeConversation={activeConversation}
          editingTitle={editingTitle}
          onSelectConversation={actions.selectConversation}
          onEditConversationTitle={actions.editConversationTitle}
          onChangeConversationTitle={actions.changeConversationTitle}
          onSaveConversationTitle={actions.saveConversationTitle}
          onCancelEditConversationTitle={actions.cancelEditConversationTitle}/>

        <MessageList
          messages={messages}
          onMarkMessageRead={actions.markMessageRead}
          onLoadMoreMessages={actions.loadMoreMessages}/>

        <TypingIndicatorContainer
          conversationId={activeConversationId}/>

        <MessageComposer
          value={composerMessage}
          onChange={actions.changeComposerMessage}
          onSubmit={actions.submitComposerMessage}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
