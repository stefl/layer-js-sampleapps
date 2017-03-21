import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Avatar from './Avatar';

/**
 * This Component provides for a Conversation item
 * in the list, currently consisting of an
 * Avatar, title and Delete button.
 */
export default class ConversationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirm: false
    }
  }

  handleDeleteConversation = () => {
    this.props.onDeleteConversation(this.props.conversation.id);
  }

  handleSelectConversation = () => {
    this.props.onSelectConversation(this.props.conversation.id);
  }

  render() {
    const { conversation } = this.props;
    const participantUsers = conversation.participants.filter(user => !user.sessionOwner);

    const title = conversation.metadata.title || participantUsers.map(function(user) {
      return user.displayName;
    }).join(', ');

    // Render the UI
    return (
      <TouchableOpacity style={styles.container}
                        onPress={this.handleSelectConversation}
                        activeOpacity={.5}
      >
        <Avatar users={participantUsers}/>
        <Text style={[styles.title, (conversation.unreadCount > 0) ? styles.titleUnread : {}]}>{title}</Text>


        <TouchableOpacity style={styles.deleteButton}
                          onPress={() => {this.setState({showDeleteConfirm: true})}}
                          activeOpacity={.5}
        >
          <Icon style={styles.deleteIcon} name='times-circle' />
        </TouchableOpacity>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.showDeleteConfirm}
        >
          <View style={styles.modalBackground}>
            <View style={styles.confirmDeleteDialog}>
              <Text style={styles.confirmText}>Are you sure you want to delete this conversation?</Text>
              <View style={styles.confirmButtonsContainer}>
                <TouchableOpacity style={styles.confirmButton}
                                  onPress={() => {
                                    this.setState({showDeleteConfirm: false});
                                    this.handleDeleteConversation();
                                  }}
                                  activeOpacity={.5}
                >
                  <Text style={styles.confirmButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton}
                                  onPress={() => {
                                    this.setState({showDeleteConfirm: false});
                                  }}
                                  activeOpacity={.5}
                >
                  <Text style={styles.confirmButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  title: {
    flex: 1,
    marginLeft: 20,
    fontFamily: 'System',
    fontSize: 14,
    color: '#666'
  },
  titleUnread: {
    color: 'black',
    fontWeight: 'bold'
  },
  deleteButton: {
    padding: 10,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#999'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  confirmDeleteDialog: {
    backgroundColor: 'white',
    marginHorizontal: 30
  },
  confirmText: {
    fontFamily: 'System',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  },
  confirmButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  confirmButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginHorizontal: 10
  },
  confirmButtonText: {
    fontFamily: 'System',
    fontSize: 16
  }
});
