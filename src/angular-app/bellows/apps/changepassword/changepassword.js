'use strict';

angular.module('changepassword', ['ui.bootstrap', 'bellows.services', 'ui.validate',
  'palaso.ui.notice', 'palaso.ui.utils'
])
  .controller('changePasswordCtrl', ['$scope', 'userService', 'asyncSession', 'silNoticeService',
    function ($scope, userService, sessionService, notice) {
      $scope.notify = {};

      $scope.updatePassword = function () {
        if ($scope.vars.password == $scope.vars.confirm_password) {
          sessionService.getSession().then(function (session) {
            var user = session.currentUserId(), password = $scope.vars.password;
            userService.changePassword(user, password).then(function() {
              notice.push(notice.SUCCESS, 'Password updated successfully');
              $scope.vars.password = $scope.vars.confirm_password = '';
            });
          });
        }
      };
    }
  ])
  ;
