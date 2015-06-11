function loginController($rootScope, $scope, $log, $window, wydNotifyService,
                         $http, $timeout) {
    $log.debug('loginController...');
    $rootScope.viewName = 'SignIn';

    $scope.message = null

    $scope.user = {
        userId: '',
        password: ''
    };

    function signin() {
        wydNotifyService.removeAll();
        $log.info('singing in...');
        $scope.message = null;

        var path = 'sessions/login';
        $http.post(path, $scope.user).success(function (response) {
            $log.info(response);
            if (response.type === 1) {
                $scope.message = response.message;
                wydNotifyService.addError($scope.message, true);
            } else {
                $window.location = '/home-d.html';
            }
        });
    }

    $scope.signin = signin;
}
appControllers.controller('loginController', loginController);
