/* global angular layer */
'use strict';

var controllers = angular.module('conversationPanelControllers', []);

/**
 * The Conversation Controller manages:
 *
 * * An editable titlebar
 * * A <layer-conversation /> widget which provides a Message List, Typing Indicator and Compose bar
 */
controllers.controller('conversationCtrl', function($scope) {
  $scope.editingTitle = false;
  $scope.headerState = {
    title: ''
  };
  $scope.composeButtons = [
    document.createElement('layer-file-upload-button'),
    document.createElement('layer-send-button')
  ];

  // The Currently selected Conversation has changed
  $scope.$watch('chatCtrlState.currentConversation.id', function(newId, oldId) {

    // For the new Conversation, listen for all changes to this Conversation's properties;
    // Primarily for rendering changes to metadata.conversationName
    if (newId) {
      var conversation = $scope.appCtrlState.client.getConversation(newId);
      if (conversation) conversation.on('conversations:change', $scope.handleConversationChange);
      $scope.headerState.title = conversation.metadata.conversationName;
    }

    // Stop listening to the old Conversation's property changes.
    if (oldId) {
      var oldConversation = $scope.appCtrlState.client.getConversation(oldId);
      if (oldConversation) oldConversation.off(null, $scope.handleConversationChange);
    }
  }, true);

  /**
   * Any time the currentConversation changes, update our currentConversation object and rerender.
   * Its expected that only things like `unreadCount`, `metadata` and `lastMessage` should change.
   */
  $scope.handleConversationChange = function(evt) {
    $scope.chatCtrlState.currentConversation = evt.target.toObject();
    if (!$scope.editingTitle) $scope.headerState.title = evt.target.metadata.conversationName;
    $scope.$digest();
  };

  /**
   * User is now editting or done editting the title of the Conversation
   */
  $scope.setEditTitle = function(state) {
    if (!state) $scope.headerState.title = $scope.chatCtrlState.currentConversation.metadata.conversationName;
    $scope.editingTitle = state;
  };

  /**
   * Saving the title is done by updating the Conversation's metadata.
   *
   * We need a setTimeout to let the ng-model update $scope.title
   */
  $scope.saveTitle = function() {
    var conversationInstance = $scope.appCtrlState.client.getConversation($scope.chatCtrlState.currentConversation.id);
    if (conversationInstance) {
      $scope.chatCtrlState.currentConversation.metadata.conversationName = $scope.headerState.title;
      conversationInstance.setMetadataProperties({
        conversationName: $scope.headerState.title
      });
    }
    $scope.editingTitle = false;
  };

  new layerUI.files.DragAndDropFileWatcher({
    node: document.querySelector('layer-conversation-panel'),
    callback: sendAttachment,
    allowDocumentDrop: false
  });
  function sendAttachment(messageParts) {
    $scope.chatCtrlState.currentConversation.createMessage({ parts: messageParts }).send();
  }
});
