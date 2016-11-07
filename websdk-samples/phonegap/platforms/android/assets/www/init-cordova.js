(function() {
  var $scope, client, registrationId;

function registerForPush() {
    client.registerAndroidPushToken({
      token: registrationId,
      deviceId: window.device.uuid,
      senderId: String(SENDERID)
    }, function(err) {
      if (err) console.error('Error registering for Push Notifications with Layer:', err);
      else console.log('Push Notifications registered on Layer Servers');
    });
  }

function initCordovaPush(clientIn, scopeIn) {
  client = clientIn;
  $scope = scopeIn;

  document.addEventListener('deviceready', function() {
    var push = PushNotification.init({
      android: {
        senderID: String(SENDERID),
        vibrate: true
      }
    });

    push.on('registration', function(data) {
        registrationId = data.registrationId;
        if (client.isReady) registerForPush();
        else client.on('ready', registerForPush);
    });

    push.on('notification', function(data) {
        // If the app was in the foreground when the notification arrived, ignore it; these notifications are expected to be handled
        // via layer.Client events: layer.Client.on('messages:new') or event layer.Client.on('messages:notify')
        if (data.additionalData.foreground) return;

        // If the app was in the background when the notification occurred, and was opened by a user selecting the notification, then
        // we will reach this point, and should open the specified Conversation
        var conversationId = data.additionalData.layer.conversation_identifier;
        $scope.loadConversation(conversationId);
    }, false);
  });
}
  window.initCordovaPush = initCordovaPush;
})();