import React, { Component, PropTypes } from 'react';

import {
  View,
  Modal,
  StyleSheet
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { QueryBuilder } from 'layer-websdk/index-react-native';
import { connectQuery } from 'layer-react';
import * as MessengerActions from '../actions/messenger';
import ConversationList from '../ui/ConversationList';
import ConversationListHeader from '../ui/ConversationListHeader';
import AnnouncementsList from '../ui/announcements/MessageList';
import UserListDialog from '../ui/UserListDialog'

/**
 * Copy data from reducers into our properties
 */
function mapStateToProps({ app, announcementState, participantState, activeConversation }) {
  return {
    owner: app.owner,
    ready: app.ready,
    activeConversationId: activeConversation.activeConversationId,
    showAnnouncements: announcementState.showAnnouncements,
    participantState
  };
}

/**
 * Copy all actions into this.props.actions
 */
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(MessengerActions, dispatch) };
}

/**
 * Setup all of the Queries; will set the query results to be
 * this.props.conversations, this.props.announcements, this.props.users.
 * Message query is setup elsewhere.
 */
function getQueries() {
  return {
    conversations: QueryBuilder.conversations(),
    announcements: QueryBuilder.announcements(),
    users: QueryBuilder.identities(),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@connectQuery({}, getQueries)
export default class ConversationListContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeConversationId &&
      nextProps.activeConversationId !== this.props.activeConversationId) {

        this.props.navigator.push({
          name: 'ActiveConversation'
        });
    }
  }

  /**
   * Hide the Announcements Dialog
   */
  hideAnnouncements = (event) => {
    const { actions } = this.props;
    const { hideAnnouncements } = actions;
    hideAnnouncements();
  }

  /**
   * Hide the Participants Dialog
   */
  hideParticipants = (event) => {
    const { actions } = this.props;
    const { hideParticipants } = actions;
    hideParticipants();
  }

  /**
   * Render the Participants dialog.
   */
  renderParticipantDialog() {
    const { owner, users, participantState, actions } = this.props;
    const selectedParticipants = participantState.participants;

    return (
      <div
        onClick={this.hideParticipants}
        className="participants-dialog dialog">
        <div>
          <UserListDialog
            users={users.filter(user => user.id !== owner.id)}
            selectedUsers={selectedParticipants}
            onUserSelected={actions.addParticipant}
            onUserUnselected={actions.removeParticipant}
            onSave={actions.createConversation}/>
        </div>
      </div>
    );
  }

  /**
   * If we are ready, render the Messenger, else render a blank screen
   */
  render() {
    const {
      owner,
      users,
      conversations,
      announcements,
      activeConversationId,
      actions,
      showAnnouncements,
      participantState
    } = this.props;

    const { showParticipants, participants } = participantState;

    if (this.props.ready) {
      return (
        <View style={styles.container}>
          <ConversationListHeader
            owner={owner}
            unreadAnnouncements={Boolean(announcements.filter(item => item.isUnread).length)}
            onShowAnnouncements={actions.showAnnouncements}
            onShowParticipants={actions.showParticipants}/>
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={actions.selectConversation}
            onDeleteConversation={actions.deleteConversation}/>

          <Modal
            animationType={"slide"}
            transparent={true}
            visible={showAnnouncements}
          >
            <View style={styles.modalBackground}>
              <AnnouncementsList
                messages={announcements}
                onMarkMessageRead={actions.markMessageRead}
                onClose={this.hideAnnouncements}
              />
            </View>
          </Modal>

          <Modal
            animationType={"slide"}
            transparent={true}
            visible={showParticipants}
          >
            <View style={styles.modalBackground}>
              <UserListDialog
                users={users.filter(user => user.id !== owner.id)}
                selectedUsers={participants}
                onUserSelected={actions.addParticipant}
                onUserUnselected={actions.removeParticipant}
                onSave={actions.createConversation}
                onClose={this.hideParticipants}
              />
            </View>
          </Modal>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
