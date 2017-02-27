var querystring = require('querystring');
var request = require('request');
var fs = require('fs');

const TOKEN = process.argv[2];
const APP_ID = process.argv[3];

const appIdRegExp = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
let matches = APP_ID.match(appIdRegExp);
let bareAppId;
if (matches) bareAppId = matches[0];

const fullAppIdRegExp = new RegExp(/layer\:\/\/\/apps\/(?:staging|production)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
matches = APP_ID.match(fullAppIdRegExp);
let fullAppId;
if (matches) fullAppId = matches[0];

// console.log('bareAppId', bareAppId, 'fullAppId', fullAppId);

if (!TOKEN || !bareAppId) {
  console.error('INPUT ERROR: you must pass your bearer token and application ID on the command line.');
  console.log('Usage format: `npm run setup <bearer token> <application ID>`');
  console.log('Example: `npm run setup icxXeVDg0aHY9XuMmjYuw7u1xI74HiYz0HSXR0zZmcNIMKJw layer:///apps/staging/1d980162-c5ee-hdbs-b987-e08d9870541f`')
  return;
}

const HEADERS = {
  'Accept': 'application/vnd.layer+json; version=1.1',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
};

[...Array(6).keys()].forEach(function(key) {
  let userNum = '' + key;

  request({
    url: `https://api.layer.com/apps/${bareAppId}/users/${userNum}/identity`,
    method: "POST",
    headers: HEADERS,
    json: true,
    body: {
      'display_name' : `User ${userNum}`,
      'avatar_url': `https://s3.amazonaws.com/static.layer.com/sdk/sampleavatars/${userNum}.png`
    }
  }, function (error, response, body){
    if (error) {
      console.log('Error adding user number: ', userNum, error);
      return;
    }
    if (response.statusCode === 201) {
      console.log('User ', userNum, 'added!');
      return;
    }
    if (response.body) {
      if (response.body.code === 108) {
        console.log('User', userNum, 'already exists.');
      } else {
        console.log('\nThere was an issue creating User', userNum);
        console.log(response.body);
      }
    }
  });
});

request({
  url: `https://api.layer.com/apps/${bareAppId}/conversations`,
  method: "POST",
  headers: HEADERS,
  json: true,
  body: {
    'distinct' : false,
    'participants': ["0","1","2","3","4","5"]
  }
}, function (error, response, body){
  if (error) {
    console.log('Error creating sample conversation: ', error);
    return;
  }
  if (response.statusCode === 201) {
    console.log('Sample conversation created!');
    return;
  }
  if (response.body) {
    console.log('\nThere was an issue creating the sample conversation');
    console.log(response.body);
  }
});

var fs = require('fs');
fs.writeFile("./common/config.js", `window.layerSample.appId = '${fullAppId || bareAppId}';`, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('App ID successfully configured!');
});
