(function () {
    'use strict';

    angular
        .module('app', ['ionic', 'starter.controllers']);

    angular
        .module('app')
        .run(runIonic);

    runIonic.$inject = ['$ionicPlatform'];

    function runIonic($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            // setup an abstract state for the roots directive
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            // Each root has its own nav history stack:

            .state('root.home', {
                url: '/home',
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })

            .state('root.clients', {
                url: '/clients',
                views: {
                    'root-clients': {
                        templateUrl: 'clients/clients.html',
                        controller: 'ClientsCtrl',
                        controllerAs: 'clientsCtrl'
                    }
                }
            })

            .state('root.client-details', {
                url: '/client-details',
                params: {item: {}},
                views: {
                    'root-clients': {
                        templateUrl: 'clients/client-details.html',
                        controller: 'ClientDetailsCtrl',
                        controllerAs: 'clientDetailsCtrl'
                    }
                }
            })

            .state('root.goods', {
                url: '/goods',
                views: {
                    'root-goods': {
                        templateUrl: 'goods/goods.html',
                        controller: 'GoodsCtrl',
                        controllerAs: 'goodsCtrl'
                    }
                }
            })

            .state('root.good-details', {
                url: '/good-details',
                params: {item: {}},
                views: {
                    'root-goods': {
                        templateUrl: 'goods/good-details.html',
                        controller: 'GoodDetailsCtrl',
                        controllerAs: 'goodDetailsCtrl'
                    }
                }
            })

            .state('root.account', {
                url: '/account',
                views: {
                    'root-account': {
                        templateUrl: 'app/root-account.html'
                    }
                }
            })

            .state('root.login', {
                url: '/login',
                views: {
                    'root-account': {
                        templateUrl: 'login/login.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/root/home');

    }
})();
