function sessionService($log, $http, $q, $rootScope) {
    var basePath = 'sessions';

    var service = {
        context: {}
    };

    function processProps(props) {
        $log.debug('processing session properties started...');
        _.assign(service.context, props);
        if (props.sessionDto.userId) {
            $rootScope.xUserId = props.sessionDto.userId;
            // $log.info('Session User Id = ' + $rootScope.xUserId);
        }
        $log.debug('processing session properties finished...');
    }

    service.properties = function () {
        var path = basePath + '/properties';

        var deferred = $q.defer();
        $http.get(path).success(function (response) {
            // $log.info(response);
            if (response.type === 0) {
                processProps(response.data);
                deferred.resolve(response);
            }
        }).error(function () {
            deferred.reject("unable to authenticate...");
        });

        return deferred.promise;
    };

    return service;
}
appServices.factory('sessionService', sessionService);