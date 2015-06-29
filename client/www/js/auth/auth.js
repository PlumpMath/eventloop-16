// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('starter.auth', [])

.controller('AuthController', function ($scope, $location, OpenFB, Auth, Token) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.user = {};

  $scope.fbLogin = function () {
    OpenFB.login('email,read_stream,publish_actions').then(
      function () {
        console.log('Facebook login succeeded');
        OpenFB.get('/me').success(
            function (user) {
              console.log("User object: " + JSON.stringify(user));
              $scope.user = user;
              $scope.user._id = user.id;
              Auth.signin($scope.user)
                .then(function () {
                  Token.set('userId', user.id);
                  $location.path('/eventlist');
                })
                .catch(function (error) {
                  console.log('Error in calling Auth.signin: ' + error);
                });
            },
            function (error) {
              alert('Facebook error: ' + error.error_description);
            });
      },
      function () {
          alert('OpenFB login failed');
      });
        // function (response) {
        //     if (response.status === 'connected') {
        //       console.log('Facebook login succeeded');
        //       ngFB.api({
        //           path: '/me',
        //           params: {fields: 'id,email,first_name,last_name'}
        //         }).then(
        //           function (user) {
        //             $scope.user = user;
        //             $scope.user._id = user.id;
        //             Auth.signin($scope.user)
        //               .then(function () {
        //                 Token.set('userId', user.id);
        //                 $location.path('/eventlist');
        //               })
        //               .catch(function (error) {
        //                 console.log('Error in calling Auth.signin: ' + error);
        //               });
        //           },
        //           function (error) {
        //             alert('Facebook error: ' + error.error_description);
        //           });
        //     } else {
        //       alert('Facebook login failed');
        //     }
        //   });
  };
});
