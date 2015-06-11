'use strict';

function rootController($rootScope, $scope, $log) {
    $log.info('rootController...');
}
appControllers.controller('rootController', rootController);

var dependents = ['ngRoute', 'ngSanitize'];
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
    //uiSelectConfig.theme = 'select2';
    //uiSelectConfig.theme = 'bootstrap';
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('generalHttpInterceptor');
});

//app.config(function (blockUIConfig) {
//     blockUIConfig.autoBlock = false;
//});

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

    $routeProvider.when('/signin', {
        templateUrl: 'modules/session/login-d.html',
        controller: 'loginController',
        reloadOnSearch: false
    });

    // $locationProvider.html5Mode(true);
});

function appInit($log, $rootScope, $location, $sessionStorage) {
    $log.info('Initialization started...');

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // $log.info('Location : ', $location.path());
        var curLocPath = $location.path();
        // $log.info('After Current Location : ', curLocPath);
    });

    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        // $log.info('Location : ', $location.path());
        var curLocPath = $location.path();
        // $log.info('After Current Location : ', curLocPath);
    });

    $location.path('/index');

    $log.info('Initialization finished...');
}
app.run(['$log', '$rootScope', '$location', '$sessionStorage', appInit]);
