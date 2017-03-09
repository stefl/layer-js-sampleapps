import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ENTER = 13;

export default class ConversationHeader extends Component {

  /**
   * The user has made changes to the title; call the provided callback.
   */
  handleChangeTitle = (text) => {
    this.props.onChangeConversationTitle(text);
  }

  goBack = () => {
    this.props.onSelectConversation(null);
  }

  /**
   * Render an editable title
   */
  renderEditing() {
    const { activeConversation, editingTitle, title } = this.props;

    return (
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleInput}
          defaultValue={activeConversation ? activeConversation.metadata.title : ''}
          placeholder='Conversation title...'
          placeholderTextColor='white'
          onChangeText={this.handleChangeTitle}
          returnKeyType='done'
        />

        <TouchableOpacity
            style={styles.titleEditButton}
            onPress={this.props.onSaveConversationTitle}
            activeOpacity={.5}
        >
          <Text style={styles.titleEditButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.titleEditButton}
            onPress={this.props.onCancelEditConversationTitle}
            activeOpacity={.5}
        >
          <Text style={styles.titleEditButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Render a title with an button for changing to edit mode
   */
  renderTitle() {
    const { activeConversation, disableEdit } = this.props;
    var title = '← Create a new conversation or select a conversation from the list.';
    if (activeConversation) {
      if (activeConversation.metadata.title) {
        title = activeConversation.metadata.title;
      } else {
        title = activeConversation.participants
        .map(user => user.displayName)
        .join(', ');
      }
    }

    return (
      <View style={styles.titleContainer}>
        <Text
          ellipsizeMode='tail'
          numberOfLines={1}
          style={styles.title}
        >{title + ' '}</Text>
        <TouchableOpacity
            onPress={this.props.onEditConversationTitle}
            activeOpacity={.5}
        >
          <Icon style={styles.editingIcon} name='pencil' />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { editingTitle } = this.props;

    // Show the title input after clicking the pencil icon.
    return (
      <View style={styles.container}>
        <View style={styles.backButton}>
          <TouchableOpacity
              style={styles.backIconContainer}
              onPress={this.goBack}
              activeOpacity={.5}
          >
            <Icon style={styles.backIcon} name='arrow-left' />
          </TouchableOpacity>
        </View>
        {editingTitle ? this.renderEditing() : this.renderTitle()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(25, 165, 228)',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 30
  },
  backIconContainer: {
    marginRight: 50,
  },
  backIcon: {
    color: 'white',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'System',
    fontSize: 14,
    color: 'white'
  },
  editingIcon: {
    marginLeft: 5,
    marginRight: 50,
    color: 'white',
    fontSize: 14
  },
  titleInput: {
    flex: 1,
    color: 'white'
  },
  titleEditButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginLeft: 3
  },
  titleEditButtonText: {
    color: 'white'
  }
});
