"use strict";

var app = angular.module('tranchitam.github.io', ['ui.router', 'ngStorage', 'ui.sortable']);

app.factory('myHttpInterceptor', ['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers['x-access-token'] = $localStorage.user && $localStorage.user.token;
            return config;
        },
        'responseError': function (rejection) {
            if (rejection.status === 401) { // Unauthorized
                $location.path('/');
            } else if (rejection.status === 403) { // Forbidden
                $location.path('/');
            }
            return $q.reject(rejection);
        },
        'response': function (response) {
            return response;
        }

    }
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
}]);

app.run(['$rootScope', '$state', '$templateCache', function ($rootScope, $state, $templateCache) {

}]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partials/home.html'
    }).state('summary', {
        url: '/summary',
        templateUrl: 'partials/summary.html'
    }).state('education', {
        url: '/education',
        templateUrl: 'partials/education.html'
    }).state('skill', {
        url: '/skill',
        templateUrl: 'partials/skill.html'
    }).state('language', {
        url: '/language',
        templateUrl: 'partials/language.html'
    }).state('experience', {
        url: '/experience',
        templateUrl: 'partials/experience.html'
    });
}]);