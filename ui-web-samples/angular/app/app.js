/* global angular */
'use strict';

// typically you would want to provide a value here; this sample lets you change appIds, so
// appId is set on each individual widget instead
window.layerUI.init({
  appId: ""
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
