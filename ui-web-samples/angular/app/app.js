/* global angular */
'use strict';

// initialize lauerUI with your appID and layer sdk
window.layerUI.init({
  appId: window.layerSample.appId,
  layer: window.layer
});

// Define the "layerUIControllers" controller
window.layerUI.adapters.angular(angular);


var app = angular.module('ChatApp', [
  'sampleAppControllers',
  'layerUIControllers',
  'conversationPanelControllers',
  'announcementListControllers',
  'participantDialogControllers'
]);

/*
 * Adds support for an ng-enter directive that
 * executes the specified function on receiving
 * an ENTER keydown event.
 */
app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind('keydown', function(e) {
      if (e.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter, {'e': e});
        });
        e.preventDefault();
      }
    });
  };
});
