(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$ionicLoading', '$rootScope', '$state', 'UsersService', 'UsersLocalStorage', 'AuditService'];

    function LoginCtrl($ionicLoading, $rootScope, $state, UsersService, UsersLocalStorage, AuditService) {
        var vm = this;

        angular.extend(vm, {
            init: init,
			change: change,
            toLogin: toLogin,
            checkUser: checkUser,
            _check: check,
            _errorHandler: errorHandler
        });

        //init();

        function init() {
            $rootScope.currentUser = undefined;
            $rootScope.loading = false;
            $rootScope.error = false;
            $rootScope.message = false;
        }

        function change() {
            vm.error = false;
        }        
		
		function toLogin() {
            if (vm.form.$invalid) {
                return;
            }
            checkUser(vm.name, vm.pass);
        }

        function checkUser(name, pass) {
            $rootScope.myError = false;
            $rootScope.loading = true;

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                getUsersOn(name, pass);
            } else {
                vm.users = UsersLocalStorage.getUsers();
                check(vm.users, name, pass);
                $rootScope.myError = false;
                $rootScope.loading = false;
            }
        }

        function getUsersOn(name, pass) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            UsersService.findByName(name)
                .then(function (data) {
                    $rootScope.loading = false;
                    var user = data.data;

                    if (user && (user.name == name && user.pass == pass)) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };

                        var id = (Math.random() * 1000000).toFixed();
                        var description  = navigator.userAgent;
                        var item = {
                            id: id,
                            name: vm.name,
                            description: description
                        };

                        AuditService.addItem(item)
                            .then(function () {
								vm.error = false;
                                $state.go('root.home');
                            })
                            .catch(errorHandler);

                    } else {
                        vm.error = true;
                    }
 
                    $ionicLoading.hide();
                })
                .catch(errorHandler);
        }

        function check(users, name, pass) {
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name == name && users[i].pass == pass) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };
                        $state.go('root.home');
                    } else {
                        vm.error = true;
                    }
                }
            }
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }
    }
})();
