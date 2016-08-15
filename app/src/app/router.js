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
			
            .state('root.movies', {
                url: '/movies',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-movies': {
                        templateUrl: 'movies/movies.html',
                        controller: 'MoviesCtrl',
                        controllerAs: 'moviesCtrl'
                    }
                }
            })
			
			.state('root.movies-details', {
                url: '/movies-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-movies': {
                        templateUrl: 'movies/movies-details.html',
                        controller: 'MoviesDetailsCtrl',
                        controllerAs: 'moviesDetailsCtrl'
                    }
                }
            })
			
            .state('root.movies-search', {
                url: '/movies-search',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-movies': {
                        templateUrl: 'movies/movies-search.html',
                        controller: 'MoviesSearchCtrl',
                        controllerAs: 'moviesSearchCtrl'
                    }
                }
            })
			
            .state('root.movies-search-results', {
                url: '/movies-search-results?name?search',
				data: {
                    requireLogin: true
                },
				views: {
                    'root-movies': {
						templateUrl: 'movies/movies-search-results.html',
						controller: 'MoviesSearchResultsCtrl',
						controllerAs: 'moviesResultsCtrl'
					}
				},
                resolve: {
                    items: ['$http', '$stateParams', '$rootScope', '$ionicLoading',
                        function ($http, $stateParams, $rootScope, $ionicLoading) {
                            var webUrl;
                            var name = $stateParams.name;
                            var type = $stateParams.search;
							
                            if (type == 'title') {
                                webUrl = 'http://www.omdbapi.com/?t=';
                            } else {
                                webUrl = 'http://www.omdbapi.com/?i=';
                            }
                            return $http.get(webUrl + name + '&plot=full')
                                .then(function (data) {
									$ionicLoading.hide();
                                    return data.data;
                                })
                                .catch(function () {
									$rootScope.raisedError = true;
									$ionicLoading.hide();
                                    return [];
                                });
                        }]
                }
            })

            .state('root.collection', {
                url: '/collection',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection.html',
                        controller: 'CollectionCtrl',
                        controllerAs: 'collectionCtrl'
                    }
                }
            })
			
            .state('root.collection-details', {
                url: '/collection-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection-details.html',
                        controller: 'CollectionDetailsCtrl',
                        controllerAs: 'collectionDetailsCtrl'
                    }
                }
            })
			
			.state('root.collection-search', {
                url: '/collection-search',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection-search.html',
                        controller: 'CollectionSearchCtrl',
                        controllerAs: 'collectionSearchCtrl'
                    }
                }
            })
			
			.state('root.collection-search-results', {
                url: '/collection-search-results?name?search?finds',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-collection': {
                        templateUrl: 'collection/collection-search-results.html',
                        controller: 'CollectionSearchResultsCtrl',
                        controllerAs: 'collectionSearchResultsCtrl'
                    }
                },
                resolve: {
                    items: ['$http', '$stateParams', '$rootScope', '$ionicLoading',
                        function ($http, $stateParams, $rootScope, $ionicLoading) {
                            var api;
                            var name = $stateParams.name;
                            var type = $stateParams.search;

                            if (type == 'name') {
                                api = 'api/items/findByName/';
                            } else {
                                api = 'api/items/findByPhone/';
                            }

                            //var webUrl = $rootScope.myConfig.webUrl + api;
                            var webUrl = 'http://ui-collection.herokuapp.com/' + api;
                            return $http.get(webUrl + name)
                                .then(function (data) {
                                    $ionicLoading.hide();
                                    return data.data;
                                })
                                .catch(function () {
									$rootScope.raisedError = true;
									$ionicLoading.hide();
                                    return [];
                                });
                        }
                    ]
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

            .state('root.client-add', {
                url: '/client-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-clients': {
                        templateUrl: 'clients/client-add.html',
                        controller: 'ClientAddCtrl',
                        controllerAs: 'clientAddCtrl'
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

            .state('root.phones', {
                url: '/phones',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phones.html',
                        controller: 'PhonesCtrl',
                        controllerAs: 'phonesCtrl'
                    }
                }
            })

            .state('root.phone-details', {
                url: '/phone-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phone-details.html',
                        controller: 'PhoneDetailsCtrl',
                        controllerAs: 'phoneDetailsCtrl'
                    }
                }
            })

            .state('root.phones-search', {
                url: '/phones-search',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phones-search.html',
                        controller: 'PhonesSearchCtrl',
                        controllerAs: 'phonesSearchCtrl'
                    }
                }
            })

            .state('root.phones-search-results', {
                url: '/phones-search-results?name?search?finds',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phones-search-results.html',
                        controller: 'PhonesSearchResultsCtrl',
                        controllerAs: 'phonesSearchResultsCtrl'
                    }
                },
                resolve: {
                    items: ['$http', '$stateParams', '$rootScope', '$ionicLoading',
                        function ($http, $stateParams, $rootScope, $ionicLoading) {
                            var api;
                            var name = $stateParams.name;
                            var type = $stateParams.search;

                            if (type == 'name') {
                                api = 'api/items/findByName/';
                            } else {
                                api = 'api/items/findByPhone/';
                            }

                            //var webUrl = $rootScope.myConfig.webUrl + api;
                            var webUrl = 'http://ui-base.herokuapp.com/' + api;
                            return $http.get(webUrl + name)
                                .then(function (data) {
                                    $ionicLoading.hide();
                                    return data.data;
                                })
                                .catch(function () {
									$rootScope.raisedError = true;
									$ionicLoading.hide();
                                    return [];
                                });
                        }
                    ]
                }
            })

            .state('root.audit', {
                url: '/audit',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-audit': {
                        templateUrl: 'audit/audit.html',
                        controller: 'AuditCtrl',
                        controllerAs: 'auditCtrl'
                    }
                }
            })

            .state('root.audit-details', {
                url: '/audit-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-audit': {
                        templateUrl: 'audit/audit-details.html',
                        controller: 'AuditDetailsCtrl',
                        controllerAs: 'auditDetailsCtrl'
                    }
                }
            })
			
           .state('root.users', {
                url: '/users',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-users': {
                        templateUrl: 'users/users.html',
                        controller: 'UsersCtrl',
                        controllerAs: 'usersCtrl'
                    }
                }
            })			
		
            .state('root.user-details', {
                url: '/user-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-users': {
                        templateUrl: 'users/user-details.html',
                        controller: 'UserDetailsCtrl',
                        controllerAs: 'userDetailsCtrl'
                    }
                }
            })
			
            .state('root.user-add', {
                url: '/user-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-users': {
                        templateUrl: 'users/user-add.html',
                        controller: 'UserAddCtrl',
                        controllerAs: 'userAddCtrl'
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

})
();