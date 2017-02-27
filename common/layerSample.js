/* global layer */
'use strict';

var loginButton;
var errorDiv;

/**
 * layerSample global utility
 *
 * @param {String}    userId - User ID to log in as
 * @param {Function}  getIdentityToken - Layer Client getIdentityToken function
 * @param {Function}  dateFormat - Get a nice date string
 */
window.layerSample = {
  userId: null,
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
            alert('Your app does not appear to have the expected users setup; see the Setup section of the README.md file which contains instructions for setting up these users');
          }
        }
      }
    });
  },
  getIdentityToken: function(appId, nonce, callback) {
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
          id: window.layerSample.userId
        }
      }
    }, function(res) {
      if (res.success) {
        console.log('getIdentityToken: ok');

        callback(res.data.identity_token);

        // Cleanup identity dialog
        var node = document.getElementById('identity');
        node.parentNode.removeChild(node);
      } else {
        console.error('getIdentityToken error: ', res.data);
        loginButton.innerHTML = 'Login';
        errorDiv.innerHTML = 'Invalid Application ID';
      }
    });
  },
  dateFormat: function(date) {
    var now = new Date();
    if (!date) return now.toLocaleDateString();

    if (date.toLocaleDateString() === now.toLocaleDateString()) return date.toLocaleTimeString();
    else return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  },
  onUserSelection: function(callback) {
    this.userIdCallback = callback;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  /**
   * Dirty HTML dialog injection
   */
  var div = document.createElement('div');
  div.innerHTML += '<img src="http://static.layer.com/logo-only-blue.png" />';
  div.innerHTML += '<h1>Welcome to Layer sample app!</h1>';

  div.innerHTML += '<p>2. Select a user to login as:</p>';

  for (var i = 0; i <= 5; i++) {
    var checked = i === 0 ? 'checked' : '';
    div.innerHTML += '<label><input type="radio" name="user" value="' + i + '" ' + checked + '/>' +
      'User ' + i + '</label>';
  }

  errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = "&nbsp;";
  div.appendChild(errorDiv);

  loginButton = document.createElement('button');
  loginButton.appendChild(document.createTextNode('Login'));

  div.appendChild(loginButton);

  var container = document.createElement('div');
  container.setAttribute('id', 'identity');
  container.appendChild(div);
  document.body.insertBefore(container, document.querySelectorAll('.main-app')[0]);

  loginButton.addEventListener('click', function() {
    var radios = div.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].type === 'radio' && radios[i].checked) {
        loginButton.innerHTML = '<i class="fa fa-spinner fa-pulse"></i>';
        window.layerSample.userId = radios[i].value;
        window.layerSample.userIdCallback(window.layerSample.userId);
        break;
      }
    }
  });
});
