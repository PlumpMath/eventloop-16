// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'starter.auth',
  'starter.services',
  'starter.eventlist',
  'openfb'
])

.run(function ($rootScope, $state, $ionicPlatform, $window, OpenFB) {
  OpenFB.init('872642749474074');

  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.name !== "#/signin" && toState.name !== "#/logout" && !$window.sessionStorage['fbtoken']) {
        $state.go('#/signin');
        event.preventDefault();
    }
  });

  $rootScope.$on('OAuthException', function() {
      $state.go('#/signin');
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('#/signin', {
    url: '/signin',
    templateUrl: 'js/auth/signin.html',
    controller: 'AuthController'
  })

  .state('#/eventlist', {
    url: '/eventlist',
    templateUrl: 'js/eventlist/eventlist.html',
    controller: 'EventListController'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/eventlist');
});
