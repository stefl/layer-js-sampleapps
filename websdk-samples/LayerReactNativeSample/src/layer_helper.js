'use strict'

let LayerHelper = {
  getIdentityToken(appId, userId, nonce, callback) {
    layer.xhr({
      url: 'https://layer-identity-provider.herokuapp.com/identity_tokens',
      headers: {
        'X_LAYER_APP_ID': appId,
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      data: {
        nonce: nonce,
        app_id: appId,
        user: {
          id: userId
        }
      }
    }, function(res) {
      if (res.success) {
        console.log('getIdentityToken: ok');

        callback(res.data.identity_token);
      } else {
        console.error('getIdentityToken error: ', res.data);
      }
    });
  },
  validateSetup: function(client) {
    client.createQuery({
      model: layer.Query.Identity,
      dataType: layer.Query.ObjectDataType,
      change: function(evt) {
        if (evt.type === 'data') {
          var missing = false;
          for (var i = 0; i <= 5; i++) {
            var identity = client.getIdentity(String(i));
            if (!identity || !identity.avatarUrl || !identity.displayName) missing = true;
          }
          if (missing) {
            console.log('Your app does not appear to have the expected users setup; see the Setup section of the README.md file which contains instructions for setting up these users');
          }
        }
      }
    });
  },
  dateFormat: function(date) {
    var now = new Date();
    if (!date) return now.toLocaleDateString();

    if (date.toLocaleDateString() === now.toLocaleDateString()) return date.toLocaleTimeString();
    else return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}

module.exports = LayerHelper;
