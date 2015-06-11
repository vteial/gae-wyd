'use strict';

function rootController($rootScope, $scope, $log, wydNotifyService,
                        sessionService, $window, $timeout, $http, panels, presenceStates) {
    $log.info('rootController...');

    var sessionS = sessionService;
    $scope.sessionS = sessionS;

    sessionS.properties().then(
        function (response) {
            $log.info(response.message);
            $scope.$broadcast('session:properties',
                'Session properties loaded...');
        });

    $scope.presenceStates = presenceStates;

    // presenceStates.onChange(function(state) {
    // $log.debug('Current Presence State : ' + state.text);
    // });

    presenceStates.LONGAWAY.onEnter(function () {
        $log.debug('presence timout started...');
        // panels.open('sessionResponse');
        $scope.$broadcast('session:response', 'Session timeout...');
        $log.debug('presence timout started...');
    });

    $rootScope.$on('session:invalid', function (event, data) {
        $log.debug('session invalid started...');
        // panels.open('sessionResponse');
        $scope.$broadcast('session:response', data);
        $log.debug('session invalid finished...');
    });

    $scope.showLeftMenu = function () {
        var sideMenuId = 'sideMenuLeft';
        panels.open(sideMenuId);
    };

    $scope.viewSource = function () {
        var s = 'view-source:localhost:1111/' + $rootScope.currentViewSrcUrl;
        $log.info(s);
        $window.open(s);
    };

}
appControllers.controller('rootController', rootController);

appControllers.controller('sideMenuLeftController', function ($log, $scope) {
    $log.info('sideMenuLeftController...');
});

var dependents = ['ngRoute', 'ngSanitize'];
dependents.push('green.inputmask4angular');
// dependents.push('ngInputDate');
dependents.push('angular.panels');
dependents.push('presence');
dependents.push('ngStorage');
dependents.push('ngNotify');
dependents.push('hSweetAlert');
dependents.push('blockUI');
dependents.push('ui.select');
dependents.push('ui.bootstrap');
dependents.push('app.filters');
dependents.push('app.directives');
dependents.push('app.services');
dependents.push('app.controllers');
var app = angular.module('app', dependents);

app.config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'selectize';
    // uiSelectConfig.theme = 'select2';
    // uiSelectConfig.theme = 'bootstrap';
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('generalHttpInterceptor');
});

//app.config(function(blockUIConfig) {
//	 blockUIConfig.autoBlock = false;
//});

app.config(function (panelsProvider) {

    panelsProvider.add({
        id: 'sessionResponse',
        position: 'top',
        size: '100%',
        templateUrl: 'modules/session/sessionResponse.html',
        controller: 'sessionResponseController'
    });

    panelsProvider.add({
        id: 'sideMenuLeft',
        position: 'left',
        size: '300px',
        templateUrl: 'modules/zgeneral/d-sideMenuLeft.html',
        controller: 'sideMenuLeftController'
    });

});

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.otherwise({
        redirectTo: '/notFound'
    });

    $routeProvider.when('/notFound', {
        templateUrl: 'modules/zgeneral/d-notFound.html'
    });

    $routeProvider.when('/', {
        redirectTo: '/index'
    });

    $routeProvider.when('/index', {
        templateUrl: 'modules/home/index-d.html',
        controller: 'indexController'
    });

    $routeProvider.when('/signout', {
        templateUrl: 'modules/session/logout-d.html',
        controller: 'logoutController'
    });

    $routeProvider.when('/settings', {
        templateUrl: 'modules/session/setting-d.html',
        controller: 'settingController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'modules/home/home-d.html',
        controller: 'homeController',
        reloadOnSearch: false
    });

    // $locationProvider.html5Mode(true);
});

function appInit($log, $rootScope, $location, $sessionStorage, panels) {
    $log.info('Initialization started...');

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // $log.info('Location : ', $location.path());
        var curLocPath = $location.path();
        // $log.info('Before Current Location : ', curLocPath);
        if (curLocPath == '/notFound' || curLocPath == '/signin'
            || curLocPath == '/signout') {
            return;
        }
        $sessionStorage.wydCLP = curLocPath;
        // $log.info('Stored Location : ', $sessionStorage.wydCLP);

        var srcUrl = $location.absUrl().indexOf('home');
        srcUrl = $location.absUrl().substring(0, srcUrl);
        srcUrl = srcUrl + next.templateUrl;
        $rootScope.currentViewSrcUrl = srcUrl;
        // $log.info('srcUrl = ' + srcUrl);
    });

    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        // $log.info('Location : ', $location.path());
        var curLocPath = $location.path();
        // $log.info('After Current Location : ', curLocPath);

        panels.close();
    });

    var path = $sessionStorage.wydCLP;
    if (!path) {
        path = '/home';
    }
    $location.path(path);

    $log.info('Initialization finished...');
}
app.run(['$log', '$rootScope', '$location', '$sessionStorage', 'panels',
    appInit]);
