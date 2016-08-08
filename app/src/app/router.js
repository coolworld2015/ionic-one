(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            .state('root.home', {
                url: '/home',
				data: {
                    requireLogin: true
                },
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })

            .state('root.clients', {
                url: '/clients',
				data: {
                    requireLogin: true
                },				
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
				data: {
                    requireLogin: true
                },				
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
				data: {
                    requireLogin: true
                },				
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
				data: {
                    requireLogin: true
                },				
                params: {item: {}},
                views: {
                    'root-goods': {
                        templateUrl: 'goods/good-details.html',
                        controller: 'GoodDetailsCtrl',
                        controllerAs: 'goodDetailsCtrl'
                    }
                }
            })

            .state('root.config', {
                url: '/config',
				data: {
                    requireLogin: true
                },				
                views: {
                    'root-config': {
                        templateUrl: 'app/config.html'
                    }
                }
            })

            .state('login', {
                url: '/login',
				data: {
                    requireLogin: false
                },				
				templateUrl: 'login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'loginCtrl'
             });

        $urlRouterProvider.otherwise('login');
    }

})();